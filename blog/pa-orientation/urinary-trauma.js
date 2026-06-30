// GU trauma (Trauma tab): renal, bladder, urethral and testicular injury — written at
// teaching depth, section-based. The high-yield "golden rules" (don't catheterise a
// suspected urethral injury; CT delayed phase for renal; CT cystogram with active
// filling) are emphasised. DRAFT — pending clinician review. Not medical advice.

export const TRAUMA = {
  renal_trauma: {
    label: 'Renal trauma', kind: 'condition', region: 'kidney',
    sections: [
      { h: 'Mechanism & grading', body: 'The kidney is the commonest injured urological organ; blunt trauma (road traffic, falls, sports) dominates over penetrating. Severity is graded on the AAST scale I–V (contusion/small laceration → deep laceration into the collecting system → shattered kidney or vascular pedicle avulsion), assigned on CT and driving management. Crucially, the DEGREE of haematuria does not reliably track severity — a high-grade injury can bleed minimally, and a pedicle avulsion may have no haematuria at all.' },
      { h: 'Assessment & imaging', body: 'Resuscitate first (ATLS). Image with contrast CT of abdomen/pelvis AND a delayed (excretory) phase — the delayed phase is what reveals urine extravasation/collecting-system injury, which is otherwise easily missed. Image after blunt trauma for gross haematuria, microscopic haematuria with shock, or a significant mechanism/associated injuries; penetrating flank wounds are imaged readily.' },
      { h: 'Management', body: 'Most renal injuries — even many high-grade ones — are managed NON-operatively if the patient is haemodynamically stable: bed rest, monitoring and serial imaging. Angioembolisation controls active arterial bleeding while preserving renal tissue. Surgery (with its risk of nephrectomy) is reserved for instability not responding to resuscitation, an expanding/pulsatile haematoma found at laparotomy, or pedicle avulsion. Urinary extravasation/urinoma often resolves, sometimes aided by a ureteric stent.' },
    ],
    pearls: ['Commonest injured urological organ; blunt > penetrating', 'Haematuria degree does NOT track severity (pedicle avulsion can be blood-free)', 'CT with a DELAYED phase to catch collecting-system injury / urine leak', 'Stable = conservative even for high grades; instability → angioembolisation or surgery'],
    patient: {
      whatItIs: 'An injury to the kidney — **renal trauma** — most often from a blow to the flank, a fall or a road accident; it is the urological organ injured most often.',
      whyItMatters: 'The amount of blood in the urine does not reliably reflect how bad the injury is, so a serious tear can bleed very little; most blunt injuries can still be managed without surgery.',
      whatIsDone: 'A **CT scan with contrast**, including a **delayed (excretory) phase** to detect urine leaking from the collecting system, grades the injury; stable injuries are managed with bed rest and monitoring, while ongoing arterial bleeding may be controlled with **angioembolisation**, and a urine leak may be helped with a **ureteric stent**.',
      whatToWatch: 'Falling blood pressure or a dropping blood count points to continued bleeding and needs urgent attention, sometimes surgery.',
    },
  },
  bladder_trauma: {
    label: 'Bladder trauma', kind: 'condition', region: 'bladder',
    sections: [
      { h: 'Mechanism & types', body: 'Strongly associated with PELVIC FRACTURES (and with a full bladder at impact, or iatrogenic surgical injury). Two patterns are managed differently: EXTRAPERITONEAL rupture (commonest — pelvic-fracture fragments tear the bladder, urine leaks into the pelvis) and INTRAPERITONEAL rupture (a burst at the dome from a blow to a full bladder — urine spills into the peritoneal cavity; classic in children and after alcohol).' },
      { h: 'Assessment & imaging', body: 'The hallmark is gross haematuria with a pelvic fracture (or inability to void). Diagnose with CT CYSTOGRAPHY (or retrograde cystogram) — the bladder must be ACTIVELY filled/distended with contrast to reveal the leak; a passively-filled scan can miss it. The pattern of contrast extravasation distinguishes extraperitoneal from intraperitoneal.' },
      { h: 'Management', body: 'EXTRAPERITONEAL rupture is usually managed NON-operatively with catheter drainage alone, letting it heal (repaired only if complex, or if the bladder neck or another injury needs open surgery). INTRAPERITONEAL rupture requires SURGICAL repair — peritoneal urine causes chemical peritonitis and will not heal on a catheter. Always exclude an associated urethral injury before relying on a urethral catheter.' },
    ],
    pearls: ['Gross haematuria + pelvic fracture → think bladder injury', 'CT cystogram with ACTIVE bladder filling (a passive scan misses it)', 'Extraperitoneal → catheter drainage; intraperitoneal → surgical repair', 'Exclude a urethral injury before catheterising'],
    patient: {
      whatItIs: 'A tear of the bladder — **bladder trauma** — usually linked to a **pelvic fracture**, or to a blow to a full bladder, which can burst at the top.',
      whyItMatters: 'The warning signs are visible blood in the urine with a pelvic fracture or being unable to pass urine; the type of tear decides whether simple drainage will heal it or surgery is needed.',
      whatIsDone: 'A **CT cystogram** (or **retrograde cystogram**), in which the bladder is actively filled with contrast so the leak shows up, identifies the type; a tear into the pelvic tissues often heals on **catheter** drainage alone, while a tear into the abdominal cavity needs **surgical repair**.',
      whatToWatch: 'A urethral injury must be ruled out before relying on a urethral catheter, and abdominal pain from urine spilling inside the belly signals the type that needs surgery.',
    },
  },
  urethral_trauma: {
    label: 'Urethral trauma', kind: 'condition', region: 'urethra',
    sections: [
      { h: 'Mechanism & types', body: 'Two patterns. POSTERIOR urethral injury (membranous urethra) accompanies PELVIC FRACTURES — shearing at the prostatomembranous junction. ANTERIOR urethral injury (bulbar urethra) is typically a STRADDLE injury (falling astride a bar) or from instrumentation. Both threaten later stricture, incontinence and erectile dysfunction.' },
      { h: 'The triad — and the golden rule', body: 'Suspect it with BLOOD AT THE MEATUS, inability to void with a distended bladder, and a HIGH-RIDING or boggy prostate on DRE (posterior injury); perineal/scrotal "butterfly" bruising suggests an anterior injury. THE GOLDEN RULE: if urethral injury is suspected, do NOT attempt urethral catheterisation — blind catheterisation can convert a partial tear into a complete one. Get a RETROGRADE URETHROGRAM first.' },
      { h: 'Management', body: 'Confirm with retrograde urethrogram. Establish bladder drainage safely — usually a SUPRAPUBIC catheter — rather than forcing a urethral tube. Definitive repair (delayed urethroplasty for posterior injuries; selected primary realignment) is planned later, because reconstruction in the acute, swollen, fractured pelvis fares worse. Counsel about the high rates of later stricture and erectile/continence problems.' },
    ],
    pearls: ['Blood at the meatus + can’t void + high-riding prostate = urethral injury', 'DO NOT catheterise — retrograde urethrogram FIRST (a blind catheter can complete a partial tear)', 'Posterior = pelvic fracture; anterior = straddle injury', 'Drain via suprapubic catheter; delayed urethroplasty; high stricture/ED risk'],
    patient: {
      whatItIs: 'An injury to the urethra, the tube that drains the bladder — **urethral trauma** — from a **pelvic fracture** (deep injury) or from falling astride a bar, a **straddle injury** (lower injury).',
      whyItMatters: 'It is suspected when there is blood at the tip of the penis, an inability to pass urine despite a full bladder, and it carries a high later risk of narrowing of the tube (**urethral stricture**), incontinence and erectile dysfunction.',
      whatIsDone: 'A **retrograde urethrogram** confirms it; drainage is set up safely with a **suprapubic catheter** rather than forcing a tube up the urethra, and definitive repair (**urethroplasty**) is planned later.',
      whatToWatch: 'The golden rule is that a urethral catheter must NOT be pushed up when this injury is suspected, because a blind attempt can turn a partial tear into a complete one.',
    },
  },
  testicular_trauma: {
    label: 'Testicular trauma', kind: 'condition', region: 'testis',
    sections: [
      { h: 'What matters', body: 'Blunt scrotal trauma (sports, assault, straddle) can cause a haematocele, testicular contusion, or — the one that must not be missed — testicular RUPTURE (a tear of the tunica albuginea). Trauma can also TRIGGER torsion, so the differential overlaps with the acute scrotum.' },
      { h: 'Assessment & imaging', body: 'Severe pain, swelling and bruising. Scrotal ULTRASOUND assesses testicular integrity (a disrupted contour/heterogeneous parenchyma suggests rupture), checks blood flow (to exclude torsion), and sizes any haematocele — but, as with torsion, do not let imaging delay surgery when rupture is clinically obvious.' },
      { h: 'Management', body: 'Testicular rupture and a large haematocele need EARLY surgical exploration and repair — prompt repair greatly improves salvage compared with delay. Minor contusions with an intact testis are managed conservatively (scrotal support, analgesia, ice, rest).' },
    ],
    pearls: ['Don’t miss testicular RUPTURE (tunica albuginea tear) — ultrasound + early exploration salvages the testis', 'Trauma can trigger torsion — assess blood flow too', 'Rupture / large haematocele → operate early; minor contusion → conservative'],
    patient: {
      whatItIs: 'An injury to the testicle — **testicular trauma** — from a blunt blow during sport, assault or a straddle; it can cause bruising, a collection of blood around the testis (**haematocele**), or a tear of its lining (**testicular rupture**).',
      whyItMatters: 'A rupture must not be missed, as prompt repair greatly improves the chance of saving the testicle; a blow can also trigger a twist of the testis (**testicular torsion**).',
      whatIsDone: 'A **scrotal ultrasound** checks whether the testis is intact, measures any blood collection and confirms blood flow; a rupture or a large blood collection needs early **surgical exploration**, while a minor bruise with an intact testis is managed with rest, ice, support and pain relief.',
      whatToWatch: 'Severe pain, swelling and bruising warrant urgent assessment, and surgery should not be delayed by scans when a rupture is clinically obvious.',
    },
  },
};

export const TRAUMA_TOPICS = Object.keys(TRAUMA);
export function traumaFor(id) { return TRAUMA[id] || null; }

// How the interactive figure depicts each injury — drawn as the CONSEQUENCE you diagnose on,
// not just a spotlight on the organ. Reuses the model's blood-flow / blush / callout primitives.
//   mark        — station to anchor the blush + marker + callout leader (a key in the figure's XY map)
//   blood       — render the red haematuria stream from `mark` down the conduit (upper-tract only)
//   leak        — urine droplets escaping the bladder (extravasation after rupture)
//   meatusBlood — a blood-at-the-meatus marker at the urethral exit
//   highRiding  — a "high-riding prostate" cue above the prostate
//   haematocele — a swollen, dark testis glyph in the scrotum
//   callout     — two plain-word lines (sign + the teaching trap / golden rule)
export const TRAUMA_FIGURE = {
  renal_trauma:      { mark: 'kidney',  blood: true,        callout: ['haematuria', 'but may be scant — grade ≠ blood'] },
  bladder_trauma:    { mark: 'bladder', leak: true,         callout: ['urine leaks out', '+ pelvic # · can’t void'] },
  urethral_trauma:   { mark: 'urethra', meatusBlood: true, highRiding: true, callout: ['blood at meatus', '⛔ do NOT catheterise'] },
  testicular_trauma: { mark: 'testis',  haematocele: true,  callout: ['haematocele', 'USS · explore early'] },
};
