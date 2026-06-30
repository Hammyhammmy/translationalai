# Thought experiment — A "Hardware" section (urological devices)

**Date:** 2026-06-29
**Decision:** Should the Interactive model gain a section covering urological devices
(ureteric/JJ stents, urethral & suprapubic catheters, 3-way catheters, nephrostomy
tubes, ileal conduit / urostomy, neobladder…), and how should it be structured?

Mockup: [gallery.html](gallery.html)

## Is it a good idea? Yes — and it fits the site's frame.
Devices are a huge part of what PAs/students actually handle on the wards (managing
catheters, stents, nephrostomies, urostomy bags) and are chronically under-taught.
Crucially they fit "Clinical Geometry": **each device sits at a station on the tract
and bypasses or drains a specific failure** — a JJ stent splints the ureter past a
stone; a nephrostomy diverts *above* an obstruction; a Foley drains the bladder via
the outlet; a suprapubic enters above the pubis; an ileal conduit bypasses the
bladder entirely. That geometry is exactly what the existing figure already shows.

## Options
- **A — Dedicated "Hardware" tab** (peer of the other six). A device catalog; each
  device a card with placement-on-the-tract, indications, how it works, complications,
  and a patient "In plain words" block. Mirrors the existing tab pattern.
- **B — Distribute devices inline** into the conditions/presentations that use them
  (stent under ureteric stone, Foley under retention…), no standalone home.
- **C — Lightweight reference** — a flat glossary of device cards with no figure /
  geometry integration (simpler than a full tab).

## Pros / cons
### A — dedicated tab
+ Gives a high-frequency, ward-relevant topic a findable home (and a search target).
+ On-brand: device placement reuses the existing tract figure as an overlay (like the trauma overlay already does), so "where it sits / what it bypasses" is shown, not just told.
+ Reuses every pattern already shipped: tab scaffold, nav-list, `prose()`, the patient "In plain words" card, the search index.
+ Natural cross-links: a device card links to the condition it treats, and vice-versa (stent ↔ ureteric stone).
+ Patients live with these devices — a copy-pasteable patient block per device is genuinely useful (catheter care, when to seek help).
- Most build of the three: new data module + render function + figure-overlay code + nav branch + tab button + search wiring.
- Devices are cross-cutting, so some duplication with conditions (the stent is mentioned in renal colic too) — needs cross-links to avoid feeling redundant.

### B — distribute inline
+ Cheapest; zero new tab scaffolding; each device appears exactly where it's clinically used.
- No home: a student wanting "how do I look after a nephrostomy" has nowhere to go; it's scattered across conditions.
- Devices that aren't tied to one condition (ileal conduit, urostomy care) have no natural host.
- Loses the geometry payoff — no single view of "the tract and the hardware that bridges its failures".

### C — lightweight glossary
+ Faster than A; still gives devices a home and a search target.
- Throws away the best part — the placement-on-the-tract visual that makes it *this* site rather than a textbook list.
- Inconsistent with the other six tabs (which all drive the figure), so it reads as a bolt-on.

## Fit check
- **Use:** a PA on the ward meets a patient with a stent/nephrostomy/urostomy and needs what it is, why it's there, what goes wrong, and what to tell the patient. A findable, illustrated catalog serves that; scattered inline mentions (B) do not.
- **Authoring reality:** ~6–10 devices, each with the existing card structure — a bounded, one-pass writing job, smaller than the conditions catalogue already written.
- **Pivot cost:** purely additive — a new tab alongside six others; nothing existing changes. The tab scaffold is a known, repeated pattern.
- **Reversible?** Yes — a self-contained tab + module; removable without touching the rest.

## Recommendation: **A — a dedicated Hardware tab, with device placement overlaid on the existing tract figure.**
1. Devices are a distinct, ward-frequent knowledge domain that deserves a findable, searchable home — exactly the gap the current six tabs leave.
2. It's the only option that cashes in the site's signature: showing *where* each device sits and *what failure it bridges* on the same tract figure everything else uses.
- Strongest counter — "it's the most build" — doesn't dominate: the tab pattern is already repeated six times, the figure-overlay path already exists (trauma uses one), and every content pattern (prose, patient block, search) is shipped. It's assembly, not invention.

## Open questions to lock before /tdd
1. **Which devices in v1?** Core drainage set — **JJ/ureteric stent, urethral (Foley) catheter, suprapubic catheter, 3-way irrigation catheter, nephrostomy tube, ileal conduit (urostomy)** — or broader straight away (neobladder, artificial urinary sphincter, penile prosthesis, mid-urethral sling)? *Default: the 6 core drainage/diversion devices first; expand later.*
2. **Show placement on the main tract figure** (overlay each device on the existing interactive diagram, like the trauma overlay) — or simple per-device mini-schematics in the card (what the mockup shows, faster)? *Default: overlay on the shared figure — it's the whole point of the site.*
3. **A patient "In plain words" block per device** (catheter/stoma care, when to seek help), reusing the pattern just shipped? *Default: yes.*

## Out of scope (this pass)
- Step-by-step procedure/insertion technique (this is "what it is / why / care", not a how-to-insert guide).
- Brand/sizing catalogues (Charrière sizes etc.) beyond a teaching mention.
