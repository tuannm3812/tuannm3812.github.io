import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  BarChart3,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { resumeData } from '../data/resume';
import { cn } from '../lib/utils';
import { useFirebaseHealth } from '../hooks/useFirebaseHealth';
import ErrorBoundary from './ErrorBoundary';
import useDocumentTitle from '../hooks/useDocumentTitle';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

// Only these routes read or write Firestore, so the connectivity banner (and the
// Firebase SDK it loads) stays out of the way everywhere else.
const FIREBASE_ROUTES = ['/blog', '/contact'];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const usesFirebase = FIREBASE_ROUTES.some((path) => location.pathname.startsWith(path));
  const firebaseHealth = useFirebaseHealth(usesFirebase);
  const isFirebaseOffline = firebaseHealth.isOffline;

  useDocumentTitle();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isFirebaseOffline) {
      setIsDismissed(false);
    }
  }, [isFirebaseOffline]);

  const showStatus = isFirebaseOffline && !isDismissed;

  return (
    <div className="site-backdrop min-h-screen overflow-x-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-brand selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <div className="column-grid" aria-hidden="true">
        {Array.from({ length: 12 }, (_, column) => (
          <span key={column} className={column >= 4 ? 'hidden md:block' : undefined} />
        ))}
      </div>

      <AnimatePresence>
        {showStatus && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand text-white overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="animate-pulse" />
                <span>Firebase is currently offline in this preview.</span>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://console.firebase.google.com/project/mike-nguyen-portfolio/firestore"
                  target="_blank"
                  rel="noreferrer"
                  className="underline flex items-center gap-1 hover:text-white/80"
                >
                  Check Firestore <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="bg-white/20 hover:bg-white/30 px-2 py-1 rounded transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-ink bg-paper dark:border-slate-200 dark:bg-paper-dark">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex min-w-0 items-center font-display text-lg font-extrabold tracking-tight transition-colors hover:text-brand"
          >
            <span className="truncate">{resumeData.name}</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'border-b-2 py-1 text-sm transition-colors',
                    isActive
                      ? 'border-brand font-semibold text-ink dark:border-brand-light dark:text-white'
                      : 'border-transparent text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center border border-rule text-slate-600 transition-colors hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:border-rule-dark dark:text-slate-300 dark:hover:border-slate-300 dark:hover:text-white"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center overflow-hidden border border-rule p-2 transition-colors hover:border-ink dark:border-rule-dark"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0.8, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="border border-rule p-2 transition-colors hover:border-ink dark:border-rule-dark"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-rule bg-paper px-4 py-4 dark:border-rule-dark dark:bg-paper-dark"
            >
              <div className="flex flex-col">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'border-b border-rule py-3 font-display text-xl font-bold tracking-tight dark:border-rule-dark',
                        isActive
                          ? 'text-brand dark:text-brand-light'
                          : 'text-ink hover:text-brand dark:text-slate-100',
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content" className="relative z-10 pt-24 pb-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-7xl min-w-0 px-4"
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 border-t border-ink bg-paper py-12 transition-colors dark:border-slate-200 dark:bg-paper-dark">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">{resumeData.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
              Building practical machine learning, data engineering, and applied AI workflows.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <a
              href={resumeData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-tile transition-colors hover:border-ink hover:text-brand dark:hover:border-slate-300"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={resumeData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-tile transition-colors hover:border-ink hover:text-brand dark:hover:border-slate-300"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={resumeData.kaggle}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-tile transition-colors hover:border-ink hover:text-brand dark:hover:border-slate-300"
              aria-label="Kaggle"
            >
              <BarChart3 size={20} />
            </a>
            <a
              href={`mailto:${resumeData.email}`}
              className="icon-tile transition-colors hover:border-ink hover:text-brand dark:hover:border-slate-300"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Copyright {new Date().getFullYear()} Tuan Nguyen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
