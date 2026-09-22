import assert from 'node:assert/strict';

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { organisms, getOrganism } from '../data/organisms.js';
import {
  sanitizeDNA, validateDNA, gcContent, overlapIdentity, globalAlignment,
  systemOverlap, synchronizationMetrics, createExperimentId, stableExperimentFingerprint
} from '../engine/core.js';
import { DATA_POLICY, PRIMARY_SOURCES } from '../data/sources.js';

assert.equal(organisms.length, 50, 'Archive must contain exactly 50 specimens.');
assert.equal(new Set(organisms.map(o => o.id)).size, 50, 'Specimen IDs must be unique.');
for (const specimen of organisms) {
  assert.ok(specimen.id && specimen.name && specimen.latin && specimen.group, `Incomplete specimen: ${specimen.id}`);
  assert.ok(Array.isArray(specimen.systems) && specimen.systems.length > 0, `Missing systems: ${specimen.id}`);
  assert.ok(/^[ACGT]+$/.test(specimen.demoSequence), `Invalid fixture DNA: ${specimen.id}`);
}
assert.equal(getOrganism('tiger').name, 'Tiger');
assert.equal(sanitizeDNA('ATG-CG x!'), 'ATGCG');
assert.deepEqual(validateDNA('ATG-CG x!').sequence, 'ATGCG');
assert.equal(gcContent('GGCCAT'), 66.7);
assert.equal(overlapIdentity('AAAA', 'AAAT'), 75);
const alignment = globalAlignment('ATGC', 'ATGT');
assert.equal(alignment.a.length, alignment.b.length);
assert.equal(alignment.identity, 75);
assert.equal(systemOverlap(['a','b'], ['b','c']).score, 33.3);
const human = { id:'human', name:'Human Reference', demoSequence:'ATGCGTACCGATGCTAGCTAACGTTACG', systems:['development','neurobiology','musculoskeletal'] };
const result = synchronizationMetrics(human, organisms.find(o => o.id === 'tiger'));
for (const key of ['sequenceIdentity','gcSimilarity','systemOverlap','lengthCompatibility','networkProxy','stability']) {
  assert.ok(Number.isFinite(result[key]), `${key} must be numeric`);
  assert.ok(result[key] >= 0 && result[key] <= 100, `${key} must be bounded 0–100`);
}
assert.ok(['STABLE MODEL','PARTIALLY STABLE','UNSTABLE MODEL'].includes(result.status));
assert.match(createExperimentId(new Date('2026-01-02T03:04:05Z'), 1234), /^EXP-202601020304-1234$/);
assert.match(stableExperimentFingerprint({base:'human',reference:'tiger',metrics:result}), /^[0-9a-f]{8}$/);
assert.equal(DATA_POLICY.personalGenomicUploads, false);
assert.ok(PRIMARY_SOURCES.length >= 3);

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const html = await readFile(join(projectRoot, 'index.html'), 'utf8');
const packageJson = JSON.parse(await readFile(join(projectRoot, 'package.json'), 'utf8'));
assert.ok(html.includes('<title>GENESIS'), 'index.html must contain the GENESIS title.');
assert.ok(html.includes('assets/styles.css'), 'index.html must load the stylesheet.');
assert.ok(html.includes('engine/app.js'), 'index.html must load the application engine.');
assert.equal(packageJson.scripts?.start, 'node scripts/serve.mjs', 'Start script must be configured.');
assert.ok(packageJson.scripts?.verify, 'Verify script must be configured.');

assert.equal(packageJson.version, '0.6.0', 'Package version must match the release.');
console.log('GENESIS v0.6 verification: PASS');
