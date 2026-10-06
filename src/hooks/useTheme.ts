import { useState, useEffect } from 'react';
import { resolveTheme, safeGetItem, safeSetItem, Theme } from '../lib/safeStorage';

export type { Theme };

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return resolveTheme(
        safeGetItem('theme'),
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      );
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    safeSetItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
