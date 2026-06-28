// Normal anatomy + physiology teaching, keyed by structure (Normal-physiology tab),
// written at teaching depth — enough to talk a student through each structure with the
// "why", with a `pearls` summary. `molecules` is the physiology→pharmacology bridge:
// each key molecule + the drug class that targets it, so normal physiology previews
// treatment. DRAFT — pending clinician review. Not medical advice.

export const NORMAL_TEACH = {
  overview: {
    label: 'Overview',
    anatomy: 'Four parts in series: kidneys make urine, ureters transport it, the bladder stores it, and the urethra expels it. Think of it as one continuous, one-way plumbing system — the upper tract (kidneys, ureters) produces and drains; the lower tract (bladder, urethra) stores and voids. A problem anywhere downstream (a stone, an enlarged prostate, a tight sphincter) raises pressure that backs up and threatens everything upstream, ultimately the kidneys.',
    physiology: 'Urine is produced continuously, transported one way, stored at low pressure, and expelled under voluntary control. Two design principles run through the whole tract: flow is one-directional (valves and peristalsis prevent backflow), and storage must stay LOW-pressure (high pressure damages the kidneys). The kidney is not just a filter — it is the body’s main regulator of fluid volume, electrolytes and acid–base, and an endocrine organ. Click any structure to learn more.',
    molecules: [],
    pearls: [
      'One-way system: production → transport → storage → expulsion; obstruction back-pressures everything upstream.',
      'Storage is at LOW pressure by design — sustained high bladder pressure damages the kidneys.',
      'Upper tract (kidney + ureter) vs lower tract (bladder + urethra) frames most clinical problems.',
    ],
  },
  kidney: {
    label: 'Kidney',
    anatomy: 'Paired bean-shaped retroperitoneal organs lying against the posterior abdominal wall (roughly T12–L3; the right sits slightly lower, pushed down by the liver). On section there are two zones: an outer CORTEX (where the glomeruli and convoluted tubules sit) and an inner MEDULLA arranged in cone-shaped pyramids. Each pyramid’s tip (papilla) drains urine into a minor calyx; minor calyces merge into major calyces, then the funnel-shaped renal pelvis, then the ureter. Blood enters at the hilum via the renal artery (~20% of cardiac output for an organ that is <1% of body weight — it is perfused for regulation, not just for its own metabolism) and each kidney holds ~1 million nephrons, the functional filtering units.',
    physiology: 'The kidneys filter ~180 L of plasma per day yet excrete only 1–2 L of urine — meaning ~99% of what is filtered is reabsorbed. This "filter everything, then reclaim what you need" design lets the kidney precisely tune what stays and what leaves. Through it they regulate fluid volume, plasma electrolytes (Na⁺, K⁺, Ca²⁺, phosphate) and acid–base balance (excreting acid and regenerating bicarbonate). Beyond filtration the kidney is an ENDOCRINE organ with three key roles: it releases RENIN (the trigger for the renin–angiotensin–aldosterone system that defends blood pressure and Na/water), makes ERYTHROPOIETIN in response to hypoxia (driving red-cell production — hence the anaemia of chronic kidney disease), and performs the final activation of VITAMIN D (1α-hydroxylation), controlling calcium and phosphate. This is why kidney failure is never just "not making urine" — it causes hypertension, anaemia and renal bone disease too.',
    molecules: [
      { target: 'Renin → angiotensin II → aldosterone (RAAS)', action: 'controls BP and Na/water retention', drug: 'ACE inhibitors / ARBs; aldosterone antagonists' },
      { target: 'Erythropoietin', action: 'drives red-cell production', drug: 'EPO-stimulating agents (renal anaemia of CKD)' },
      { target: '1α-hydroxylase (vitamin D activation)', action: 'calcium/phosphate balance', drug: 'active vitamin D analogues (CKD-MBD)' },
    ],
    pearls: [
      'Filters ~180 L/day, excretes ~1–2 L — ~99% reabsorbed; the kidney reclaims, then fine-tunes.',
      'Endocrine organ too: renin (BP), erythropoietin (red cells), vitamin D activation (Ca/PO₄).',
      'CKD therefore causes hypertension, anaemia and renal bone disease — not just low urine output.',
      'Receives ~20% of cardiac output to sense and regulate the blood, not for its own metabolic needs.',
    ],
  },
  nephron: {
    label: 'Nephron — how urine is produced',
    anatomy: 'The nephron is the kidney’s functional unit, and it is a journey: a GLOMERULUS (a tuft of capillaries) sits inside BOWMAN’S CAPSULE, which collects filtrate and passes it into the PROXIMAL CONVOLUTED TUBULE (PCT), then the LOOP OF HENLE that dips into the medulla and returns, then the DISTAL CONVOLUTED TUBULE (DCT), and finally the COLLECTING DUCT that runs back down through the medulla to the papilla. Cortical structures (glomerulus, PCT, DCT) handle filtration and bulk reabsorption; the loop and collecting duct travel through the medulla, where the concentration of urine happens. Each segment has a different transport job, which is exactly why diuretics are classified by which segment they hit.',
    physiology: 'Urine is made in three steps. (1) FILTRATION: the glomerulus filters plasma by size and charge — water, ions and small solutes pass, while cells and proteins are held back; the pressure gradient (and thus filtration rate, GFR) is set by the afferent vs efferent arteriole tone, the lever angiotensin II and prostaglandins pull on. (2) REABSORPTION: the PCT reclaims the bulk — essentially all glucose and amino acids, plus the majority of Na⁺, water and bicarbonate — so most of the work is done early. The LOOP OF HENLE is the clever part: its thick ascending limb pumps out Na/K/Cl (via NKCC2) but is water-impermeable, making the medulla progressively salty. This COUNTERCURRENT mechanism builds a steep medullary concentration gradient — the osmotic "battery" that lets the kidney later pull water back out. (3) FINE-TUNING: the DCT adjusts Na/Cl, and the collecting duct delivers final control under two hormones — ALDOSTERONE drives Na reabsorption and K secretion (volume/potassium), while ADH (vasopressin) makes the duct water-permeable so water is reabsorbed down the medullary gradient (concentrating the urine). Where ADH acts, the final urine concentration is set — which is why this segment is where the body decides whether to make dilute or concentrated urine.',
    molecules: [
      { target: 'SGLT2 (proximal tubule)', action: 'reabsorbs glucose + Na', drug: 'SGLT2 inhibitors (–flozins)' },
      { target: 'Carbonic anhydrase (PCT)', action: 'bicarbonate handling', drug: 'acetazolamide' },
      { target: 'NKCC2 (loop of Henle)', action: 'reabsorbs Na/K/2Cl; builds the gradient', drug: 'loop diuretics (furosemide)' },
      { target: 'NCC (distal tubule)', action: 'reabsorbs Na/Cl', drug: 'thiazide diuretics' },
      { target: 'ENaC / aldosterone (collecting duct)', action: 'Na reabsorption, K secretion', drug: 'amiloride; spironolactone' },
      { target: 'V2 / ADH (collecting duct)', action: 'water reabsorption', drug: 'desmopressin (agonist); vaptans (antagonist)' },
    ],
    pearls: [
      'Three steps: filter (glomerulus) → reabsorb the bulk (PCT) → fine-tune (DCT/collecting duct).',
      'The loop builds a salty medulla (countercurrent) — the gradient ADH later uses to pull water back.',
      'Final urine concentration is set in the collecting duct: aldosterone = Na/K, ADH = water.',
      'Diuretics are classified by tubular segment — each drug class maps onto one transporter above.',
    ],
  },
  ureter: {
    label: 'Ureter',
    anatomy: '25–30 cm muscular tubes carrying urine from the renal pelvis down to the bladder. They have three natural narrowings — the pelvi-ureteric junction (PUJ) where the pelvis becomes ureter, the pelvic brim where the ureter crosses the iliac vessels, and the vesico-ureteric junction (VUJ) where it enters the bladder. These are the three classic points where stones lodge, because a stone travels until the lumen narrows below its diameter.',
    physiology: 'Urine does not just fall down the ureter — smooth-muscle PERISTALSIS actively propels it in waves, one-way, even against gravity. At the bladder the ureter runs obliquely through the muscular wall, so that as the bladder fills and its pressure rises, the wall pinches the tunnel shut: a FLAP-VALVE that prevents reflux of urine back toward the kidney. A stone stretching the ureter triggers intense peristaltic spasm — the colicky, loin-to-groin pain — and the back-pressure of obstruction is what endangers the kidney behind it.',
    molecules: [
      { target: 'Ureteric smooth muscle (Ca channels, prostaglandins)', action: 'peristalsis; spasm causes colic pain', drug: 'NSAIDs (reduce pressure/pain); α1 blockers (expulsive therapy)' },
    ],
    pearls: [
      'Three narrowings (PUJ, pelvic brim, VUJ) are the classic stone-arrest points.',
      'Peristalsis moves urine actively and one-way — it does not rely on gravity.',
      'The oblique entry through the bladder wall is a flap-valve that prevents reflux.',
      'Obstruction matters because back-pressure damages the kidney upstream — colic is the warning.',
    ],
  },
  bladder: {
    label: 'Bladder',
    anatomy: 'A hollow, distensible muscular reservoir. Its wall is the DETRUSOR — smooth muscle whose fibres interweave in all directions so it can squeeze the bladder down to empty completely — lined inside by a specialised, impermeable UROTHELIUM that protects underlying tissue from urine. On the floor is the TRIGONE, a smooth triangular area between the two ureteric orifices and the bladder neck; it is sensory-rich and developmentally distinct from the rest of the bladder.',
    physiology: 'The bladder has two opposite jobs, and does them one at a time. Storing: it accommodates ~400–500 mL while keeping pressure LOW — this COMPLIANCE (the wall relaxing as volume rises) is the key property, because if storage pressure stays high it back-pressures the ureters and kidneys and causes upper-tract damage. Emptying: when socially appropriate, the detrusor contracts as a coordinated unit to expel urine under voluntary control. Much of bladder disease is a failure of one of these two modes — an overactive detrusor that contracts during storage (urgency), or a bladder that cannot generate or sustain the emptying contraction (retention).',
    molecules: [
      { target: 'M3 muscarinic (detrusor)', action: 'detrusor contraction', drug: 'antimuscarinics (oxybutynin, solifenacin) — overactive bladder' },
      { target: 'β3 adrenergic (detrusor)', action: 'detrusor relaxation during storage', drug: 'β3 agonist (mirabegron) — overactive bladder' },
    ],
    pearls: [
      'Two jobs in alternation: low-pressure storage and complete, voluntary emptying.',
      'Compliance keeps storage pressure low — high storage pressure damages the kidneys.',
      'Detrusor (M3 to contract, β3 to relax) is the pharmacological target in overactive bladder.',
      'The trigone is smooth, sensory-rich, and developmentally distinct from the rest of the wall.',
    ],
  },
  sphincters: {
    label: 'Sphincters & innervation',
    anatomy: 'Continence depends on two sphincters in series. The INTERNAL urethral sphincter is smooth muscle at the bladder neck — involuntary, under autonomic control. The EXTERNAL urethral sphincter is striated muscle around the membranous urethra — voluntary, under somatic control via the pudendal nerve. Their on/off coordination is orchestrated by the PONTINE MICTURITION CENTRE in the brainstem, which acts as the master switch flipping the system between storage and voiding.',
    physiology: 'The clean way to learn it is two opposing modes. STORAGE is sympathetic (T10–L2): the detrusor is relaxed (β3), the internal sphincter is held closed (α1), and the external sphincter keeps a tonic voluntary squeeze — bladder open to fill, outlet shut. VOIDING is parasympathetic (S2–S4): the detrusor contracts (M3) AND the sphincters relax, simultaneously — squeeze the bladder, open the outlet. The two must be coordinated: if the sphincter contracts while the detrusor contracts (detrusor-sphincter DYSSYNERGIA, e.g. in spinal cord injury) you get high pressure with no flow — the dangerous combination that back-pressures the kidneys.',
    molecules: [
      { target: 'α1 adrenergic (bladder neck, prostate)', action: 'smooth-muscle contraction (outlet/continence)', drug: 'α1 blockers (tamsulosin) — relax the outlet in BPH/retention' },
      { target: 'Pudendal/nicotinic (external sphincter)', action: 'voluntary striated tone', drug: 'pelvic-floor training (not pharmacological)' },
    ],
    pearls: [
      'Internal sphincter = smooth/involuntary (α1); external = striated/voluntary (pudendal nerve).',
      'Storage is sympathetic (fill + hold shut); voiding is parasympathetic (contract + open).',
      'Mnemonic: sympathetic Stores, ParasympatheticPees.',
      'Dyssynergia (sphincter shut while detrusor contracts) = high pressure, no flow — threatens kidneys.',
    ],
  },
  urethra: {
    label: 'Urethra & prostate',
    anatomy: 'The urethra is the final exit conduit carrying urine out of the bladder — short in women, long in men where it runs through three regions, the first of which is the PROSTATIC urethra encircled by the prostate gland. The prostate sits just below the bladder neck and completely surrounds this segment, which is exactly why prostate enlargement strangles urine flow.',
    physiology: 'The prostate is a sex-accessory gland that adds fluid to semen, and its growth is driven by androgens — testosterone converted to the more potent DHT by 5α-reductase. With age, benign growth (BPH) and smooth-muscle tone narrow the prostatic urethra, obstructing flow and producing lower-urinary-tract symptoms (weak stream, hesitancy, incomplete emptying). The urethra simply conducts urine out, but because it is the last segment, obstruction HERE raises pressure through the entire tract behind it — bladder, ureters and ultimately the kidneys — so it is treated seriously. Treatment logically attacks both components of obstruction: the static (glandular bulk, shrunk by blocking DHT) and the dynamic (smooth-muscle tone, relaxed by α1 blockade).',
    molecules: [
      { target: '5α-reductase (testosterone → DHT, prostate)', action: 'drives prostate growth', drug: '5α-reductase inhibitors (finasteride) — shrink the prostate' },
      { target: 'α1 adrenergic (prostatic smooth muscle)', action: 'prostatic urethra tone', drug: 'α1 blockers (tamsulosin)' },
      { target: 'PDE5 (NO/cGMP, smooth muscle)', action: 'smooth-muscle relaxation', drug: 'PDE5 inhibitors (tadalafil) — LUTS/ED' },
    ],
    pearls: [
      'The prostate encircles the prostatic urethra — so BPH directly obstructs flow.',
      'Prostate growth is DHT-driven (testosterone → DHT via 5α-reductase).',
      'BPH has two components: static (gland bulk → 5α-reductase inhibitors) and dynamic (smooth-muscle tone → α1 blockers).',
      'Outlet obstruction back-pressures the whole tract up to the kidneys — never just a "flow" nuisance.',
    ],
  },
};

export function teachFor(id) { return NORMAL_TEACH[id] || null; }
