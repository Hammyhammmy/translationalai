// Molecular oncology of GU cancers (Oncology tab), written at teaching depth — enough
// to talk a student through the "why", with a `pearls` summary. The cancers and the
// treatment CONCEPTS are grounded in molecular physiology so 2026 therapies follow
// logically. DRAFT — pending clinician review. Not medical advice.

export const ONCOLOGY = {
  // ---------- Treatment concepts ----------
  ar_axis: {
    kind: 'concept', label: 'AR-axis blockade (ADT & ARPIs)',
    mechanism: 'Prostate cells — normal and cancerous — grow under androgens: testosterone is converted by 5α-reductase to the more potent DHT, which binds the androgen receptor (AR) and switches on growth genes (the same axis as normal prostate physiology). Prostate cancer stays addicted to this signal, so the strategy is to shut the axis down at successive points. First-line is androgen-deprivation therapy (ADT) — GnRH agonists (after an initial testosterone "flare") or antagonists, or surgical castration — dropping testosterone to castrate levels. When the cancer adapts ("castration-resistant"), androgen-receptor pathway inhibitors (ARPIs) go further: abiraterone blocks CYP17, choking off androgen synthesis everywhere including the adrenals and tumour itself (so it’s given with a steroid); enzalutamide/apalutamide/darolutamide block the receptor directly and stop it entering the nucleus.',
    usedIn: 'The backbone of advanced/metastatic prostate cancer. ARPIs are now used early — alongside ADT — in high-risk and metastatic hormone-sensitive disease, not only at castration resistance.',
    pearls: ['Testosterone → DHT → AR → growth is the whole story', 'ADT lowers the hormone; ARPIs block synthesis (abiraterone) or the receptor (enzalutamide)', 'Give abiraterone with a steroid; expect the initial GnRH-agonist flare'],
    patient: {
      whatItIs: 'A group of treatments — **androgen-deprivation therapy (ADT)** and **androgen-receptor pathway inhibitors (ARPIs)** — that switch off the male-hormone signal prostate cancer depends on.',
      whyItMatters: 'Prostate cancer grows under androgens acting through the androgen receptor, so blocking this signal is the backbone of advanced and metastatic disease.',
      whatIsDone: '**ADT** lowers testosterone with a **GnRH agonist** or antagonist (or surgical castration); when the cancer adapts, **ARPIs** go further — **abiraterone** chokes off hormone synthesis (given with a steroid), while **enzalutamide** blocks the receptor directly.',
      whatToWatch: 'A **GnRH agonist** can cause an early testosterone flare, and long-term hormone blockade brings the side-effects of low testosterone.',
    },
  },
  checkpoint: {
    kind: 'concept', label: 'Checkpoint immunotherapy (PD-1 / PD-L1, CTLA-4)',
    mechanism: 'The immune system keeps T cells on a leash with "checkpoint" brakes so they don’t attack normal tissue. A key brake: PD-1 on the T cell binds PD-L1 displayed on cells, telling the T cell to stand down; CTLA-4 brakes earlier, during T-cell priming. Tumours hijack this by over-expressing PD-L1 — effectively wearing a "don’t attack me" badge. Checkpoint inhibitors are antibodies that cut these brake cables: anti-PD-1 (pembrolizumab, nivolumab), anti-PD-L1 (atezolizumab, avelumab), anti-CTLA-4 (ipilimumab). Releasing the brake lets pre-existing tumour-reactive T cells attack. The trade-off is immune-related adverse events (colitis, hepatitis, pneumonitis, endocrinopathies) — the same loss of self-tolerance, turned on normal organs.',
    usedIn: 'Urothelial/bladder cancer (including avelumab "switch maintenance" after platinum chemo) and RCC (e.g. nivolumab + ipilimumab, or a checkpoint inhibitor paired with a TKI).',
    pearls: ['Tumours show PD-L1 to hide; the drug removes the brake so T cells kill them', 'PD-1/PD-L1 act late (effector), CTLA-4 early (priming)', 'New symptom on therapy = think immune-related until proven otherwise'],
    patient: {
      whatItIs: 'A type of immunotherapy — an **immune checkpoint inhibitor** — that releases the brakes the immune system normally keeps on its T cells.',
      whyItMatters: 'Tumours hide by switching on these brakes (showing **PD-L1**); releasing them lets the body\'s own T cells attack the cancer. It is used in bladder/urothelial cancer and kidney cancer (**RCC**).',
      whatIsDone: 'Given as antibody infusions — anti-PD-1 (**pembrolizumab**, **nivolumab**), anti-PD-L1 (**atezolizumab**, **avelumab**) or anti-CTLA-4 (**ipilimumab**) — sometimes paired together or with a **TKI**.',
      whatToWatch: 'Releasing the brakes can make the immune system attack normal organs (immune-related effects such as colitis, hepatitis, pneumonitis or hormone-gland problems), so any new symptom on therapy is treated as immune-related until proven otherwise.',
    },
  },
  tki_vegf: {
    kind: 'concept', label: 'Anti-angiogenic TKIs (VEGF pathway)',
    mechanism: 'Clear-cell RCC almost always loses the VHL tumour-suppressor, so the cell behaves as if hypoxic: HIF accumulates and drives VEGF, building the abnormal blood supply the tumour depends on. Anti-angiogenic tyrosine-kinase inhibitors (sunitinib, pazopanib, cabozantinib, axitinib, lenvatinib) block VEGF-receptor signalling to starve that vasculature. Two neighbouring strategies hit the same axis: mTOR inhibitors (everolimus, temsirolimus) act downstream, and the HIF-2α inhibitor belzutifan blocks the driver itself.',
    usedIn: 'Renal cell carcinoma — frequently combined with a checkpoint inhibitor as modern first-line therapy.',
    pearls: ['VHL lost → HIF up → VEGF up → vasculature; block it with TKIs', 'RCC is "the angiogenesis cancer"', 'Belzutifan targets HIF-2α directly (useful in VHL syndrome)'],
    patient: {
      whatItIs: 'A group of targeted tablets — **anti-angiogenic tyrosine-kinase inhibitors (TKIs)** — that block the **VEGF** signal tumours use to build their blood supply.',
      whyItMatters: 'Clear-cell kidney cancer (**RCC**) relies heavily on new blood vessels, so cutting off that supply starves the tumour; this is a mainstay of advanced kidney cancer.',
      whatIsDone: 'Taken as tablets such as **sunitinib**, **pazopanib**, **cabozantinib** or **axitinib**, frequently combined with an **immune checkpoint inhibitor** as first-line treatment; related drugs include **mTOR inhibitors** (**everolimus**) and the HIF-2α blocker **belzutifan**.',
      whatToWatch: 'Because these tablets act on blood-vessel signalling throughout the body, they need ongoing specialist monitoring while taken.',
    },
  },
  fgfr: {
    kind: 'concept', label: 'FGFR inhibition (precision targeting)',
    mechanism: 'A meaningful subset of urothelial cancers are driven by activating FGFR3 mutations or fusions that keep a growth-signalling kinase switched on. Profile the tumour, and if FGFR-altered, erdafitinib blocks FGFR to shut the driver off. It’s the precision-oncology paradigm in bladder cancer: match the drug to the tumour’s specific lesion rather than treating everyone the same.',
    usedIn: 'FGFR2/3-altered advanced urothelial cancer (after molecular testing).',
    pearls: ['Only works if the tumour carries an FGFR alteration — test first', 'Watch hyperphosphataemia and ocular/skin effects'],
    patient: {
      whatItIs: 'A precision-medicine tablet — an **FGFR inhibitor** (**erdafitinib**) — that switches off an overactive growth signal in certain bladder cancers.',
      whyItMatters: 'A subset of urothelial (bladder) cancers are driven by **FGFR3** alterations; matching the drug to that specific fault is the precision-oncology approach.',
      whatIsDone: 'The tumour is first tested for an **FGFR** alteration, and only if present is **erdafitinib** given (as tablets) for advanced urothelial cancer.',
      whatToWatch: 'Known effects include raised blood phosphate (**hyperphosphataemia**) and eye and skin problems.',
    },
  },
  parp: {
    kind: 'concept', label: 'PARP inhibitors (synthetic lethality)',
    mechanism: 'Cells fix DNA double-strand breaks mainly by homologous recombination (HR). Tumours with a broken HR gene — BRCA1/2 or other HRR genes, found in ~20–25% of advanced prostate cancers — lose that route and lean on PARP-mediated backup repair. Inhibit PARP (olaparib, rucaparib) and the breaks can’t be fixed; the cancer cell accumulates lethal damage and dies, while HR-intact normal cells cope. That selective killing of an already repair-deficient cancer is "synthetic lethality."',
    usedIn: 'HRR/BRCA-mutated metastatic castration-resistant prostate cancer (after testing); ARPI combinations are emerging.',
    pearls: ['Synthetic lethality: kill the backup when the main repair is already broken', 'Biomarker-selected — test for BRCA/HRR first'],
    patient: {
      whatItIs: 'A targeted tablet — a **PARP inhibitor** (**olaparib**, **rucaparib**) — that blocks a cancer cell\'s backup system for repairing DNA.',
      whyItMatters: 'Tumours with a broken repair gene (**BRCA1/2** or other **HRR** genes, in about a fifth of advanced prostate cancers) rely on that backup, so removing it kills them while normal cells cope — an idea called synthetic lethality.',
      whatIsDone: 'The cancer is tested for a **BRCA/HRR** fault first, and if present a **PARP inhibitor** is used in metastatic castration-resistant prostate cancer.',
      whatToWatch: 'It is only used when testing confirms the repair fault, and is taken under specialist monitoring.',
    },
  },
  adc: {
    kind: 'concept', label: 'Antibody–drug conjugates (ADCs)',
    mechanism: 'An ADC is a guided missile: a monoclonal antibody that recognises a protein on the cancer-cell surface, chemically linked to a potent chemotherapy "payload." The antibody binds its target, the cell internalises the conjugate, and the payload is released inside — concentrating chemo in the tumour and sparing most normal tissue. In urothelial cancer, enfortumab vedotin targets Nectin-4 (a microtubule poison) and sacituzumab govitecan targets Trop-2.',
    usedIn: 'Advanced urothelial cancer, especially after platinum and checkpoint therapy; enfortumab vedotin + pembrolizumab is a major modern regimen.',
    pearls: ['Antibody = the address; payload = the chemo', 'Enfortumab → Nectin-4; sacituzumab → Trop-2', 'Toxicities track both target and payload (skin, neuropathy, hyperglycaemia)'],
    patient: {
      whatItIs: 'A treatment called an **antibody-drug conjugate (ADC)** — an antibody that homes to a target on the cancer cell, carrying a chemotherapy payload that is released inside the cell.',
      whyItMatters: 'It concentrates chemotherapy in the tumour and spares most normal tissue; in advanced bladder/urothelial cancer it is a major option, especially after platinum chemotherapy and immunotherapy.',
      whatIsDone: 'Given as infusions — **enfortumab vedotin** (targets Nectin-4) or **sacituzumab govitecan** (targets Trop-2); **enfortumab vedotin** with **pembrolizumab** is a leading modern regimen.',
      whatToWatch: 'Side-effects track both the target and the payload, including skin problems, nerve damage (neuropathy) and high blood sugar.',
    },
  },
  radioligand: {
    kind: 'concept', label: 'Radioligand therapy (PSMA) — theranostics',
    mechanism: 'Prostate-specific membrane antigen (PSMA) is heavily over-expressed on prostate-cancer cell surfaces. Attach a PSMA-binding molecule to a radioactive isotope and you get a theranostic pair: ⁶⁸Ga/¹⁸F-PSMA for PET imaging (find the disease) and ¹⁷⁷Lu-PSMA for therapy (the same homing molecule delivers β-radiation that kills the cell from within). It treats disease wherever PSMA lights up, including bone metastases.',
    usedIn: 'PSMA-positive metastatic castration-resistant prostate cancer (selected on PSMA PET).',
    pearls: ['Same target images AND treats — "theranostics"', 'Select patients by PSMA PET', 'Watch marrow suppression and salivary-gland effects'],
    patient: {
      whatItIs: 'A targeted radiation treatment — **PSMA radioligand therapy** (**¹⁷⁷Lu-PSMA**) — that delivers radiation directly to prostate-cancer cells.',
      whyItMatters: 'Prostate-cancer cells carry a lot of **PSMA**; the same homing molecule can both image the disease on a **PSMA PET** scan and treat it (theranostics), reaching cancer wherever it shows, including in bone.',
      whatIsDone: 'Patients are selected by **PSMA PET** scan, then given **¹⁷⁷Lu-PSMA** for PSMA-positive metastatic castration-resistant prostate cancer.',
      whatToWatch: 'Watch for lowered blood counts (marrow suppression) and salivary-gland effects.',
    },
  },
  bcg: {
    kind: 'concept', label: 'Intravesical BCG (immunotherapy)',
    mechanism: 'Bacille Calmette-Guérin — live attenuated mycobacteria — is instilled into the bladder after resecting non-muscle-invasive cancer. It provokes a vigorous local immune response (innate + T-cell) in the bladder wall that clears residual tumour. It is given as a 6-week INDUCTION course, then MAINTENANCE (intermittent instillations over 1–3 years) for high-risk disease — and it is maintenance that reduces both recurrence AND progression, the only intravesical agent clearly shown to do the latter. "BCG-unresponsive" disease (recurrence/persistence despite adequate BCG) is a distinct, higher-risk state with its own pathway.',
    usedIn: 'Intermediate/high-risk non-muscle-invasive bladder cancer, after TURBT. BCG-unresponsive disease → radical cystectomy (gold standard) or, to preserve the bladder, gem/doce, gene therapy (nadofaragene firadenovec, CR ~51%), the IL-15 superagonist nogapendekin alfa + BCG (Anktiva, CR ~71% and durable), or systemic pembrolizumab (CR ~41% in CIS — reserved later for its systemic toxicity).',
    pearls: ['Induction (6 weekly) + maintenance — maintenance is what cuts recurrence AND progression', 'The classic, most effective intravesical immunotherapy; purely local', 'Avoid with traumatic catheterisation/active infection (BCG sepsis risk)', 'BCG-unresponsive → cystectomy, or bladder-sparing gem/doce / nadofaragene / Anktiva+BCG / pembrolizumab'],
    patient: {
      whatItIs: 'An immunotherapy put directly into the bladder — **intravesical BCG** (live weakened **mycobacteria**) — after surface bladder tumours are removed.',
      whyItMatters: 'It triggers a strong local immune response that clears residual cancer, and is the only bladder instillation clearly shown to cut both recurrence AND progression in higher-risk non-muscle-invasive bladder cancer.',
      whatIsDone: 'Given as a 6-week **induction** course then **maintenance** instillations over 1-3 years, after **TURBT**; if the cancer is BCG-unresponsive the options are **radical cystectomy** or a bladder-sparing salvage.',
      whatToWatch: 'It is avoided after a traumatic catheterisation or with active infection because of the risk of **BCG sepsis**.',
    },
  },
  intravesical_chemo: {
    kind: 'concept', label: 'Intravesical chemotherapy (MMC, gemcitabine, gem/doce)',
    mechanism: 'Chemotherapy instilled directly into the bladder after TURBT — a high local concentration on the urothelium with minimal systemic absorption. A SINGLE immediate post-TURBT instillation of mitomycin C (MMC) or gemcitabine kills floating tumour cells and cuts early recurrence in low/intermediate-risk disease. Sequential gemcitabine + docetaxel ("gem/doce") is a two-drug intravesical regimen increasingly used for high-risk disease — both as salvage in BCG-unresponsive patients and, during BCG shortages, in BCG-naïve high-risk NMIBC — with 2-year recurrence-free survival roughly 2–3× that of single agents.',
    usedIn: 'Non-muscle-invasive bladder cancer: single immediate instillation (MMC/gemcitabine) for low/intermediate risk; gem/doce for high-risk or BCG-unresponsive disease.',
    pearls: ['Single immediate post-TURBT instillation (MMC or gemcitabine) cuts early recurrence', 'Gem/doce = intravesical salvage for BCG-unresponsive, and a BCG-naïve option during shortages', 'Key trap: intravesical docetaxel ≠ systemic docetaxel (a prostate drug) — here it is high-dose local therapy'],
    patient: {
      whatItIs: 'Chemotherapy placed directly into the bladder — **intravesical chemotherapy** (**mitomycin C**, **gemcitabine**, or **gem/doce**) — after surface tumours are removed.',
      whyItMatters: 'It delivers a high dose to the bladder lining with little absorption into the body, cutting recurrence in non-muscle-invasive bladder cancer.',
      whatIsDone: 'A single immediate instillation of **mitomycin C** or **gemcitabine** after **TURBT** for low/intermediate risk; **gem/doce** (gemcitabine plus docetaxel) for high-risk or BCG-unresponsive disease.',
      whatToWatch: 'A key trap is that intravesical **docetaxel** is high-dose local treatment, not the same as the systemic **docetaxel** used for prostate cancer.',
    },
  },

  // ---------- The GU cancers ----------
  prostate_ca: {
    kind: 'cancer', label: 'Prostate cancer', organ: 'urethra', caseId: 'prostate_carcinoma',
    lesion: 'The commonest male cancer; usually a peripheral-zone adenocarcinoma. Often slow and PSA-detected, but spans indolent to aggressive — graded by Gleason score / ISUP Grade Group. Spreads to pelvic nodes and characteristically to bone (osteoblastic metastases). It stays androgen-receptor driven, which dictates treatment.',
    driver: 'Androgen-receptor (AR) axis; ~20–25% carry HRR/BRCA DNA-repair defects.',
    markers: 'PSA for detection, monitoring and relapse-tracking after treatment; Gleason/Grade Group + stage define risk; PSMA on PET both images and serves as a therapeutic target. HRR/BRCA testing in advanced disease opens up PARP inhibitors.',
    treatmentNote: 'Localised disease is cured locally (surgery or radiotherapy) or watched (active surveillance for low-risk — avoid over-treating an indolent cancer). Once it spreads, every effective therapy attacks the AR axis or its vulnerabilities — that’s where ARPIs come first, then PARP, radioligand and chemo.',
    treatments: [
      { class: 'Active surveillance', drug: 'monitoring (PSA, MRI, biopsy)', rationale: 'low-risk disease — avoid over-treatment' },
      { class: 'Local (curative)', drug: 'radical prostatectomy or radiotherapy ± ADT', rationale: 'localised, potentially curable disease' },
      { class: 'AR-axis', drug: 'ADT + ARPI (abiraterone / enzalutamide)', rationale: 'AR-driven — shut the axis down; now used early in metastatic disease' },
      { class: 'PARP', drug: 'olaparib', rationale: 'HRR/BRCA-mutated — synthetic lethality' },
      { class: 'Radioligand', drug: '¹⁷⁷Lu-PSMA', rationale: 'PSMA-positive castration-resistant disease' },
      { class: 'Chemo', drug: 'docetaxel', rationale: 'high-volume / progressing disease' },
    ],
    pearls: ['Peripheral zone; osteoblastic bone mets; stays AR-driven', 'Risk = PSA + Grade Group + stage', 'Advanced: ADT + ARPI early → then PARP (if BRCA), Lu-PSMA, docetaxel'],
    patient: {
      whatItIs: 'The commonest male cancer — usually a slow-growing **adenocarcinoma** of the prostate, though it ranges from harmless to aggressive.',
      whyItMatters: 'It is often picked up by a raised **PSA** and characteristically spreads to bone; risk is graded by **Gleason score / Grade Group** and stage, which guide treatment.',
      whatIsDone: 'Low-risk disease may simply be watched (**active surveillance**); localised disease is cured by **radical prostatectomy** or **radiotherapy**; once it spreads, treatment shuts down the hormone (**ADT** plus an **ARPI**), then **PARP inhibitors** (if **BRCA**-mutated), **¹⁷⁷Lu-PSMA** and **docetaxel**.',
      whatToWatch: 'A rising **PSA** after treatment signals relapse, so it is tracked long-term.',
    },
  },
  urothelial_ca: {
    kind: 'cancer', label: 'Bladder / urothelial cancer', organ: 'bladder', caseId: 'urothelial_carcinoma',
    lesion: 'Cancer of the urothelium lining the bladder (most), but it can arise anywhere from renal pelvis to urethra — a "field change," so it’s often multifocal and recurrent. Strongly linked to smoking and occupational carcinogens. The critical fork is depth: non-muscle-invasive (bladder can be kept) vs muscle-invasive (needs aggressive treatment).',
    driver: 'Carcinogen field-change (smoking, dyes); FGFR3 alterations in a subset; high mutational burden.',
    markers: 'Diagnosis = cystoscopy + cytology + TURBT histology, where depth defines stage. Molecular profiling for FGFR alterations (→ erdafitinib); Nectin-4/Trop-2 and PD-L1 expression inform ADC/immunotherapy use.',
    treatmentNote: 'Treatment is staged by depth of invasion — three different worlds. NON-MUSCLE-INVASIVE (NMIBC): TURBT, then intravesical therapy to cut recurrence — a single immediate instillation of mitomycin C or gemcitabine for low/intermediate risk, and BCG induction + maintenance (or gem/doce) for high risk; BCG-unresponsive disease means cystectomy or a bladder-sparing salvage. MUSCLE-INVASIVE: neoadjuvant cisplatin chemotherapy then radical cystectomy (or bladder-preserving chemoradiation). METASTATIC: the systemic chemo backbone is gemcitabine + cisplatin (GC), then checkpoint inhibitors, the FGFR inhibitor erdafitinib, and antibody-drug conjugates — enfortumab vedotin + pembrolizumab is now a leading first-line. Note gemcitabine appears in BOTH worlds — intravesically in NMIBC, and systemically (with cisplatin) in advanced disease.',
    treatments: [
      { class: 'Local', drug: 'TURBT', rationale: 'resect and stage by depth' },
      { class: 'Intravesical chemo', drug: 'single post-TURBT MMC or gemcitabine; gem/doce for high-risk', rationale: 'NMIBC — high local dose to cut recurrence' },
      { class: 'Immuno (intravesical)', drug: 'BCG induction + maintenance', rationale: 'intermediate/high-risk NMIBC — cuts recurrence and progression' },
      { class: 'BCG-unresponsive', drug: 'radical cystectomy; or bladder-sparing gem/doce, nadofaragene, Anktiva+BCG, pembrolizumab', rationale: 'recurrence/persistence despite adequate BCG' },
      { class: 'Muscle-invasive', drug: 'neoadjuvant cisplatin + radical cystectomy (or chemoradiation)', rationale: 'tumour through the bladder muscle' },
      { class: 'Systemic chemo', drug: 'gemcitabine + cisplatin (GC)', rationale: 'neoadjuvant / first-line metastatic backbone' },
      { class: 'Checkpoint', drug: 'pembrolizumab; avelumab maintenance', rationale: 'release the immune brake (maintenance after platinum)' },
      { class: 'Targeted', drug: 'erdafitinib', rationale: 'FGFR-altered tumours' },
      { class: 'ADC', drug: 'enfortumab vedotin (+ pembrolizumab)', rationale: 'Nectin-4 — leading first-line metastatic regimen' },
    ],
    pearls: ['Field change → multifocal, recurrent; smoking-driven', 'Everything hinges on muscle-invasion: NMIBC vs MIBC vs metastatic', 'NMIBC: single immediate instillation (MMC/gemcitabine) + BCG (induction+maintenance) or gem/doce', 'Gemcitabine appears twice — intravesical (NMIBC) and systemic GC (gemcitabine + cisplatin) for advanced', 'Metastatic first-line increasingly enfortumab vedotin + pembrolizumab'],
    patient: {
      whatItIs: 'A cancer of the urothelium lining the urinary tract — most often the bladder — strongly linked to smoking and occupational chemicals.',
      whyItMatters: 'It tends to be multifocal and recurrent (a field change), and the crucial question is depth: surface (non-muscle-invasive) cancers can keep the bladder, while muscle-invasive ones need aggressive treatment.',
      whatIsDone: 'Diagnosis is by **cystoscopy**, urine **cytology** and **TURBT**; surface tumours get intravesical **mitomycin C**/**gemcitabine** or **BCG**; muscle-invasive disease needs **neoadjuvant cisplatin** then **radical cystectomy**; advanced disease uses **gemcitabine + cisplatin**, **immune checkpoint inhibitors**, **erdafitinib** and antibody-drug conjugates such as **enfortumab vedotin**.',
      whatToWatch: 'Because the whole lining is at risk it tends to recur, so ongoing **surveillance cystoscopy** is needed.',
    },
  },
  rcc: {
    kind: 'cancer', label: 'Kidney cancer (RCC)', organ: 'kidney', caseId: 'renal_mass',
    lesion: 'Renal cell carcinoma arises from the tubular epithelium; clear-cell is commonest. Usually found incidentally on imaging — the classic triad (flank pain, mass, haematuria) is late. Known for paraneoplastic effects and for being relatively chemo- and radio-resistant, so systemic treatment targets its biology, not classical chemo.',
    driver: 'VHL loss → HIF accumulation → VEGF over-drive (clear-cell); highly vascular.',
    markers: 'No routine serum marker — diagnosis and staging are imaging-based (contrast CT), histology from resection/biopsy. The VEGF-driven biology is what therapy exploits.',
    treatmentNote: 'Localised disease is surgical — partial nephrectomy where possible (preserve nephrons) or ablation for small tumours. Because RCC resists chemo/radiation, advanced disease is treated by hitting its vasculature (anti-angiogenic TKIs) and its immune evasion (checkpoint inhibitors), usually combined.',
    treatments: [
      { class: 'Local', drug: 'partial / radical nephrectomy or ablation', rationale: 'localised disease; spare nephrons when feasible' },
      { class: 'Anti-angiogenic TKI', drug: 'sunitinib / cabozantinib / axitinib', rationale: 'starve the VEGF-driven vasculature' },
      { class: 'Checkpoint', drug: 'nivolumab + ipilimumab, or TKI + immunotherapy', rationale: 'modern first-line for advanced disease' },
      { class: 'mTOR / HIF-2α', drug: 'everolimus; belzutifan', rationale: 'same VHL/HIF axis (later lines; VHL syndrome)' },
    ],
    pearls: ['Clear-cell = VHL/HIF/VEGF — the angiogenesis cancer', 'Chemo/radio-resistant → TKI + checkpoint, not chemo', 'Partial nephrectomy to preserve kidney'],
    patient: {
      whatItIs: 'Kidney cancer — **renal cell carcinoma** — most often the clear-cell type, arising from the kidney\'s tubules.',
      whyItMatters: 'It is usually found by chance on a scan (the classic triad of flank pain, a mass and blood in the urine is a late sign), and it resists ordinary chemotherapy and radiotherapy.',
      whatIsDone: 'There is no routine blood marker, so diagnosis is by **contrast CT**; localised disease is removed by **partial nephrectomy** (or ablation), while advanced disease is treated with **anti-angiogenic TKIs** and **immune checkpoint inhibitors**, usually combined.',
      whatToWatch: 'Watch for paraneoplastic effects, and follow-up imaging tracks this highly vascular disease.',
    },
  },
  testicular_ca: {
    kind: 'cancer', label: 'Testicular cancer', organ: 'testis', caseId: null,
    lesion: 'Commonest solid cancer in young men (15–35); presents as a painless, firm testicular lump (≠ the painful acute scrotum). Almost all are germ-cell tumours — seminoma vs non-seminomatous GCT (embryonal, yolk-sac, choriocarcinoma, teratoma) — which behave and are treated differently. Most arise from germ-cell neoplasia in situ. One of oncology’s great successes: curable even when metastatic.',
    driver: 'Germ-cell origin (seminoma / NSGCT); isochromosome 12p is characteristic.',
    markers: 'AFP, β-hCG and LDH do real work — diagnosis, prognosis (they’re in the staging system) and monitoring. AFP rises with yolk-sac/embryonal elements and is NEVER raised in pure seminoma (high AFP ⇒ treat as NSGCT). β-hCG rises in choriocarcinoma and some seminomas. LDH reflects bulk. Checked before orchidectomy, after (should fall by their half-life), and in follow-up — a rising marker means relapse.',
    treatmentNote: 'Radical INGUINAL orchidectomy both treats and gives histology — never biopsy trans-scrotally (it seeds tumour). Germ-cell tumours are exquisitely chemosensitive, so BEP cures even widespread disease; the rest is tailored by stage and type.',
    treatments: [
      { class: 'Local', drug: 'radical inguinal orchidectomy', rationale: 'diagnosis + primary treatment; never trans-scrotal' },
      { class: 'Chemo', drug: 'BEP (bleomycin/etoposide/cisplatin)', rationale: 'germ cells are exquisitely chemosensitive — curative even when metastatic' },
      { class: 'Surveillance / RT', drug: 'per stage', rationale: 'stage I seminoma — surveillance (± carboplatin); seminoma is radiosensitive' },
      { class: 'RPLND', drug: 'retroperitoneal lymph-node dissection', rationale: 'residual mass after chemo / selected NSGCT' },
    ],
    pearls: ['Painless lump, young man; inguinal (never trans-scrotal) orchidectomy', 'AFP excludes pure seminoma', 'Curable even when metastatic — BEP'],
    patient: {
      whatItIs: 'The commonest solid cancer in young men (aged 15-35), nearly always a **germ-cell tumour** (seminoma or non-seminoma).',
      whyItMatters: 'It typically presents as a painless, firm testicular lump and is one of oncology\'s great successes — curable even when it has spread.',
      whatIsDone: 'A **radical inguinal orchidectomy** both treats it and gives the diagnosis (never a trans-scrotal biopsy, which seeds tumour); chemotherapy (**BEP**) cures even widespread disease, with surveillance, **radiotherapy** or **RPLND** tailored by stage and type.',
      whatToWatch: 'Tumour markers (**AFP**, **β-hCG**, **LDH**) should fall after treatment, and a later rise signals relapse.',
    },
  },
};

export const ONC_CANCERS = Object.keys(ONCOLOGY).filter((k) => ONCOLOGY[k].kind === 'cancer');
export const ONC_CONCEPTS = Object.keys(ONCOLOGY).filter((k) => ONCOLOGY[k].kind === 'concept');
export function oncologyFor(id) { return ONCOLOGY[id] || null; }
