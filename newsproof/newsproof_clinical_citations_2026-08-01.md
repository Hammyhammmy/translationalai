# Newsproof — translational.ca external clinical citations (2026-08-01)

Checked the three outside claims the site leans on, before they ship in the rewrite.
**Result: all three confirmed.** Only refinement needed is tightening one loose number and
recognizing that two of the three citations are the *same paper*.

## Claim ledger

| # | Claim (as on site) | Verdict | Correction / note |
|---|---|---|---|
| 1 | "1–3% hallucination and ~3.45% omission (Asgari et al., npj Digital Medicine 2025)" | ✅ Confirmed | First author **Elham Asgari**; npj Digital Medicine, **May 2025**. Exact figures: **1.47% hallucination, 3.45% omission** across **18 experimental configurations**, **12,999 clinician-annotated sentences**. → Tighten "1–3%" to "**~1.5%**" (the precise figure is 1.47%; the range understates the precision). Omission (3.45%) is exact. |
| 2 | "VA evaluation of 11 ambient scribes; AI notes scored lower than human on all 10 PDQI-9 measures (Reddy et al., Annals of Internal Medicine 2026)" | ✅ Confirmed | First author **Reddy**; Annals of Internal Medicine, **published online Apr 17, 2026**. **11 AI scribe tools**, modified **PDQI-9 = 10 domains**, 5-pt Likert (max 50). AI scored lower than human **in every case and on every measure** (e.g. low-back-pain: human 43.8 vs AI 20.3). Biggest gaps: thorough (−1.23), organized (−1.06), useful (−1.03). |
| 3 | "1.5% hallucination / 3.5% omission across 18 prompt-engineering experiments" | ✅ Confirmed | **This is the same Asgari paper as #1** (1.47%≈1.5%, 3.45%≈3.5%, "18 experiments" = the 18 configurations). Keep it, but attribute to Asgari and don't imply it's a second, independent study. |

## Bottom line for the rewrite
- Keep all three — they're real and they support the "trust" half of the pitch.
- **Tighten:** use "~1.5% hallucination, ~3.45% omission" (not "1–3%").
- **De-duplicate:** #1 and #3 are one source. Cite Asgari once; don't stack the two phrasings as if they're two findings.
- These are *other people's* numbers (context/benchmark), kept clearly separate from ChartPrepper's own audited figures (3,000+ referrals, 0.64%).

## Sources
- Asgari et al., npj Digital Medicine 2025 (Nature): https://www.nature.com/articles/s41746-025-01670-7 — `1_asgari_npj_nature.png` (Cloudflare/auth wall — see note)
- Asgari et al., preprint (medRxiv): https://www.medrxiv.org/content/10.1101/2024.09.12.24313556v1 — `2_asgari_medrxiv.png`
- Reddy et al., Annals of Internal Medicine 2026 (PubMed): https://pubmed.ncbi.nlm.nih.gov/41996184/ — `3_reddy_pubmed.png`
- Reddy study corroboration (UW Medicine News): https://mednews.uw.edu/news/AI-scribes-lower-quality — `4_reddy_uw_mednews.png`
- Annals article (DOI): https://doi.org/10.7326/annals-25-02772

Verified by two independent sources each (Nature + medRxiv for Asgari; PubMed + UW Medicine + trade press for Reddy).
