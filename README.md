# GENESIS — Computational Genetics & Evolution Laboratory

> An interactive computational laboratory for comparative biology, sequence analysis, biological-system simulation, and evolutionary modeling.

<p align="center">

## 🧬 [LAUNCH GENESIS LABORATORY](https://ds-1502.github.io/GENESIS-Computational-Genetics-Laboratory/)


**Live Interactive Laboratory · Open in Browser**

</p>

---

# GENESIS
## Computational Genetics & Evolution Laboratory

> **Explore extreme biology. Compare biological systems. Model evolutionary possibilities.**

[![Status](https://img.shields.io/badge/status-active%20prototype-0f766e)](#project-status) [![Version](https://img.shields.io/badge/version-0.6.0-111827)](#release-information) [![License](https://img.shields.io/badge/license-MIT-111827)](LICENSE) [![Data policy](https://img.shields.io/badge/data-provenance%20first-111827)](#data-and-provenance-policy)

---

## 0.6 Visual Product Standard

The interface is intentionally designed as a **field observatory + natural-history archive + computational laboratory**, not as a generic AI/SaaS dashboard. The overview is editorial and specimen-led; the archive uses organism photography; synchronization exposes sequence movement and alignment; perturbation exposes network propagation; and the evolution module uses an abstract scenario chamber rather than fabricating a biological hybrid.

### Visual principles

- Documentary specimen imagery over decorative AI imagery.
- Instrument-like typography and annotation over generic SaaS cards.
- Large editorial sections with actual content rather than one-line feature cards.
- Restrained teal/copper instrumentation accents on graphite surfaces.
- Physical metaphors: field archive, alignment chamber, network console, scenario chamber.
- Motion must communicate computation or state; it must not exist only for decoration.

### Authorship

GENESIS credits **Dhvan Shah** for the original concept, research direction and visualization, with the implementation presented as a student-built computational laboratory.

## 0. Executive Statement

**GENESIS** is a browser-based computational biology laboratory conceived and directed by **Dhvan Shah**.

The project began with a science-fiction-scale question:

> **If future technology could computationally explore relationships between biological systems across species, what could we learn about the boundaries of evolution?**

GENESIS turns that question into a structured educational workflow:

```text
QUESTION
   ↓
DISCOVER
   ↓
COMPARE
   ↓
SYNCHRONIZE
   ↓
PERTURB
   ↓
SIMULATE
   ↓
INTERPRET
   ↓
SAVE EXPERIMENT
   ↓
ASK A BETTER QUESTION
   ↺
```

The product intentionally combines the atmosphere of a futuristic research laboratory with transparent computational methods. It does **not** claim that human–animal genetic combinations are currently feasible, and it does not provide wet-lab instructions for creating or modifying organisms.

The current release is an **engineering and scientific-data foundation**, not a validated genomics platform. Prototype sequence fixtures are explicitly separated from real reference data so that the interface never quietly turns placeholder data into a biological claim.

---

# 1. Project Identity

| Field | Specification |
|---|---|
| Product | GENESIS |
| Full name | Computational Genetics & Evolution Laboratory |
| Version | `0.6.0` |
| Product type | Browser-based educational computational biology prototype |
| Primary concept | Comparative biology + computational simulation + evolutionary exploration |
| Concept origin | Dhvan Shah |
| Research direction | Dhvan Shah |
| Product visualization | Dhvan Shah |
| Development | Dhvan Shah + implementation support |
| Runtime | Modern browser with ES modules |
| Backend | None required for the prototype |
| Accounts | None |
| Personal DNA uploads | Disabled by design |
| Local persistence | Browser `localStorage` only |
| Dependencies | No runtime package dependency |
| License | MIT |

---

# 2. The Idea Behind GENESIS

GENESIS is not simply an animal catalogue and it is not a fictional “DNA mixer.”

The underlying idea is to create a **computational laboratory for exploring the constraints of biological systems**.

A user can begin with a human reference baseline, select an unusual organism, identify a biological system of interest, compare the references, inspect computational metrics, run an abstract perturbation, and examine why the model stabilizes, conflicts, or fails.

The science-fiction inspiration is deliberately translated into a safer computational question:

> **Instead of asking how to create a biological transformation, ask what computation can teach us about why complex biological systems may or may not integrate.**

This distinction is central to the product.

---

# 3. Concept Ownership

The conceptual direction of GENESIS originated with **Dhvan Shah**.

The project is built around the original product idea of turning a speculative human/species comparison concept into an interactive computational laboratory rather than a conventional informational website.

### Attribution

- **Concept:** Dhvan Shah
- **Research direction:** Dhvan Shah
- **Product visualization:** Dhvan Shah
- **Designed & developed by:** Dhvan Shah

### Product attribution statement

> **The idea behind GENESIS**
>
> GENESIS originated as an independent student concept by **Dhvan Shah**, inspired by a question at the intersection of genetics, evolution and science fiction: *if future technology could computationally explore relationships between biological systems across species, what could we learn about the boundaries of evolution?*

The attribution is intentionally presented as intellectual authorship rather than only implementation credit.

---

# 4. Product Vision

## 4.1 Mission

Build a student-originated computational biology environment in which **curiosity becomes an experiment and every experiment produces an explanation**.

## 4.2 Intended user experience

GENESIS should feel like:

- a modern university research laboratory;
- a scientific specimen archive;
- a computational workstation;
- an interactive museum;
- a speculative research environment.

It should **not** feel like:

- a generic CRUD dashboard;
- a game pretending to be science;
- a black-box “AI DNA compatibility” generator;
- a clinical genetics service;
- a wet-lab protocol assistant.

---

# 5. Product Architecture

The laboratory is organized into a deliberate research sequence.

```text
┌──────────────────────────────────────────────────────────────┐
│                         GENESIS                              │
│       Computational Genetics & Evolution Laboratory          │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     01  OVERVIEW
                              │
                              ▼
                  02  ORGANISM ARCHIVE
                              │
                              ▼
                03  COMPARATIVE ANALYSIS
                              │
                              ▼
              04  GENETIC SYNCHRONIZATION
                              │
                              ▼
                  05  PERTURBATION LAB
                              │
                              ▼
                 06  EVOLUTION SCENARIO
                              │
                              ▼
                  07  EXPERIMENT NOTEBOOK
                              │
                              ▼
                   08  RESEARCH QUESTION
                              │
                              ▼
                    09  METHODOLOGY
```

The workflow is intentionally cyclic rather than terminal:

```text
Research question
       ↓
Experiment
       ↓
Result
       ↓
Explanation
       ↓
New question
       ↺
```

That loop is a core product requirement because the goal is not merely to make users visit once; it is to make the system encourage continued scientific curiosity.

---

# 6. Laboratory Modules

## 6.1 Overview

The entry point establishes:

- the GENESIS identity;
- the laboratory concept;
- the research pipeline;
- the 50-specimen archive;
- the educational simulation boundary;
- Dhvan Shah's concept ownership.

## 6.2 Organism Archive

The archive currently contains **50 curated reference organisms**.

The catalogue intentionally spans:

- venomous reptiles;
- toxic amphibians;
- arachnids;
- insects;
- myriapods;
- crustaceans;
- apex predators;
- bioelectric organisms;
- regeneration models;
- extreme-environment organisms;
- unusual sensory systems;
- unusual body plans.

The archive is **not a ranking of dangerousness, biological superiority, or suitability for human modification**.

### Current archive groups

| Group | Examples of systems explored |
|---|---|
| Venomous reptiles | venom, sensory biology, predation |
| Toxic amphibians | chemical defense, skin, chemical ecology |
| Arachnids | venom, neurobiology, sensory biology |
| Insects | pain signaling, social biology, vision |
| Myriapods | venom, locomotion, predation |
| Crustaceans | vision, impact biomechanics |
| Reptiles | morphology, locomotion, metabolism |
| Mammals | locomotion, sensory biology, physiology |
| Birds | vision, flight, grasping biomechanics |
| Fish | bioelectricity, hydrodynamics, perception |
| Amphibians | regeneration, development |
| Cephalopods | neural control, camouflage, morphology |
| Microscopic animals | stress tolerance, cryptobiosis |

## 6.3 Comparative Analysis

The comparison workspace allows the user to inspect:

- base organism;
- reference organism;
- system tags;
- deterministic sequence fixture;
- global alignment;
- alignment score;
- aligned identity;
- comparable sites.

The current sequence window is deliberately labelled as a **software fixture**. It is not a production genomic locus.

## 6.4 Genetic Synchronization

Synchronization is the signature GENESIS experience.

The current prototype exposes multiple components rather than hiding everything behind a single number:

```text
Sequence identity
GC-content similarity
System overlap
Length compatibility
Network proxy
Model stability
```

The combined value is a **prototype model stability index**, not biological compatibility.

## 6.5 Perturbation Lab

The Perturbation Lab models an abstract biological-system change.

Conceptually:

```text
REFERENCE
   ↓
VIRTUAL PERTURBATION
   ↓
NETWORK RESPONSE
   ↓
PHENOTYPE MODEL
```

The module intentionally avoids:

- gene-editing protocols;
- laboratory procedures;
- dosage instructions;
- transformation procedures;
- clinical recommendations.

## 6.6 Evolution Scenario

The Evolution Scenario is the most speculative layer.

It is explicitly labelled **SPECULATIVE MODE** and is intended to ask “what if?” questions while preserving the distinction between:

1. documented biology;
2. computational modeling;
3. speculation.

A scenario result must never be interpreted as evidence that a human–animal hybrid, transformation, or genetic transfer is feasible.

## 6.7 Experiment Notebook

Experiments are stored locally in the user's browser.

No account is required.

No personal DNA is uploaded.

Each saved experiment records metadata such as:

- experiment ID;
- timestamp;
- engine version;
- base organism;
- reference organism;
- target system;
- model stability;
- model status;
- deterministic fingerprint.

The current notebook capacity is intentionally bounded at **100 experiments** to prevent uncontrolled local-storage growth.

## 6.8 Research Question

The research-question module creates a recurring learning loop around questions such as:

- Why does sequence similarity not automatically imply functional compatibility?
- Which biological systems make an organism unusually specialized for its environment?
- Why can some organisms regenerate structures that humans cannot?
- How can extreme sensory systems emerge from distributed biological networks?
- What happens when a computational model detects high sequence overlap but low system overlap?

The goal is **curiosity-driven learning**, not points or superficial gamification.

## 6.9 Methodology

The Methodology module documents:

- reference policy;
- fixture policy;
- computational metrics;
- perturbation boundaries;
- provenance requirements;
- privacy model;
- interpretation constraints;
- reproducibility requirements;
- primary sources.

---

# 7. Extreme Biology Archive

The current registry contains 50 specimens selected for biological distinctiveness rather than simply lethality.

### Representative examples

- King Cobra
- Black Mamba
- Green Mamba
- Gaboon Viper
- Fer-de-lance
- Bushmaster
- Inland Taipan
- Eastern Diamondback Rattlesnake
- Golden Poison Frog
- Blue Poison Dart Frog
- Brazilian Wandering Spider
- Black Widow
- Sydney Funnel-web Spider
- Goliath Birdeater
- Deathstalker Scorpion
- Bullet Ant
- Giant Centipede
- Mantis Shrimp
- Green Anaconda
- Basilisk Lizard
- Komodo Dragon
- Jaguar
- Harpy Eagle
- Tiger
- Electric Eel
- Axolotl
- Tardigrade
- Octopus
- Vampire Bat
- Polar Bear

The complete machine-readable registry is maintained in `data/organisms.js`.

---

# 8. Data and Provenance Policy

This is one of the most important engineering decisions in GENESIS.

## 8.1 Prototype sequence layer

The current release uses short deterministic DNA strings as **software fixtures**.

Their purpose is to test:

- sanitization;
- alignment;
- identity calculations;
- GC-content calculations;
- deterministic metrics;
- UI rendering.

They are **not** presented as real genomic loci.

This is deliberate. A visually impressive dashboard must not create the illusion that fabricated strings are scientific reference data.

## 8.2 Production data contract

Before a real sequence-derived result is exposed as biological analysis, its record must carry:

```text
source
accession
assembly
version
retrievedAt
license
```

Where appropriate, additional metadata should include:

```text
organism
scientificName
chromosome
regionStart
regionEnd
strand
featureType
gene
transcript
annotationSource
```

## 8.3 Human reference

GENESIS uses **GRCh38** as the intended human reference assembly baseline.

The Genome Reference Consortium identifies GRCh38 as the current major human reference assembly. The official GRC documentation also explains that the human reference is a composite derived from sequence sources from multiple anonymous individuals; it is therefore not the genome of a particular 19-, 20- or 21-year-old person.

The GRC human overview currently documents **GRCh38.p14** as the patch release and states that the patch release does not change chromosome coordinates.

NCBI provides GRCh38 reference sequence and annotation resources, including FASTA, GFF3, transcript and protein resources.

## 8.4 Personal DNA

Personal genomic upload is intentionally disabled in the prototype.

The project does not need personal DNA to demonstrate:

- comparative sequence analysis;
- reference-based computation;
- systems reasoning;
- perturbation modeling;
- evolutionary thought experiments.

A future production implementation would require a substantially different privacy, consent, security and data-governance architecture before handling personal genomic information.

---

# 9. Computational Engine

The core engine is dependency-free JavaScript in `engine/core.js`.

## 9.1 DNA sanitization

`sanitizeDNA()` converts input to uppercase and removes characters outside `A/C/G/T`.

`validateDNA()` then returns structured validation information rather than silently accepting invalid input.

## 9.2 GC content

`gcContent()` computes:

```text
(G + C) / sequence length × 100
```

The current implementation reports one decimal place.

## 9.3 Overlap identity

`overlapIdentity()` is explicitly named to avoid confusion with alignment-derived biological identity.

It compares corresponding positions in the overlapping portion of two sequences.

## 9.4 Global alignment

`globalAlignment()` implements a deterministic global dynamic-programming alignment for the short fixture sequences used by the prototype.

Default scoring:

```text
match      +2
mismatch   -1
gap        -1
```

The result includes:

- aligned sequence A;
- aligned sequence B;
- alignment score;
- identity over comparable sites;
- comparable-site count;
- aligned length;
- scoring parameters.

The implementation enforces a configurable sequence-length ceiling so an accidental large genome cannot cause the browser to allocate an unbounded dynamic-programming matrix.

## 9.5 System overlap

The system-overlap metric compares the biological-system labels attached to the two registry records.

```text
shared systems / union of systems × 100
```

This is a **metadata overlap proxy**, not a biological network measurement.

## 9.6 Synchronization model

The prototype combines:

```text
38% alignment identity
18% GC-content similarity
26% system-overlap proxy
18% length compatibility
```

into a model-stability index.

This weighting is a **software demonstration model**. It must not be interpreted as a validated biological compatibility equation.

The implementation records `methodologyVersion` so that future engine changes can be distinguished from older experiment outputs.

---

# 10. Why the Model Is Deliberately Transparent

A single number such as:

> **DNA Compatibility = 94.7%**

would be visually attractive but scientifically misleading.

GENESIS therefore exposes the components.

```text
                   SEQUENCE
                       │
              ┌────────┴────────┐
              ▼                 ▼
        ALIGNMENT           GC CONTENT
              │                 │
              └────────┬────────┘
                       ▼
                SYSTEM OVERLAP
                       │
                       ▼
              MODEL STABILITY
```

This makes it possible for a user to ask:

> **Why did the model produce this result?**

rather than simply accepting an unexplained score.

---

# 11. Scientific Sources

GENESIS uses authoritative public resources for its reference policy and future data-ingestion design.

### Genome Reference Consortium

Human genome overview:

https://www.ncbi.nlm.nih.gov/grc/human

The GRC documents GRCh38 and its continuing patch-based maintenance.

### GRC FAQ

https://www.ncbi.nlm.nih.gov/grc/help/faq/

The FAQ documents the official GRCh38 designation, accession information and the composite nature of the human reference. citeturn0search0

### NCBI Human Genome Resources

https://www.ncbi.nlm.nih.gov/projects/genome/guide/human/

NCBI exposes human reference sequence and annotation resources for computational use.

### NCBI FASTA specification

https://www.ncbi.nlm.nih.gov/genbank/fastaformat

The FASTA specification defines sequence identifiers and nucleotide-sequence formatting requirements.

### NCBI RefSeq

https://www.ncbi.nlm.nih.gov/refseq/

RefSeq provides curated reference sequences and annotations used by many computational workflows.

---

# 12. Repository Architecture

```text
GENESIS/
│
├── index.html
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CITATION.cff
├── package.json
├── .gitignore
│
├── assets/
│   └── styles.css
│
├── data/
│   ├── organisms.js
│   └── sources.js
│
├── engine/
│   ├── core.js
│   └── app.js
│
├── components/
│   └── (reserved for future extracted UI components)
│
└── tests/
    └── smoke.mjs
```

### Separation of concerns

```text
DATA
 ↓
VALIDATION
 ↓
COMPUTATIONAL ENGINE
 ↓
STATE
 ↓
UI RENDERING
 ↓
LOCAL NOTEBOOK
```

The archive should remain data-driven. Adding a specimen should not require cloning application logic.

---

# 13. Runtime Design

GENESIS is intentionally lightweight.

## Current characteristics

- static browser application;
- native ES modules;
- no server required;
- no database required;
- no authentication system;
- no runtime framework dependency;
- no third-party API key;
- no personal genomic-data ingestion;
- local notebook persistence.

## Why this architecture

For a student-built research interface, stability and inspectability matter more than dependency count.

The current application can therefore be opened from a simple static host and later migrated to a more sophisticated stack without rewriting the conceptual data model.

---

# 14. Error-Handling Philosophy

The project is designed around **safe failure rather than silent failure**.

Examples:

### Invalid sequence

The engine validates the sequence before analysis.

### Oversized sequence

The alignment function enforces a maximum input length for the dynamic-programming prototype.

### Missing organism

The registry provides a controlled fallback rather than allowing an undefined object to cascade through the UI.

### Storage failure

The notebook catches browser-storage failures and informs the user rather than silently claiming persistence succeeded.

### Rendering failure

The application provides a visible **SAFE FAILURE STATE** rather than leaving a blank interface.

### Unsupported data claim

The UI labels the current fixture layer and prevents it from being presented as production genomic evidence.

---

# 15. Reproducibility

Every future scientific experiment record should be traceable to:

```text
Experiment ID
Engine version
Methodology version
Input organism IDs
Input sequence/accession identifiers
Reference assembly/version
Model parameters
Timestamp
Result
```

The current notebook records a deterministic experiment fingerprint derived from the input organisms, model result and engine version.

This makes future migration toward a formal experiment schema possible.

---

# 16. Privacy Model

GENESIS v0.6.0 does not collect or transmit personal genomic data.

### Current storage

```text
Browser
  ↓
localStorage
  ↓
Experiment metadata
```

There is no account backend and no cloud database in the prototype.

### Explicit non-goals

- storing personal DNA;
- selling genetic data;
- uploading genomic files to an external service;
- inferring health status;
- providing medical diagnosis;
- generating clinical recommendations.

If future releases introduce external services, this section must be rewritten before the feature is shipped.

---

# 17. Security Position

The application currently has a deliberately small attack surface because it is a static client-side prototype.

Important controls include:

- HTML escaping for dynamic text;
- no `eval()`;
- no runtime code generation;
- no server credentials in the repository;
- no API keys in frontend code;
- local-only notebook storage;
- bounded experiment history;
- explicit external-link `noopener noreferrer` usage;
- input validation before computational processing.

Security issues should be reported according to `SECURITY.md`.

---

# 18. Accessibility and Interaction Standards

The interface is intended to support keyboard and assistive-technology use as the product matures.

Current foundations include:

- semantic navigation regions;
- visible focus states;
- `aria-live` result region;
- no-JavaScript fallback message;
- reduced-motion support;
- keyboard shortcut for specimen search (`Ctrl/Cmd + K`);
- Escape shortcut to clear the active specimen search.

Future releases should add automated accessibility auditing before production deployment.

---

# 19. Visual System

GENESIS uses a restrained scientific interface language.

### Palette

- near-black graphite background;
- dark slate surfaces;
- restrained scientific teal;
- muted violet for analytical states;
- amber for warnings;
- red only for failure/conflict states;
- off-white scientific typography.

### Typography

- modern sans-serif for interface content;
- monospace for sequence data, experiment IDs, logs and computational output.

### Design principles

- no excessive neon;
- no unnecessary gradients;
- no giant decorative DNA model;
- no generic “AI dashboard” aesthetic;
- strong information hierarchy;
- deliberate whitespace;
- specimen codes and research metadata as visual anchors;
- motion used to communicate state, not decoration.

---

# 20. GitHub Standard

GENESIS should be presented on GitHub as a **research-software project**, not as a folder of website files.

The repository should eventually contain:

```text
README.md
CHANGELOG.md
LICENSE
SECURITY.md
CONTRIBUTING.md
CITATION.cff
package.json

assets/
data/
engine/
components/
tests/
```

The repository landing page should communicate the following within the first screen:

1. What GENESIS is.
2. Why it exists.
3. What makes the concept different.
4. What the user can actually do.
5. The scientific boundary.
6. The current project status.
7. How to run it.
8. How the computational model works.
9. Where the data comes from.
10. Who originated the concept.

The README should remain synchronized with the actual implementation.

A feature must not be documented as production-ready if the code only contains a placeholder.

---

# 21. Local Development

## Requirements

- Node.js 18+ recommended for the test harness.
- A modern browser with ES module support.

## Install

```bash
npm install
```

There are currently no runtime package dependencies, but running `npm install` creates the standard project environment.

## Static preview

Because the application uses browser ES modules, use a local HTTP server rather than relying on `file://` execution.

For example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Verification

Run:

```bash
npm run check
```

Then:

```bash
npm test
```

Or run both:

```bash
npm run verify
```

Expected result:

```text
GENESIS v0.6.0 verification: PASS
```

---

# 22. Quality Gates

A future release should not be tagged unless the following are satisfied.

### Gate A — Syntax

```text
All JavaScript modules parse successfully.
```

### Gate B — Unit/smoke verification

```text
npm test
```

### Gate C — Archive integrity

```text
50 unique specimen IDs
No required metadata missing
All fixture sequences valid
```

### Gate D — UI integrity

Verify manually:

- overview renders;
- archive renders;
- search works;
- taxonomy filtering works;
- dossier opens;
- comparison selectors work;
- alignment renders;
- synchronization renders;
- perturbation executes;
- evolution scenario executes;
- notebook saves and reloads;
- notebook clears safely;
- methodology links open;
- reset works;
- no console errors are present.

### Gate E — Scientific integrity

Before real biological data is added:

- accession is present;
- assembly/version is present;
- source is identified;
- retrieval date is recorded;
- license is recorded;
- sequence region is documented;
- calculations are reproducible;
- interpretation is limited to what the data support.

### Gate F — Privacy

No personal DNA is accepted or transmitted unless a future release has a separately designed privacy architecture and explicit user consent flow.

---

# 23. Roadmap

## Phase 1 — Foundation

- [x] 50-specimen archive
- [x] laboratory navigation
- [x] organism dossiers
- [x] comparative analysis interface
- [x] deterministic alignment engine
- [x] synchronization model
- [x] perturbation interface
- [x] evolution scenario interface
- [x] local experiment notebook
- [x] research-question loop
- [x] methodology documentation
- [x] concept authorship presentation
- [x] syntax and smoke verification

## Phase 2 — Real scientific data layer

- [ ] source-backed organism records
- [ ] accession-aware data schema
- [ ] documented reference regions
- [ ] real FASTA ingestion for packaged reference data
- [ ] provenance display per result
- [ ] sequence-region viewer
- [ ] source/version badges
- [ ] data validation pipeline

## Phase 3 — Comparative genomics

- [ ] real homologous-region comparison
- [ ] multiple alignment options
- [ ] conservation visualization
- [ ] gene/feature annotations
- [ ] evolutionary-distance visualization
- [ ] optional phylogenetic visualization

## Phase 4 — Systems modeling

- [ ] richer gene-regulatory-network abstraction
- [ ] network perturbation engine
- [ ] sensitivity analysis
- [ ] explicit model assumptions
- [ ] parameter inspection
- [ ] experiment reproducibility package

## Phase 5 — GENESIS PREDICT

Potential future direction:

> Use a transparent machine-learning model to estimate which computationally represented systems are most sensitive to a defined perturbation.

This should only be implemented when an actual training/evaluation methodology exists. The product must never label a deterministic heuristic as “AI.”

## Phase 6 — Research platform

Potential future capabilities:

- formal experiment export;
- citation-ready experiment reports;
- versioned datasets;
- reproducible analysis bundles;
- richer public reference datasets;
- collaborative research spaces.

These are roadmap items, not promises about the current release.

---

# 24. What GENESIS Will Not Claim

GENESIS will not claim that:

- a percentage score proves biological compatibility;
- a single gene determines a complex phenotype;
- human–animal hybridization is computationally demonstrated;
- a simulated phenotype will occur in a real organism;
- an adaptation can simply be transferred from one species to another;
- a prototype fixture sequence is a real genomic locus;
- an AI output is scientifically valid merely because it is generated by AI;
- the project is a clinical diagnostic system.

These constraints protect the credibility of the project.

---

# 25. Scientific Interpretation Principle

The project follows a simple rule:

> **A more cinematic result must not become a less truthful result.**

GENESIS can make the experience spectacular.

The underlying computation must remain explicit about:

- what is measured;
- what is modeled;
- what is assumed;
- what is unknown;
- what is speculative.

That is the difference between a science-fiction-themed interface and a credible computational biology project.

---

# 26. Release Information

## v0.3.1.1 — Foundation hardening

This release focuses on correctness and engineering discipline rather than adding arbitrary visual complexity.

### Added

- `validateDNA()` input validation.
- configurable alignment-size protection.
- explicit overlap-identity terminology.
- one-decimal computational metrics.
- deterministic experiment fingerprinting.
- versioned experiment records.
- bounded notebook persistence.
- safe local-storage failure handling.
- visible rendering failure state.
- keyboard shortcuts.
- reduced-motion support.
- provenance registry.
- expanded scientific documentation.
- formal production data contract.
- stronger verification suite.

### Changed

- synchronization model output now records methodology version.
- experiment IDs use a version-independent explicit generator.
- methodology page renders the source registry.
- repository version is now `0.6.0`.

### Intentionally unchanged

- prototype sequence fixtures remain fixtures;
- personal DNA uploads remain disabled;
- no clinical claims are introduced;
- no real-world genetic engineering instructions are introduced.

---

# 27. Contribution Rules

See `CONTRIBUTING.md`.

Any contribution involving biological data should include provenance before the data is presented as factual computational input.

Any contribution changing a scientific calculation should update:

1. methodology documentation;
2. tests;
3. experiment-version handling;
4. relevant UI labels;
5. changelog.

---

# 28. Security Reporting

See `SECURITY.md`.

Do not submit private genetic information as a bug report.

If a future implementation introduces external storage or personal genomic-data processing, the security model must be reviewed before deployment.

---

# 29. Citation

If referencing the software itself, use the metadata in `CITATION.cff`.

If referencing biological claims, cite the underlying scientific source rather than citing GENESIS as the biological authority.

---

# 30. Final Product Standard

GENESIS is successful when it satisfies all three simultaneously:

### Engineering

> **It works reliably.**

### Science

> **It distinguishes data, model and speculation.**

### Experience

> **It makes the user want to investigate one more organism.**

The intended final reaction is not merely:

> “This looks cool.”

It is:

> **“This looks incredible — and I can actually understand what the computer is doing.”**

---

## Project Status

**GENESIS v0.6.0.1 — Active foundation / scientific data layer under development.**

The next major milestone is the replacement of prototype sequence fixtures with **source-backed, accession-aware reference regions** and a reproducible comparative-genomics data pipeline.

---

## Author

### Dhvan Shah

**Concept · Research Direction · Visualization · Development**

GENESIS is an independent student-originated computational biology concept developed around the intersection of genetics, evolution, software engineering and speculative scientific exploration.

---

## License

Released under the MIT License. See `LICENSE` for the complete text.
