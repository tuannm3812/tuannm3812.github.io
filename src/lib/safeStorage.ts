// Best-effort localStorage. Browsers with storage blocked throw on access (even on
// reading `window.localStorage`), and that must never take a route down.

export type Theme = 'light' | 'dark';

type StorageGetter = () => Storage;

const defaultStorage: StorageGetter = () => window.localStorage;

export function safeGetItem(
  key: string,
  getStorage: StorageGetter = defaultStorage,
): string | null {
  try {
    return getStorage().getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(
  key: string,
  value: string,
  getStorage: StorageGetter = defaultStorage,
): void {
  try {
    getStorage().setItem(key, value);
  } catch {
    // Persistence is a convenience; the in-memory state still works.
  }
}

export function safeRemoveItem(key: string, getStorage: StorageGetter = defaultStorage): void {
  try {
    getStorage().removeItem(key);
  } catch {
    // See safeSetItem.
  }
}

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (stored === 'light' || stored === 'dark') return stored;
  return prefersDark ? 'dark' : 'light';
}
