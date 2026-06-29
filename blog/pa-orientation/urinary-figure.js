// Single source of truth for whether the anatomy figure earns its place.
//
// The interactive model teaches where there is something SPATIAL to point at —
// a flow block, dilation/back-pressure, a mass, reflux, a highlighted station, or
// the storage/voiding + innervation animation of the Normal view. It is just
// decoration on pages with no spatial defect (pain syndromes, hormonal/lab
// workups, treatment concepts); those opt out and give the content full width.
//
// Pure function — unit-tested headlessly (node:test). DRAFT teaching aid.

export function showsFigure({ tab, entry, hasImage = false } = {}) {
  if (!entry) return true;                  // defensive: show by default
  if (entry.noFigure) return false;         // explicit opt-out (e.g. interstitial cystitis, CPPS, male infertility)
  // an oncology "concept" page has no anatomy of its own — show only if a real plate exists
  if (tab === 'oncology' && entry.kind === 'concept' && !hasImage) return false;
  // andrology topics with no body region (hormonal axis, ED, PE, Peyronie's) and no plate are non-spatial
  if (tab === 'andrology' && !entry.region && !hasImage) return false;
  return true;
}
