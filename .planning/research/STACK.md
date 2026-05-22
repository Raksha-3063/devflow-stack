# Stack Research

**Domain:** Public Developer Q&A Community
**Researched:** 2026-05-22
**Confidence:** HIGH

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

This is a CDN-driven vanilla web application designed for zero-install, zero-build execution, running directly in the browser for maximum portability and speed.

Dependencies used via secure CDNs:
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

---
*Stack research for: DevFlow*
*Researched: 2026-05-22*
