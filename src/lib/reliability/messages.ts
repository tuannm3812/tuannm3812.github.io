import { ReliabilityError, ReliabilityErrorKind } from './types';

export interface ReliabilityDisplay {
  title: string;
  detail: string;
  cta?: string;
}

export function toDisplayMessage(error: ReliabilityError | null): ReliabilityDisplay {
  if (!error) {
    return {
      title: 'Something went wrong',
      detail: 'Please try again in a few moments.',
      cta: 'Retry',
    };
  }

  if (error.kind === ReliabilityErrorKind.OFFLINE) {
    return {
      title: 'Connection lost',
      detail: 'Static pages still work. Keep your message and try again when connectivity returns.',
      cta: 'Retry',
    };
  }

  if (error.kind === ReliabilityErrorKind.PERMISSION_DENIED) {
    return {
      title: 'Action blocked by permissions',
      detail: 'You do not have permission to perform this action.',
      cta: 'Retry',
    };
  }

  if (error.kind === ReliabilityErrorKind.UNAUTHENTICATED) {
    return {
      title: 'Sign in required',
      detail: 'Sign in with Google to use comments.',
      cta: 'Sign in',
    };
  }

  if (error.kind === ReliabilityErrorKind.VALIDATION) {
    return {
      title: 'Input validation failed',
      detail: 'Please review form input and try again.',
      cta: 'Retry',
    };
  }

  console.error('Reliability error:', error);
  return {
    title: 'Something went wrong',
    detail: 'An unexpected error occurred. Please try again in a few moments.',
    cta: 'Retry',
  };
}

/**
 * Visitor-facing text for a failed Google sign-in, or null when the visitor
 * dismissed the popup themselves and no message is needed.
 */
export function toSignInMessage(error: unknown): string | null {
  const code =
    typeof error === 'object' && error !== null && 'code' in error
      ? String((error as { code?: unknown }).code)
      : '';

  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
    return null;
  }
  if (code === 'auth/popup-blocked') {
    return 'Your browser blocked the sign-in pop-up. Allow pop-ups for this site and try again.';
  }
  if (code === 'auth/network-request-failed') {
    return 'Sign-in could not reach Google. Check your connection and try again.';
  }
  console.error('Sign-in error:', error);
  return "Sign-in isn't available right now. Please try again later.";
}
