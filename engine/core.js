/**
 * GENESIS deterministic computational primitives.
 *
 * Scope:
 * - software validation and educational comparison only
 * - no clinical interpretation
 * - no wet-lab protocol generation
 * - no claim of cross-species genetic compatibility
 *
 * All sequence-derived outputs are meaningful only when the supplied sequence
 * has documented provenance. The current prototype intentionally uses fixtures.
 */

const DNA_ALPHABET = /^[ACGT]*$/;
const DEFAULT_LIMITS = Object.freeze({ maxSequenceLength: 5000 });

export function sanitizeDNA(sequence = '') {
  return String(sequence ?? '').toUpperCase().replace(/[^ACGT]/g, '');
}

export function validateDNA(sequence = '', limits = DEFAULT_LIMITS) {
  const raw = String(sequence ?? '').toUpperCase();
  const cleaned = sanitizeDNA(raw);
  const removed = raw.replace(/[ACGT]/g, '').length;
  const valid = DNA_ALPHABET.test(cleaned) && cleaned.length > 0 && cleaned.length <= limits.maxSequenceLength;
  return {
    valid,
    sequence: cleaned,
    length: cleaned.length,
    removedCharacters: removed,
    reason: valid ? 'valid' : cleaned.length === 0 ? 'empty sequence' : cleaned.length > limits.maxSequenceLength ? 'sequence exceeds configured limit' : 'invalid sequence'
  };
}

export function gcContent(sequence) {
  const s = sanitizeDNA(sequence);
  if (!s.length) return 0;
  let gc = 0;
  for (const base of s) if (base === 'G' || base === 'C') gc++;
  return Math.round((gc / s.length) * 1000) / 10;
}

/**
 * Position-wise identity over the overlapping portion of two sequences.
 * This is deliberately named overlapIdentity so it is not mistaken for
 * an alignment-based biological homology estimate.
 */
export function overlapIdentity(a, b) {
  const x = sanitizeDNA(a), y = sanitizeDNA(b);
  const n = Math.min(x.length, y.length);
  if (!n) return 0;
  let matches = 0;
  for (let i = 0; i < n; i++) if (x[i] === y[i]) matches++;
  return Math.round((matches / n) * 1000) / 10;
}

export function globalAlignment(a, b, options = {}) {
  const x = sanitizeDNA(a), y = sanitizeDNA(b);
  const max = options.maxLength ?? DEFAULT_LIMITS.maxSequenceLength;
  if (x.length > max || y.length > max) throw new RangeError(`Alignment input exceeds ${max} bases.`);

  const gap = options.gap ?? -1;
  const match = options.match ?? 2;
  const mismatch = options.mismatch ?? -1;
  const rows = x.length + 1, cols = y.length + 1;
  const dp = Array.from({ length: rows }, () => new Int32Array(cols));
  for (let i = 1; i < rows; i++) dp[i][0] = i * gap;
  for (let j = 1; j < cols; j++) dp[0][j] = j * gap;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const diagonal = dp[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? match : mismatch);
      const up = dp[i - 1][j] + gap;
      const left = dp[i][j - 1] + gap;
      dp[i][j] = Math.max(diagonal, up, left);
    }
  }

  let i = x.length, j = y.length, ax = '', ay = '';
  while (i || j) {
    if (i && j && dp[i][j] === dp[i - 1][j - 1] + (x[i - 1] === y[j - 1] ? match : mismatch)) {
      ax = x[i - 1] + ax; ay = y[j - 1] + ay; i--; j--;
    } else if (i && dp[i][j] === dp[i - 1][j] + gap) {
      ax = x[i - 1] + ax; ay = '-' + ay; i--;
    } else {
      ax = '-' + ax; ay = y[j - 1] + ay; j--;
    }
  }

  let matches = 0, comparable = 0;
  for (let k = 0; k < ax.length; k++) {
    if (ax[k] !== '-' && ay[k] !== '-') {
      comparable++;
      if (ax[k] === ay[k]) matches++;
    }
  }
  return {
    a: ax,
    b: ay,
    score: dp[x.length][y.length],
    identity: comparable ? Math.round((matches / comparable) * 1000) / 10 : 0,
    comparableSites: comparable,
    alignedLength: ax.length,
    parameters: { match, mismatch, gap }
  };
}

export function systemOverlap(aSystems = [], bSystems = []) {
  const A = new Set(aSystems.map(String)), B = new Set(bSystems.map(String));
  const union = new Set([...A, ...B]);
  const shared = [...A].filter(x => B.has(x));
  return { shared, score: union.size ? Math.round((shared.length / union.size) * 1000) / 10 : 0 };
}

export function synchronizationMetrics(base, reference) {
  if (!base || !reference) throw new TypeError('Both base and reference objects are required.');
  const baseSeq = validateDNA(base.demoSequence);
  const refSeq = validateDNA(reference.demoSequence);
  if (!baseSeq.valid || !refSeq.valid) throw new Error('Both sequence fixtures must contain at least one valid DNA base.');

  const alignment = globalAlignment(baseSeq.sequence, refSeq.sequence);
  const gcA = gcContent(baseSeq.sequence), gcB = gcContent(refSeq.sequence);
  const gcSimilarity = Math.max(0, Math.round((100 - Math.abs(gcA - gcB) * 4) * 10) / 10);
  const overlap = systemOverlap(base.systems, reference.systems);
  const lengthCompatibility = Math.round((Math.min(baseSeq.length, refSeq.length) / Math.max(baseSeq.length, refSeq.length)) * 1000) / 10;
  const networkProxy = Math.round((overlap.score * 0.7 + alignment.identity * 0.3) * 10) / 10;
  const stability = Math.round((alignment.identity * 0.38 + gcSimilarity * 0.18 + overlap.score * 0.26 + lengthCompatibility * 0.18) * 10) / 10;
  const status = stability >= 72 ? 'STABLE MODEL' : stability >= 52 ? 'PARTIALLY STABLE' : 'UNSTABLE MODEL';

  return {
    sequenceIdentity: alignment.identity,
    gcSimilarity,
    systemOverlap: overlap.score,
    lengthCompatibility,
    networkProxy,
    stability,
    status,
    alignment,
    methodologyVersion: 'fixture-model-0.3'
  };
}

export function createExperimentId(date = new Date(), entropy = null) {
  const iso = new Date(date).toISOString().replace(/[-:TZ.]/g, '').slice(0, 12);
  const suffix = entropy ?? Math.floor(1000 + Math.random() * 9000);
  return `EXP-${iso}-${String(suffix).padStart(4, '0')}`;
}

export function stableExperimentFingerprint({ base, reference, metrics, engineVersion = '0.3.0' }) {
  const input = JSON.stringify({ base, reference, metrics, engineVersion });
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}
