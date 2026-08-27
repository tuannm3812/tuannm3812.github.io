import { useSyncExternalStore } from 'react';
import { getFirebaseHealth, subscribeFirebaseHealth } from '../lib/reliability/firebaseHealth';

const OFFLINE_STATE = {
  isOffline: false,
  isReady: false,
  lastCheckedAt: null,
  lastMessage: null,
};

const noopSubscribe = () => () => {};
const getIdleState = () => OFFLINE_STATE;

/**
 * Subscribes to Firestore connectivity. Pass `enabled: false` on routes that never
 * touch Firestore so the health poll -- and the lazily imported Firebase SDK behind
 * it -- is never started there.
 */
export function useFirebaseHealth(enabled = true) {
  return useSyncExternalStore(
    enabled ? subscribeFirebaseHealth : noopSubscribe,
    enabled ? getFirebaseHealth : getIdleState,
    getIdleState,
  );
}
