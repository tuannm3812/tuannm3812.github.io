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

// The Firebase SDK is ~515 kB and only the Blog and Contact routes need it, so it
// is pulled in on demand here rather than through a static import. A static import
// would put the whole SDK in the chunk that Layout (and therefore every route)
// loads before first paint.
async function loadFirebase() {
  const [{ getDocFromServer, doc }, { db, registerHealthCheck }] = await Promise.all([
    import('firebase/firestore'),
    import('../firebase'),
  ]);
  registerHealthCheck(() => !state.isOffline);
  return { getDocFromServer, doc, db };
}

const listeners = new Set<() => void>();
let running = false;
let timer: ReturnType<typeof setInterval> | null = null;

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

export function getFirebaseHealth(): FirebaseHealthState {
  return state;
}

export function subscribeFirebaseHealth(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    startFirebaseHealthMonitoring();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      stopFirebaseHealthMonitoring();
    }
  };
}

export async function refreshFirebaseHealth() {
  try {
    const { getDocFromServer, doc, db } = await loadFirebase();
    await getDocFromServer(doc(db, '_connection_test_', 'init'));
    state = {
      isOffline: false,
      isReady: true,
      lastCheckedAt: Date.now(),
      lastMessage: null,
    };
  } catch (error) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error
        ? String((error as { code?: unknown }).code)
        : undefined;
    const isPermissionDenied = code === 'permission-denied';
    const message = error instanceof Error ? error.message : String(error);
    state = {
      isOffline: !isPermissionDenied,
      isReady: isPermissionDenied,
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
