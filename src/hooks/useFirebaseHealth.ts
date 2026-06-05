import { useSyncExternalStore } from 'react';
import { getFirebaseHealth, subscribeFirebaseHealth } from '../lib/reliability/firebaseHealth';

export function useFirebaseHealth() {
  return useSyncExternalStore(subscribeFirebaseHealth, getFirebaseHealth, getFirebaseHealth);
}
