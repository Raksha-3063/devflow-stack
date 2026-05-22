# Roadmap: DevFlow

## Overview

DevFlow is structured as a Vertical MVP built slice-by-slice. The project spans 3 phases, starting with the Shell, Auth, and Storage foundation, progressing through the core Question & Answer engine, and concluding with social interactions (voting, reputation) and search capabilities.

## Phases

- [ ] **Phase 1: Shell, Auth & Storage Foundation** - Layout shell, client-side routing, LocalDB setup, and user authentication
- [ ] **Phase 2: Q&A Engine & Markdown Compiler** - Question and answer creation, comments, and markdown parsing with syntax highlighting
- [ ] **Phase 3: Social Interactions & Search** - Voting, reputation points, tag sorting, and keyword search

## Phase Details

### Phase 1: Shell, Auth & Storage Foundation
**Goal:** Setup basic layout (glassmorphism developer dashboard UI shell), localStorage database layer, client-side SPA routing, and user session auth (sign up, login, dashboard view).
**Mode:** mvp
**Depends on:** Nothing (first phase)
**Requirements:** [AUTH-01, AUTH-02, AUTH-03, AUTH-04, USER-01, DESI-01]
**Success Criteria** (what must be TRUE):
  1. User can sign up, log in, view their dashboard (with stats and empty activity), and log out.
  2. The application visual layout implements a high-quality glassmorphism dark-mode developer theme.
  3. Clicking back/forward/navigation links updates page content instantly without page reloads using a client router.
**Plans:** 2 plans

Plans:
- [ ] 01-01: Setup UI shell, LocalDB, and router
- [ ] 01-02: Implement authentication views and profile page

### Phase 2: Q&A Engine & Markdown Compiler
**Goal:** Enable question submission with markdown preview, details page showing responses, and posting answers/comments.
**Mode:** mvp
**Depends on:** Phase 1
**Requirements:** [POST-01, POST-02, ANSW-01, ANSW-02, COMM-01]
**Success Criteria** (what must be TRUE):
  1. User can write a question with a markdown body and preview it with syntax-highlighted code.
  2. Question details view displays the question, answers list, and comment thread.
  3. User can edit/delete their own questions and answers.
**Plans:** 2 plans

Plans:
- [ ] 02-01: Implement question creation and detail view
- [ ] 02-02: Implement answering and commenting with markdown parser

### Phase 3: Social Interactions & Search
**Goal:** Implement upvoting/downvoting on posts, reputation computation, tag filters, and search capabilities.
**Mode:** mvp
**Depends on:** Phase 2
**Requirements:** [VOTE-01, SEAR-01]
**Success Criteria** (what must be TRUE):
  1. User can upvote/downvote any question/answer, which dynamically recalculates the post's vote count and the owner's reputation score.
  2. User can search questions using keywords or by clicking on specific tag elements.
**Plans:** 2 plans

Plans:
- [ ] 03-01: Implement voting mechanics and reputation rules
- [ ] 03-02: Implement keyword and tag search index

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Shell, Auth & Storage Foundation | 0/2 | Not started | - |
| 2. Q&A Engine & Markdown Compiler | 0/2 | Not started | - |
| 3. Social Interactions & Search | 0/2 | Not started | - |
