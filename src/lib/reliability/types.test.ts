import { describe, expect, it } from 'vitest';
import { mapErrorToResult, ReliabilityErrorKind } from './types';

describe('mapErrorToResult', () => {
  it('maps Firestore "unavailable" code to OFFLINE', () => {
    const result = mapErrorToResult('create', { code: 'unavailable', message: 'down' }, 'contacts');
    expect(result.ok).toBe(false);
    expect(result.error.kind).toBe(ReliabilityErrorKind.OFFLINE);
    expect(result.error.operation).toBe('create');
    expect(result.error.path).toBe('contacts');
  });

  it('maps "client is offline" message to OFFLINE even without a matching code', () => {
    const result = mapErrorToResult(
      'list',
      new Error('Failed to get document because the client is offline.'),
    );
    expect(result.error.kind).toBe(ReliabilityErrorKind.OFFLINE);
  });

  it('maps "permission-denied" code to PERMISSION_DENIED', () => {
    const result = mapErrorToResult('create', { code: 'permission-denied', message: 'nope' });
    expect(result.error.kind).toBe(ReliabilityErrorKind.PERMISSION_DENIED);
  });

  it('maps "unauthenticated" code to UNAUTHENTICATED', () => {
    const result = mapErrorToResult('create', { code: 'unauthenticated', message: 'sign in' });
    expect(result.error.kind).toBe(ReliabilityErrorKind.UNAUTHENTICATED);
  });

  it('maps "invalid-argument" code to VALIDATION', () => {
    const result = mapErrorToResult('create', { code: 'invalid-argument', message: 'bad field' });
    expect(result.error.kind).toBe(ReliabilityErrorKind.VALIDATION);
  });

  it('falls back to UNKNOWN for unrecognized codes', () => {
    const result = mapErrorToResult('create', { code: 'internal', message: 'boom' });
    expect(result.error.kind).toBe(ReliabilityErrorKind.UNKNOWN);
  });

  it('handles a plain Error instance', () => {
    const result = mapErrorToResult('list', new Error('generic failure'));
    expect(result.error.message).toBe('generic failure');
    expect(result.error.code).toBeUndefined();
  });

  it('handles a plain string thrown as an error', () => {
    const result = mapErrorToResult('list', 'string failure');
    expect(result.error.message).toBe('string failure');
  });

  it('handles a completely unrecognized error shape', () => {
    const result = mapErrorToResult('list', 12345);
    expect(result.error.message).toBe('Unknown reliability error');
    expect(result.error.kind).toBe(ReliabilityErrorKind.UNKNOWN);
  });

  it('matches codes case-insensitively', () => {
    const result = mapErrorToResult('create', { code: 'PERMISSION-DENIED', message: 'nope' });
    expect(result.error.kind).toBe(ReliabilityErrorKind.PERMISSION_DENIED);
  });
});
