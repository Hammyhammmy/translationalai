// Andrology (Andrology tab): the HPG axis, hypogonadism & TRT, male infertility,
// varicocele, and fertility-sparing gonadotropin therapy — written at teaching depth,
// grounded in the HPG axis so therapy follows from physiology. Section-based so each
// topic gets the headings it needs. DRAFT — pending clinician review. Not medical advice.

export const ANDROLOGY = {
  hpg_axis: {
    label: 'The HPG axis (testosterone & sperm)', kind: 'physiology', region: null,
    sections: [
      { h: 'How it works', body: 'The hypothalamus releases GnRH in pulses, driving the pituitary to secrete LH and FSH. LH stimulates testicular Leydig cells to make testosterone; FSH — together with high local testosterone — drives the Sertoli cells that support spermatogenesis. Testosterone (and its conversion to oestradiol) feeds back negatively on the hypothalamus and pituitary, while Sertoli-cell inhibin B feeds back specifically on FSH. So one axis runs both jobs: hormone production (Leydig/LH) and sperm production (Sertoli/FSH).' },
      { h: 'Why it matters clinically', body: 'Reading LH/FSH against testosterone localises the problem: low testosterone with HIGH LH/FSH = primary (testicular) failure; low testosterone with LOW or inappropriately normal LH/FSH = secondary (hypothalamic–pituitary). It also explains the central andrology trade-off — giving exogenous testosterone suppresses GnRH/LH/FSH and therefore shuts down intratesticular testosterone and sperm production, which is why TRT behaves like a contraceptive and why fertility is instead preserved with hCG/gonadotropins that drive the axis rather than replace its output.' },
    ],
    pearls: ['LH → Leydig → testosterone; FSH + testosterone → Sertoli → sperm', 'High LH/FSH = primary (testicular); low/normal LH/FSH = secondary (central)', 'Exogenous testosterone suppresses the axis → impairs fertility'],
    patient: {
      whatItIs: 'The hormone loop between the brain and the testicles — the **hypothalamic-pituitary-gonadal (HPG) axis** — that runs both testosterone and sperm production.',
      whyItMatters: 'It explains test results: low testosterone with high pituitary hormones (**LH**, **FSH**) points to a testicle problem, while low pituitary hormones point to a brain or pituitary cause.',
      whatIsDone: 'Blood tests measure **testosterone** alongside **LH** and **FSH** to locate where the loop has broken down.',
      whatToWatch: 'Taking **testosterone** from outside switches the loop off, which lowers sperm production — important for anyone hoping to father children.',
    },
  },
  hypogonadism: {
    label: 'Hypogonadism & testosterone replacement', kind: 'condition', region: null,
    sections: [
      { h: 'The problem', body: 'Testosterone deficiency with consistent symptoms — split by the axis. PRIMARY (testicular: Klinefelter, mumps orchitis, chemo/radiotherapy, trauma) gives low testosterone with HIGH LH/FSH. SECONDARY (central: pituitary tumour/prolactinoma, opioids, obesity, systemic illness) gives low testosterone with inappropriately low/normal LH/FSH. The split decides the workup and whether there is a treatable central cause.' },
      { h: 'Symptoms', body: 'Low libido, erectile dysfunction, loss of morning erections, fatigue and low mood, reduced muscle mass/strength, gynaecomastia, reduced body hair and small testes; long-standing deficiency lowers bone density. The symptoms are non-specific — which is exactly why biochemical confirmation is required before labelling someone hypogonadal.' },
      { h: 'Workup', body: 'Confirm with a FASTING MORNING total testosterone on at least two occasions (levels are diurnal and fall with food/illness). If low, measure LH/FSH to localise, prolactin (exclude a prolactinoma), and SHBG/free testosterone where total is borderline. In secondary disease image the pituitary (MRI) and screen for reversible drivers (opioids, obesity, sleep apnoea, iron overload). Check baseline haematocrit and PSA before treating.' },
      { h: 'Treatment', body: 'Treat the cause where possible (stop offending drugs, weight loss, treat a prolactinoma). For replacement, testosterone is given as gels or intramuscular injections titrated to mid-normal levels. Crucially, if FERTILITY is desired do NOT use testosterone (it suppresses the axis) — drive the testis instead with hCG ± FSH/gonadotropins, or pulsatile GnRH in secondary hypogonadism.' },
      { h: 'Risks & monitoring', body: 'TRT raises haematocrit (polycythaemia), suppresses spermatogenesis (counsel and consider sperm-banking first), can worsen sleep apnoea, and needs prostate monitoring (it does not cause prostate cancer but is avoided in active disease). Monitor testosterone, haematocrit and PSA on therapy.' },
    ],
    pearls: ['Confirm with TWO fasting morning testosterones before diagnosing', 'LH/FSH splits primary (high) from secondary (low/normal)', 'TRT suppresses fertility — use hCG/gonadotropins if fertility is wanted', 'Monitor haematocrit and PSA on TRT'],
    patient: {
      whatItIs: 'Low testosterone with symptoms — **hypogonadism** — caused either by the testicles themselves or by the brain and pituitary.',
      whyItMatters: 'It can cause low sex drive, erection problems, tiredness, low mood, loss of muscle, and over time weaker bones; sometimes there is a treatable underlying cause such as a pituitary tumour (**prolactinoma**).',
      whatIsDone: 'Diagnosis needs a low **fasting morning testosterone** confirmed twice; treatment is **testosterone replacement therapy (TRT)** as gels or injections, or treating the underlying cause.',
      whatToWatch: '**TRT** lowers sperm production, so anyone wanting children should store sperm or use **hCG**/gonadotropins instead; blood count (**haematocrit**) and **PSA** are monitored during treatment.',
    },
  },
  infertility: {
    label: 'Male infertility workup', kind: 'condition', region: 'testis', noFigure: true,
    sections: [
      { h: 'Approach', body: 'Infertility is a couple problem (no conception after ~12 months); a male factor contributes in about half. The central test is SEMEN ANALYSIS — two samples ~2–3 weeks apart after 2–5 days’ abstinence — assessing count, motility and morphology. Frame causes by level: pre-testicular (hormonal/central), testicular (the sperm factory itself), and post-testicular (duct obstruction).' },
      { h: 'Causes', body: 'Pre-testicular: hypogonadotropic hypogonadism, hyperprolactinaemia, and exogenous testosterone/anabolic steroids (a common, reversible cause). Testicular (non-obstructive): varicocele, Klinefelter, Y-chromosome microdeletions, cryptorchidism, chemo/radiotherapy, mumps orchitis. Post-testicular (obstructive): vasectomy, epididymal obstruction, or congenital absence of the vas (linked to CFTR/cystic fibrosis). Azoospermia is the key fork — obstructive (normal FSH, normal testis size) vs non-obstructive (high FSH, small testes, failed production).' },
      { h: 'Workup', body: 'Two semen analyses; hormones (FSH, LH, testosterone — high FSH with small testes points to primary testicular failure); prolactin if testosterone is low or central features. Examine for a varicocele and assess testicular volume. In azoospermia/severe oligospermia add genetic testing (karyotype for Klinefelter, Y-microdeletions, CFTR) and scrotal Doppler ± transrectal ultrasound for obstruction.' },
      { h: 'Treatment', body: 'Treat reversible causes: stop testosterone/steroids, treat endocrine disease (gonadotropins/hCG for hypogonadotropic hypogonadism, dopamine agonists for a prolactinoma), and repair a clinically significant varicocele. For obstruction, reconstruct or retrieve sperm; for non-obstructive azoospermia, surgical sperm extraction (TESE) feeding IVF/ICSI. Many couples reach parenthood via assisted reproduction (ICSI).' },
    ],
    pearls: ['Semen analysis ×2 is the central test', 'Azoospermia: obstructive (normal FSH, normal testes) vs non-obstructive (high FSH, small testes)', 'Exogenous testosterone / anabolic steroids are a common reversible cause', 'Severe cases → genetic testing (Klinefelter, Y-microdeletion, CFTR)'],
    patient: {
      whatItIs: 'Difficulty fathering a child after about a year of trying, where a male factor is involved — found in roughly half of couples.',
      whyItMatters: 'Causes range from hormone problems and a **varicocele** to blocked tubes or genetic conditions such as **Klinefelter syndrome**; some, like the use of **testosterone or anabolic steroids**, are reversible.',
      whatIsDone: 'The key test is a **semen analysis** done twice, with blood hormone tests and an examination; severe cases add **genetic testing** and a scrotal **ultrasound**.',
      whatToWatch: 'Many couples still succeed through assisted reproduction such as **IVF/ICSI**, sometimes after surgical sperm retrieval (**TESE**).',
    },
  },
  varicocele: {
    label: 'Varicocele', kind: 'condition', region: 'testis',
    sections: [
      { h: 'What it is', body: 'Abnormally dilated veins of the pampiniform plexus draining the testis — the scrotal "bag of worms" that is more prominent on standing and decompresses on lying down. Far commoner on the LEFT, because the left gonadal vein drains at a right angle into the left renal vein (higher pressure, often valveless) versus direct drainage into the IVC on the right.' },
      { h: 'Why it matters', body: 'It is the commonest surgically correctable cause of male infertility: pooled venous blood raises scrotal temperature and causes reflux that impairs spermatogenesis, and over time can reduce testicular volume. Most varicoceles are asymptomatic and harmless — significance comes from impaired semen parameters, testicular atrophy (especially in adolescents), or a dull dragging ache.' },
      { h: 'Workup', body: 'Examine standing, with and without Valsalva (grade: visible, palpable, or only on Valsalva); confirm and size with scrotal Doppler ultrasound. Assess fertility impact with semen analysis and compare testicular volumes. RED FLAG: a right-sided varicocele, or one that does NOT decompress on lying down, warrants abdominal imaging to exclude a retroperitoneal mass or renal tumour obstructing venous drainage.' },
      { h: 'Treatment', body: 'Repair is by indication, not by size — and the varicocele must be clinically palpable (subclinical, ultrasound-only varicoceles are not repaired, as fixing them does not improve fertility).\n\n**Indications:** (1) male-factor infertility with a palpable varicocele AND abnormal semen in a couple seeking conception; (2) bothersome pain not settling with conservative measures; (3) in adolescents, testicular growth arrest/hypotrophy (or abnormal semen). An asymptomatic palpable varicocele with normal semen and no fertility concern is simply monitored, however large or visible.\n\nRepair is by radiological embolisation or surgical ligation. **Microsurgical subinguinal varicocelectomy is the gold standard** — recurrence ~1–2% and essentially no hydrocele (it spares the lymphatics and testicular artery), with the highest spontaneous-pregnancy rates (~42–45%). Embolisation avoids an incision and hydrocele but has a slightly higher recurrence (~4%, up to ~9%) and lower pregnancy (~33%).\n\nSemen parameters improve in the majority, yet spontaneous conception still occurs in only ~40% even with the best technique — counsel that repair improves the odds, not a guarantee, and many couples still proceed to IVF/ICSI. (Figures are pooled estimates from meta-analyses; ranges vary by study.)' },
    ],
    pearls: ['Left-sided, "bag of worms", decompresses on lying down', 'Commonest correctable cause of male infertility (heat + reflux)', 'Repair by indication, not size: must be PALPABLE + (infertility-with-abnormal-semen, pain, or adolescent hypotrophy)', 'Subclinical (ultrasound-only) varicoceles are NOT repaired; asymptomatic + normal semen = observe', 'Microsurgical subinguinal = gold standard: recurrence ~1–2%, ~0% hydrocele, pregnancy ~42–45% (embolisation ~33%, recurrence ~4%)', 'Even with the best repair, spontaneous conception is only ~40% — improves odds, not a guarantee', 'Right-sided or non-decompressing → image for a retroperitoneal/renal tumour'],
    patient: {
      whatItIs: 'Enlarged veins above the testicle — a **varicocele** — often felt as a "bag of worms" in the scrotum, usually on the left, that flattens when lying down.',
      whyItMatters: 'It is the commonest correctable cause of male infertility because pooled blood warms the testicle and can shrink it; most cause no symptoms, but some bring a dull dragging ache.',
      whatIsDone: 'It is checked by examination standing up and a scrotal **Doppler ultrasound**, with a **semen analysis**; repair (by **microsurgical subinguinal varicocelectomy** or **embolisation**) is offered only for a palpable varicocele causing fertility problems, pain, or arrested testicular growth in adolescents.',
      whatToWatch: 'A right-sided varicocele, or one that does not flatten on lying down, needs abdominal imaging to rule out a kidney or abdominal tumour.',
    },
  },
  hcg_gonadotropins: {
    label: 'hCG & gonadotropins (fertility-sparing)', kind: 'therapy', region: null,
    sections: [
      { h: 'How it works', body: 'hCG is an LH analogue — it binds the LH receptor on Leydig cells and drives INTRATESTICULAR testosterone and, with it, spermatogenesis. Adding FSH (recombinant FSH or hMG) supports the Sertoli cells. So gonadotropin therapy works WITH the HPG axis — stimulating the testis to do its own job — rather than replacing the end-product.' },
      { h: 'Why use it instead of testosterone', body: 'Exogenous testosterone suppresses GnRH/LH/FSH and therefore shuts down intratesticular testosterone and sperm — effectively a male contraceptive. For a hypogonadal man who wants fertility (or to recover sperm production after TRT/anabolic steroids), hCG ± FSH maintains or restarts spermatogenesis. In secondary (hypogonadotropic) hypogonadism, gonadotropins or pulsatile GnRH can both raise testosterone and induce fertility.' },
      { h: 'In practice', body: 'Used to induce fertility in hypogonadotropic hypogonadism, to preserve fertility in men needing androgen support, and to recover the axis after anabolic-steroid or testosterone use. Often paired with a SERM such as clomifene, which raises endogenous LH/FSH by blocking oestrogen feedback. (hCG is also a testicular-cancer tumour marker — the same molecule, a different use.)' },
    ],
    pearls: ['hCG mimics LH → intratesticular testosterone → sperm', 'Use hCG/gonadotropins (not TRT) when fertility is wanted', 'Clomifene (a SERM) raises endogenous LH/FSH by blocking feedback'],
    patient: {
      whatItIs: 'Fertility-sparing hormone treatment — **hCG** plus **FSH**/gonadotropins — that prompts the testicles to make their own testosterone and sperm.',
      whyItMatters: 'Unlike testosterone from outside, which switches off sperm production, these drugs work with the body\'s own loop, so they support or restart fertility.',
      whatIsDone: 'It is used to trigger fertility when the brain or pituitary under-produces hormones, and to recover sperm production after **testosterone** or **anabolic steroid** use; a tablet (**clomifene**, a **SERM**) can raise the body\'s own hormones too.',
      whatToWatch: 'This is the route to choose over **testosterone replacement** whenever fathering a child is the goal.',
    },
  },
  erectile_dysfunction: {
    label: 'Erectile dysfunction', kind: 'condition', region: null,
    sections: [
      { h: 'The mechanism', body: 'Erection is a neurovascular event: parasympathetic/nitrergic nerves and endothelium release nitric oxide, raising cGMP in cavernosal smooth muscle; the muscle relaxes, the sinusoids fill, and the expanding tissue compresses the draining veins (veno-occlusion) to trap blood. PDE5 breaks cGMP down — which is exactly why PDE5 inhibitors potentiate this pathway. ED is failure anywhere along it: vascular (the commonest, shared with atherosclerosis), neurogenic (diabetes, pelvic surgery, spinal cord), hormonal (low testosterone), drug-induced, or psychogenic.' },
      { h: 'Why it matters beyond the bedroom', body: 'ED is a barometer of endothelial/vascular health — the penile arteries are small, so organic ED often PRECEDES coronary disease by a few years. New ED is therefore a cue to assess and modify cardiovascular risk (the "canary in the coal mine"). Sudden, situational ED with preserved morning erections points to a psychogenic component; gradual loss with absent morning erections points to an organic cause.' },
      { h: 'Workup', body: 'History (onset, morning erections, libido, psychosocial factors, medications) and a cardiovascular-risk assessment. Examine the genitalia and look for signs of hypogonadism. Labs: fasting glucose/HbA1c, lipids, and a morning testosterone (treating low testosterone also improves the response to PDE5 inhibitors). Specialist tests such as penile Doppler are rarely needed.' },
      { h: 'Treatment', body: 'Lifestyle and cardiovascular-risk reduction first (weight, exercise, smoking, glycaemic control), review culprit drugs, and treat low testosterone. First-line medical therapy is a PDE5 inhibitor (sildenafil, tadalafil) — CONTRAINDICATED with nitrates (dangerous hypotension). Second-line: intracavernosal alprostadil injection, intraurethral prostaglandin, or a vacuum device. Refractory disease → penile prosthesis. Address psychological factors throughout.' },
    ],
    pearls: ['NO → cGMP → smooth-muscle relaxation; PDE5 inhibitors block cGMP breakdown', 'Organic ED is a cardiovascular warning — it can precede coronary disease', 'PDE5 inhibitors are CONTRAINDICATED with nitrates', 'Check and treat low testosterone — it improves the PDE5-inhibitor response'],
    patient: {
      whatItIs: 'Difficulty getting or keeping an erection — **erectile dysfunction (ED)**.',
      whyItMatters: 'Because penile arteries are small, organic ED can be an early warning of **heart and blood-vessel disease**, and it may also flag low **testosterone**.',
      whatIsDone: 'Treatment starts with lifestyle and cardiovascular-risk changes; first-line tablets are **PDE5 inhibitors** (**sildenafil**, **tadalafil**), with **alprostadil** injections, a **vacuum device**, or a **penile prosthesis** as further options.',
      whatToWatch: '**PDE5 inhibitors** must never be combined with **nitrate** heart medicines, which can cause a dangerous drop in blood pressure.',
    },
  },
  premature_ejaculation: {
    label: 'Premature ejaculation', kind: 'condition', region: null,
    sections: [
      { h: 'What it is', body: 'Ejaculation that consistently happens sooner than wanted (a short intravaginal ejaculatory latency time), with a perceived lack of control and resulting distress — all three elements matter for the diagnosis. LIFELONG (present since first sexual experiences, likely neurobiological/serotonergic) is distinguished from ACQUIRED (new onset, often with a trigger such as erectile dysfunction, prostatitis, thyroid disease, or relationship/psychological factors).' },
      { h: 'Workup', body: 'Largely a clinical, history-based diagnosis: characterise latency, control and distress, classify lifelong versus acquired, and screen for the common companions — erectile dysfunction (treat the ED first, as it frequently drives PE), prostatitis, and thyroid dysfunction. Examination and tests are guided by those leads rather than done routinely.' },
      { h: 'Treatment', body: 'Behavioural techniques (stop–start, squeeze) and addressing relationship/psychological factors. Pharmacology exploits serotonin’s delaying effect — SSRIs (off-label daily, or on-demand dapoxetine where licensed) — plus topical anaesthetic creams/sprays to reduce glans sensitivity, and a PDE5 inhibitor when there is coexisting ED. Always treat an underlying cause (ED, prostatitis, thyroid).' },
    ],
    pearls: ['Three elements: short latency + poor control + distress', 'Lifelong (serotonergic) vs acquired (look for ED, prostatitis, thyroid)', 'Treat coexisting ED first — it often drives PE', 'SSRIs/dapoxetine and topical anaesthetics are the mainstays'],
    patient: {
      whatItIs: 'Ejaculation that consistently happens sooner than wanted, with little control and real distress — **premature ejaculation (PE)**.',
      whyItMatters: 'Lifelong PE is largely down to brain chemistry, while new (acquired) PE often points to a treatable companion such as **erectile dysfunction**, prostate inflammation (**prostatitis**), or a **thyroid** problem.',
      whatIsDone: 'Options include behavioural techniques (**stop-start**, **squeeze**), serotonin-acting tablets (**SSRIs**, or **dapoxetine** where licensed), and numbing creams or sprays (**topical anaesthetics**).',
      whatToWatch: 'Coexisting erection problems are treated first, as they frequently drive the early ejaculation.',
    },
  },
  peyronies: {
    label: 'Peyronie’s disease', kind: 'condition', region: null,
    sections: [
      { h: 'What it is', body: 'A fibrous plaque (scar) in the tunica albuginea of the penis causing penile CURVATURE, pain on erection, and sometimes erectile dysfunction or shortening. It is thought to follow microtrauma and aberrant wound healing in predisposed men, and is associated with Dupuytren’s contracture and diabetes. It runs in two phases: an ACUTE inflammatory phase (pain, evolving curvature) and a CHRONIC stable phase (fixed deformity, pain usually settled).' },
      { h: 'Workup', body: 'Clinical: palpate the plaque and document the curvature objectively — a photograph of an erection, or an in-clinic intracavernosal injection test, measures the angle and checks erectile function. Establish the phase (active/evolving vs stable), because it dictates the timing of treatment, and assess the impact on intercourse and any associated ED.' },
      { h: 'Treatment', body: 'In the acute phase, manage conservatively (it may stabilise; intralesional collagenase clostridium histolyticum can reduce curvature and traction therapy is adjunctive). Operate only once the disease is STABLE (≈3–12 months without change): options are plication (shorter penises/smaller curves), plaque incision/grafting (larger curves), or a penile prosthesis when there is concurrent refractory ED. Set realistic expectations — the goal is functional, straight-enough intercourse, not perfection.' },
    ],
    pearls: ['Tunica albuginea plaque → curvature ± pain ± ED; linked to Dupuytren’s', 'Two phases — operate only when STABLE (≈3–12 months unchanged)', 'Acute: conservative ± collagenase/traction; stable deformity: plication or grafting', 'Concurrent refractory ED → consider a prosthesis'],
    patient: {
      whatItIs: 'A scar (plaque) in the wall of the penis — **Peyronie\'s disease** — that bends it, can hurt during erections, and sometimes shortens it or affects erections.',
      whyItMatters: 'It can make intercourse difficult or painful; it is linked to a hand condition (**Dupuytren\'s contracture**) and to diabetes, and it passes through an early painful phase before settling.',
      whatIsDone: 'The early phase is managed without surgery (**traction therapy**, or **collagenase** injections); once the bend is stable, surgery such as **plication**, **plaque incision and grafting**, or a **penile prosthesis** for accompanying erection problems is considered.',
      whatToWatch: 'Surgery is delayed until the curve has been stable for several months, as operating too early risks the deformity changing again.',
    },
  },
};

export const ANDRO_TOPICS = Object.keys(ANDROLOGY);
export function androFor(id) { return ANDROLOGY[id] || null; }
