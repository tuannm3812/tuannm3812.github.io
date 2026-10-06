import { describe, expect, it } from 'vitest';
import { resolveTheme, safeGetItem, safeRemoveItem, safeSetItem } from './safeStorage';

const denied = (): Storage => {
  throw new DOMException('The operation is insecure.', 'SecurityError');
};

const throwingStorage = (): Storage =>
  ({
    getItem: () => {
      throw new Error('denied');
    },
    setItem: () => {
      throw new DOMException('quota', 'QuotaExceededError');
    },
    removeItem: () => {
      throw new Error('denied');
    },
  }) as unknown as Storage;

const memoryStorage = (): Storage => {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
  } as unknown as Storage;
};

describe('safe storage', () => {
  it('returns null when accessing storage itself throws', () => {
    expect(safeGetItem('theme', denied)).toBeNull();
  });

  it('returns null when getItem throws', () => {
    expect(safeGetItem('theme', throwingStorage)).toBeNull();
  });

  it('swallows setItem and removeItem failures', () => {
    expect(() => safeSetItem('theme', 'dark', throwingStorage)).not.toThrow();
    expect(() => safeRemoveItem('theme', throwingStorage)).not.toThrow();
    expect(() => safeSetItem('theme', 'dark', denied)).not.toThrow();
  });

  it('reads back what it wrote when storage works', () => {
    const storage = memoryStorage();
    const get = () => storage;
    safeSetItem('k', 'v', get);
    expect(safeGetItem('k', get)).toBe('v');
    safeRemoveItem('k', get);
    expect(safeGetItem('k', get)).toBeNull();
  });

  it('returns null with no window (default storage getter in node)', () => {
    expect(safeGetItem('theme')).toBeNull();
  });
});

describe('resolveTheme', () => {
  it('keeps a valid stored theme', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });

  it('falls back to the system preference for a missing or invalid value', () => {
    expect(resolveTheme(null, true)).toBe('dark');
    expect(resolveTheme('purple', false)).toBe('light');
  });
});
