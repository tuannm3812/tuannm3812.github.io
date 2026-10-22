import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  ArrowUpRight,
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

const socialLinks = [
  { href: resumeData.linkedin, label: 'LinkedIn', icon: Linkedin },
  { href: resumeData.github, label: 'GitHub', icon: Github },
  { href: resumeData.kaggle, label: 'Kaggle', icon: BarChart3 },
  { href: `mailto:${resumeData.email}`, label: 'Email', icon: Mail },
];

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
    <div className="site-backdrop isolate min-h-screen overflow-x-hidden text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-brand selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      <div className="aurora-field" aria-hidden="true">
        <div className="aurora-blob -left-40 -top-40 h-[34rem] w-[34rem] bg-brand" />
        <div className="aurora-blob -right-32 top-24 h-[28rem] w-[28rem] bg-aurora-violet [animation-delay:-6s]" />
        <div className="aurora-blob left-1/3 top-[55vh] h-[24rem] w-[24rem] bg-aurora-cyan [animation-delay:-12s] dark:opacity-[0.12]" />
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

      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full border border-slate-200/70 bg-white/80 pl-2 pr-2 shadow-lg shadow-slate-300/20 backdrop-blur-2xl dark:border-white/[0.08] dark:bg-night/80 dark:shadow-black/40">
          <Link to="/" className="group flex min-w-0 items-center gap-2.5 rounded-full pr-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand via-aurora-violet to-aurora-cyan text-sm font-black text-white shadow-md shadow-brand/30 transition-transform duration-500 group-hover:rotate-[360deg]">
              TN
            </span>
            <span className="truncate text-base font-bold tracking-tight transition-colors group-hover:text-brand dark:group-hover:text-brand-light">
              {resumeData.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    isActive
                      ? 'text-white dark:text-slate-950'
                      : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-slate-950 dark:bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 text-slate-600 transition-colors hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:border-white/10 dark:text-slate-300 dark:hover:text-brand-light"
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
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200/80 transition-colors hover:text-brand dark:border-white/10"
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-white transition-colors hover:bg-brand dark:bg-white dark:text-slate-950"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mx-auto mt-2 max-w-6xl rounded-3xl border border-slate-200/70 bg-white/90 p-3 shadow-xl backdrop-blur-2xl md:hidden dark:border-white/[0.08] dark:bg-night/90"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'rounded-2xl px-4 py-3 text-lg font-semibold tracking-tight transition-all',
                        isActive
                          ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white',
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

      <main id="main-content" className="pt-28 pb-16 min-h-screen">
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

      <footer className="relative mt-8 overflow-hidden border-t border-slate-200/70 dark:border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-60"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-16">
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl space-y-4">
              <p className="section-eyebrow">What's next</p>
              <h2 className="text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
                Have a dataset with a{' '}
                <span className="font-display-serif text-gradient pr-1">story</span> in it?
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Building practical machine learning, data engineering, and applied AI workflows.
              </p>
              <Link to="/contact" className="btn-primary group w-fit">
                Start a conversation
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
            <div className="flex gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="icon-tile h-12 w-12 rounded-full transition-all hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg hover:shadow-brand/20"
                  aria-label={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-slate-200/70 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.06] dark:text-slate-500">
            <p>Copyright {new Date().getFullYear()} Tuan Nguyen. All rights reserved.</p>
            <p className="font-mono text-xs">{resumeData.location} · Built with React + Vite</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
