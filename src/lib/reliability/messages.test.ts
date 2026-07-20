import { describe, expect, it } from 'vitest';
import { toDisplayMessage } from './messages';
import { ReliabilityErrorKind, type ReliabilityError } from './types';

function errorOf(kind: ReliabilityErrorKind): ReliabilityError {
  return { kind, operation: 'create', message: 'test message' };
}

describe('toDisplayMessage', () => {
  it('returns a generic message when error is null', () => {
    const display = toDisplayMessage(null);
    expect(display.title).toBe('Something went wrong');
    expect(display.cta).toBe('Retry');
  });

  it('returns an offline-specific message for OFFLINE', () => {
    const display = toDisplayMessage(errorOf(ReliabilityErrorKind.OFFLINE));
    expect(display.title).toBe('Connection lost');
  });

  it('returns a permission-specific message for PERMISSION_DENIED', () => {
    const display = toDisplayMessage(errorOf(ReliabilityErrorKind.PERMISSION_DENIED));
    expect(display.title).toBe('Action blocked by permissions');
  });

  it('returns a sign-in CTA for UNAUTHENTICATED', () => {
    const display = toDisplayMessage(errorOf(ReliabilityErrorKind.UNAUTHENTICATED));
    expect(display.cta).toBe('Sign in');
  });

  it('returns a validation-specific message for VALIDATION', () => {
    const display = toDisplayMessage(errorOf(ReliabilityErrorKind.VALIDATION));
    expect(display.title).toBe('Input validation failed');
  });

  it('falls back to a generic message for UNKNOWN', () => {
    const display = toDisplayMessage(errorOf(ReliabilityErrorKind.UNKNOWN));
    expect(display.title).toBe('Something went wrong');
    expect(display.detail).toContain('unexpected error');
  });
});
