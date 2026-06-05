import { getDocFromServer, doc } from 'firebase/firestore';
import { db } from '../firebase';

export interface FirebaseHealthState {
  isOffline: boolean;
  isReady: boolean;
  lastCheckedAt: number | null;
  lastMessage: string | null;
}

let state: FirebaseHealthState = {
  isOffline: false,
  isReady: false,
  lastCheckedAt: null,
  lastMessage: null,
};

const listeners = new Set<(current: FirebaseHealthState) => void>();
let running = false;
let timer: ReturnType<typeof setInterval> | null = null;

function notify() {
  for (const listener of listeners) {
    listener({ ...state });
  }
}

export function getFirebaseHealth(): FirebaseHealthState {
  return { ...state };
}

export function subscribeFirebaseHealth(listener: (current: FirebaseHealthState) => void) {
  listeners.add(listener);
  listener({ ...state });
  return () => {
    listeners.delete(listener);
  };
}

export async function refreshFirebaseHealth() {
  try {
    await getDocFromServer(doc(db, '_connection_test_', 'init'));
    state = {
      isOffline: false,
      isReady: true,
      lastCheckedAt: Date.now(),
      lastMessage: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    state = {
      isOffline: true,
      isReady: false,
      lastCheckedAt: Date.now(),
      lastMessage: message,
    };
  }

  notify();
  return state;
}

export function startFirebaseHealthMonitoring(intervalMs = 30000) {
  if (running) return;
  running = true;
  void refreshFirebaseHealth();
  timer = setInterval(() => {
    void refreshFirebaseHealth();
  }, intervalMs);
}

export function stopFirebaseHealthMonitoring() {
  if (!timer) return;
  clearInterval(timer);
  timer = null;
  running = false;
}
