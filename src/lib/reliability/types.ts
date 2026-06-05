export enum ReliabilityErrorKind {
  OFFLINE = 'offline',
  PERMISSION_DENIED = 'permission-denied',
  UNAUTHENTICATED = 'unauthenticated',
  VALIDATION = 'validation',
  UNKNOWN = 'unknown',
}

export interface ReliabilityError {
  kind: ReliabilityErrorKind;
  operation: string;
  message: string;
  path?: string;
  code?: string;
}

export interface ReliabilitySuccess<T> {
  ok: true;
  data: T;
}

export interface ReliabilityFailure {
  ok: false;
  error: ReliabilityError;
}

export type OperationResult<T> = ReliabilitySuccess<T> | ReliabilityFailure;

export function mapErrorToResult(operation: string, error: unknown, path?: string): ReliabilityFailure {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code?: unknown }).code) : undefined;
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: unknown }).message)
        : typeof error === 'string'
          ? error
          : 'Unknown reliability error';

  const normalizedCode = code?.toLowerCase();
  const normalizedMessage = message.toLowerCase();

  const kind =
    normalizedCode === 'unavailable' || normalizedMessage.includes('client is offline')
      ? ReliabilityErrorKind.OFFLINE
      : normalizedCode === 'permission-denied'
        ? ReliabilityErrorKind.PERMISSION_DENIED
        : normalizedCode === 'unauthenticated'
          ? ReliabilityErrorKind.UNAUTHENTICATED
          : normalizedCode === 'invalid-argument'
            ? ReliabilityErrorKind.VALIDATION
            : ReliabilityErrorKind.UNKNOWN;

  return {
    ok: false,
    error: {
      kind,
      code,
      operation,
      path,
      message,
    },
  };
}
