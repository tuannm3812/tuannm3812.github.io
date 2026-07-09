import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, BarChart3, ExternalLink, Github, Linkedin, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { resumeData } from '../data/resume';
import { cn } from '../lib/utils';
import { useFirebaseHealth } from '../hooks/useFirebaseHealth';
import ErrorBoundary from './ErrorBoundary';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const firebaseHealth = useFirebaseHealth();
  const isFirebaseOffline = firebaseHealth.isOffline;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isFirebaseOffline) {
      setIsDismissed(false);
    }
  }, [isFirebaseOffline]);

  const showStatus = isFirebaseOffline && !isDismissed;

  return (
    <div className="site-backdrop min-h-screen overflow-x-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-brand selection:text-white">
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

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/70 bg-white/80 shadow-sm shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/80 dark:shadow-black/20">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-1 text-xl font-black tracking-tighter transition-colors hover:text-brand">
            <span className="truncate">{resumeData.name}</span>
            <span className="text-brand">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/85 p-1 shadow-sm shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/75 dark:shadow-black/20">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-sm font-bold transition-all',
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm shadow-slate-950/10 dark:bg-white dark:text-slate-950 dark:shadow-white/10'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="ml-1 rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand dark:text-slate-300 dark:hover:bg-slate-800 flex items-center justify-center h-9 w-9 focus-visible:outline-none"
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
              className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition-colors hover:text-brand dark:border-slate-800 dark:bg-slate-900 flex items-center justify-center h-10 w-10 overflow-hidden"
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
              className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm transition-colors hover:text-brand dark:border-slate-800 dark:bg-slate-900"
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
              className="md:hidden border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/95"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'rounded-lg px-3 py-2 text-lg font-bold tracking-tight transition-all',
                        isActive
                          ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
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

      <main className="pt-24 pb-16 min-h-screen">
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

      <footer className="border-t border-slate-200/80 bg-white/85 py-12 transition-colors dark:border-slate-800/80 dark:bg-slate-950/85">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">{resumeData.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
              Building practical machine learning, data engineering, and applied AI workflows.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="icon-tile hover:-translate-y-0.5 hover:border-brand/50 transition-all" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="icon-tile hover:-translate-y-0.5 hover:border-brand/50 transition-all" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href={resumeData.kaggle} target="_blank" rel="noopener noreferrer" className="icon-tile hover:-translate-y-0.5 hover:border-brand/50 transition-all" aria-label="Kaggle">
              <BarChart3 size={24} />
            </a>
            <a href={`mailto:${resumeData.email}`} className="icon-tile hover:-translate-y-0.5 hover:border-brand/50 transition-all" aria-label="Email">
              <Mail size={24} />
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
