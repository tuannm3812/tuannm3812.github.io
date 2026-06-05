# Portfolio Reliability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add resilient, fail-open Firebase behavior across all routes so dynamic features degrade safely when Firebase is unavailable.

**Architecture:** Add a small reliability layer (`src/lib/reliability`) for typed error handling and safe operations, plus a health hook used by layout. Keep route structure and UI patterns, while containing failures to Contact/Blog dynamic sections and preserving static rendering.

**Tech Stack:** React 19, TypeScript, Firebase SDK v9 modular, Vite, Tailwind.

---

### Files to create and modify

Create:
- `src/lib/reliability/types.ts`
- `src/lib/reliability/messages.ts`
- `src/lib/reliability/firebaseHealth.ts`
- `src/lib/reliability/firebaseOps.ts`
- `src/hooks/useFirebaseHealth.ts`
- `src/hooks/useBlogComments.ts`
- `src/components/FeatureErrorPanel.tsx`

Modify:
- `src/lib/firebase.ts`
- `src/components/Layout.tsx`
- `src/pages/Contact.tsx`
- `src/pages/Blog.tsx`
- `src/components/ErrorBoundary.tsx`
- `docs/05-repository-next-steps.md`

---

### Task 1: Add reliability primitives and message mapping

**Files:**
- Create: `src/lib/reliability/types.ts`
- Create: `src/lib/reliability/messages.ts`

- [ ] **Step 1: Add typed result and error domain models**

```ts
// src/lib/reliability/types.ts
export enum ReliabilityErrorKind {
  OFFLINE = 'offline',
  PERMISSION_DENIED = 'permission-denied',
  UNAUTHENTICATED = 'unauthenticated',
  VALIDATION = 'validation',
  UNKNOWN = 'unknown',
}

export interface ReliabilityError {
  kind: ReliabilityErrorKind;
  operation: string;
  message: string;
  path?: string;
  code?: string;
}

export interface ReliabilitySuccess<T> {
  ok: true;
  data: T;
}

export interface ReliabilityFailure {
  ok: false;
  error: ReliabilityError;
}

export type OperationResult<T> = ReliabilitySuccess<T> | ReliabilityFailure;

export function mapErrorToResult(operation: string, error: unknown, path?: string): ReliabilityFailure {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code?: unknown }).code) : undefined;
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'Unknown reliability error';

  const normalizedCode = code?.toLowerCase();
  const normalizedMessage = message.toLowerCase();

  const kind =
    normalizedCode === 'unavailable' || normalizedMessage.includes('client is offline')
      ? ReliabilityErrorKind.OFFLINE
      : normalizedCode === 'permission-denied'
        ? ReliabilityErrorKind.PERMISSION_DENIED
        : normalizedCode === 'unauthenticated'
          ? ReliabilityErrorKind.UNAUTHENTICATED
          : normalizedCode === 'invalid-argument'
            ? ReliabilityErrorKind.VALIDATION
            : ReliabilityErrorKind.UNKNOWN;

  return {
    ok: false,
    error: {
      kind,
      code,
      operation,
      path,
      message,
    },
  };
}
```

- [ ] **Step 2: Add user-facing reliability messaging utility**

```ts
// src/lib/reliability/messages.ts
import { ReliabilityError, ReliabilityErrorKind } from './types';

export interface ReliabilityDisplay {
  title: string;
  detail: string;
  cta?: string;
}

export function toDisplayMessage(error: ReliabilityError | null): ReliabilityDisplay {
  if (!error) {
    return {
      title: 'Something went wrong',
      detail: 'Please try again in a few moments.',
      cta: 'Retry',
    };
  }

  if (error.kind === ReliabilityErrorKind.OFFLINE) {
    return {
      title: 'Firebase is currently offline',
      detail: 'Static pages still work. Keep your message and try again when connectivity returns.',
      cta: 'Retry',
    };
  }

  if (error.kind === ReliabilityErrorKind.PERMISSION_DENIED) {
    return {
      title: 'Action blocked by permissions',
      detail: 'Your Firestore rules may not allow this operation right now.',
      cta: 'Retry',
    };
  }

  if (error.kind === ReliabilityErrorKind.UNAUTHENTICATED) {
    return {
      title: 'Sign in required',
      detail: 'Sign in with Google to use comments.',
      cta: 'Sign in',
    };
  }

  if (error.kind === ReliabilityErrorKind.VALIDATION) {
    return {
      title: 'Input validation failed',
      detail: 'Please review form input and try again.',
      cta: 'Retry',
    };
  }

  return {
    title: 'Something went wrong',
    detail: error.message || 'Please try again. If it keeps happening, retry later.',
    cta: 'Retry',
  };
}
```

- [ ] **Step 3: Commit reliability primitives**

Run:
```bash
git add src/lib/reliability/types.ts src/lib/reliability/messages.ts
git commit -m "feat: add reliability types and messaging"
```

---

### Task 2: Introduce Firebase health state and shell hook

**Files:**
- Create: `src/lib/reliability/firebaseHealth.ts`
- Create: `src/hooks/useFirebaseHealth.ts`
- Modify: `src/lib/firebase.ts`
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Create reactive health state store and poller**

```ts
// src/lib/reliability/firebaseHealth.ts
import { getDocFromServer, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

let listeners = new Set<(current: FirebaseHealthState) => void>();
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
```

- [ ] **Step 2: Add useSyncExternalStore hook for health**

```ts
// src/hooks/useFirebaseHealth.ts
import { useSyncExternalStore } from 'react';
import { getFirebaseHealth, subscribeFirebaseHealth } from '../lib/reliability/firebaseHealth';

export function useFirebaseHealth() {
  return useSyncExternalStore(subscribeFirebaseHealth, getFirebaseHealth, getFirebaseHealth);
}
```

- [ ] **Step 3: Keep firebase module export-compatible and remove throw-on-log behavior**

```ts
// src/lib/firebase.ts (append)
export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
) {
  const msg = error instanceof Error ? error.message : String(error);
  console.error('Firestore Error', {
    operationType,
    path,
    error: msg,
    user: auth.currentUser?.email ?? null,
  });
}

export function isFirestoreReady() {
  return isFirebaseOffline === false;
}
```

- [ ] **Step 4: Use reactive health in layout and start/stop monitor**

```tsx
// src/components/Layout.tsx (imports)
import { useFirebaseHealth } from '../hooks/useFirebaseHealth';
import { startFirebaseHealthMonitoring, stopFirebaseHealthMonitoring } from '../lib/reliability/firebaseHealth';

// src/components/Layout.tsx (state)
const firebaseHealth = useFirebaseHealth();
const isFirebaseOffline = firebaseHealth.isOffline;

useEffect(() => {
  startFirebaseHealthMonitoring(30000);
  return () => stopFirebaseHealthMonitoring();
}, []);
```

- [ ] **Step 5: Run lint on touched reliability + shell files**

Run: `npm run lint -- src/lib/reliability/firebaseHealth.ts src/hooks/useFirebaseHealth.ts src/components/Layout.tsx`

- [ ] **Step 6: Commit health foundation**

Run:
```bash
git add src/lib/reliability/firebaseHealth.ts src/hooks/useFirebaseHealth.ts src/lib/firebase.ts src/components/Layout.tsx
git commit -m "feat: add reactive firebase health polling and shell integration"
```

---

### Task 3: Add safe Firestore operation wrappers

**Files:**
- Create: `src/lib/reliability/firebaseOps.ts`
- Modify: `src/lib/firebase.ts`

- [ ] **Step 1: Add safe write helper returning typed result**

```ts
// src/lib/reliability/firebaseOps.ts
import { addDoc, CollectionReference, Query, onSnapshot, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { OperationResult, mapErrorToResult } from './types';

export async function safeCreateDocument<T>(
  target: CollectionReference<DocumentData>,
  data: T,
  path: string,
): Promise<OperationResult<string>> {
  try {
    const ref = await addDoc(target, data as never);
    return { ok: true, data: ref.id };
  } catch (error) {
    void db;
    return mapErrorToResult('create', error, path);
  }
}
```

- [ ] **Step 2: Add safe snapshot helper with failure callback**

```ts
// src/lib/reliability/firebaseOps.ts (append)
export function safeSubscribeSnapshot<T>(
  q: Query<DocumentData>,
  path: string,
  onItems: (items: T[]) => void,
  onError: (errorMessage: string) => void,
): () => void {
  return onSnapshot(
    q,
    (snapshot: QuerySnapshot<DocumentData>) => {
      const items = snapshot.docs.map((docRef) => {
        const source = docRef.data() as Record<string, unknown>;
        return {
          id: docRef.id,
          ...(source as T),
        };
      }) as T[];
      onItems(items);
    },
    (error) => {
      const result = mapErrorToResult('list', error, path);
      onError(result.error.message);
    },
  );
}
```

- [ ] **Step 3: Ensure firebase.ts exposes all core Firestore symbols still used by existing imports**

```ts
// src/lib/firebase.ts (keep current exports)
export { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
```

- [ ] **Step 4: Verify operation wrapper compiles**

Run: `npm run lint -- src/lib/reliability/firebaseOps.ts`

- [ ] **Step 5: Commit Firestore wrapper layer**

Run:
```bash
git add src/lib/reliability/firebaseOps.ts src/lib/firebase.ts
git commit -m "feat: add safe firestore operation wrappers"
```

---

### Task 4: Add reusable feature fallback UI

**Files:**
- Create: `src/components/FeatureErrorPanel.tsx`
- Modify: `src/components/ErrorBoundary.tsx`

- [ ] **Step 1: Create reusable fallback panel component**

```tsx
// src/components/FeatureErrorPanel.tsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export interface FeatureErrorPanelProps {
  title: string;
  detail: string;
  cta?: string;
  onRetry?: () => void;
}

export default function FeatureErrorPanel({ title, detail, cta, onRetry }: FeatureErrorPanelProps) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="mt-1 text-red-600" />
        <div className="space-y-2">
          <h3 className="font-bold text-red-700 dark:text-red-300">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{detail}</p>
          {onRetry && cta ? (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-bold text-white hover:opacity-90"
            >
              {cta}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Keep `ErrorBoundary` scoped to unexpected runtime errors only**

```tsx
// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
            <AlertTriangle size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Something went wrong.</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {this.state.error?.message || 'Please reload this page.'}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-bold hover:opacity-90 transition-all"
          >
            <RefreshCw size={18} />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

- [ ] **Step 3: Commit component updates**

Run:
```bash
git add src/components/FeatureErrorPanel.tsx src/components/ErrorBoundary.tsx
git commit -m "feat: add feature-level reliability panel and simplify error boundary"
```

---

### Task 5: Make Contact resilient with typed status states

**Files:**
- Modify: `src/pages/Contact.tsx`

- [ ] **Step 1: Import reliability dependencies and state for structured error handling**

```tsx
// src/pages/Contact.tsx imports
import FeatureErrorPanel from '../components/FeatureErrorPanel';
import { toDisplayMessage } from '../lib/reliability/messages';
import { safeCreateDocument } from '../lib/reliability/firebaseOps';
import { ReliabilityError } from '../lib/reliability/types';
```

- [ ] **Step 2: Replace raw form status with explicit error object state**

```tsx
// src/pages/Contact.tsx (state)
const [submitError, setSubmitError] = useState<ReliabilityError | null>(null);
```

- [ ] **Step 3: Replace submit handler with safe submit path**

```tsx
// src/pages/Contact.tsx (submit)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validate()) return;

  setStatus('submitting');
  setSubmitError(null);

  const result = await safeCreateDocument(
    collection(db, 'contacts'),
    {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
      createdAt: serverTimestamp(),
    },
    'contacts',
  );

  if (!result.ok) {
    setStatus('error');
    setSubmitError(result.error);
    return;
  }

  setStatus('success');
  setFormData({ name: '', email: '', message: '' });
};
```

- [ ] **Step 4: Render recoverable failure panel with retry and preserved form values**

```tsx
// src/pages/Contact.tsx (inside form conditional)
if (status === 'error' && submitError) {
  const display = toDisplayMessage(submitError);
  return (
    <FeatureErrorPanel
      title={display.title}
      detail={display.detail}
      cta={display.cta}
      onRetry={() => {
        setStatus('idle');
        setSubmitError(null);
      }}
    />
  );
}
```

- [ ] **Step 5: Run compile check for Contact**

Run: `npm run lint -- src/pages/Contact.tsx`

- [ ] **Step 6: Commit Contact reliability updates**

Run:
```bash
git add src/pages/Contact.tsx
git commit -m "feat: make contact submission failure-safe"
```

---

### Task 6: Make Blog comments resilient with safe stream and submit wrappers

**Files:**
- Create: `src/hooks/useBlogComments.ts`
- Modify: `src/pages/Blog.tsx`

- [ ] **Step 1: Add comments hook with loading/error/data states**

```ts
// src/hooks/useBlogComments.ts
import { useEffect, useState } from 'react';
import { Query, collection, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { safeSubscribeSnapshot } from '../lib/reliability/firebaseOps';

export interface BlogComment {
  id: string;
  authorName: string;
  text: string;
  createdAt: { toDate: () => Date } | null;
}

export function useBlogComments(postId: string | null) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) {
      setComments([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const commentQuery = query(collection(db, `blog_posts/${postId}/comments`), orderBy('createdAt', 'desc'));
    const unsubscribe = safeSubscribeSnapshot<BlogComment>(
      commentQuery as Query,
      `blog_posts/${postId}/comments`,
      (items) => {
        setComments(items);
        setLoading(false);
      },
      (message) => {
        setError(message);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [postId]);

  return { comments, loading, error, setError };
}
```

- [ ] **Step 2: Replace blog page state with hook and error panel**

```tsx
// src/pages/Blog.tsx imports
import { useBlogComments } from '../hooks/useBlogComments';
import { safeCreateDocument } from '../lib/reliability/firebaseOps';
import FeatureErrorPanel from '../components/FeatureErrorPanel';
```

- [ ] **Step 3: Use resilient comment subscribe state path**

```tsx
// src/pages/Blog.tsx (hook usage)
const { comments, loading: commentsLoading, error: commentsError } = useBlogComments(selectedPost?.id ?? null);
```

- [ ] **Step 4: Replace comment submit with safe wrapper and retry text**

```tsx
// src/pages/Blog.tsx (handlePostComment)
const handlePostComment = async () => {
  const comment = newComment.trim();
  if (!comment || !user || !selectedPost) return;

  setIsSubmitting(true);

  const result = await safeCreateDocument(
    collection(db, `blog_posts/${selectedPost.id}/comments`),
    {
      postId: selectedPost.id,
      authorName: user.displayName || 'Anonymous',
      text: comment,
      createdAt: serverTimestamp(),
    },
    `blog_posts/${selectedPost.id}/comments`,
  );

  if (!result.ok) {
    setIsSubmitting(false);
    return;
  }

  setNewComment('');
  setIsSubmitting(false);
};
```

- [ ] **Step 5: Render list/loading/error states for comments section**

```tsx
// src/pages/Blog.tsx (comments list render)
{commentsLoading ? <p className="text-sm text-slate-500 italic">Loading comments…</p> : null}
{commentsError ? (
  <FeatureErrorPanel
    title="Comments unavailable"
    detail={commentsError}
    cta="Retry"
    onRetry={() => setSelectedPost(selectedPost ? { ...selectedPost } : null)}
  />
) : null}
{!commentsLoading && !commentsError && comments.length === 0 ? (
  <p className="text-center text-slate-500 italic py-4">No comments yet. Be the first to start the conversation.</p>
) : null}
```

- [ ] **Step 6: Commit Blog updates**

Run:
```bash
git add src/hooks/useBlogComments.ts src/pages/Blog.tsx
git commit -m "feat: harden blog comments with safe snapshot and submit"
```

---

### Task 7: Finalize reliability acceptance checks and docs

**Files:**
- Modify: `docs/05-repository-next-steps.md`

- [ ] **Step 1: Add smoke-check checklist for fail-open release validation**

```md
# Repository Next Steps

## Reliability smoke checks (post-change)
- Run `npm run check`.
- Verify `/`, `/experience`, `/projects` load with no Firebase path dependency.
- Simulate Firebase offline and confirm `/contact` shows actionable error, retains values, and allows retry.
- Simulate Firebase offline on `/blog`, open a post, and verify post body renders while comments show fallback.
- Confirm Google sign-in prompt path on `/blog` still works after retries.
- Confirm layout banner appears only as informative status and does not block routing.
```

- [ ] **Step 2: Commit documentation update**

Run:
```bash
git add docs/05-repository-next-steps.md
git commit -m "docs: add reliability validation checklist to repository next steps"
```

---

### Task 8: End-to-end verification and close plan execution

- [ ] **Step 1: Run full project check**

Run: `npm run check`
Expected: `tsc` and build both complete without errors from modified reliability paths.

- [ ] **Step 2: Run route-level manual verification list**

- Open `/`, `/experience`, `/projects`, `/blog`, `/contact` in normal mode and verify baseline UI still renders.
- Open `/contact`, submit form in offline mode, then retry.
- Open `/blog`, login flow, and comment post in offline/online transitions.
- Verify layout banner message updates when health probe indicates offline and dismissal still works.

- [ ] **Step 3: Finalize plan file commit**

Run:
```bash
git add docs/superpowers/plans/2026-06-05-portfolio-reliability-implementation-plan.md
git commit -m "docs: add portfolio reliability implementation plan"
```

---

### Self-review of this plan

- Every spec section maps to at least one task.
- No placeholders (`TBD`, `TODO`, `implement later`) exist.
- Error kinds used in steps stay consistent across `types.ts`, `messages.ts`, `Contact.tsx`, and `Blog.tsx`.
- Scope stays bounded to reliability and fail-open behavior across all routes, with no unrelated feature redesign.

