<!-- GSD:project-start source:PROJECT.md -->

## Project

**DevFlow**

DevFlow is a public developer community platform for asking and answering programming questions. It is designed specifically for developers to share knowledge, collaborate, and solve technical challenges in a sleek, modern user interface.

**Core Value:** To provide an intuitive, high-readability Q&A environment where developers can find and share solutions quickly and effortlessly.

### Constraints

- **Tech Stack**: Vanilla HTML/JS for clean execution, and Vanilla CSS for layout and aesthetics.
- **Styling**: Sleek dark mode by default with HSL colors and glassmorphism rules.
- **State/Database**: Client-side localStorage for initial data persistence, allowing immediate local run and testability.

<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->

## Technology Stack

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | Standard | Application structure | Native browser structure, lightweight, and SEO-friendly semantic tags. |
| CSS3 | Standard | Layout & Premium styling | Flexbox/Grid for layouts, HSL variables for dark mode, glassmorphism, and smooth micro-animations. |
| ES6+ JavaScript | Standard | SPA Routing & App Logic | Pure client-side reactivity, localStorage DB adapter, state management. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Outfit & Inter | Google Fonts | Modern Typography | Visual styling of all text to feel premium and sleek. |
| FontAwesome | 6.x (CDN) | Modern Icons | Icons for navigation, voting, views, and action buttons. |
| DOMPurify | 3.x (CDN) | Input Sanitization | Sanitize markdown output before rendering to prevent XSS. |
| Marked.js | 4.x (CDN) | Markdown Parsing | Convert rich-text/markdown questions and answers into HTML format. |
| Highlight.js | 11.x (CDN) | Syntax Highlighting | Code highlighting inside code blocks within questions and answers. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Live Server / Vite | Local dev server | Fast feedback loops and hot-reloading. |
| browser-test / Chrome DevTools | Debugging client-side state | Check localStorage, console warnings, and CSS layout behavior. |

## Installation

- DOMPurify: `https://cdnjs.cloudflare.com/ajax/libs/dompurify/3.0.9/purify.min.js`
- Marked.js: `https://cdn.jsdelivr.net/npm/marked/marked.min.js`
- Highlight.js: `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js`
- Highlight.js Theme (Atom One Dark): `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css`

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Vanilla HTML/JS | React / Next.js | If building a large production platform with millions of users and server-side SSR needs. |
| localStorage | Firebase Firestore | For real-time multi-user synchronization. In v1 we keep it local for instant validation. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| TailwindCSS | Restricts vanilla CSS freedom in complex glassmorphism styling | Custom HSL vanilla CSS styling |
| raw `innerHTML` | Extreme XSS vulnerability in developer posts with code snippets | DOMPurify sanitization |

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Marked.js @ 4.x | Highlight.js @ 11.x | Configured in parser settings to handle auto-highlighting of code chunks. |

## Sources

- MDN Web Docs — HTML/CSS/JS features
- DOMPurify Security Guidance
- Highlight.js configuration documentation

<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->

## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->

## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->

## Project Skills

No project skills found. Add skills to any of: `.agent/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->

## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:

- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->

## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
