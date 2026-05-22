# Walking Skeleton — DevFlow

**Phase:** 1
**Generated:** 2026-05-22

## Capability Proven End-to-End

A user can sign up with an email and password, log in, maintain their authenticated session, view their dashboard with pre-seeded developer activity stats, and log out.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Vanilla HTML5 / ES6+ JavaScript SPA | Matches project guidelines to avoid framework bloat and keep UI response times under 150ms. |
| Data layer | localStorage-based JSON database wrapper (`js/db.js`) | Enables zero-setup local storage database support for user data, questions, and replies. |
| Auth | Local Storage session persistence (`devflow_session` key) | Lightweight local session management matching local environment previews. |
| Deployment target | Local Live Server / static local web dev server | Lightweight, offline-capable verification. |
| Directory layout | Root-level SPA scaffolding with `js/` subdirectories | Standard structure partitioning rendering view files from core database and router handlers. |

## Stack Touched in Phase 1

- [x] Project scaffold (Root index.html, index.css, and app.js with vanilla asset mapping)
- [x] Routing — Hash-based routing (#login, #signup, #dashboard) with route guards redirecting guests to login
- [x] Database — Creating collections, inserting users (write), loading sessions (read), and pre-seeding mock data
- [x] UI — Interactive form submittals (sign up, login), toast indicators, profile stats display, and log out buttons
- [x] Deployment — Running local preview command (using node static server, e.g. `npx -y http-server` or similar)

## Out of Scope (Deferred to Later Slices)

- Questions asking, body input, and list displays (Phase 2)
- Answer submissions, markdown rendering, and code highlighting (Phase 2)
- Flat commenting stream on posts (Phase 2)
- Upvoting/downvoting mechanics and user reputation metrics updating (Phase 3)
- Keyword search and tag-based categorization (Phase 3)

## Subsequent Slice Plan

Each later phase adds one vertical slice on top of this skeleton without altering its architectural decisions:

- Phase 2: Q&A Engine & Markdown Compiler (Writing questions and answers, rendering syntax highlighting)
- Phase 3: Social Interactions & Search (Upvoting/downvoting, reputation score, and keyword/tag search filters)
