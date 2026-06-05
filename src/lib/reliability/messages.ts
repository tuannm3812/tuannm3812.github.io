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

  return {
    title: 'Something went wrong',
    detail: error.message || 'Please try again. If it keeps happening, retry later.',
    cta: 'Retry',
  };
}
