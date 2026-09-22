/**
 * GENESIS organism registry.
 *
 * IMPORTANT:
 * - This registry is metadata-first. It is intentionally not a genome database.
 * - `demoSequence` values are short, non-biological UI fixtures used only to exercise
 *   deterministic comparison/alignment code in the prototype.
 * - Real reference sequences must be ingested from documented public sources before
 *   any sequence-derived biological claim is exposed in production.
 */

const raw = [
  ['king-cobra','King Cobra','Ophiophagus hannah','Reptilia','Asia',['venom','sensory biology','predation'],'Specialized venom and sensory systems make it a useful case study for neurobiology and predator adaptation.'],
  ['black-mamba','Black Mamba','Dendroaspis polylepis','Reptilia','Africa',['venom','neurobiology','locomotion'],'A highly specialized venomous snake useful for studying fast predation, sensory systems and locomotion.'],
  ['green-mamba','Green Mamba','Dendroaspis angusticeps','Reptilia','Africa',['venom','sensory biology','arboreal locomotion'],'An arboreal predator with specialized sensory and locomotor adaptations.'],
  ['gaboon-viper','Gaboon Viper','Bitis gabonica','Reptilia','Africa',['venom','camouflage','sensory biology'],'A striking example of cryptic coloration, specialized fangs and ambush-predator biology.'],
  ['fer-de-lance','Fer-de-lance','Bothrops atrox','Reptilia','Amazon Basin',['venom','sensory biology','predation'],'An Amazonian pit viper used to explore venom systems and infrared-associated sensory biology.'],
  ['bushmaster','Bushmaster','Lachesis muta','Reptilia','Amazon Basin',['venom','sensory biology','body architecture'],'A large New World pit viper that provides a case study in venom, body size and sensory adaptation.'],
  ['inland-taipan','Inland Taipan','Oxyuranus microlepidotus','Reptilia','Australia',['venom','molecular adaptation','predation'],'A specialized elapid useful for studying venom-related molecular systems and predatory adaptation.'],
  ['diamondback','Eastern Diamondback Rattlesnake','Crotalus adamanteus','Reptilia','North America',['venom','heat sensing','defense'],'A pit-viper model for studying chemical defense and specialized environmental sensing.'],
  ['coral-snake','Eastern Coral Snake','Micrurus fulvius','Reptilia','North America',['venom','neurobiology','coloration'],'A venomous elapid with distinctive warning coloration and neurotoxic venom biology.'],
  ['boomslang','Boomslang','Dispholidus typus','Reptilia','Africa',['venom','arboreal adaptation','sensory biology'],'An arboreal snake whose unusual venom system makes it a useful comparative case study.'],
  ['golden-poison-frog','Golden Poison Frog','Phyllobates terribilis','Amphibia','Colombia',['chemical defense','skin','chemical ecology'],'A compact amphibian with exceptional chemical-defense biology and striking coloration.'],
  ['blue-poison-frog','Blue Poison Dart Frog','Dendrobates tinctorius','Amphibia','South America',['skin','chemical ecology','coloration'],'A visually distinctive amphibian for studying skin, chemical ecology and warning coloration.'],
  ['strawberry-poison-frog','Strawberry Poison Frog','Oophaga pumilio','Amphibia','Central America',['chemical defense','skin','ecology'],'A poison-dart-frog model for exploring ecological adaptation and chemical defense.'],
  ['green-black-dart-frog','Green-and-Black Poison Dart Frog','Dendrobates auratus','Amphibia','Central America',['chemical defense','skin','coloration'],'A small amphibian with specialized skin chemistry and conspicuous coloration.'],
  ['amazon-milk-frog','Amazon Milk Frog','Trachycephalus resinifictrix','Amphibia','Amazon Basin',['skin','arboreal adaptation','ecology'],'An arboreal Amazonian frog useful for exploring skin and habitat-associated adaptations.'],
  ['wandering-spider','Brazilian Wandering Spider','Phoneutria spp.','Arachnida','South America',['venom','neurobiology','sensory biology'],'A large wandering spider whose venom and sensory biology make it a compelling neurobiology case study.'],
  ['black-widow','Black Widow','Latrodectus spp.','Arachnida','Americas',['venom','neurobiology','silk'],'A classic model for studying neuroactive venom and specialized silk biology.'],
  ['funnel-web','Sydney Funnel-web Spider','Atrax robustus','Arachnida','Australia',['venom','neurobiology','predation'],'A medically significant spider used here as a comparative venom-system reference.'],
  ['goliath-birdeater','Goliath Birdeater','Theraphosa blondi','Arachnida','Amazon Basin',['body size','sensory biology','defense'],'A very large tarantula that adds an arthropod-scale and defensive-biology perspective.'],
  ['deathstalker','Deathstalker Scorpion','Leiurus quinquestriatus','Arachnida','Middle East / North Africa',['venom','neurobiology','sensory biology'],'A scorpion model for studying neuroactive venom and sensory adaptation.'],
  ['emperor-scorpion','Emperor Scorpion','Pandinus imperator','Arachnida','Africa',['defense','sensory biology','exoskeleton'],'A large scorpion useful for exploring arthropod defense and exoskeletal systems.'],
  ['bullet-ant','Bullet Ant','Paraponera clavata','Insecta','Amazon Basin',['pain signaling','chemical defense','social ecology'],'An Amazonian ant known for unusually intense defensive pain signaling, making it useful for a neurobiology case study.'],
  ['giant-centipede','Amazonian Giant Centipede','Scolopendra gigantea','Myriapoda','South America',['venom','locomotion','predation'],'A predatory arthropod combining venom, segmented locomotion and sensory specialization.'],
  ['driver-ant','Driver Ant','Dorylus spp.','Insecta','Africa',['collective behavior','locomotion','social biology'],'A useful case study in collective behavior and distributed biological systems.'],
  ['praying-mantis','Praying Mantis','Mantodea','Insecta','Worldwide',['vision','predation','biomechanics'],'A visually specialized predator useful for studying motion detection and strike biomechanics.'],
  ['mantis-shrimp','Mantis Shrimp','Stomatopoda','Crustacea','Indo-Pacific',['vision','impact biomechanics','coloration'],'An extreme sensory and biomechanical system with unusually specialized visual capabilities.'],
  ['green-anaconda','Green Anaconda','Eunectes murinus','Reptilia','Amazon Basin',['musculoskeletal','aquatic locomotion','body architecture'],'A large aquatic constrictor useful for studying body architecture and locomotion.'],
  ['burmese-python','Burmese Python','Python bivittatus','Reptilia','South / Southeast Asia',['musculoskeletal','metabolism','body architecture'],'A large constrictor model for studying feeding-associated metabolism and body architecture.'],
  ['reticulated-python','Reticulated Python','Malayopython reticulatus','Reptilia','Southeast Asia',['body architecture','locomotion','metabolism'],'A large constrictor that provides a comparative model for body form and locomotion.'],
  ['green-iguana','Green Iguana','Iguana iguana','Reptilia','Central / South America',['metabolism','locomotion','ecology'],'A contrasting herbivorous reptile for separating predatory traits from broader reptile biology.'],
  ['basilisk','Basilisk Lizard','Basiliscus spp.','Reptilia','Central / South America',['water-running locomotion','morphology','biomechanics'],'A distinctive locomotor system makes it a useful model for studying morphology and surface interaction.'],
  ['gila-monster','Gila Monster','Heloderma suspectum','Reptilia','North America',['venom','metabolism','feeding biology'],'A venomous lizard with unusual feeding and metabolic biology.'],
  ['komodo-dragon','Komodo Dragon','Varanus komodoensis','Reptilia','Indonesia',['predation','sensory biology','musculoskeletal'],'A large monitor lizard that provides a striking apex-predator comparative reference.'],
  ['jaguar','Jaguar','Panthera onca','Mammalia','Americas',['bite biomechanics','locomotion','sensory biology'],'An Amazonian apex predator useful for studying cranial mechanics, locomotion and sensory systems.'],
  ['harpy-eagle','Harpy Eagle','Harpia harpyja','Aves','Amazon Basin',['vision','flight','talon biomechanics'],'A powerful Amazonian raptor useful for studying vision, flight and grasping biomechanics.'],
  ['cheetah','Cheetah','Acinonyx jubatus','Mammalia','Africa',['locomotion','metabolism','morphology'],'A specialized cursorial predator useful for studying speed-associated biomechanics.'],
  ['tiger','Tiger','Panthera tigris','Mammalia','Asia',['musculoskeletal','sensory biology','locomotion'],'A large felid reference for comparative musculoskeletal and sensory systems.'],
  ['leopard','Leopard','Panthera pardus','Mammalia','Africa / Asia',['locomotion','sensory biology','adaptation'],'A versatile felid useful for comparing locomotion and ecological adaptation.'],
  ['wolf','Gray Wolf','Canis lupus','Mammalia','Northern Hemisphere',['endurance','sensory biology','social biology'],'A social predator that adds endurance, sensory and distributed-behavior systems to the archive.'],
  ['electric-eel','Electric Eel','Electrophorus spp.','Actinopterygii','Amazon Basin',['bioelectricity','sensory biology','physiology'],'A flagship GENESIS specimen for exploring specialized bioelectric organs and control systems.'],
  ['archerfish','Archerfish','Toxotes spp.','Actinopterygii','South / Southeast Asia',['vision','hydrodynamics','predation'],'A precision visual and hydrodynamic system useful for studying perception and action.'],
  ['axolotl','Axolotl','Ambystoma mexicanum','Amphibia','Mexico',['regeneration','development','tissue biology'],'A flagship regeneration case study and an essential counterpoint to the dangerous-species archive.'],
  ['naked-mole-rat','Naked Mole-rat','Heterocephalus glaber','Mammalia','East Africa',['longevity','hypoxia tolerance','social biology'],'A mammalian model for unusual environmental tolerance and social organization.'],
  ['tardigrade','Tardigrade','Tardigrada','Microscopic animal','Worldwide',['stress tolerance','cryptobiosis','cellular protection'],'A microscopic model of extreme environmental stress tolerance.'],
  ['horseshoe-crab','Horseshoe Crab','Limulus polyphemus','Chelicerata','North America',['immune biology','ancient body plan','development'],'A deep-time comparative reference for immune biology and conserved body architecture.'],
  ['blue-whale','Blue Whale','Balaenoptera musculus','Mammalia','Global oceans',['body size','metabolism','physiology'],'A large-scale physiology reference for studying the biological consequences of extreme body size.'],
  ['peregrine-falcon','Peregrine Falcon','Falco peregrinus','Aves','Worldwide',['flight','vision','aerodynamics'],'A precision-flight reference for visual tracking and aerodynamic adaptation.'],
  ['octopus','Common Octopus','Octopus vulgaris','Cephalopoda','Oceans',['neural control','camouflage','morphology'],'A radically different body plan useful for exploring distributed neural control and camouflage.'],
  ['vampire-bat','Common Vampire Bat','Desmodus rotundus','Mammalia','Central / South America',['sensory biology','metabolism','social biology'],'A mammalian model for specialized feeding, sensory systems and social behavior.'],
  ['polar-bear','Polar Bear','Ursus maritimus','Mammalia','Arctic',['thermoregulation','metabolism','adaptation'],'An extreme-environment mammal for studying thermoregulation and metabolic adaptation.']
];

const demoBases = ['ATGCGTACCGATGCTAGCTAACGTTACG','ATGCGTACCGTTGCTAGCTAACGTCAC','ATGCGTACCGATGCTAGGTAACGTTACA','ATGCGTACCAATGCTAGCTAACGTTACG'];

export const organisms = raw.map((x, i) => ({
  id: x[0], name: x[1], latin: x[2], group: x[3], region: x[4], systems: x[5],
  summary: x[6], code: `SP-${String(i + 1).padStart(3, '0')}`,
  demoSequence: demoBases[i % demoBases.length],
  sourceStatus: 'catalog metadata — reference validation pending'
}));

export const getOrganism = id => organisms.find(o => o.id === id) || organisms[0];
