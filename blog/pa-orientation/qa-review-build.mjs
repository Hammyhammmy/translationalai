// Build a static review page for the drafted "When patients ask…" sets.
// Run: node qa-review-build.mjs   →   writes qa-review.html (open via file://, no server).
import { writeFileSync } from 'node:fs';
import { SHARED_ASK, STAGE_SHARED } from './urinary-qa.js';

import { retention } from './qa-drafts/presentation_retention.js';
import { hematuria } from './qa-drafts/presentation_hematuria.js';
import { acute_scrotum } from './qa-drafts/presentation_acute_scrotum.js';
import { luts } from './qa-drafts/presentation_luts.js';
import { chronic_pelvic_pain } from './qa-drafts/presentation_chronic_pelvic_pain.js';
import { microscopic_hematuria } from './qa-drafts/presentation_microscopic_hematuria.js';
import { recurrent_uti } from './qa-drafts/presentation_recurrent_uti.js';
import { stone_prevention } from './qa-drafts/presentation_stone_prevention.js';
import { elevated_psa } from './qa-drafts/presentation_elevated_psa.js';
import { asymptomatic_bacteriuria } from './qa-drafts/presentation_asymptomatic_bacteriuria.js';

const ENTRIES = [
  ['retention', 'Urinary retention', retention],
  ['hematuria', 'Visible haematuria', hematuria],
  ['acute_scrotum', 'Acute scrotum', acute_scrotum],
  ['luts', 'Lower urinary tract symptoms (LUTS)', luts],
  ['chronic_pelvic_pain', 'Chronic pelvic pain', chronic_pelvic_pain],
  ['microscopic_hematuria', 'Microscopic haematuria', microscopic_hematuria],
  ['recurrent_uti', 'Recurrent UTI', recurrent_uti],
  ['stone_prevention', 'Kidney stone prevention', stone_prevention],
  ['elevated_psa', 'Raised PSA', elevated_psa],
  ['asymptomatic_bacteriuria', 'Asymptomatic bacteriuria', asymptomatic_bacteriuria],
];

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const prose = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

// Merge the shared canned groups an entry opts into, dropping any item the entry overrode by key.
function sharedGroups(entry) {
  const ids = entry.shared || STAGE_SHARED[entry.stage] || [];
  const bespokeKeys = new Set(
    (entry.groups || []).flatMap((g) => g.items.map((i) => i.key))
  );
  return ids
    .map((id) => SHARED_ASK[id])
    .filter(Boolean)
    .map((g) => ({
      title: g.title,
      shared: true,
      items: g.items.filter((i) => !bespokeKeys.has(i.key)),
    }))
    .filter((g) => g.items.length);
}

function itemHTML(it) {
  const flag = it.review
    ? `<span class="tag-review" title="${esc(it.review)}">review</span>`
    : '';
  const why = it.why ? `<div class="qa-why"><b>Why:</b> ${prose(it.why)}</div>` : '';
  return (
    `<div class="qa-item">` +
    `<p class="qa-q">${prose(it.q)}${flag}</p>` +
    `<p class="qa-a">${prose(it.a)}</p>` +
    why +
    `</div>`
  );
}

function groupHTML(g) {
  const tag = g.shared ? `<span class="tag-canned">shared</span>` : '';
  return (
    `<div class="qa-group-title">${esc(g.title)}${tag}</div>` +
    g.items.map(itemHTML).join('')
  );
}

function cardHTML([id, label, entry]) {
  const groups = [...(entry.groups || []), ...sharedGroups(entry)];
  const nQ = groups.reduce((n, g) => n + g.items.length, 0);
  const nReview = groups.reduce((n, g) => n + g.items.filter((i) => i.review).length, 0);
  const reviewBadge = nReview
    ? `<span class="rev-count">${nReview} to confirm</span>`
    : '';
  return (
    `<div class="card" id="${id}">` +
    `<div class="c-title">${esc(label)}</div>` +
    `<div class="c-sub">${esc(entry.stage)} · ${nQ} questions · ${groups.length} groups ${reviewBadge}</div>` +
    `<div class="qa">` +
    `<div class="qa-head"><span class="qa-title">When patients ask…</span></div>` +
    groups.map(groupHTML).join('') +
    `</div></div>`
  );
}

const nav = ENTRIES.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('');
const cards = ENTRIES.map(cardHTML).join('\n');
const totalQ = ENTRIES.reduce((n, [, , e]) => {
  const gs = [...(e.groups || []), ...sharedGroups(e)];
  return n + gs.reduce((m, g) => m + g.items.length, 0);
}, 0);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Review · When patients ask… (Presentations)</title>
<style>
  :root{--bg:#fafaf9;--card:#fff;--border:#e7e5e4;--text:#1c1917;--muted:#78716c;
    --accent:#2563eb;--accent-light:#eff6ff;--green:#16a34a;--orange:#d97706}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--text);
    font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased}
  .top{position:sticky;top:0;background:rgba(250,250,249,.94);backdrop-filter:blur(6px);
    border-bottom:1px solid var(--border);padding:12px 20px;z-index:5}
  .top h1{font-size:15px;margin:0 0 8px;font-weight:800}
  .top h1 small{font-weight:500;color:var(--muted)}
  .controls{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px}
  .toggle{font:700 13px/1 inherit;cursor:pointer;border:2px solid var(--border);background:#fff;color:var(--text);
    border-radius:999px;padding:8px 14px;display:inline-flex;gap:8px;align-items:center}
  .toggle .dot{width:10px;height:10px;border-radius:50%;background:#d6d3d1}
  .toggle .state{font-size:11px;font-weight:600;color:var(--muted)}
  .toggle.on{border-color:var(--accent);color:var(--accent);background:var(--accent-light)}
  .toggle.on .dot{background:var(--accent)}.toggle.on .state{color:var(--accent)}
  .nav{display:flex;gap:6px 14px;flex-wrap:wrap;font-size:12.5px}
  .nav a{color:var(--accent);text-decoration:none}.nav a:hover{text-decoration:underline}
  .wrap{max-width:780px;margin:0 auto;padding:22px 20px 90px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin-bottom:20px}
  .c-title{font-size:20px;font-weight:800;letter-spacing:-.01em}
  .c-sub{font-size:12px;color:var(--muted);margin:3px 0 6px;text-transform:uppercase;letter-spacing:.05em}
  .rev-count{color:var(--orange);font-weight:700;margin-left:6px}
  .qa{border-left:4px solid var(--accent);background:var(--accent-light);border-radius:10px;padding:14px 18px;margin-top:12px}
  .qa-title{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--accent)}
  .qa-group-title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--accent);
    margin:18px 0 2px;padding-top:11px;border-top:1px solid rgba(37,99,235,.14)}
  .qa-head + .qa-group-title{border-top:0;padding-top:0;margin-top:8px}
  .tag-canned{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);
    background:#f5f5f4;border:1px solid var(--border);border-radius:4px;padding:1px 5px;margin-left:7px;vertical-align:middle}
  .tag-review{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#9a3412;
    background:#fff7ed;border:1px solid #fed7aa;border-radius:4px;padding:1px 5px;margin-left:7px;vertical-align:middle;cursor:help}
  .qa-item{padding:10px 0;border-bottom:1px solid rgba(37,99,235,.10)}
  .qa-item:last-child{border-bottom:0}
  .qa-q{font-weight:700;font-size:14.5px;margin:0 0 4px;color:#1e3a8a}
  .qa-a{font-size:14px;line-height:1.6;margin:0}
  .qa-why{display:none;margin-top:8px;padding:8px 11px;border-left:2px solid var(--accent);background:#fff;
    border-radius:0 6px 6px 0;font-size:12.5px;line-height:1.5;color:var(--muted)}
  body.show-why .qa-why{display:block}.qa-why b{color:var(--text)}
  body.quiz .qa-item{cursor:pointer;border-radius:6px}
  body.quiz .qa-item:hover{background:rgba(37,99,235,.04)}
  body.quiz .qa-a{display:none}
  body.quiz .qa-item.revealed .qa-a{display:block}
  body.quiz.show-why .qa-why{display:none}
  body.quiz.show-why .qa-item.revealed .qa-why{display:block}
  .reveal-hint{display:none;font-size:11.5px;font-weight:600;color:var(--accent);margin-top:3px}
  body.quiz .qa-item:not(.revealed) .reveal-hint{display:block}
</style></head>
<body>
<div class="top">
  <h1>When patients ask… <small>— Presentations tab · draft for review · ${ENTRIES.length} entries · ${totalQ} questions</small></h1>
  <div class="controls">
    <button class="toggle" id="whyBtn"><span class="dot"></span>Show “why” notes <span class="state">OFF</span></button>
    <button class="toggle" id="quizBtn"><span class="dot"></span>Quiz me <span class="state">OFF</span></button>
  </div>
  <div class="nav">${nav}</div>
</div>
<div class="wrap">
${cards}
</div>
<script>
  const b=document.body;
  document.querySelectorAll('.qa-item').forEach(function(item){
    var q=item.querySelector('.qa-q'), h=document.createElement('div');
    h.className='reveal-hint'; h.textContent='⤵ tap to reveal the answer'; q.after(h);
    item.addEventListener('click',function(){ if(b.classList.contains('quiz')) item.classList.toggle('revealed'); });
  });
  function wire(id,cls){var el=document.getElementById(id);el.addEventListener('click',function(){
    var on=b.classList.toggle(cls); el.classList.toggle('on',on);
    el.querySelector('.state').textContent=on?'ON':'OFF';
    if(cls==='quiz'&&!on) document.querySelectorAll('.qa-item.revealed').forEach(function(i){i.classList.remove('revealed');});
  });}
  wire('whyBtn','show-why'); wire('quizBtn','quiz');
</script>
</body></html>`;

writeFileSync(new URL('./qa-review.html', import.meta.url), html);
const flags = ENTRIES.reduce((n, [, , e]) => n + (e.groups || []).reduce((m, g) => m + g.items.filter((i) => i.review).length, 0), 0);
console.log(`qa-review.html written — ${ENTRIES.length} entries, ${totalQ} questions, ${flags} review flags`);
