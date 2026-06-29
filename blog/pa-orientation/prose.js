// Tiny prose formatter for data-driven content blocks.
// A markdown subset, authored directly in the data strings:
//   \n\n  → paragraph break
//   **x** → bold
// Backward-compatible: a string with no \n\n renders as a single <p>, so existing
// (un-authored) strings read exactly as before. HTML is escaped first, so the
// only markup that survives is what this formatter emits.
// Browser-loadable (ES module) AND node-testable.

function escape(s) {
  return s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
}

export function prose(text) {
  if (!text || !text.trim()) return '';
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => '<p>' + escape(p).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') + '</p>')
    .join('');
}

// Strip the authoring markup back to clean plain text (for the search index).
export function plain(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}
