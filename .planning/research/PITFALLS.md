# Pitfalls Research

**Domain:** Public Developer Q&A Community
**Researched:** 2026-05-22
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Cross-Site Scripting (XSS) via User Markdown

**What goes wrong:**
Users write custom HTML inside question or answer descriptions (e.g. `<script>alert('xss')</script>` or `<img src=x onerror=alert(1)>`) which gets executed when other users view the post.

**Why it happens:**
Marked.js parses markdown strings but does not strip dangerous HTML nodes by default.

**How to avoid:**
Configure a sanitation hook using DOMPurify immediately after compiling markdown to HTML:
`const cleanHTML = DOMPurify.sanitize(marked.parse(rawMarkdown))`

**Warning signs:**
Check if raw script tags render in test comments.

**Phase to address:**
Phase 1 (Q&A Core)

---

### Pitfall 2: LocalStorage Quota Exceeded

**What goes wrong:**
Adding many questions, answers, comments, or base64 avatars exceeds the browser's localStorage capacity (usually ~5MB) throwing a `QuotaExceededError`.

**Why it happens:**
Excessive storing of long-form code blocks or images without size limits.

**How to avoid:**
1. Limit avatar sizes to lightweight URL strings (or use initials).
2. Set a maximum character limit (e.g., 5000 chars) on post text.
3. Catch writing operations in a try/catch block and handle storage errors gracefully.

**Warning signs:**
Errors in console when inserting large text payloads.

**Phase to address:**
Phase 1 (Core Storage initialization)

---

### Pitfall 3: Stale Event Listeners & Memory Leaks in SPA

**What goes wrong:**
Changing routes appends event listeners to `window` or existing layout containers repeatedly. These pile up, resulting in memory leaks and multiple duplicate submissions on form submit.

**Why it happens:**
Views bind event listeners globally without tearing them down when views are unmounted.

**How to avoid:**
1. Use event delegation at the layout level (`index.html` main element) where possible.
2. Clean up views by removing custom route-level listeners when changing hash routes.

**Warning signs:**
Console logs trigger multiple times from a single button click after switching pages a few times.

**Phase to address:**
Phase 1 (SPA Router setup)

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| LocalStorage DB | Quick to build, zero setup | Must be rewritten completely for multiplayer/web deploy | Acceptable for initial v1 prototype only. |
| In-memory state tracking | Simplified state updates | Refreshing the page wipes unsaved changes | Acceptable for non-crucial user preferences. |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Inline Markdown compilation on render | Typing lag in the text area | Debounce compiling preview or parse only on preview tab toggle | Breaks on very long question bodies. |
| Linear search on all posts | Search page becomes sluggish | Index tags and match keyword query linearly (fast for <1000 items) | Breaks at >2000 total posts. |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Storing passwords in plain-text in LocalDB | User accounts easily read in browser storage console | Hash password string locally using a quick SHA-256 algorithm or simple salt before storing in LocalDB. |
| Client-side session spoofing | Any user can spoof another user's session in console | Validate current user ID existence and match it on edit/delete actions. |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Code blocks breaking horizontal layout | Text overflowing offscreen, destroying readability | Apply `overflow-x: auto` and word-wrap rules on code segments. |
| Missing success/error feedback on submission | User clicks "Submit" repeatedly, adding duplicate answers | Disable submit button immediately upon click and show a premium loading indicator. |

## "Looks Done But Isn't" Checklist

- [ ] **Markdown Editor:** Often missing syntax highlighting on code blocks — verify Highlight.js class bindings are correct.
- [ ] **Voting system:** Clicking upvote multiple times multiplies votes — verify clicking again toggles/cancels the vote.
- [ ] **Tags Input:** Multi-word tags breaking searches — verify tags are lowercase and stripped of space.

---
*Pitfalls research for: DevFlow*
*Researched: 2026-05-22*
