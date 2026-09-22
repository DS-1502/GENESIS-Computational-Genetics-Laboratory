import { organisms, getOrganism } from '../data/organisms.js';
import { synchronizationMetrics, createExperimentId, globalAlignment, stableExperimentFingerprint } from './core.js';
import { DATA_POLICY, PRIMARY_SOURCES } from '../data/sources.js';

const HUMAN = {
  id: 'human', name: 'Human Reference', latin: 'Homo sapiens', group: 'Mammalia', region: 'GRCh38 reference assembly',
  systems: ['development','neurobiology','musculoskeletal'], demoSequence: 'ATGCGTACCGATGCTAGCTAACGTTACG', code: 'REF-HUM',
  summary: 'Standardized human reference used as a computational baseline. It is not an individual person and does not represent personal DNA.'
};

const ENGINE_VERSION = '0.6.0';
const STORAGE_KEY = 'genesis-experiments-v1';
const MAX_EXPERIMENTS = 100;
const state = {
  view: 'overview', base: 'human', reference: 'tiger', query: '', group: 'ALL',
  experiments: loadExperiments(), lastResult: null, activeSpecimen: null, error: null
};

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const species = id => id === 'human' ? HUMAN : getOrganism(id);
const allReferences = [HUMAN, ...organisms];
const imageCache = new Map();
const imagePageCache = new Map();
function wikiTitle(o){ return o.id==='human' ? '' : (o.name.includes(' ') ? o.name : o.latin); }
function specimenImage(o, cls='specimen-image', eager=false){
  if(o.id==='human') return `<div class="human-reference-plate"><div class="human-silhouette">H</div><span>GRCh38<br>REFERENCE</span></div>`;
  const cached=imageCache.get(o.id);
  const src=cached || `https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/320px-Placeholder_view_vector.svg.png`;
  return `<div class="${cls}" data-specimen-image="${esc(o.id)}" data-wiki-title="${esc(wikiTitle(o))}"><img src="${src}" alt="${esc(o.name)} specimen" loading="${eager?'eager':'lazy'}"><div class="image-overlay"><span>${esc(o.code)}</span><span>FIELD REFERENCE</span></div></div>`;
}
async function hydrateImages(){
  const nodes=[...document.querySelectorAll('[data-specimen-image]')];
  await Promise.all(nodes.map(async node=>{
    const id=node.dataset.specimenImage, title=node.dataset.wikiTitle;
    if(imageCache.has(id)){ node.querySelector('img').src=imageCache.get(id); return; }
    try{
      const q=encodeURIComponent(`${title} filetype:bitmap`);
      const url=`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=900&format=json&origin=*`;
      const r=await fetch(url,{headers:{accept:'application/json'}});
      if(!r.ok) throw new Error('media source unavailable');
      const d=await r.json(); const page=Object.values(d?.query?.pages||{})[0]; const info=page?.imageinfo?.[0]; const src=info?.thumburl||info?.url;
      if(src){ imageCache.set(id,src); imagePageCache.set(id,page?.canonicalurl||'https://commons.wikimedia.org/'); const img=node.querySelector('img'); img.src=src; img.dataset.source=imagePageCache.get(id); node.classList.add('loaded'); }
    }catch{ node.classList.add('image-fallback'); }
  }));
}

function imageAttribution(){ return `<div class="image-source-note">SPECIMEN PHOTOGRAPHY · THUMBNAILS RESOLVED FROM PUBLIC WIKIPEDIA MEDIA SOURCES · IMAGE AVAILABILITY MAY VARY</div>`; }

function loadExperiments() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_EXPERIMENTS) : [];
  } catch { return []; }
}
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.experiments.slice(0, MAX_EXPERIMENTS))); return true; }
  catch { toast('Browser storage is unavailable; experiment was not persisted.'); return false; }
}
function pct(value) { return `${Number(value).toFixed(Number(value) % 1 ? 1 : 0)}%`; }
function clampPct(value) { return Math.max(0, Math.min(100, Number(value) || 0)); }
function toast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('show'); clearTimeout(window.__genesisToast); window.__genesisToast = setTimeout(() => el.classList.remove('show'), 2200); }
function header(title) { $('#breadcrumbs').textContent = `GENESIS / ${title.toUpperCase()}`; }
function setView(view) { state.view = view; document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.view === view)); render(); window.scrollTo({top:0, behavior:'smooth'}); }
function optionList(list, selected, includeHuman = false) { return (includeHuman ? [HUMAN, ...list] : list).map(o => `<option value="${o.id}" ${o.id === selected ? 'selected' : ''}>${esc(o.name)}</option>`).join(''); }
function tagList(items) { return items.map(x => `<span class="tag">${esc(x)}</span>`).join(''); }
function metric(label, value, note='') { const v=clampPct(value); return `<div class="metric-row"><div><span>${esc(label)}</span>${note ? `<small>${esc(note)}</small>` : ''}</div><div class="bar"><i style="--w:${v}%"></i></div><b>${pct(v)}</b></div>`; }
function stat(value, label) { return `<div class="stat"><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`; }

function overview() {
  header('Overview');
  const featured = species(state.reference);
  const next = species(state.base === 'human' ? 'electric-eel' : 'axolotl');
  const archiveCount = organisms.length;
  const experimentCount = state.experiments.length;
  const dna = Array.from({length: 14}, (_, i) => `<span class="helix-step" style="--i:${i}"><b></b><i></i></span>`).join('');
  const labModules = [
    ['01','ARCHIVE','FIELD BIOLOGY','Enter the specimen collection and learn why each organism is biologically unusual.'],
    ['02','COMPARE','GENOMIC DIFFERENCE','Place two references side-by-side and inspect sequence and system differences.'],
    ['03','SYNCHRONIZE','COMPUTATIONAL TRACE','Watch reference streams enter the alignment core and resolve into measurable components.'],
    ['04','PERTURB','NETWORK RESPONSE','Disturb a simplified biological network and observe the propagation path.'],
    ['05','EVOLVE','SCENARIO CHAMBER','Follow a model from baseline through perturbation, stability testing and phenotype interpretation.'],
    ['06','NOTEBOOK','RESEARCH MEMORY','Save experiments locally and return to questions you have already explored.']
  ];
  return `
  <section class="genesis-opening">
    <div class="opening-copy">
      <div class="eyebrow"><span class="live-dot"></span> GENESIS / COMPUTATIONAL GENETICS LABORATORY · 2026</div>
      <div class="hero-title editorial">GENESIS</div>
      <div class="opening-rule"></div>
      <h1>Explore the boundary between biological systems and computational possibility.</h1>
      <p class="hero-lede">GENESIS is an independent student-built laboratory concept by <strong>Dhvan Shah</strong>. It uses comparative biology, sequence analysis and controlled virtual models to turn extreme adaptations into questions you can investigate.</p>
      <div class="hero-actions"><button class="primary-btn" data-action="enter">ENTER THE FIELD ARCHIVE ↗</button><button class="secondary-btn" data-view="question">OPEN TODAY'S QUESTION</button></div>
      <div class="opening-meta"><span><b>${String(archiveCount).padStart(2,'0')}</b> REFERENCE SPECIMENS</span><span><b>07</b> ANALYTICAL STAGES</span><span><b>${String(experimentCount).padStart(2,'0')}</b> SAVED EXPERIMENTS</span></div>
    </div>
    <div class="opening-observation">
      <div class="observation-frame">
        ${specimenImage(featured,'opening-specimen',true)}
        <div class="observation-stamp"><span>FIELD OBSERVATION</span><strong>${esc(featured.code)}</strong></div>
        <div class="observation-caption"><div><span>ACTIVE REFERENCE</span><strong>${esc(featured.name)}</strong><em>${esc(featured.latin)}</em></div><div class="observation-systems">${featured.systems.slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('')}</div></div>
      </div>
      <div class="sequence-plate"><span>REFERENCE STREAM / FIXTURE WINDOW</span><div class="helix" aria-hidden="true">${dna}</div><div class="sequence-plate-footer"><span>ATGC</span><span>SEQUENCE LAYER</span><span>01 / 07</span></div></div>
    </div>
  </section>

  <section class="manifesto-band">
    <div class="manifesto-index">GENESIS / 000</div>
    <div><div class="eyebrow">THE IDEA</div><h2>What if we could explore evolutionary possibilities computationally before claiming they exist?</h2></div>
    <p>GENESIS deliberately sits between documented biology and speculative modelling. It does not promise human–animal fusion. It gives users a way to see why biological systems are harder than a simple sequence match: regulation, networks, development and phenotype all matter.</p>
  </section>

  <section class="system-atlas panel">
    <div class="atlas-heading"><div><div class="panel-kicker">BIOLOGICAL SYSTEM ATLAS</div><h2>Seven layers between a sequence and a phenotype.</h2></div><span>TRACE / 01—07</span></div>
    <div class="atlas-grid">${['DNA','GENE / REGION','REGULATION','RNA / PROTEIN','NETWORK','SYSTEM','PHENOTYPE'].map((x,i)=>`<div class="atlas-cell"><span>0${i+1}</span><div class="atlas-glyph glyph-${i+1}"></div><strong>${x}</strong><p>${['Information is stored.','Regions are compared.','Control relationships matter.','Expression is represented.','Interactions propagate.','Functions emerge.','The model produces an interpretable scenario.'][i]}</p></div>`).join('')}</div>
    <div class="atlas-foot"><span>GENESIS PRINCIPLE</span><strong>Similarity is an observation. Compatibility is a systems question.</strong></div>
  </section>

  <section class="archive-window">
    <div class="section-heading-wide"><div><div class="eyebrow">FIELD ARCHIVE</div><h2>Extreme biology, documented as specimens.</h2><p>Every non-human reference is presented as an organism with a biological story—not as a “superpower” catalogue.</p></div><button class="secondary-btn" data-view="organisms">OPEN ALL ${archiveCount} SPECIMENS →</button></div>
    <div class="specimen-strip">${[featured,next,species('golden-poison-frog'),species('wandering-spider')].map((o,i)=>`<article class="strip-specimen"><div class="strip-index">${String(i+1).padStart(2,'0')}</div>${specimenImage(o,'strip-image')}<div class="strip-copy"><span>${esc(o.code)} · ${esc(o.group)}</span><strong>${esc(o.name)}</strong><em>${esc(o.latin)}</em><p>${esc(o.systems.slice(0,2).join(' · '))}</p><button class="small-btn" data-organism="${o.id}">OPEN DOSSIER →</button></div></article>`).join('')}</div>
  </section>

  <section class="laboratory-route panel">
    <div class="route-header"><div><div class="panel-kicker">LABORATORY ROUTE</div><h2>Six rooms. One investigation.</h2></div><span>FOLLOW THE TRACE</span></div>
    <div class="route-list">${labModules.map(x=>`<button class="route-room" data-view="${x[1].toLowerCase().replace('archive','organisms').replace('compare','comparison').replace('synchronize','sync').replace('perturb','perturbation').replace('evolve','evolution').replace('notebook','notebook')}"><span>${x[0]}</span><div><b>${x[1]}</b><strong>${x[2]}</strong><p>${x[3]}</p></div><i>↗</i></button>`).join('')}</div>
  </section>

  <section class="research-board-deep">
    <article class="research-question-card panel"><div class="panel-kicker">RESEARCH BOARD / TODAY</div><div class="question-mark">?</div><h2>Why does sequence similarity not automatically imply functional compatibility?</h2><p>Start with a human reference and an extreme biological adaptation. Compare first. Synchronize second. Then see what the network model refuses to simplify.</p><button class="primary-btn" data-view="question">TAKE THE QUESTION →</button></article>
    <article class="console-card panel panel-gridline"><div class="panel-kicker">LAB CONSOLE / IDLE</div><div class="console-terminal"><div><span>00:00:01</span> ARCHIVE / 50 specimens indexed</div><div><span>00:00:02</span> REFERENCE / GRCh38 baseline registered</div><div><span>00:00:03</span> ENGINE / deterministic comparison ready</div><div><span>00:00:04</span> MODEL / perturbation network standing by</div><div><span>00:00:05</span> LAB / awaiting researcher input<span class="cursor"></span></div></div><div class="console-footer"><span>SYSTEM READY</span><span>NO ACTIVE EXPERIMENT</span></div></article>
  </section>

  <section class="idea-behind panel">
    <div class="idea-portrait"><div class="portrait-mark">DS</div><span>CONCEPT / RESEARCH DIRECTION</span></div>
    <div class="idea-copy"><div class="panel-kicker">THE IDEA BEHIND GENESIS</div><h2>Designed from a question, not a template.</h2><p>GENESIS began as an independent student concept by <strong>Dhvan Shah</strong>, inspired by the intersection of genetics, evolution and the speculative biological worlds of science fiction. The project asks a simple question: if computation could expose the hidden constraints between biological systems, what would we learn by exploring them?</p><div class="idea-credit"><span>CONCEPT, RESEARCH DIRECTION & VISUALIZATION</span><strong>Dhvan Shah</strong><span>DESIGNED & DEVELOPED BY</span><strong>Dhvan Shah</strong></div></div>
  </section>

  <footer class="observatory-footer"><span>GENESIS / COMPUTATIONAL GENETICS & EVOLUTION LABORATORY</span><span>EDUCATIONAL COMPUTATIONAL SIMULATION · NOT A CLINICAL OR GENETIC-ENGINEERING SYSTEM</span><span>© 2026 DHVAN SHAH</span></footer>`;
}
function archive() {
  header('Organism Archive');
  const groups = ['ALL', ...new Set(organisms.map(o => o.group))];
  const filtered = organisms.filter(o => (state.group === 'ALL' || o.group === state.group) && `${o.name} ${o.latin} ${o.region} ${o.systems.join(' ')} ${o.summary}`.toLowerCase().includes(state.query.toLowerCase()));
  return `<section class="section-head"><div><div class="eyebrow">SPECIMEN DATABASE</div><h2>Extreme Biology Archive</h2><p>${filtered.length} of ${organisms.length} specimens visible. The archive is a curated learning set, not a biological superiority ranking.</p></div><div class="archive-count mono">${String(filtered.length).padStart(2,'0')} / ${String(organisms.length).padStart(2,'0')}</div></section>
  <div class="archive-toolbar"><input class="input" id="species-search" placeholder="Search specimen, taxonomy, adaptation..." value="${esc(state.query)}"><select class="select" id="group-filter">${groups.map(g=>`<option value="${esc(g)}" ${g===state.group?'selected':''}>${esc(g)}</option>`).join('')}</select></div>
  <div class="species-grid">${filtered.map(o=>`<article class="species-card">${specimenImage(o,'species-image')}<div class="species-body"><div class="species-code"><span>${o.code}</span><span class="species-class">${esc(o.group)}</span></div><h3>${esc(o.name)}</h3><div class="latin">${esc(o.latin)}</div><p>${esc(o.summary)}</p><div class="tag-row">${tagList(o.systems.slice(0,3))}</div><div class="species-footer"><span>${esc(o.region)}</span><button class="small-btn" data-organism="${o.id}">OPEN DOSSIER →</button></div></div></article>`).join('')}</div>`;
}

function dossier(id) {
  const o = species(id); state.activeSpecimen = id; header(`Archive / ${o.name}`);
  return `<div class="detail-layout"><section class="panel dossier-hero"><div class="panel-kicker">${o.code} / SPECIMEN DOSSIER</div>${specimenImage(o,'dossier-image',true)}<h1>${esc(o.name)}</h1><div class="latin">${esc(o.latin)}</div><p>${esc(o.summary)}</p><div class="tag-row">${tagList(o.systems)}</div><div class="dossier-actions"><button class="primary-btn" data-action="compare-from" data-id="${o.id}">COMPARE WITH HUMAN</button><button class="secondary-btn" data-action="reference-from" data-id="${o.id}">USE AS REFERENCE</button></div></section><section class="panel detail-block"><div class="panel-kicker">RESEARCH PROFILE</div><h2>Why this specimen matters</h2><div class="profile-list"><div><b>CLASSIFICATION</b><span>${esc(o.group)}</span></div><div><b>REGION</b><span>${esc(o.region)}</span></div><div><b>SYSTEMS</b><span>${o.systems.map(esc).join(' · ')}</span></div><div><b>DATA STATUS</b><span>${esc(o.sourceStatus)}</span></div></div><div class="result-banner"><strong>SCIENTIFIC FRAMING</strong><p>This specimen is a comparative reference for biological adaptation. GENESIS does not infer that an observed adaptation can be transferred to humans.</p></div></section></div>`;
}

function comparison() {
  header('Comparative Analysis'); const a=species(state.base), b=species(state.reference); const al=globalAlignment(a.demoSequence,b.demoSequence);
  return `<section class="section-head"><div><div class="eyebrow">MODULE 03</div><h2>Comparative Analysis</h2><p>Inspect the two references before entering synchronization.</p></div></section><div class="comparison-grid"><section class="panel selector-panel"><label>BASE ORGANISM</label><select id="base-select">${optionList(organisms,state.base,true)}</select><label>REFERENCE ORGANISM</label><select id="reference-select">${optionList(organisms,state.reference,false)}</select><button class="primary-btn" data-action="run-compare">RUN COMPARISON</button></section><section class="panel comparison-stage"><div class="comparison-specimen">${specimenImage(a,'compare-image',true)}<div><div class="panel-kicker">BASE ORGANISM</div><h3>${esc(a.name)}</h3><div class="latin">${esc(a.latin)}</div></div></div><div class="comparison-reactor"><div class="reactor-ring"></div><span>COMPARE</span><small>ALIGN / DIFFER / TRACE</small></div><div class="comparison-specimen">${specimenImage(b,'compare-image',true)}<div><div class="panel-kicker">REFERENCE ORGANISM</div><h3>${esc(b.name)}</h3><div class="latin">${esc(b.latin)}</div></div></div></section></div><section class="panel detail-block" style="margin-top:14px"><div class="panel-kicker">DEMONSTRATION SEQUENCE WINDOW</div><div class="sequence-grid"><div><span class="sequence-label">${esc(a.name)}</span><pre class="sequence">${esc(al.a)}</pre></div><div><span class="sequence-label">ALIGNMENT</span><pre class="sequence match">${esc(al.a.split('').map((c,i)=>c===al.b[i]&&c!=='-'?'|':' ').join(''))}</pre></div><div><span class="sequence-label">${esc(b.name)}</span><pre class="sequence">${esc(al.b)}</pre></div></div><div class="notice compact"><b>PROTOTYPE DATA NOTICE</b><span>This sequence window is an internal deterministic fixture used to test the alignment engine. It is not presented as a real genomic locus.</span></div></section>`;
}

function sync() {
  header('Genetic Synchronization');
  const a=species(state.base), b=species(state.reference), m=synchronizationMetrics(a,b); state.lastResult=m;
  const aligned=globalAlignment(a.demoSequence,b.demoSequence);
  const cells=aligned.a.split('').map((c,i)=>{const d=aligned.b[i]; const same=c===d&&c!=='-'; return `<span class="align-cell ${same?'same':c==='-'||d==='-'?'gap':'diff'}" style="--d:${(i%9)*.07}s">${esc(c)}</span>`}).join('');
  return `<section class="section-head"><div><div class="eyebrow">MODULE 04 / SIGNATURE EXPERIENCE</div><h2>Genetic Synchronization</h2><p>Two references enter the same computational frame. The sequence streams are aligned first; the model then exposes what remains conserved, different or unresolved.</p></div><div class="module-stamp">TRACE / ${ENGINE_VERSION}</div></section>
  <section class="sync-lab panel">
    <div class="sync-lab-head"><div><span>EXPERIMENTAL CHAMBER</span><strong>${esc(a.name)} <i>×</i> ${esc(b.name)}</strong></div><div><span>MODEL STATE</span><b id="sync-state">READY TO RUN</b></div></div>
    <div class="sync-chamber">
      <div class="sync-source source-left"><div class="source-photo">${specimenImage(a,'sync-image',true)}</div><span>BASELINE</span><strong>${esc(a.name)}</strong><small>${esc(a.latin)}</small></div>
      <div class="sync-beam"><div class="beam-line"></div><div class="beam-particles p-a"></div><div class="beam-particles p-b"></div><div class="sync-reactor"><div class="reactor-grid"></div><strong>SYNC</strong><span>ALIGNMENT CORE</span></div><div class="beam-label top">SEQUENCE STREAM A</div><div class="beam-label bottom">SEQUENCE STREAM B</div></div>
      <div class="sync-source source-right"><div class="source-photo">${specimenImage(b,'sync-image',true)}</div><span>REFERENCE</span><strong>${esc(b.name)}</strong><small>${esc(b.latin)}</small></div>
    </div>
    <div class="sync-sequence-console"><div class="sequence-console-head"><span>ALIGNMENT WINDOW / ${aligned.a.length} SITES</span><span>GREEN = CONSERVED · AMBER = DIFFERENCE · RED = GAP</span></div><div class="sequence-lanes"><div class="lane-label">A</div><div class="align-lane">${cells}</div><div class="lane-label">B</div><div class="align-lane">${aligned.b.split('').map((c,i)=>{const d=aligned.a[i]; const same=c===d&&c!=='-'; return `<span class="align-cell ${same?'same':c==='-'||d==='-'?'gap':'diff'}" style="--d:${(i%9)*.07}s">${esc(c)}</span>`}).join('')}</div></div></div>
    <div class="sync-readout expanded-readout"><div><span>SEQUENCE IDENTITY</span><strong>${m.sequenceIdentity}%</strong><small>alignment-derived fixture metric</small></div><div><span>GC SIMILARITY</span><strong>${m.gcSimilarity}%</strong><small>base-composition comparison</small></div><div><span>SYSTEM OVERLAP</span><strong>${m.systemOverlap}%</strong><small>shared modeled systems</small></div><div><span>MODEL STABILITY</span><strong>${m.stability}%</strong><small>deterministic proxy</small></div></div>
    <div class="sync-trace-grid"><div><span>01 / ALIGN</span><strong>Sequences normalized</strong><p>Lengths and bases are validated before comparison.</p></div><div><span>02 / CONSERVE</span><strong>Matching positions isolated</strong><p>Conserved and divergent sites remain visible in the alignment window.</p></div><div><span>03 / SYSTEM</span><strong>Biological overlap mapped</strong><p>Reference adaptations are treated as systems, not isolated “power genes”.</p></div><div><span>04 / INTERPRET</span><strong>${esc(m.status)}</strong><p>The result is a computational scenario, not evidence of real biological compatibility.</p></div></div>
    <div class="sync-action-bar"><button class="primary-btn sync-run-btn" data-action="save-experiment">SAVE THIS TRACE →</button><span>Run state is deterministic for the current fixture and engine version.</span></div>
  </section>`;
}
function perturbation() {
  header('Perturbation Lab'); const a=species(state.base), b=species(state.reference); const systems=[...new Set([...a.systems,...b.systems])];
  return `<section class="section-head"><div><div class="eyebrow">MODULE 05 / SYSTEMS BIOLOGY</div><h2>Virtual Perturbation Lab</h2><p>Do not just read the result. Introduce a controlled disturbance and watch its modeled consequence travel through a connected biological system.</p></div><div class="module-stamp">NETWORK / 07 NODES</div></section>
  <section class="perturb-command panel">
    <aside class="perturb-controls"><div class="panel-kicker">EXPERIMENT CONTROL</div><h3>${esc(a.name)} <span>×</span> ${esc(b.name)}</h3><label>TARGET SYSTEM</label><select class="select" id="perturb-system">${systems.map(s=>`<option>${esc(s)}</option>`).join('')}</select><label>PERTURBATION MAGNITUDE</label><input id="perturb-strength" type="range" min="10" max="90" value="55"><div class="range-readout"><span>LOW</span><b id="strength-readout">55%</b><span>HIGH</span></div><button class="primary-btn" data-action="run-perturb">INITIATE PERTURBATION →</button><div class="control-note"><span>MODEL RULE</span><p>Higher pressure does not mean “stronger biology”. It means a larger modeled disturbance to downstream relationships.</p></div></aside>
    <div class="network-theatre enhanced-network"><div class="network-stage"><svg viewBox="0 0 860 500" role="img" aria-label="Abstract biological network with propagation pathways"><defs><filter id="glow"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter><linearGradient id="netFlow" x1="0" x2="1"><stop offset="0" stop-color="#3e6d6c"/><stop offset=".5" stop-color="#78d9c8"/><stop offset="1" stop-color="#c69b67"/></linearGradient></defs><g class="net-grid"><path d="M0 80H860M0 160H860M0 240H860M0 320H860M0 400H860M100 0V500M220 0V500M340 0V500M460 0V500M580 0V500M700 0V500"/></g><g class="net-lines enhanced-lines"><path d="M90 250 C170 250 170 110 260 110 S370 250 450 250 S570 110 680 110 S770 250 820 250"/><path d="M90 250 C170 250 170 390 260 390 S370 250 450 250 S570 390 680 390 S770 250 820 250"/></g>${[['90','250','INPUT','n0'],['260','110','REGULATOR A','n1'],['260','390','REGULATOR B','n2'],['450','250','NETWORK CORE','n3'],['680','110','SYSTEM A','n4'],['680','390','SYSTEM B','n5'],['820','250','PHENOTYPE','n6']].map(n=>`<g class="net-node ${n[3]}"><circle cx="${n[0]}" cy="${n[1]}" r="${n[3]==='n3'?42:28}"/><text x="${n[0]}" y="${Number(n[1])+4}" text-anchor="middle">${n[2]}</text><text class="node-index" x="${n[0]}" y="${Number(n[1])+48}" text-anchor="middle">NODE ${Number(n[3].slice(1))+1}</text></g>`).join('')}</svg><div class="network-overlay"><span>BASELINE NETWORK</span><strong>Propagation path is intentionally visible.</strong></div></div><div id="perturb-result" class="perturb-output"><div class="panel-kicker">MODEL OUTPUT</div><h2>Network standing by.</h2><p>Choose a target and initiate a perturbation. The network will reveal where the modeled disturbance propagates and where the chain becomes unstable.</p><div class="propagation-track idle-track">${['INPUT','REGULATION','NETWORK','SYSTEM','PHENOTYPE'].map((x,i)=>`<div class="prop-node"><span>0${i+1}</span><b>${x}</b></div>`).join('')}</div></div></div>
  </section>`;
}
function evolution() {
  header('Evolution Scenario'); const a=species(state.base), b=species(state.reference), m=synchronizationMetrics(a,b);
  return `<section class="section-head"><div><div class="eyebrow">MODULE 06 / SPECULATIVE MODEL</div><h2>Evolution Scenario Chamber</h2><p>Follow one modeled pathway from baseline through perturbation, network response and stability. The visual is an abstract systems model—not a generated organism.</p></div><div class="module-stamp">SCENARIO / CONTROLLED</div></section>
  <section class="evolution-chamber panel"><div class="chamber-header"><div><span>BASELINE</span><strong>${esc(a.name)}</strong></div><div class="chamber-center-title"><span>VIRTUAL EVOLUTION</span><b>SCENARIO CHAMBER</b></div><div><span>REFERENCE</span><strong>${esc(b.name)}</strong></div></div>
    <div class="evo-stage enhanced-evo"><div class="stage-grid"></div><div class="evo-orbit orbit-a"><div class="evo-image">${specimenImage(a,'evo-photo',true)}</div><b>${esc(a.name)}</b><small>BASELINE SYSTEM</small></div><div class="evo-orbit orbit-b"><div class="evo-image">${specimenImage(b,'evo-photo',true)}</div><b>${esc(b.name)}</b><small>REFERENCE ADAPTATION</small></div><div class="evo-branch branch-1"><span>REGULATION</span><i></i></div><div class="evo-branch branch-2"><span>NETWORK RESPONSE</span><i></i></div><div class="evo-branch branch-3"><span>PHENOTYPE MODEL</span><i></i></div><div class="evo-core"><div class="core-pulse"></div><div class="core-crosshair"></div><span>MODEL<br>STATE</span><strong>${esc(m.status)}</strong><small>${m.stability}% STABILITY</small></div><div class="evo-hud hud-left"><span>TRACE</span><b>07</b><small>STAGES</small></div><div class="evo-hud hud-right"><span>MODEL</span><b>v${ENGINE_VERSION.replace(/^0\./,'')}</b><small>DETERMINISTIC</small></div></div>
    <div class="evo-timeline"><div class="evo-step active"><span>01</span><b>BASELINE</b><small>Reference system registered.</small></div><div class="evo-step"><span>02</span><b>ADAPTATION</b><small>Selected biological system mapped.</small></div><div class="evo-step"><span>03</span><b>PERTURBATION</b><small>Virtual disturbance introduced.</small></div><div class="evo-step"><span>04</span><b>NETWORK</b><small>Downstream relationships traced.</small></div><div class="evo-step"><span>05</span><b>STABILITY</b><small>Model checks for instability.</small></div><div class="evo-step"><span>06</span><b>PHENOTYPE</b><small>Abstract system outcome.</small></div><div class="evo-step"><span>07</span><b>REPORT</b><small>Scenario interpreted.</small></div></div>
    <div class="evo-control-bar"><div><span>SCENARIO RESULT</span><strong>${esc(m.status)}</strong></div><button class="primary-btn" data-action="run-evolution">RUN SCENARIO TRACE →</button></div><div id="evolution-output" class="scenario-output"><div class="scenario-placeholder"><span>WAITING FOR TRACE</span><strong>Run the scenario to populate the chamber.</strong><p>The result will expose sequence identity, system overlap and model stability without pretending to generate a real biological hybrid.</p></div></div>
  </section>`;
}
function notebook() {
  header('Experiment Notebook'); const notes=state.experiments; return `<section class="section-head"><div><div class="eyebrow">WORKSPACE</div><h2>Experiment Notebook</h2><p>Local-only experiment history. No account and no cloud upload.</p></div><button class="secondary-btn" data-action="clear-notebook">CLEAR NOTEBOOK</button></section><div class="notebook-grid">${notes.length ? notes.map(n=>`<article class="note-card panel"><div class="panel-kicker">${esc(n.id)}</div><h3>${esc(n.base)} × ${esc(n.reference)}</h3><p>${esc(n.target || 'Comparative synchronization')}</p><div class="note-metrics"><span>${n.stability}% stability</span><span>${esc(n.status)}</span></div></article>`).join('') : `<section class="empty-state panel"><div class="specimen-mark large">00</div><h2>No experiments yet.</h2><p>Run a synchronization experiment and save it here. Data stays in this browser.</p></section>`}</div>`;
}

function question() {
  header('Research Question'); const questions=[
    'Why does sequence similarity not automatically imply functional compatibility?',
    'Which biological systems make an organism unusually specialized for its environment?',
    'Why can some organisms regenerate structures that humans cannot?',
    'How can extreme sensory systems emerge from distributed biological networks?',
    'What happens when a computational model detects high sequence overlap but low system overlap?'
  ]; const q=questions[new Date().getDate()%questions.length]; return `<section class="question-hero panel"><div class="question-number">RESEARCH QUESTION / ${String(new Date().getDate()).padStart(2,'0')}</div><h1>${esc(q)}</h1><blockquote>Predict first. Run an analysis. Read the explanation. Then ask a better question.</blockquote><div class="question-actions"><button class="primary-btn" data-view="comparison">OPEN COMPARATIVE ANALYSIS</button><button class="secondary-btn" data-view="organisms">BROWSE SPECIMENS</button></div></section>`;
}

function methodology() {
  header('Methodology'); return `<section class="section-head"><div><div class="eyebrow">SYSTEM DOCUMENTATION / ${ENGINE_VERSION}</div><h2>Methodology & Scientific Boundary</h2><p>GENESIS separates interface, computation, provenance and interpretation.</p></div></section><div class="method-grid">${[
    ['Reference layer','Human baseline uses the GRCh38 reference assembly designation. It is a composite reference, not a single person and not personal DNA.'],
    ['Prototype sequence layer','Current alignment demonstrations use short deterministic software fixtures. They exist to validate software behavior, not to represent real biological loci.'],
    ['Metrics','Synchronization metrics are decomposed into explicit components. No single score is treated as proof of biological compatibility.'],
    ['Perturbation','The perturbation lab models abstract network behavior. It does not output wet-lab procedures, gene-editing protocols or clinical recommendations.'],
    ['Data provenance','Production biological claims require an accession, source, assembly/version and retrieval date.'],
    ['Privacy','The prototype does not accept personal DNA uploads. Experiments are stored locally in the browser only.'],
    ['Interpretation','Complex phenotypes are generally systems-level outcomes. GENESIS therefore avoids “one gene = one trait” simplifications.'],
    ['Reproducibility','The engine is deterministic for a fixed input fixture and version. Future releases should record engine/data versions with each experiment.']
  ].map(x=>`<article class="method-card panel"><div class="panel-kicker">${esc(x[0])}</div><h3>${esc(x[0])}</h3><p>${esc(x[1])}</p></article>`).join('')}</div><section class="panel source-panel"><div class="panel-kicker">PRIMARY REFERENCE SOURCES</div><ul>${PRIMARY_SOURCES.map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.name)}</a><span>${esc(s.role)}</span></li>`).join('')}</ul><div class="notice compact"><b>DATA CONTRACT</b><span>Production sequence records must carry: ${DATA_POLICY.requiredProductionFields.join(', ')}.</span></div></section>`;
}

function render() {
  const view=$('#view');
  const pages={overview,organisms:archive,comparison,sync,perturbation,evolution,notebook,question,methodology};
  try {
    view.innerHTML=(pages[state.view]||overview)();
    $('#experiment-pill').textContent=state.lastResult ? `${state.lastResult.status} / ACTIVE` : 'NO ACTIVE EXPERIMENT';
    state.error=null;
  } catch (error) {
    state.error=error;
    view.innerHTML=`<section class="error-panel panel"><div class="panel-kicker">SAFE FAILURE STATE</div><h2>The laboratory caught an unexpected interface error.</h2><p>No experiment data was intentionally modified.</p><code>${esc(error?.message || 'Unknown error')}</code><button class="primary-btn" data-action="recover">RETURN TO OVERVIEW</button></section>`;
  }
  hydrateImages();
}

function saveExperiment() {
  const a=species(state.base), b=species(state.reference), m=state.lastResult || synchronizationMetrics(a,b);
  const note={
    id:createExperimentId(), createdAt:new Date().toISOString(), engineVersion:ENGINE_VERSION,
    baseId:a.id, referenceId:b.id, base:a.name, reference:b.name, target:b.systems[0]||'comparative analysis',
    stability:m.stability, status:m.status, fingerprint:stableExperimentFingerprint({base:a.id,reference:b.id,metrics:m,engineVersion:ENGINE_VERSION})
  };
  state.experiments.unshift(note);
  persist();
  toast(`${note.id} saved to notebook`);
  setView('notebook');
}

function runPerturbation() {
  const system=$('#perturb-system')?.value || 'adaptation'; const strength=Number($('#perturb-strength')?.value||55); const a=species(state.base), b=species(state.reference); const m=synchronizationMetrics(a,b); const pressure=Math.max(0,Math.min(100,Math.round((100-m.stability)*0.45+strength*0.55))); const stateLabel=pressure<30?'LOCALIZED RESPONSE':pressure<60?'NETWORK DESTABILIZATION':'CASCADE DETECTED'; const output=$('#perturb-result');
  output.innerHTML=`<div class="perturb-live"><div class="panel-kicker">PERTURBATION TRACE / COMPLETE</div><h2>${esc(stateLabel)}</h2><p><strong>${esc(system)}</strong> was perturbed at <strong>${strength}%</strong> model intensity.</p><div class="propagation-track">${['INPUT','REGULATION','NETWORK','SYSTEM','PHENOTYPE'].map((x,i)=>`<div class="prop-node ${i<=Math.min(4,Math.floor(pressure/20))?'hit':''}"><span>${String(i+1).padStart(2,'0')}</span><b>${x}</b><i></i></div>`).join('')}</div><div class="metric-list">${metric('Baseline stability',m.stability)}${metric('Perturbation pressure',pressure)}${metric('System overlap proxy',m.systemOverlap)}</div><div class="result-banner ${pressure>59?'result-warn':'result-ok'}"><strong>WHY THE MODEL RESPONDED THIS WAY</strong><p>The simplified network treats the selected system as a connected node rather than an isolated gene. Increasing perturbation intensity raises the modeled pressure on downstream relationships.</p></div></div>`;
}

function runEvolution() {
  const a=species(state.base), b=species(state.reference), m=synchronizationMetrics(a,b), out=$('#evolution-output');
  out.innerHTML=`<div class="evolution-result cinematic-result"><div class="trace-complete"><span>TRACE COMPLETE</span><strong>${esc(m.status)}</strong><small>DETERMINISTIC MODEL / ${m.stability}% STABILITY</small></div><div class="scenario-path"><div><span>BASELINE</span><b>${esc(a.name)}</b></div><i>→</i><div><span>ADAPTATION</span><b>${esc(b.systems[0]||'reference system')}</b></div><i>→</i><div class="scenario-core-result"><div class="morph-ring"><div class="morph-cross"></div></div><b>NETWORK RESPONSE</b><small>${m.systemOverlap}% SYSTEM OVERLAP</small></div><i>→</i><div><span>SCENARIO</span><b>${esc(m.status)}</b></div></div><div class="scenario-report"><div><span>SEQUENCE IDENTITY</span><b>${m.sequenceIdentity}%</b><small>fixture alignment</small></div><div><span>NETWORK OVERLAP</span><b>${m.networkProxy}%</b><small>modeled proxy</small></div><div><span>MODEL STABILITY</span><b>${m.stability}%</b><small>scenario state</small></div></div><div class="scenario-interpretation"><div class="panel-kicker">WHY THIS SCENARIO ENDED HERE</div><p>The model keeps the adaptation at the level of a biological system. It does not claim that a real organism could acquire the reference phenotype. The trace shows where a simplified network can remain coherent and where it becomes constrained.</p></div></div>`;
  out.scrollIntoView({behavior:'smooth',block:'nearest'});
}
document.addEventListener('click', e => {
  const view=e.target.closest('[data-view]')?.dataset.view; if(view) return setView(view);
  const org=e.target.closest('[data-organism]')?.dataset.organism; if(org){ state.activeSpecimen=org; return renderDossier(org); }
  const action=e.target.closest('[data-action]')?.dataset.action; if(!action) return;
  if(action==='enter') return setView('organisms');
  if(action==='compare-from'){ state.base='human'; state.reference=e.target.closest('[data-id]').dataset.id; return setView('comparison'); }
  if(action==='reference-from'){ state.reference=e.target.closest('[data-id]').dataset.id; toast(`${species(state.reference).name} selected as reference`); return setView('comparison'); }
  if(action==='run-compare'){ state.base=$('#base-select').value; state.reference=$('#reference-select').value; state.lastResult=null; return render(); }
  if(action==='save-experiment') return saveExperiment();
  if(action==='run-perturb') return runPerturbation();
  if(action==='run-evolution') return runEvolution();
  if(action==='recover'){ state.error=null; state.lastResult=null; return setView('overview'); }
  if(action==='clear-notebook'){ if(confirm('Clear all locally saved GENESIS experiments?')){state.experiments=[];persist();render();toast('Notebook cleared');} return; }
});

document.addEventListener('input', e => { if(e.target.id==='species-search'){state.query=e.target.value;render();$('#species-search')?.focus();} if(e.target.id==='perturb-strength'){const out=$('#strength-readout'); if(out) out.textContent=`${e.target.value}%`; } });
document.addEventListener('change', e => {
  if(e.target.id==='group-filter'){state.group=e.target.value;render();}
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setView('organisms'); setTimeout(() => $('#species-search')?.focus(), 0); }
  if (e.key === 'Escape' && state.query) { state.query=''; render(); }
});
$('#reset-btn').addEventListener('click',()=>{state.base='human';state.reference='tiger';state.query='';state.group='ALL';state.lastResult=null;setView('overview');toast('Workspace reset');});
function renderDossier(id){ $('#view').innerHTML=dossier(id); document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view==='organisms')); hydrateImages(); window.scrollTo({top:0,behavior:'smooth'}); }
render();
