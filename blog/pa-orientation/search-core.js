// Pure search scoring + snippet, shared by the browser UI (nav.js) and tests.
// No DOM, no fetch — just functions over a plain index array.
// An index entry is { page, label, sub, text, href, ... }.

// Split a query into term-groups. Each typed term becomes a group of the term
// plus its synonyms; an entry satisfies a group if it contains ANY member.
export function expandTerms(q, syn = {}) {
  return q
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => [t, ...(syn[t] || [])]);
}

export function searchIndex(list, q, syn = {}) {
  const ql = q.trim().toLowerCase();
  if (!ql) return [];
  const groups = expandTerms(ql, syn);
  const out = [];
  for (const it of list) {
    if (!groups.every((g) => g.some((t) => it.text.includes(t)))) continue;
    const lab = it.label.toLowerCase();
    let sc = 0;
    if (lab === ql) sc += 100;
    if (lab.includes(ql)) sc += 40;
    for (const g of groups) if (g.some((t) => lab.includes(t))) sc += 10;
    out.push({ it, sc });
  }
  out.sort((a, b) => b.sc - a.sc || a.it.label.localeCompare(b.it.label));
  return out.slice(0, 12).map((r) => r.it);
}

// Flat list of all match tokens for highlighting/snippet centering.
export function matchTokens(q, syn = {}) {
  return expandTerms(q, syn).flat();
}

export function snippet(text, terms) {
  let i = -1;
  for (const t of terms) {
    const j = text.indexOf(t);
    if (j >= 0 && (i < 0 || j < i)) i = j;
  }
  if (i < 0) return '';
  const s = Math.max(0, i - 28);
  const e = Math.min(text.length, i + 56);
  return (s > 0 ? '…' : '') + text.slice(s, e).trim() + (e < text.length ? '…' : '');
}
