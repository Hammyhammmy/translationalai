// Patient-education block ("In plain words") — labelled, plain-language explainer
// rendered next to teaching pearls, with a Copy button yielding clean pasteable text.
// Field shape is an object; an ordered label map covers both variants (disease vs
// normal anatomy) — absent keys are simply skipped, so the same renderer serves both.
//   disease: whatItIs / whyItMatters / whatIsDone / whatToWatch
//   normal:  whatItIs / whatItDoes  / howKeptWell / whatToWatch
// Bold (**…**) marks googleable handles (rendered via prose()); copy strips it (plain()).
import { prose, plain } from './prose.js';

const LABELS = [
  ['whatItIs', 'What it is'],
  ['whyItMatters', 'Why it matters'],
  ['whatItDoes', 'What it does'],
  ['whatIsDone', 'What is done'],
  ['howKeptWell', 'How it is kept well'],
  ['whatToWatch', 'What to watch for'],
];

const FOOTER = 'General information — the clinician will tailor this to the individual.';
const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function rows(patient) {
  return LABELS.filter(([k]) => patient && patient[k] && String(patient[k]).trim());
}

export function patientHTML(patient) {
  const present = rows(patient);
  if (!present.length) return '';
  const dl = present
    .map(([k, label]) => `<dt>${label}</dt><dd>${prose(patient[k])}</dd>`)
    .join('');
  return (
    '<div class="card patient">' +
    '<div class="pat-head"><span class="pat-title">In plain words</span>' +
    '<button class="pat-copy" type="button">Copy</button></div>' +
    `<dl class="pat-dl">${dl}</dl>` +
    `<div class="pat-foot">${esc(FOOTER)}</div>` +
    '</div>'
  );
}

export function patientCopyText(patient) {
  return rows(patient)
    .map(([k, label]) => `${label}: ${plain(patient[k])}`)
    .join('\n');
}
