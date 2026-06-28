# /a11y-audit — Accessibility compliance check

Audit changed files for WCAG 2.1 AA compliance. Batsignal is used by surgeons on phones and tablets between cases — often one-handed, often in low-light operating rooms, sometimes via voice assistant. Accessibility is a real usability requirement, not just a checkbox.

Run this before any UI-facing deploy.

---

## Step 1: Scan changed templates

Check all modified `.html` templates and `.js` components for:

### Images and icons
- [ ] All `<img>` tags have `alt` attributes (empty `alt=""` is OK for decorative)
- [ ] SVG icons used as buttons have `aria-label` or visible text
- [ ] Icon-only buttons (urgency badges, tier icons) have `title` or `aria-label`

### Forms and inputs
- [ ] All `<input>`, `<select>`, `<textarea>` have associated `<label>` or `aria-label`
- [ ] Required fields are marked with `aria-required="true"`
- [ ] Error messages are linked to inputs via `aria-describedby`
- [ ] CPSO number / phone number / facility selectors have accessible labels

### Interactive elements
- [ ] All clickable elements are `<button>` or `<a>`, not `<div onclick>`
- [ ] If `<div>` must be clickable: has `role="button"`, `tabindex="0"`, and keyboard handler (`onkeydown` for Enter/Space)
- [ ] Modals (match-accept reveal, abuse-cooldown override) trap focus and return focus on close
- [ ] Dropdowns are keyboard-navigable (Arrow keys, Escape to close)

### Semantic structure
- [ ] Heading hierarchy is correct (no skipping from `<h2>` to `<h4>`)
- [ ] Landmark regions present: `<main>`, `<nav>`, `<aside>`, `<header>`
- [ ] Signal feed is a `<ul>` or has `role="feed"` — not styled `<div>`s
- [ ] Tables (admin dashboard) have `<th>` with `scope` attributes
- [ ] Live regions use `aria-live="polite"` for async updates (HTMX swaps, new signals arriving)

### Color and contrast
- [ ] Text meets 4.5:1 contrast against background (3:1 for large text)
- [ ] **Urgency / tier never communicated by color alone** — always have a text label too
- [ ] Focus indicators visible (don't `outline: none` without replacement)
- [ ] Status badges (active / accepted / expired) have text labels, not just color

### Keyboard navigation
- [ ] Tab order follows visual order
- [ ] No keyboard traps
- [ ] Skip-to-content link at top of page
- [ ] All actions reachable without a pointer (post signal, accept match, dismiss notification)

---

## Step 2: HTMX patterns

HTMX swaps content dynamically — screen readers need to know:

- [ ] Swap targets have `aria-live="polite"` (or `"assertive"` for errors)
- [ ] Loading states announced: `aria-busy="true"` during swap
- [ ] After swap, focus moves to new content (or stays in logical position)
- [ ] `hx-indicator` spinners have `aria-label="Loading"`

The signal feed (where new signals appear via FCM-triggered HTMX refresh) is the highest-stakes live region. Announce additions politely; don't steal focus.

---

## Step 3: Vue component patterns

- [ ] Vue `v-if` / `v-show` toggles don't break focus management
- [ ] Dynamic content updates announce to screen readers (use `aria-live` on the surrounding container)
- [ ] Component refs respect ARIA contracts (e.g., a modal component sets `role="dialog"` and `aria-modal="true"`)

See `/vue-conventions` for the component patterns themselves.

---

## Step 4: Automated checks

If the dev server is running (`BATSIGNAL_DEV_MODE=true .venv/bin/uvicorn batsignal.api.main:app --reload`):

```bash
# Lighthouse accessibility audit (requires Chrome)
npx lighthouse http://localhost:8000 --only-categories=accessibility --output=json

# Or via Playwright + axe
.venv/bin/pytest tests/frontend/test_a11y.py -v
```

Per `/tdd`: if you're adding a UI feature, a Playwright test that asserts the feature is keyboard-reachable and labeled should be one of the failing tests you write first.

---

## Step 5: Report

| Area | Status | Issues |
|------|--------|--------|
| Images / icons | PASS/FAIL | missing alt/aria-label count |
| Forms / inputs | PASS/FAIL | unlabeled input count |
| Interactive elements | PASS/FAIL | non-semantic clickable count |
| Semantic structure | PASS/FAIL | heading/landmark issues |
| Color / contrast | PASS/WARN | contrast ratio issues |
| Keyboard navigation | PASS/FAIL | traps or unreachable elements |
| HTMX live regions | PASS/FAIL | unannounced swaps |
| Lighthouse score | N/100 | (if automated check ran) |

**Target: Lighthouse accessibility score > 90.**

---

## Common fixes

| Problem | Fix |
|---------|-----|
| Icon button no label | Add `aria-label="Description"` |
| `<div onclick>` | Change to `<button>` or add `role="button" tabindex="0"` + keydown |
| Missing form label | Add `<label for="id">` or `aria-label` |
| HTMX swap not announced | Add `aria-live="polite"` to the swap target |
| Color-only urgency | Add text label or icon alongside color |
| Focus lost after match-accept modal close | `triggerElement.focus()` on close |
| Heading skip | Fix hierarchy (`h1` → `h2` → `h3`, no gaps) |

---

## Real-world context (surgical mobile use)

Batsignal users are:
- On phones and tablets, often one-handed
- In bright operating rooms with reflective glare → contrast matters more than usual
- Possibly gloved → larger touch targets (minimum 44×44 pt)
- Using voice control intermittently (Siri/Google Assistant in low-touch environments) → semantic HTML lets them dictate "tap accept"
- Often in low-light pre-op rooms → respect `prefers-color-scheme: dark` if implemented

These aren't edge cases — they're the primary use environment.
