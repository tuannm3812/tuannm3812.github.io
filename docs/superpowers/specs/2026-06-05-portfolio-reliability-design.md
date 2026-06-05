# Portfolio Reliability Design

Date: 2026-06-05
Status: Draft for review
Topic: Full-portfolio reliability hardening (fail-open behavior)

## 1) Goals and constraints

### Goals
- Improve reliability across all routes (`/`, `/experience`, `/projects`, `/blog`, `/contact`) without reducing existing visual identity.
- Preserve fail-open behavior: static content must remain usable when Firebase is unavailable.
- Prevent Firebase/Firestore/auth errors from crashing page rendering.
- Improve user feedback for expected failure modes (offline, permission, auth-required, unknown).
- Keep changes scoped to portfolio reliability and avoid unrelated feature work.

### Non-goals
- No redesign of visual style.
- No authentication redesign beyond current Google login workflow.
- No backend migrations or Firestore schema changes in this pass.

### Constraints
- Keep current data sources (`src/data/resume.ts`, `src/data/blog.ts`) for static content.
- Keep route-first UX and existing Motion-based transitions.
- Avoid heavy dependency additions unless required.

## 2) Current-state summary

### What is currently brittle
- `handleFirestoreError` throws inside utility, which can bubble into rendering paths.
- Blog and Contact pages directly call Firebase operations without stable loading/error state boundaries.
- Firebase availability is sampled as a delayed one-time check in layout (`isFirebaseOffline`) rather than app-wide reactive state.
- Blog comments list can fail silently (failure path exists but no explicit user-facing state).
- Contact submit failure only sets local status, with limited diagnostic control.

### Reliability impact surface
- `/contact` form submission
- `/blog`: auth state subscription, comments subscription, comment posting
- `/` and `/projects` currently mostly static, but they still depend on `Layout` behavior and should gracefully degrade if dynamic systems fail
- Global shell (`Layout`) should keep navigation/branding functional during service degradation

## 3) Proposed architecture

### Option selected: reliability boundary + service layer (option B)

Create a small reliability layer to centralize guard rails while leaving UI structure intact.

#### New reliability modules
1. `src/lib/reliability/firestoreOps.ts`
   - Safe wrapper functions for read/list/create operations.
   - Return `Result` shape: `{ ok: true, data }` or `{ ok: false, error }`.
   - Convert low-level exceptions into domain error classes/messages (`OfflineError`, `PermissionError`, `AuthError`, `ValidationError`, `UnknownError`).

2. `src/lib/reliability/firebaseHealth.ts`
   - Expose hook/state function returning health for the app runtime (`isReady`, `isOffline`, `lastErrorAt`, `checkNow`).
   - Drive layout banner and page feature toggles.
   - Continue using current connectivity probe approach but as a reusable state source.

3. `src/lib/reliability/messages.ts`
   - Centralized user-facing copy mapping per error domain.

#### UI boundary model
- `src/components/FirebaseSectionBoundary.tsx` (or equivalent feature container)
  - Captures and renders fallback UI for feature failures in Contact and Blog.
  - Keeps failures scoped to section, not whole route.
- `Layout` uses health status for banner only and never blocks route rendering.

## 4) Data flow and behavior

### Contact page
- `validate` remains local and synchronous.
- `onSubmit` calls `safeCreate` through the wrapper.
- State transitions:
  - `idle` -> `submitting` -> `success` OR `error`.
  - On `success`, clear form and render confirmation.
  - On `error`:
    - if offline: show retry button and keep values.
    - if auth/permission: show specific help text.
    - unknown: show generic recoverable error with retry option.
- Offline and transient failure handling is explicit; no route crashes.

### Blog page
- Post list remains static and deterministic from local data.
- Selected post and comments become dynamic feature zone:
  - show loading state when opening a post and before first snapshot event,
  - show explicit empty-state when no comments,
  - on comments subscription failure, show reasoned fallback message and allow read-only post viewing,
  - disable comment submission if auth is required or submission fails.

### Global shell and static routes
- `isFirebaseOffline` should be sourced from a reactive health state, not a one-shot flag.
- `Layout` continues to render fully and does not depend on Firebase health for navigation.
- All static pages remain fully rendered when dynamic features are unavailable.

## 5) Error handling strategy

### Principles
- Fail-open by default: recoverable Firebase failures degrade only the affected dynamic feature.
- No unhandled Firebase exceptions in render paths.
- Consistent user wording for similar failure classes.

### Contract
- `safeCreate` / `safeRead` return typed failure object instead of throwing.
- `handleFirestoreError` logs full diagnostic context but does not throw into UI.
- `ErrorBoundary` remains as crash guard for non-expected runtime exceptions, but expected service failures are now contained in feature-level states.

## 6) Route-level implementation plan summary

### Route: `/contact`
- Replace direct `addDoc` call with reliability wrapper.
- Add error-result interpretation and retry path.
- Improve user messaging on failure while preserving current fields/buttons.

### Route: `/blog`
- Wrap comments/listeners into a guarded boundary section.
- Handle auth and comments errors with explicit UI states.
- Ensure auth state listener and comment subscription cleanup remain unchanged semantically.

### Route: `/`
- No structural changes; rely on health banner from reactive state.

### Route: `/experience`, `/projects`
- No structural changes; confirm no hard dependency on Firebase for rendering.

### Shared shell
- Move Firebase health read toward single source that updates reactively.
- Ensure banner is informative and non-blocking.

## 7) Operational checks and acceptance criteria

### Acceptance criteria
- With Firebase offline:
  - Home/Experience/Projects render fully with static data.
  - Contact page shows explanatory status and preserves input while allowing retry.
  - Blog post detail and comments still show post body; comments section degrades to fallback message or read-only state.
- With auth denied:
  - Contact submission indicates permission/identity constraint clearly.
  - Blog comment form prompts sign-in and does not crash.
- With transient network failure:
  - Failed submission sets `error` state and offers retry action.
- Overall app remains route-stable (no full-route blank states from Firebase exceptions).

## 8) Risks and open decisions

- Exact wording for each error state will be finalized with your preferred tone in the implementation stage.
- Whether to cache read failures across route navigation is deferred to future iteration; default is immediate re-fetch on mount/change.
- Keeping one-shot connectivity tests in Firebase config as-is or migrating to a dedicated probe function is a practical follow-up decision; this design uses a wrapper-managed check without changing Firestore init path.

## 9) Spec consistency checks

- No unresolved placeholders (`TBD`, `TODO`) remain.
- No conflicting requirements; all sections target fail-open behavior.
- Scope is bounded to reliability of existing portfolio routes and Firebase-dependent flows.
- The design covers architecture, component boundaries, data flow, error handling, and acceptance criteria.
