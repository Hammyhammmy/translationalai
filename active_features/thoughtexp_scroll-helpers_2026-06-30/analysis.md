# Thought experiment — scroll helpers for the long molecular-targets pages (2026-06-30)

Receipts: [demo.html](demo.html) — a working page that stacks all three helpers so you scroll and feel them
(`localhost:8001/active_features/thoughtexp_scroll-helpers_2026-06-30/demo.html`).

## The decision
The two molecular-targets pages are long (transporters ~793 lines / 8 panels; drug-targets 57 cards). What
scroll helpers earn their place — and where do they live (shared `nav.js` vs per-page)?

Asymmetry that drives it: **drug-targets already has a sticky in-page nav** (MoA Atlas: frames 1–5 + filter).
**transporters has none** — once you scroll past the non-sticky series ribbon, there is zero persistent nav.

## Options (escalating packages — A ⊂ B ⊂ C)
- **A — Back-to-top only.** A floating ↑ button (bottom-right) that fades in after ~320px, in shared `nav.js`
  so both pages get it. Solves the literal ask, nothing else.
- **B — A + scroll-progress bar.** Add a thin 3px gradient bar at the very top tracking read position. Also in
  `nav.js`; both pages. Tells you "how much is left" on a long scroll.
- **C — B + persistent section nav.** Make the series ribbon **sticky** and add **section jumps with scroll-spy**
  (active section highlights as you scroll). transporters gets its 3 sections (engine / two-worlds / no-lumen);
  drug-targets already has its frame nav, so it keeps that and just gains the FAB + progress.

## Pros / cons

### A — Back-to-top
- ✓ Universal, expected, ~15 lines; one button, no layout risk.
- ✓ Lives in `nav.js` → both pages, zero per-page edits.
- ✗ Doesn't help you *get somewhere specific* — only back to the top. On a 57-card page you still hunt.
- ✗ transporters still has no way to jump between its three sections.

### B — + progress bar
- ✓ Cheap (a fixed div + one scroll handler already running for the FAB).
- ✓ Real "how far am I" signal on a tall page; pairs naturally with back-to-top.
- ✗ Mild visual noise at the very top; must not collide with drug-targets' sticky nav (it sits above it, fine).
- ✗ Still no jump-to-section for transporters.

### C — + sticky section nav + scroll-spy
- ✓ The actual fix for "long page" — you can jump to any section and always see where you are.
- ✓ Fixes transporters' real gap (no persistent nav at all today).
- ✓ Scroll-spy (active highlight) is the single most "premium" long-doc feel.
- ✗ Most work + the most layout risk: making the series ribbon sticky re-opens the double-sticky issue on
  drug-targets (its own MoA nav is already sticky) — needs care (only sticky where there isn't already one, or
  offset). The series ribbon was deliberately made non-sticky earlier.
- ✗ Section list must be authored per page (transporters' 3 sections); a 4th helper to keep in sync.

## Fit check
- **Use:** someone studying a long reference, scrolling, wanting to (a) get back up fast and (b) jump to a topic.
  (a) = back-to-top; (b) = section nav. Both are real for these page lengths.
- **Authoring/maintenance:** A ≈ 15 lines in nav.js; B ≈ +8 lines; C ≈ +sticky logic + per-page section lists +
  scroll-spy (~an hour, and the double-sticky care on drug-targets).
- **Pivot cost:** A/B are pure additions to `nav.js`, nothing undone. C revisits the (just-made) non-sticky
  ribbon decision for transporters only — drug-targets keeps its existing nav.
- **Reversible?** Fully; each helper is independent and removable.

## Recommendation — **B now (back-to-top + progress, in nav.js), and C only for transporters**
1. Back-to-top + progress are universal, cheap, and live entirely in the shared `nav.js` — both pages benefit with
   no per-page work and no layout risk; that covers the literal ask plus the "how far am I" signal.
2. The section-nav (C) is genuinely worth it **only where it's missing** — transporters. drug-targets already has
   a sticky frame nav, so adding a second one there is redundant; it just gets the FAB + progress. So: B for both,
   and make transporters' series ribbon sticky with its 3 section jumps + scroll-spy.

Strongest argument against: "just do full C everywhere for consistency." It doesn't dominate because drug-targets
would then have two sticky navs doing the same job — the asymmetry is real, so the helpers should be too.

## Open questions to lock before code moves
1. **How far do we go?** (a) just a back-to-top button; (b) + a thin progress bar at the top; (c) + a sticky
   section-jump bar that highlights where you are. *My default: (b) for both pages, plus (c)'s section nav only on
   transporters (the page that has none today).*
2. **Back-to-top style:** a round floating button bottom-right (as in the demo), or a smaller text "↑ top" tucked
   into the ribbon? *My default: the round floating button — it's the conventional, thumb-reachable one on mobile.*
