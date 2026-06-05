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
    <div className="site-backdrop min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-brand selection:text-white">
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

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter hover:text-brand transition-colors">
            {resumeData.name}
            <span className="text-brand">.</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-brand',
                  location.pathname === item.path ? 'text-brand' : 'text-slate-600 dark:text-slate-400',
                )}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
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
              className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'text-lg font-medium py-2',
                      location.pathname === item.path ? 'text-brand' : 'text-slate-600 dark:text-slate-400',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
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
            className="max-w-7xl mx-auto px-4"
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">{resumeData.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              Building practical machine learning, data engineering, and applied AI workflows.
            </p>
          </div>
          <div className="flex gap-6 items-center">
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="LinkedIn">
              <Linkedin size={24} />
            </a>
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="GitHub">
              <Github size={24} />
            </a>
            <a href={resumeData.kaggle} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors" aria-label="Kaggle">
              <BarChart3 size={24} />
            </a>
            <a href={`mailto:${resumeData.email}`} className="hover:text-brand transition-colors" aria-label="Email">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Copyright {new Date().getFullYear()} Tuan Nguyen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
