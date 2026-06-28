# /standalone-html — Isolate & iterate on a UI problem

# Usage
# /standalone-html <description of the UI problem to solve>
# Example: /standalone-html signal feed scroll behavior on iOS Safari
# Example: /standalone-html match-accept modal z-index stacking with bottom nav
#
# Create a standalone HTML file that reproduces the exact layout problem in
# isolation — no app dependencies, no caching issues, no framework overhead.
# Iterate until the CSS/JS solution works, then port the fix back.

You are solving a UI/CSS/layout problem by building it in isolation first.

---

## Step 1: Create the sandbox

Create a standalone HTML file at `frontend/static/sandbox-<name>.html` that:

- Reproduces the **exact parent chain** from the real app (flexbox nesting, overflow, heights)
- Uses inline `<style>` and `<script>` — zero external dependencies (no Vue, no HTMX, no Tailwind CDN unless the problem is Tailwind-specific)
- Includes realistic content (many signals, long facility names) to trigger real scroll/overflow behavior
- Has a toggle button to switch between the two states (modal open/closed, panel expanded/collapsed, etc.)
- Self-contained — opens directly in a browser

Tell the user to open it at `http://localhost:8000/static/sandbox-<name>.html` (with the dev server running: `BATSIGNAL_DEV_MODE=true .venv/bin/uvicorn batsignal.api.main:app --reload`).

---

## Step 2: Iterate in the sandbox

Fix the layout problem. Test both states:

- State A (e.g., modal closed): scroll/layout correct?
- State B (e.g., modal open): scroll/layout correct?
- Transitions: does toggling work cleanly?

Key CSS debugging principles:
- `overflow-y:auto` only scrolls when the element has a **constrained height** (explicit height, max-height, or flex with `min-height:0`)
- `position:sticky` breaks if ANY ancestor between it and the scroll container has `overflow` other than `visible`
- `flex:1` only works when the parent is a flex container
- `min-height:0` is required on flex children that need to shrink below content size
- iOS Safari `overflow-y:auto` needs `-webkit-overflow-scrolling: touch` for momentum scroll on older versions

---

## Step 3: Port back to the app

Once the sandbox works, identify the **minimal** CSS/style changes and apply them to:

1. **Vue component** (`SignalCard.js`, `MatchAcceptModal.js`, etc.) — the primary renderer
2. **Jinja2 partial** (`_signal_feed_items.html`, etc.) — server-rendered / HTMX-swapped renderer (must produce identical structure)
3. **Stylesheet** (`frontend/static/css/app.css` or equivalent) — if class-based
4. **Inline `:style` bindings** — if state-conditional

**CRITICAL before porting:** Grep existing stylesheets for rules targeting the same element IDs or classes. Global CSS rules (`#signal-feed { overflow:hidden; flex:1; }`) apply in ALL states and silently break conditional layouts. Either remove them or ensure your `:style` bindings override them. Prefer Vue `:style` over CSS classes for state-conditional layouts — one source of truth.

If the change touches both Vue and Jinja2 renderings of the same content, update both at once.

---

## Step 4: Clean up

Delete the sandbox file after the fix is confirmed working in the real app.

```bash
rm frontend/static/sandbox-<name>.html
```

Do not commit sandbox files. Add `frontend/static/sandbox-*.html` to `.gitignore` if it's not already there.

---

## Step 5: Tests

Per `/tdd`: if the bug was reproducible in the real app, write a Playwright test that exercises the broken flow before deleting the sandbox. The test fails on the bug, passes after the fix, prevents regression.

```python
# tests/frontend/test_signal_feed_scroll.py
def test_signal_feed_scrolls_with_50_items(authed_page):
    authed_page.goto("/feed")
    # seed 50 signals via test fixture
    authed_page.evaluate("...")
    feed = authed_page.locator("#signal-feed-items")
    # scroll to bottom — last item should be visible
    feed.evaluate("el => el.scrollTo(0, el.scrollHeight)")
    expect(feed.locator("article").last).to_be_visible()
```

---

## Rules

- **Never guess at CSS fixes in the real app.** Prove them in the sandbox first.
- **Match the real DOM nesting exactly.** Same parent chain (flex containers, overflow, heights) or the fix won't transfer.
- **Include enough content to overflow.** Short placeholder text won't trigger scroll issues.
- **Test both states.** Fix must work in all toggle states, not just the broken one.
- **iOS Safari specifically.** Many batsignal users are on iPhones — test mobile Safari, not just desktop Chrome.
