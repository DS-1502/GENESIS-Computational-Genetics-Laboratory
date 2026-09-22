# Contributing to GENESIS

GENESIS is intended to be developed as research software, not merely as a visual demo.

## Before changing code

Run:

```bash
npm run verify
```

## Scientific data rule

Do not add a biological sequence and present it as factual without recording:

- source;
- accession;
- assembly/version;
- retrieval date;
- license;
- region/feature context where applicable.

Prototype fixtures must remain clearly labelled as fixtures.

## Computational changes

If a calculation changes, update:

1. the implementation;
2. tests;
3. methodology documentation;
4. methodology version;
5. changelog;
6. UI language if the interpretation changes.

## UI changes

Preserve:

- keyboard access;
- visible focus states;
- reduced-motion behavior;
- scientific-status labels;
- the authorship section;
- responsive behavior.

## Pull requests

A useful pull request should state:

- what changed;
- why it changed;
- what was tested;
- whether scientific interpretation changed;
- whether data provenance changed.
