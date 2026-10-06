import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { raceWrite } from './pendingWrite';
import { ReliabilityErrorKind } from './types';

function deferred() {
  let resolve!: () => void;
  let reject!: (error: unknown) => void;
  const promise = new Promise<void>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('raceWrite', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('reports sent when the write is acknowledged before the timeout', async () => {
    const write = deferred();
    const outcome = raceWrite(write.promise, 'doc-1', 'contacts', 5000);
    write.resolve();
    await expect(outcome).resolves.toEqual({ status: 'sent', id: 'doc-1' });
  });

  it('reports failed with a mapped error when the write rejects first', async () => {
    const write = deferred();
    const outcome = raceWrite(write.promise, 'doc-1', 'contacts', 5000);
    write.reject({ code: 'permission-denied', message: 'nope' });
    const result = await outcome;
    expect(result.status).toBe('failed');
    if (result.status === 'failed') {
      expect(result.error.kind).toBe(ReliabilityErrorKind.PERMISSION_DENIED);
    }
  });

  it('reports queued when the write is still pending at the timeout', async () => {
    const write = deferred();
    const outcome = raceWrite(write.promise, 'doc-1', 'contacts', 5000);
    await vi.advanceTimersByTimeAsync(5000);
    const result = await outcome;
    expect(result.status).toBe('queued');
    expect(result.id).toBe('doc-1');
  });

  it('settles a queued write as sent once the original write lands, without a second write', async () => {
    const write = deferred();
    const result = await (async () => {
      const outcome = raceWrite(write.promise, 'doc-1', 'contacts', 5000);
      await vi.advanceTimersByTimeAsync(5000);
      return outcome;
    })();
    if (result.status !== 'queued') throw new Error('expected queued');
    write.resolve();
    await expect(result.settled).resolves.toEqual({ status: 'sent', id: 'doc-1' });
  });

  it('settles a queued write as failed if it is rejected after reconnecting', async () => {
    const write = deferred();
    const outcome = raceWrite(write.promise, 'doc-1', 'contacts', 0);
    await vi.advanceTimersByTimeAsync(0);
    const result = await outcome;
    if (result.status !== 'queued') throw new Error('expected queued');
    write.reject({ code: 'permission-denied', message: 'nope' });
    const settled = await result.settled;
    expect(settled.status).toBe('failed');
  });
});
