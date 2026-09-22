/**
 * Provenance contract for future production biological data.
 * No sequence in the current prototype is represented as a real genomic locus.
 */
export const DATA_POLICY = Object.freeze({
  humanReference: 'GRCh38',
  currentSequenceLayer: 'software-fixture',
  requiredProductionFields: ['source', 'accession', 'assembly', 'version', 'retrievedAt', 'license'],
  personalGenomicUploads: false
});

export const PRIMARY_SOURCES = Object.freeze([
  {
    id: 'grc-human',
    name: 'Genome Reference Consortium — Human Genome Overview',
    url: 'https://www.ncbi.nlm.nih.gov/grc/human',
    role: 'Human reference assembly and release information'
  },
  {
    id: 'grc-faq',
    name: 'Genome Reference Consortium — FAQ',
    url: 'https://www.ncbi.nlm.nih.gov/grc/help/faq/',
    role: 'Reference assembly definition and provenance'
  },
  {
    id: 'ncbi-human',
    name: 'NCBI Human Genome Resources',
    url: 'https://www.ncbi.nlm.nih.gov/projects/genome/guide/human/',
    role: 'Human genome sequence and annotation resources'
  },
  {
    id: 'ncbi-fasta',
    name: 'NCBI — FASTA Format for Nucleotide Sequences',
    url: 'https://www.ncbi.nlm.nih.gov/genbank/fastaformat',
    role: 'Sequence-file format specification'
  }
]);
