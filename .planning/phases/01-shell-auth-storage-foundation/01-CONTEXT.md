# Phase 1: Shell, Auth & Storage Foundation - Context

**Gathered:** 2026-05-22
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers the UI Shell (glassmorphism dark mode), client-side hash router, local storage database wrapper, and user session authentication (sign up, login, and profile/dashboard views).

</domain>

<decisions>
## Implementation Decisions

### Routing & Navigation
- **D-01:** Hash Routing. The application will use hash-based routing (e.g., `#login`, `#dashboard`) to guarantee compatibility with local file previews and simple Live Server environments without requiring backend rewrite configuration.
- **D-02:** Subtle Fade-in Transition. A smooth, premium 150ms opacity transition will be applied when switching views to provide a fluid, polished single-page application experience.
- **D-03:** Automatic Redirect Route Guard. If an unauthenticated guest tries to access the dashboard or any restricted view, they will be automatically redirected to `#login` and presented with a sleek toast notification.
- **D-04:** Declarative Route Mapping. Centralized routing mapping hash patterns to view renderers (e.g., matching `#login` or `#dashboard`), keeping route registration clean and isolated.

### Session Persistence (discretionary)
- **D-05:** Persistent Sessions. Keep user sessions logged in across browser refreshes and window closing using `localStorage`.

### UI Theme & Accent (discretionary)
- **D-06:** Sleek Minimal Dark Mode. A refined dark theme using clean HSL color tokens with professional glowing accents (e.g., Indigo/Violet) rather than overwhelming cyberpunk colors.

### Database Mocking (discretionary)
- **D-07:** Seed Data Pre-population. The local database module (`js/db.js`) will pre-populate with default mock data (questions, users, answers) if `localStorage` is empty, ensuring the app is immediately populated on first load.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Specifications
- [PROJECT.md](file:///C:/Users/Raksha/OneDrive/Desktop/sample%20Project/.planning/PROJECT.md) — Core constraints, stack details, and active requirements
- [REQUIREMENTS.md](file:///C:/Users/Raksha/OneDrive/Desktop/sample%20Project/.planning/REQUIREMENTS.md) — Detailed list of requirements (AUTH-01 through AUTH-04, USER-01, DESI-01)
- [ROADMAP.md](file:///C:/Users/Raksha/OneDrive/Desktop/sample%20Project/.planning/ROADMAP.md) — Goal, success criteria, and plans for Phase 1

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None. Greenfield project.

### Established Patterns
- None. First phase.

### Integration Points
- This phase establishes the initial file structure, including `index.html`, `index.css`, `app.js`, and `js/db.js`.

</code_context>

<specifics>
## Specific Ideas

- The dashboard should show basic stats: reputation, questions asked, answers provided.
- Dynamic toast notifications for redirects or errors.

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 1-Shell, Auth & Storage Foundation*
*Context gathered: 2026-05-22*
