import { mapErrorToResult, ReliabilityError } from './types';

// Firestore never rejects a write just because the client is offline: the promise
// stays pending and the SDK commits the queued write when connectivity returns.
// Racing a timeout and *retrying* would therefore duplicate the document. Instead,
// after `pendingAfterMs` the caller is told the write is queued and handed the
// original write's outcome to await. There is only ever one write.

export type SettledWrite =
  { status: 'sent'; id: string } | { status: 'failed'; id: string; error: ReliabilityError };

export type WriteOutcome =
  SettledWrite | { status: 'queued'; id: string; settled: Promise<SettledWrite> };

export function raceWrite(
  write: Promise<void>,
  id: string,
  path: string,
  pendingAfterMs: number,
): Promise<WriteOutcome> {
  const settled: Promise<SettledWrite> = write.then(
    () => ({ status: 'sent', id }),
    (error: unknown) => ({
      status: 'failed',
      id,
      error: mapErrorToResult('create', error, path).error,
    }),
  );

  let timer: ReturnType<typeof setTimeout> | undefined;
  const queued = new Promise<WriteOutcome>((resolve) => {
    timer = setTimeout(() => resolve({ status: 'queued', id, settled }), pendingAfterMs);
  });

  return Promise.race([settled, queued]).finally(() => clearTimeout(timer));
}
