import type {
  AllometricScalingRule,
  AmputationEntry,
  BiotypeEntry,
  BodyModificationEntry,
  ProstheticEntry,
  RaceEntry,
} from '../types/anatomy';

export const RACES: readonly RaceEntry[] = [
  {
    id: 'human',
    name: 'Humanos Estándar',
    morphologicalProfile:
      'Bípedos plantígrados, proporciones medias, pelaje vestigial',
    metabolicAdaptation:
      'Homeotermia eficiente mediante sudoración copiosa; resistencia al trote de caza',
    baseMechanicalAttributes:
      'Versatilidad adaptativa extrema; resiliencia psicológica',
    ecologicalNiche: 'Praderas y llanuras abiertas; generalistas ecológicos',
    typicalBiotypeIds: ['ectomorph', 'mesomorph', 'endomorph'],
    promptEn: 'human character, balanced bipedal proportions',
    tags: ['versatile', 'generalist'],
  },
  {
    id: 'orc',
    name: 'Orcos / Goblinoides',
    morphologicalProfile:
      'Prognatismo mandibular con caninos inferiores salientes, torus supraorbital macizo',
    metabolicAdaptation:
      'Cortical ósea hipermineralizada, alta densidad muscular, umbral de dolor elevado',
    baseMechanicalAttributes:
      'Alta fuerza de agarre, masa ósea densa, susceptibilidad a hipertermia',
    ecologicalNiche: 'Estepas áridas y gargantas rocosas; selección marcial',
    typicalBiotypeIds: ['mesomorph', 'endomorph', 'giant_columnar'],
    promptEn:
      'orcish humanoid, heavy brow ridge, protruding lower tusks, dense muscular build',
    tags: ['martial', 'heavy', 'square'],
  },
  {
    id: 'elf',
    name: 'Elfos / Silvanos',
    morphologicalProfile:
      'Huesos largos parcialmente neumáticos, silueta alargada, caja torácica reducida',
    metabolicAdaptation:
      'Baja acumulación de radicales libres celular; visión nocturna de alta frecuencia espacial',
    baseMechanicalAttributes:
      'Agilidad refleja superior, bajo peso corporal, fragilidad ante traumatismos romos',
    ecologicalNiche: 'Doseles forestales antiguos; locomoción arbórea',
    typicalBiotypeIds: ['ectomorph', 'mesomorph'],
    promptEn:
      'sylvan elf humanoid, elongated slender limbs, pointed ears, narrow ribcage',
    tags: ['agile', 'ectomorph', 'triangle'],
  },
  {
    id: 'dwarf',
    name: 'Enanos / Trogloditas',
    morphologicalProfile:
      'Braquimorfismo extremo, costillas ensanchadas en barril, extremidades cortas',
    metabolicAdaptation:
      'Tolerancia a la hipercapnia (dióxido de carbono); tapetum lucidum en ojos',
    baseMechanicalAttributes:
      'Centro de gravedad ultra-estable, resistencia a toxinas, baja zancada',
    ecologicalNiche: 'Cavernas profundas y entornos hipóxicos subterráneos',
    typicalBiotypeIds: ['dwarf_brachymorph', 'endomorph'],
    promptEn:
      'stocky subterranean dwarf, broad barrel chest, short dense limbs, low center of gravity',
    tags: ['sturdy', 'square', 'earth'],
  },
  {
    id: 'beastfolk_feline',
    name: 'Beastfolk: Felinos',
    morphologicalProfile:
      'Locomoción digitígrada, columna vertebral hiperflexible, garras retráctiles',
    metabolicAdaptation:
      'Dominio masivo de bastones retinianos sobre conos; sistema cardiovascular de sprint',
    baseMechanicalAttributes:
      'Explosión cinética veloz en carrera, sigilo acústico, fatiga rápida tras asalto',
    ecologicalNiche: 'Matorral denso y junglas; depredadores de emboscada',
    typicalBiotypeIds: ['ectomorph', 'mesomorph'],
    promptEn:
      'feline beastfolk humanoid, digitigrade legs, cat-like muzzle and ears, flexible posture, tail',
    tags: ['agile', 'predator', 'stealth', 'triangle'],
  },
  {
    id: 'beastfolk_avian',
    name: 'Beastfolk: Aviares',
    morphologicalProfile:
      'Quilla esternal saliente, huesos huecos con trabéculas de refuerzo, pico córneo',
    metabolicAdaptation:
      'Respiración unidireccional con sacos aéreos; hematocrito altísimo',
    baseMechanicalAttributes:
      'Capacidad de planeo o salto tridimensional, vulnerabilidad ósea estructural',
    ecologicalNiche: 'Cumbres montañosas y acantilados ventosos',
    typicalBiotypeIds: ['ectomorph', 'mesomorph'],
    promptEn:
      'avian bird-folk humanoid, sharp keratin beak, feathered plumage, prominent keel chest, clawed feet',
    tags: ['air', 'fragile', 'mobile'],
  },
  {
    id: 'beastfolk_reptilian',
    name: 'Beastfolk: Reptilianos',
    morphologicalProfile:
      'Piel escamosa de beta-queratina, articulaciones mandibulares desarticulables',
    metabolicAdaptation:
      'Ectotermia dependiente de calor ambiental; fosetas con canales TRPA1 (visión infrarroja)',
    baseMechanicalAttributes:
      'Armadura dérmica natural, detección térmica de presas, letargia ante bajas temperaturas',
    ecologicalNiche: 'Ciénagas tropicales y desiertos arenosos',
    typicalBiotypeIds: ['mesomorph', 'endomorph', 'giant_columnar'],
    promptEn:
      'reptilian lizardfolk humanoid, thick beta-keratin scaled skin, sharp snout, reptilian tail',
    tags: ['armored', 'predator', 'monster'],
  },
  {
    id: 'beastfolk_ichthyoid',
    name: 'Beastfolk: Ictioides',
    morphologicalProfile:
      'Hendiduras operculares laterales, membranas interdigitales, aleta caudal',
    metabolicAdaptation:
      'Pigmentos respiratorios alternativos (hemocianina); membrana nictitante ocular',
    baseMechanicalAttributes:
      'Hidrodinámica perfecta, respiración acuática, deshidratación rápida en tierra',
    ecologicalNiche: 'Océanos profundos y sistemas fluviales cerrados',
    typicalBiotypeIds: ['ectomorph', 'mesomorph'],
    promptEn:
      'aquatic ichthyoid fish-folk humanoid, lateral gill slits, webbed fingers, smooth iridescent scales, dorsal fin',
    tags: ['water', 'amphibious', 'alien'],
  },
] as const;

export const BIOTYPES: readonly BiotypeEntry[] = [
  {
    id: 'ectomorph',
    name: 'Ectomorfo Delgado',
    heightLabel: 'Alta',
    heightRangeMeters: {
      min: 1.85,
      max: 2.1,
      unit: 'm',
      rawMarkdown: '.85-2.10$ m',
      inferredLeadingDigit: true,
    },
    weightRangeKg: {
      min: 50,
      max: 75,
      unit: 'kg',
      rawMarkdown: '0-75$ kg',
      inferredLeadingDigit: true,
    },
    skeletalStructure:
      'Palancas óseas largas, articulaciones estrechas, tórax plano',
    physicalAdvantages: 'Gran alcance de ataque, bajo costo calórico',
    physicalDisadvantages: 'Vulnerabilidad a la torsión, baja masa muscular',
    promptEn: 'tall lean ectomorph build, long narrow limbs, flat chest',
    tags: ['agile', 'fragile', 'triangle'],
  },
  {
    id: 'mesomorph',
    name: 'Mesomorfo Atlético',
    heightLabel: 'Media-Alta',
    heightRangeMeters: {
      min: 1.75,
      max: 1.9,
      unit: 'm',
      rawMarkdown: '.75-1.90$ m',
      inferredLeadingDigit: true,
    },
    weightRangeKg: {
      min: 70,
      max: 100,
      unit: 'kg',
      rawMarkdown: '0-100$ kg',
      inferredLeadingDigit: true,
    },
    skeletalStructure:
      'Hombros anchos, cintura estrecha, densidad ósea óptima',
    physicalAdvantages: 'Eficiencia neuromuscular, balance perfecto',
    physicalDisadvantages: 'Exige dieta proteica constante para mantenimiento',
    promptEn: 'athletic mesomorph build, broad shoulders, tapered waist, defined muscle tone',
    tags: ['balanced', 'martial'],
  },
  {
    id: 'endomorph',
    name: 'Endomorfo Corpulento',
    heightLabel: 'Media-Baja',
    heightRangeMeters: {
      min: 1.6,
      max: 1.75,
      unit: 'm',
      rawMarkdown: '.60-1.75$ m',
      inferredLeadingDigit: true,
    },
    weightRangeKg: {
      min: 85,
      max: 130,
      unit: 'kg',
      rawMarkdown: '5-130$ kg',
      inferredLeadingDigit: true,
    },
    skeletalStructure:
      'Caja torácica amplia, pelvis ensanchada, fémures cortos',
    physicalAdvantages: 'Inercia masiva, resistencia al derribo y al frío',
    physicalDisadvantages:
      'Baja aceleración sprint, mayor fatiga en ascensos',
    promptEn: 'heavy stout endomorph build, wide ribcage, thick torso and limbs',
    tags: ['heavy', 'circle', 'square'],
  },
  {
    id: 'giant_columnar',
    name: 'Gigante Columnar',
    heightLabel: 'Titánica',
    heightRangeMeters: {
      min: 2.6,
      max: 3.5,
      unit: 'm',
      rawMarkdown: '.60-3.50$ m',
      inferredLeadingDigit: true,
    },
    weightRangeKg: {
      min: 300,
      max: 900,
      unit: 'kg',
      rawMarkdown: '00-900$ kg',
      inferredLeadingDigit: true,
    },
    skeletalStructure:
      'Patas de paquidermo, fémures verticales rectos sin cuello',
    physicalAdvantages: 'Capacidad destructiva masiva, empuje colosal',
    physicalDisadvantages: 'Movilidad angular torpe, peligro mortal al caer',
    promptEn:
      'titanic towering giant physique, massive straight columnar limbs, immense bone density',
    tags: ['giant', 'square', 'brute'],
  },
  {
    id: 'dwarf_brachymorph',
    name: 'Braquimorfo Enano',
    heightLabel: 'Baja',
    heightRangeMeters: {
      min: 1.2,
      max: 1.45,
      unit: 'm',
      rawMarkdown: '.20-1.45$ m',
      inferredLeadingDigit: true,
    },
    weightRangeKg: {
      min: 60,
      max: 95,
      unit: 'kg',
      rawMarkdown: '0-95$ kg',
      inferredLeadingDigit: true,
    },
    skeletalStructure:
      'Huesos densos ultracortos, inserciones musculares anchas',
    physicalAdvantages: 'Torque masivo en palancas cortas, equilibrio',
    physicalDisadvantages:
      'Alcance de armas limitado, velocidad de carrera baja',
    promptEn:
      'short compact brachymorph build, ultra-dense short bones, wide muscular frame',
    tags: ['dwarf', 'square', 'earth'],
  },
] as const;

export const ALLOMETRIC_SCALING_RULES: readonly AllometricScalingRule[] = [
  {
    id: 'standard',
    name: 'Escala Estándar (1.00 m - 2.50 m)',
    thresholdDescription: 'Entre 1.00 m y 2.50 m / 25 kg a 300 kg',
    anatomicalMitigation:
      'Proporciones bípedas convencionales sin sobrecarga alométrica crítica.',
    circulatoryPhysiology: 'Presión arterial y gasto cardíaco estándar.',
    metabolismNote: 'Tasa metabólica basal proporcionada a su masa corporal.',
    promptEn: 'natural human-scale anatomical proportions',
  },
  {
    id: 'giant',
    name: 'Gigantes (> 2.50 m / > 300 kg)',
    thresholdDescription: 'Altura > 2.50 m y/o peso > 300 kg (Ley Cuadrático-Cúbica L³ vs L²)',
    anatomicalMitigation:
      'Las extremidades abandonan la curvatura y se vuelven columnas rectas y macizas (como elefantes o saurópodos) para transmitir el peso como compresión vertical.',
    circulatoryPhysiology:
      'Paredes arteriales extremadamente gruesas y ventrículos cardíacos masivos con presión hipertensa para bombear sangre hacia la cabeza.',
    metabolismNote:
      'Ley de Kleiber (∝ M^(3/4)): menor tasa metabólica por gramo; movimientos lentos, baja frecuencia cardíaca y dificultad crítica para disipar calor interno.',
    promptEn:
      'thick straight elephantine columnar legs supporting massive weight, barrel chest',
  },
  {
    id: 'diminutive',
    name: 'Diminutos / Enanos Reales (< 1.00 m / < 25 kg)',
    thresholdDescription: 'Altura < 1.00 m y/o peso < 25 kg',
    anatomicalMitigation:
      'Relación resistencia-peso enorme; pueden saltar múltiplos de su altura y sobrevivir a caídas de velocidad terminal aérea.',
    circulatoryPhysiology: 'Frecuencia cardíaca acelerada.',
    metabolismNote:
      'Metabolismo rápido con pérdida masiva de calor superficial y necesidad compulsiva de ingerir alimento calórico constantemente.',
    promptEn: 'tiny diminutive stature under one meter tall, hyper-agile small frame',
  },
] as const;

export const AMPUTATIONS: readonly AmputationEntry[] = [
  // Miembro Superior
  {
    id: 'amp_shoulder_disarticulation',
    zone: 'upper_limb',
    zoneLabel: 'Miembro Superior',
    name: 'Desarticulación de hombro',
    promptEn: 'missing entire arm amputated at the shoulder joint',
  },
  {
    id: 'amp_transhumeral',
    zone: 'upper_limb',
    zoneLabel: 'Miembro Superior',
    name: 'Amputación transhumeral (sobre el codo)',
    promptEn: 'above-elbow transhumeral arm amputation',
  },
  {
    id: 'amp_transradial',
    zone: 'upper_limb',
    zoneLabel: 'Miembro Superior',
    name: 'Amputación transradial (bajo el codo)',
    promptEn: 'below-elbow transradial forearm amputation',
  },
  {
    id: 'amp_wrist_disarticulation',
    zone: 'upper_limb',
    zoneLabel: 'Miembro Superior',
    name: 'Desarticulación de muñeca',
    promptEn: 'missing hand amputated at the wrist',
  },
  {
    id: 'amp_phalanges',
    zone: 'upper_limb',
    zoneLabel: 'Miembro Superior',
    name: 'Pérdida selectiva de falanges',
    promptEn: 'missing several fingers on one hand',
  },
  // Miembro Inferior
  {
    id: 'amp_hip_disarticulation',
    zone: 'lower_limb',
    zoneLabel: 'Miembro Inferior',
    name: 'Desarticulación de cadera',
    promptEn: 'missing entire leg amputated at the hip',
  },
  {
    id: 'amp_transfemoral',
    zone: 'lower_limb',
    zoneLabel: 'Miembro Inferior',
    name: 'Amputación transfemoral (sobre la rodilla)',
    promptEn: 'above-knee transfemoral leg amputation',
  },
  {
    id: 'amp_transtibial',
    zone: 'lower_limb',
    zoneLabel: 'Miembro Inferior',
    name: 'Amputación transtibial (bajo la rodilla)',
    promptEn: 'below-knee transtibial leg amputation',
  },
  {
    id: 'amp_syme',
    zone: 'lower_limb',
    zoneLabel: 'Miembro Inferior',
    name: 'Amputación de Syme (tobillo)',
    promptEn: 'ankle-level Syme foot amputation',
  },
  {
    id: 'amp_forefoot',
    zone: 'lower_limb',
    zoneLabel: 'Miembro Inferior',
    name: 'Pérdida del antepié',
    promptEn: 'partial forefoot amputation',
  },
  // Fanto-Facial
  {
    id: 'amp_ocular_enucleation',
    zone: 'facial_cranial',
    zoneLabel: 'Fanto-Facial',
    name: 'Enucleación ocular (pérdida de ojo)',
    promptEn: 'scarred empty eye socket from ocular enucleation',
  },
  {
    id: 'amp_auricular_ablation',
    zone: 'facial_cranial',
    zoneLabel: 'Fanto-Facial',
    name: 'Ablación de pabellón auricular',
    promptEn: 'scarred missing outer ear from auricular ablation',
  },
  {
    id: 'amp_mandibular_resection',
    zone: 'facial_cranial',
    zoneLabel: 'Fanto-Facial',
    name: 'Resección mandibular por metralla',
    promptEn: 'asymmetric scarred lower jaw from shrapnel mandibular resection',
  },
  {
    id: 'amp_tracheal_perforation',
    zone: 'facial_cranial',
    zoneLabel: 'Fanto-Facial',
    name: 'Perforación traqueal',
    promptEn: 'healed tracheal stoma scar on the throat',
  },
] as const;

export const PROSTHETICS: readonly ProstheticEntry[] = [
  {
    id: 'pros_primitive',
    tier: 'primitive',
    categoryLabel: 'Primitiva / Rústica',
    manufacturingExamples:
      'Pata de palo de roble ferrado; garfio de hierro forjado al fuego',
    articulationMechanism:
      'Bloqueo rígido pasivo; cinchas de cuero hervido remachadas',
    fieldAdvantages:
      'Inmune a disrupciones mágicas o eléctricas; fácil de reparar',
    costsAndMaintenance:
      'Rozaduras en el muñón, llagas de presión, nula motricidad fina',
    compatibleZones: ['upper_limb', 'lower_limb'],
    promptEn:
      'rustic iron-shod oak peg-leg or fire-forged iron hook strapped with riveted boiled leather harnesses',
    tags: ['primitive', 'nomad', 'monk'],
  },
  {
    id: 'pros_clockwork',
    tier: 'clockwork',
    categoryLabel: 'Mecánica / Clockwork',
    manufacturingExamples:
      'Brazo de latón articulado; pierna con muelles de ballesta',
    articulationMechanism:
      'Cables de tensión accionados por flexión escapular; trinquetes de bloqueo',
    fieldAdvantages:
      'Capacidad de empuñar armas y bloquear ataques; absorción de impacto',
    costsAndMaintenance:
      'Vulnerable al agua y la arena; requiere lubricación constante de engranajes',
    compatibleZones: ['upper_limb', 'lower_limb'],
    promptEn:
      'articulated brass clockwork prosthetic limb with visible exposed gears, tension cables, and leaf springs',
    tags: ['clockwork', 'tinker', 'imperial'],
  },
  {
    id: 'pros_biological',
    tier: 'biological_alchemical',
    categoryLabel: 'Biológica / Alquímica',
    manufacturingExamples:
      'Injerto de garra de monstruo; extremidad ósea cosida con magia',
    articulationMechanism:
      'Conexión neuromuscular forzada mediante linfa alquímica o nigromancia',
    fieldAdvantages:
      'Fuerza desproporcionada; capacidad de regeneración autónoma',
    costsAndMaintenance:
      'Rechazo inmunológico atroz; riesgo de posesión o dolor fantasma ardiente',
    compatibleZones: ['upper_limb', 'lower_limb', 'facial_cranial'],
    promptEn:
      'alchemically grafted monstrous chitin or stitched bone prosthetic limb with dark surgical sutures',
    tags: ['alchemy', 'monster', 'arcane'],
  },
  {
    id: 'pros_cybernetic',
    tier: 'cybernetic_scifi',
    categoryLabel: 'Cibernética / Sci-Fi',
    manufacturingExamples:
      'Brazo de titanio con actuadores lineales de miofibra',
    articulationMechanism:
      'Interfaz neuronal directa (conectores espinales a la corteza motora)',
    fieldAdvantages:
      'Fuerza sobrehumana, opción de módulos integrados (armas, escudos)',
    costsAndMaintenance:
      'Pérdida de Humanidad/Empatía (Ciberpsicosis); requiere recarga energética',
    compatibleZones: ['upper_limb', 'lower_limb', 'facial_cranial'],
    promptEn:
      'sleek matte titanium cybernetic prosthetic with exposed myofiber actuators and subtle status LEDs',
    tags: ['cybernetic', 'scifi', 'tactical'],
  },
] as const;

export const BODY_MODIFICATIONS: readonly BodyModificationEntry[] = [
  {
    id: 'mod_smuggling_compartment',
    name: 'Compartimento de Contrabando Oculto',
    description:
      'Espacio estanco dentro de la pantorrilla protésica para ocultar llaves maestras o viales de veneno.',
    requiresProsthetic: true,
    promptEn: 'concealed hinged smuggling compartment panel on prosthetic shin',
    tags: ['rogue', 'stealth', 'assassin'],
  },
  {
    id: 'mod_retractable_blade',
    name: 'Cuchilla Oculta Desplegable',
    description:
      'Hoja de resorte alojada en el antebrazo protésico liberada mediante una torsión específica de la muñeca.',
    requiresProsthetic: true,
    promptEn: 'spring-loaded retractable forearm blade housing',
    tags: ['assassin', 'clockwork', 'tactical'],
  },
  {
    id: 'mod_subdermal_armor',
    name: 'Blindaje Balístico Subcutáneo',
    description:
      'Mallas de fibra de aramida o escamas metálicas insertadas bajo la dermis del pecho.',
    requiresProsthetic: false,
    promptEn: 'subtle subdermal armor plate ridges visible beneath chest skin',
    tags: ['tank', 'tactical', 'cybernetic'],
  },
  {
    id: 'mod_weapon_mount',
    name: 'Conector de Anclaje de Armas',
    description:
      'Reemplazo de la mano por un encastre mecánico que atornilla directamente una maza, hacha o cañón de mano.',
    requiresProsthetic: true,
    promptEn: 'heavy mechanical weapon-lock socket replacing the hand',
    tags: ['martial', 'brute', 'primitive'],
  },
] as const;
