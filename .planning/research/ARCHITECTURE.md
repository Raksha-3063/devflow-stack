# Architecture Research

**Domain:** Public Developer Q&A Community
**Researched:** 2026-05-22
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      UI View Components                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Dashboard│  │ AuthView│  │DetailView│  │Profile  │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                 SPA Hash Router & controller                 │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                    App Controller                   │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                 Database & Storage Service                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ LocalDB  │  │ Session  │  │ Markdown │                   │
│  │ (Store)  │  │ (Auth)   │  │ (Parser) │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| App Controller | Intercepts hash changes, orchestrates views loading, maintains global state | `app.js` bootstrapper and route mapping. |
| Views (`views/`) | Renders page-specific markup, binds user actions (clicks, inputs) | Functions returning compiled template literals. |
| LocalDB | Interface to localStorage, manages DB queries (select, insert, update) | `db.js` file with CRUD operations. |
| Markdown Parser | Compiles markdown fields into secure, highlighted HTML | `utils.js` wrapping Marked, DOMPurify, Highlight. |

## Recommended Project Structure

```
/
├── index.html                  # Shell layout container (Navbar, Sidebar, main view mount)
├── index.css                   # Core CSS stylesheet containing theme variables, styles, glassmorphism rules
├── app.js                      # Application main entry point, router, routing config
└── js/
    ├── db.js                   # LocalStorage database driver (CRUD for users, questions, answers, comments)
    ├── components.js           # Shared markup templates (Header, Sidebar, cards, loader)
    ├── utils.js                # Utilities (Marked.js markdown parser config, DOMPurify sanitizer)
    └── views/                  # UI view rendering controllers
        ├── dashboard.js        # Dashboard, question lists, search results
        ├── auth.js             # Sign up & login screens
        ├── question.js         # Question details, answer form, comments list
        └── profile.js          # User details and user activity logs
```

### Structure Rationale

- **Root files (`index.html`, `index.css`, `app.js`):** Acts as the shell layout that remains static, ensuring fast routing transitions without full-page reloads.
- **`js/db.js`:** Isolates localStorage queries. This makes it trivial to replace the database driver with a server-based REST API in future milestones.
- **`js/views/`:** Modularizes code logic per route, preventing a single giant JS file.

## Architectural Patterns

### Pattern 1: Hash-Based Client Routing

**What:** Router listens to `hashchange` events and replaces the `#main-content` innerHTML.
**When to use:** Frontend SPA designs without a server router.
**Trade-offs:** Fast transitions, but SEO search indexers don't crawl hashed paths by default (fine for this MVP clone).

### Pattern 2: Component View Factories

**What:** Views are functional modules that accept route parameters and state, returning dynamic HTML.
**When to use:** Building interactive vanilla applications without bulky framework state hooks.

## Data Flow

### Request Flow

```
[User Action (e.g. click upvote)]
    ↓
[View Event Listener] → [db.js update action] → [localStorage sync]
    ↓
[State Update Notification] → [Re-render View Section]
```

### Key Data Flows

1. **Routing Flow:** URL Hash changes -> Router matches pattern -> Clears viewport -> Calls view render function -> Injecting elements into DOM -> Binds view events.
2. **Q&A Submission:** User enters markdown text -> Input validated -> Sanitized via DOMPurify -> Parsed with Marked -> Stored in LocalDB -> Refreshed details view.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 1 user (Local testing) | LocalStorage acts as local DB. Perfect, zero-config. |
| 1k users (Beta testing) | Migrate `db.js` methods to call an external JSON database API. |
| 100k+ users | Scale to relational Database (PostgreSQL) and implement index strategies on questions/tags. |

## Anti-Patterns

### Anti-Pattern 1: Directly writing unverified user inputs to DOM

**What people do:** Append input text directly via `element.innerHTML = body`.
**Why it's wrong:** Leads to direct Cross-Site Scripting (XSS) attacks.
**Do this instead:** Always pass markdown strings through `DOMPurify.sanitize(marked.parse(text))`.

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Views ↔ DB | Direct functional calls | The views must never directly call `localStorage.setItem`; they must route queries through `db.js` abstraction layers. |

## Sources

- Single Page Application Routing Patterns
- Mozilla Developer Network: Client-side storage and DOM Security

---
*Architecture research for: DevFlow*
*Researched: 2026-05-22*
