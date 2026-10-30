// The front-view urinary tract, shared by every diagram that draws it: the Urinary
// Interactive figure, the consult players and the receptor tags. One source for its
// outlines, sizes and named points, so a fix here moves every diagram together.
// The diagram faces the reader: the viewer's right is the patient's LEFT ('B' side).
// motion.test.mjs checks the Interactive page's static outlines still match these.

export const KIDNEY_R = 'M100,76 C68,76 54,110 54,142 C54,178 70,208 102,208 C128,208 144,192 142,176 C140,164 128,156 128,142 C128,128 140,120 142,108 C144,90 128,76 100,76 Z';
export const KIDNEY_L = 'M300,76 C332,76 346,110 346,142 C346,178 330,208 298,208 C272,208 256,192 258,176 C260,164 272,156 272,142 C272,128 260,120 258,108 C256,90 272,76 300,76 Z';
export const URETER_R = 'M128,156 C146,232 136,300 148,360 C154,400 166,436 184,466';
export const URETER_L = 'M272,156 C254,232 264,300 252,360 C246,400 234,436 216,466';

// Outlet heights (viewBox y). Female: short urethra, no prostate or testes.
export const GEO = {
  male: { neck: 508, ext: 553, meatus: 616, streamEnd: 648 },
  female: { neck: 508, ext: 530, meatus: 562, streamEnd: 596 },
};

// Bladder size at fill f (0 = empty, 1 = full); it sits on the neck, so cy = neck - ry.
export const bladderSize = f => ({ ry: 26 + 38 * f, rx: 38 + 40 * f });

// Named points for hotspots, overlays, callouts and receptor tags.
export function anchors(sex) {
  const g = GEO[sex], m = g.meatus;
  return {
    kidney: [300, 142], nephron: [300, 142], ureter: [256, 320], bladder: [200, 470], sphincters: [200, g.ext + 4],
    prostate: [200, 530], urethra: [200, (g.ext + m) / 2 + 6], exit: [200, m], testis: [234, 652], neural: [200, 470], overview: [200, 330],
    bladderNeck: [200, g.neck], distalUreter: [222, 455],   // distal ureter: the patient's left, just above the UVJ
  };
}
