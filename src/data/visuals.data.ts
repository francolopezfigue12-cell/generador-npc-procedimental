import type {
  AgeGroupEntry,
  ChromaticTone,
  ColorProportionRule,
  ColorScript,
  GenderPresentationEntry,
  ShapeLanguageEntry,
  SkinToneEntry,
  SubversionParadigm,
  VisualFeatureEntry,
} from '../types/visuals';

export const AGE_GROUPS: readonly AgeGroupEntry[] = [
  {
    id: 'young_adult',
    name: 'Joven Adulto',
    ageRangeLabel: '18–25 años',
    promptEn: 'young adult',
    tags: ['agile', 'naive', 'chaotic'],
  },
  {
    id: 'adult',
    name: 'Adulto',
    ageRangeLabel: '26–42 años',
    promptEn: 'adult',
    tags: ['balanced', 'martial'],
  },
  {
    id: 'veteran',
    name: 'Maduro / Veterano',
    ageRangeLabel: '43–60 años',
    promptEn: 'middle-aged weathered veteran',
    tags: ['stoic', 'military', 'lawful'],
  },
  {
    id: 'elderly',
    name: 'Anciano',
    ageRangeLabel: '61–85+ años',
    promptEn: 'elderly wrinkled old',
    tags: ['sage', 'elderly', 'aged_titan'],
  },
] as const;

export const GENDER_PRESENTATIONS: readonly GenderPresentationEntry[] = [
  {
    id: 'masculine',
    name: 'Masculino',
    promptEn: 'male',
  },
  {
    id: 'feminine',
    name: 'Femenino',
    promptEn: 'female',
  },
  {
    id: 'androgynous',
    name: 'Andrógino / No binario',
    promptEn: 'androgynous',
  },
] as const;

export const COLOR_PROPORTION_RULES: readonly ColorProportionRule[] = [
  {
    role: 'dominant_60',
    label: 'Color Dominante (60%)',
    percentage: 60,
    saturationRange: '5-40%',
    usageDescription:
      'Define la silueta base, el abrigo principal, la túnica o la armadura. Niveles de saturación bajos a medios para no fatigar la visión y anclar al personaje en su entorno.',
  },
  {
    role: 'secondary_30',
    label: 'Color Secundario (30%)',
    percentage: 30,
    saturationRange: '0-70%',
    usageDescription:
      'Ocupa prendas intermedias, jubones, correas, pantalones o armas secundarias. Establece la afinidad ideológica, gremial o de clase.',
  },
  {
    role: 'accent_10',
    label: 'Color de Acento Focal (10%)',
    percentage: 10,
    saturationRange: '0-100%',
    usageDescription:
      'Reservado para puntos de máximo interés visual: ojos, joyas arcanas, empuñaduras, marcas mágicas o el filo de un arma. Contraste tonal extremo frente al dominante.',
  },
] as const;

export const CHROMATIC_TONES: readonly ChromaticTone[] = [
  {
    id: 'color_crimson_red',
    name: 'Rojo Carmesí',
    symbolism: 'Fuego, sangre, impulso marcial',
    positiveMeaning: 'Pasión indómita, coraje, vitalidad',
    negativeMeaning: 'Furia berserker, brutalidad, tiranía',
    recommendedApplication: 'Guerreros de choque, líderes coléricos',
    previewHex: '#9E1B24',
    promptEn: 'deep crimson red',
    tags: ['fire', 'martial', 'aggressive'],
  },
  {
    id: 'color_ultramarine_blue',
    name: 'Azul Ultramar',
    symbolism: 'Cielo, océano, intelecto frío',
    positiveMeaning: 'Lealtad, disciplina, serenidad analítica',
    negativeMeaning: 'Frialdad calculadora, desapego, crueldad clínica',
    recommendedApplication: 'Eruditos arcanos, jueces dogmáticos',
    previewHex: '#1E3A8A',
    promptEn: 'ultramarine blue',
    tags: ['water', 'scholar', 'lawful', 'cold'],
  },
  {
    id: 'color_amber_yellow',
    name: 'Amarillo Ámbar',
    symbolism: 'Sol, oro, actividad bioeléctrica',
    positiveMeaning: 'Sabiduría, optimismo, agudeza mental',
    negativeMeaning: 'Traición, cobardía, inestabilidad maniática',
    recommendedApplication: 'Pícaros ágiles, hechiceros electrocinéticos',
    previewHex: '#D97706',
    promptEn: 'golden amber yellow',
    tags: ['lightning_metal', 'rogue', 'agile'],
  },
  {
    id: 'color_emerald_green',
    name: 'Verde Esmeralda',
    symbolism: 'Bosque, veneno, bilis, crecimiento',
    positiveMeaning: 'Resiliencia orgánica, curación, fertilidad',
    negativeMeaning: 'Podredumbre, envidia corrosiva, ponzoña',
    recommendedApplication: 'Rastreadores, nigromantes fitomórficos',
    previewHex: '#065F46',
    promptEn: 'emerald forest green',
    tags: ['earth', 'ranger', 'venom', 'nature'],
  },
  {
    id: 'color_imperial_purple',
    name: 'Morado Imperial',
    symbolism: 'Realeza arcana, otredad cósmica',
    positiveMeaning: 'Soberanía, misticismo elevado, nobleza',
    negativeMeaning: 'Corrupción eldritch, decadencia megalómana',
    recommendedApplication: 'Brujos del vacío, monarcas corruptos',
    previewHex: '#581C87',
    promptEn: 'imperial royal purple',
    tags: ['void_shadow', 'noble', 'arcane'],
  },
  {
    id: 'color_rust_orange',
    name: 'Naranja Óxido',
    symbolism: 'Tierra quemada, industria, forja',
    positiveMeaning: 'Ingenio artesanal, energía festiva',
    negativeMeaning: 'Agotamiento abrasador, ambición desmedida',
    recommendedApplication: 'Artificieros, ingenieros de trinchera',
    previewHex: '#9A3412',
    promptEn: 'burnt rust orange',
    tags: ['tinker', 'forge', 'industrial'],
  },
  {
    id: 'color_snow_white',
    name: 'Blanco Níveo',
    symbolism: 'Nieve, pureza, luz solar directa',
    positiveMeaning: 'Trascendencia moral, santidad, rectitud',
    negativeMeaning: 'Fanatismo inflexible, vacío nihilista, frialdad',
    recommendedApplication: 'Inquisidores implacables, caballeros sagrados',
    previewHex: '#E5E7EB',
    promptEn: 'stark snow white',
    tags: ['holy', 'fanatic', 'seraphic', 'light'],
  },
  {
    id: 'color_jet_black',
    name: 'Negro Azabache',
    symbolism: 'Noche, carbón, sombra profunda',
    positiveMeaning: 'Elegancia, misterio, autoridad soberana',
    negativeMeaning: 'Muerte, nihilismo predatorio, podredumbre',
    recommendedApplication: 'Asesinos sigilosos, señores de la guerra',
    previewHex: '#18181B',
    promptEn: 'charcoal jet black',
    tags: ['void_shadow', 'stealth', 'assassin', 'dark'],
  },
  {
    id: 'color_pastel_pink',
    name: 'Rosa Pastel',
    symbolism: 'Dulzura aparente, inocencia, porcelana',
    positiveMeaning: 'Ternura, calidez juvenil, calma',
    negativeMeaning: 'Falsa inocencia, disonancia siniestra',
    recommendedApplication: 'Cortesanos, subversiones de asesino tierno',
    previewHex: '#F9A8D4',
    promptEn: 'soft pastel pink',
    tags: ['pastel', 'circle', 'innocent'],
  },
  {
    id: 'color_pastel_lavender',
    name: 'Lavanda Pastel',
    symbolism: 'Onirismo, delicadeza, ensueño arcano',
    positiveMeaning: 'Sensibilidad, misticismo sereno',
    negativeMeaning: 'Melancolía irreal, evasión',
    recommendedApplication: 'Ilusionistas, nobleza excéntrica',
    previewHex: '#DDD6FE',
    promptEn: 'soft pastel lavender',
    tags: ['pastel', 'arcane', 'circle'],
  },
  {
    id: 'color_pastel_mint',
    name: 'Menta Pastel',
    symbolism: 'Brote tierno, botánica suave, calma clínica',
    positiveMeaning: 'Sanación, frescura, esperanza',
    negativeMeaning: 'Frialdad hospitalaria encubierta',
    recommendedApplication: 'Sanadores, botánicos, boticarios',
    previewHex: '#A7F3D0',
    promptEn: 'soft pastel mint green',
    tags: ['pastel', 'healing', 'circle'],
  },
] as const;

export const COLOR_SCRIPTS: readonly ColorScript[] = [
  {
    id: 'script_moral_corruption',
    name: 'Progresión de Corrupción Moral',
    referenceCase: 'Caso Walter White',
    progression:
      'Del verde oliva y beige anodino de sumisión civil, transitando por marrones terrosos en su ascenso pragmático, hasta culminar en negro carbón y verde oscuro venenoso como señor del hampa.',
    suggestedToneIds: ['color_emerald_green', 'color_jet_black'],
    tags: ['evil', 'corruption'],
  },
  {
    id: 'script_trial_maturation',
    name: 'Progresión de Prueba y Maduración',
    referenceCase: 'Caso Luke Skywalker',
    progression:
      'Del blanco inmaculado de granjero inocente, al gris y caqui de la prueba de Dagobah, al negro riguroso de tentación marcial, abriendo finalmente una solapa interior blanca al vencer el odio.',
    suggestedToneIds: ['color_snow_white', 'color_jet_black'],
    tags: ['good', 'hero', 'redemption'],
  },
  {
    id: 'script_trauma_schism',
    name: 'Progresión de Trauma y Escisión',
    referenceCase: 'Caso Jinx',
    progression:
      'Tonos apagados azulados y grises en la infancia traumatizada, que estallan en contrastes estridentes de magenta fosforescente, azul cian y ojos rosados alterados por drogas químicas (Shimmer).',
    suggestedToneIds: ['color_ultramarine_blue', 'color_imperial_purple'],
    tags: ['trauma', 'chaotic', 'chemical'],
  },
] as const;

export const SHAPE_LANGUAGES: readonly ShapeLanguageEntry[] = [
  {
    id: 'circle',
    name: 'Círculo / Óvalo',
    psychologicalConnotations:
      'Amabilidad, inocencia, calidez, accesibilidad, balance',
    anatomicalProperties:
      'Rostros redondeados, ojos grandes esféricos, abdomen curvado, extremidades sinuosas',
    conventionalArchetypes:
      'Mentores maternales, sanadores, niños inocentes, alivios cómicos',
    structuralSubversion:
      'Asesino psicópata de apariencia tierna y cuerpo rechoncho',
    promptEn:
      'rounded soft silhouette, circular facial features, curved organic shapes',
    tags: ['gentle', 'innocent', 'subversion_assassin'],
  },
  {
    id: 'square',
    name: 'Cuadrado / Rectángulo',
    psychologicalConnotations:
      'Estabilidad, terquedad, poder defensivo, pesadez, orden',
    anatomicalProperties:
      'Mandíbula recta y maciza, torso en barril, hombros horizontales, piernas columnares',
    conventionalArchetypes:
      'Tanques acorazados, soldados disciplinados, constructores',
    structuralSubversion:
      'Gigante colosal cuadrado de fragilidad osteomuscular o espíritu pacifista',
    promptEn:
      'blocky rectangular silhouette, broad horizontal shoulders, heavy squared jawline',
    tags: ['tank', 'lawful', 'subversion_colossus'],
  },
  {
    id: 'triangle',
    name: 'Triángulo / Cuña Aguda',
    psychologicalConnotations:
      'Peligro, astucia, agresividad, velocidad, filo letal',
    anatomicalProperties:
      'Barbilla afilada, pómulos cortantes, hombreras punzantes, silueta en V invertida',
    conventionalArchetypes:
      'Villanos siniestros, pícaros traicioneros, monstruos predatorios',
    structuralSubversion:
      'Héroe salvador cuya anatomía aguda y amenazante aterra a quienes rescata',
    promptEn:
      'sharp angular silhouette, inverted triangle torso, pointed cheekbones and jagged edges',
    tags: ['agile', 'predator', 'subversion_monster'],
  },
] as const;

export const SILHOUETTE_READABILITY_RULES: readonly string[] = [
  'Su postura revela de inmediato su centro de masa y nivel de tensión.',
  'Su arma u objeto distintivo se separa con nitidez del contorno del torso.',
  'El espacio negativo entre brazos, piernas y accesorios previene masas amorfas confusas.',
] as const;

export const TATTOOS_AND_MARKS: readonly VisualFeatureEntry[] = [
  {
    id: 'tat_arcane_runes',
    category: 'tattoo',
    name: 'Sellos Rúnicos Arcanos',
    description:
      'Inscripciones de plata incrustada bajo la dermis que resplandecen al canalizar energía.',
    promptEn: 'glowing silver arcane rune inlays embedded under the skin',
    tags: ['arcane', 'powers'],
  },
  {
    id: 'tat_slavery_heresy',
    category: 'tattoo',
    name: 'Marcas de Esclavitud o Herejía',
    description:
      'Tatuajes o quemaduras a fuego vivo en mejillas o cuello con códigos alfanuméricos o sellos inquisitoriales.',
    promptEn: 'inquisitorial brand scars and alphanumeric markings on cheek and neck',
    tags: ['outcast', 'trauma'],
  },
  {
    id: 'tat_ritual_scarification',
    category: 'tattoo',
    name: 'Cicatrización Ritual / Escarificación',
    description:
      'Patrones geométricos en relieve sobre hombros y torso que indican linaje tribal o castas de iniciación.',
    promptEn: 'raised geometric ritual scarification patterns across shoulders and arms',
    tags: ['tribal', 'warrior'],
  },
  {
    id: 'tat_prison_guild',
    category: 'tattoo',
    name: 'Tatuajes Carcelarios / Gremiales',
    description:
      'Marcas de tinta tosca en nudillos o cuello que revelan homicidios cometidos, tiempo de condena o rango en el sindicato del crimen.',
    promptEn: 'crude black ink prison and syndicate tattoos on knuckles and neck',
    tags: ['criminal', 'rogue'],
  },
  {
    id: 'tat_biomechanical_mesh',
    category: 'tattoo',
    name: 'Mallas Biomecánicas',
    description:
      'Tatuajes de tinta de carbón conductora que conectan implantes subcutáneos con terminales nerviosas.',
    promptEn: 'conductive carbon-ink circuit mesh lines tracing subcutaneous implants',
    tags: ['cybernetic', 'tinker'],
  },
] as const;

export const EYEWEAR_DEVICES: readonly VisualFeatureEntry[] = [
  {
    id: 'eye_academic_round',
    category: 'eyewear',
    name: 'Gafas Académicas Redondas',
    description:
      'Montura de alambre fino con cristales gruesos de aumento, fijadas con cordel encerado.',
    promptEn: 'thin wire-rimmed round academic spectacles secured with waxed cord',
    tags: ['scholar', 'circle'],
  },
  {
    id: 'eye_pince_nez',
    category: 'eyewear',
    name: 'Quevedos con Cadena',
    description:
      'Lentes ovalados sin patillas que presionan el tabique nasal, sujetos a una cadena de latón al chaleco.',
    promptEn: 'oval pince-nez spectacles clipped to a brass chain',
    tags: ['noble', 'pedant'],
  },
  {
    id: 'eye_steampunk_goggles',
    category: 'eyewear',
    name: 'Gafas Industriales / Steampunk',
    description:
      'Cuero oscuro cosido a mano con doble juego de lentes abatibles (verde tintado y lupa de aumento).',
    promptEn: 'stitched dark leather industrial goggles with flip-down green tinted magnifying lenses',
    tags: ['tinker', 'clockwork', 'engineer'],
  },
  {
    id: 'eye_tactical_monocle',
    category: 'eyewear',
    name: 'Monóculo Táctico',
    description:
      'Ocular único con borde de metal pulido y retícula de distancia graduada mediante grabado al ácido.',
    promptEn: 'polished metal tactical monocle with acid-etched rangefinder reticle',
    tags: ['military', 'precision'],
  },
  {
    id: 'eye_blind_smoked',
    category: 'eyewear',
    name: 'Anteojos Ahumados de Ciego',
    description:
      'Cristales negros opacos montados en carey para ocultar cuencas vacías o cataratas arcanas.',
    promptEn: 'opaque black tortoiseshell smoked glasses concealing blind eyes',
    tags: ['mysterious', 'blind'],
  },
] as const;

export const PATCHES_AND_MASKS: readonly VisualFeatureEntry[] = [
  {
    id: 'mask_leather_eyepatch',
    category: 'patch_mask',
    name: 'Parche de Cuero Curtido',
    description:
      'Banda simple de piel de vacuno con cordel de cuero, desgastada por el sudor.',
    promptEn: 'weathered tanned leather eyepatch held by a worn leather cord',
    tags: ['martial', 'primitive', 'nomad'],
  },
  {
    id: 'mask_armored_eyepatch',
    category: 'patch_mask',
    name: 'Parche Blindado',
    description:
      'Placa de acero remachada directamente a los huesos de la órbita mediante clavos quirúrgicos.',
    promptEn: 'riveted steel orbital armor plate bolted over one eye socket',
    tags: ['military', 'cybernetic', 'brutal'],
  },
  {
    id: 'mask_porcelain_half',
    category: 'patch_mask',
    name: 'Media Máscara de Porcelana',
    description:
      'Cubre la mitad desfigurada del rostro con pintura blanca inexpresiva y labios de pan de oro.',
    promptEn: 'smooth white porcelain half-mask with gold leaf trim covering half the face',
    tags: ['noble', 'dramatic', 'seraphic'],
  },
  {
    id: 'mask_iron_death',
    category: 'patch_mask',
    name: 'Máscara Mortuoria de Hierro',
    description:
      'Rostro metálico impasible con pequeñas ranuras para la visión y respiradores enrejados.',
    promptEn: 'impassive forged iron death mask with narrow eye slits and grated vents',
    tags: ['fanatic', 'knight', 'inquisitor'],
  },
  {
    id: 'mask_chemical_respirator',
    category: 'patch_mask',
    name: 'Respirador Químico Táctico',
    description:
      'Máscara de caucho reforzado con doble filtro de fuelle lateral para entornos tóxicos o pestilentes.',
    promptEn: 'reinforced rubber tactical respirator mask with dual side bellows filters',
    tags: ['chemical', 'tactical', 'alchemist'],
  },
] as const;

export const HAIR_CUTS: readonly VisualFeatureEntry[] = [
  {
    id: 'hair_shaved_scarred',
    category: 'hair_cut',
    name: 'Cabeza rapada con cicatrices craneales',
    description: 'Cabeza rapada al rape mostrando cicatrices craneales.',
    promptEn: 'completely shaved head revealing cranial battle scars',
  },
  {
    id: 'hair_wild_bone_braids',
    category: 'hair_cut',
    name: 'Melena salvaje trenzada con cuentas de hueso',
    description: 'Melena salvaje trenzada con cuentas de hueso y tendones.',
    promptEn: 'wild untamed mane braided with bone beads and sinew wraps',
  },
  {
    id: 'hair_samurai_topknot',
    category: 'hair_cut',
    name: 'Moño samurái (topknot) con sienes afeitadas',
    description: 'Moño samurái (topknot) afeitado en las sienes.',
    promptEn: 'traditional topknot bun with clean-shaved temples',
  },
  {
    id: 'hair_clay_mohawk',
    category: 'hair_cut',
    name: 'Cresta mohawk rígida',
    description: 'Cresta mohawk rígida teñida con arcilla.',
    promptEn: 'stiff clay-spiked mohawk crest',
  },
  {
    id: 'hair_spiral_cornrows',
    category: 'hair_cut',
    name: 'Trenzas en espiral pegadas al cráneo',
    description: 'Trenzas en espiral cosidas contra el cuero cabelludo.',
    promptEn: 'tight spiral braids woven close to the scalp',
  },
] as const;

export const HAIR_COLORS: readonly VisualFeatureEntry[] = [
  {
    id: 'hcolor_marie_antoinette',
    category: 'hair_color',
    name: 'Blanco platino prematuro',
    description:
      'Blanco platino prematuro (síndrome de Marie Antoinette tras trauma agudo).',
    promptEn: 'premature stark platinum white hair',
  },
  {
    id: 'hcolor_raven_blue',
    category: 'hair_color',
    name: 'Negro ala de cuervo',
    description: 'Negro ala de cuervo con reflejos azulados.',
    promptEn: 'raven black hair with subtle blue sheen',
  },
  {
    id: 'hcolor_copper_rust',
    category: 'hair_color',
    name: 'Rojo óxido cobrizo',
    description: 'Rojo óxido cobrizo.',
    promptEn: 'oxidized copper rust-red hair',
  },
  {
    id: 'hcolor_poliosis_streak',
    category: 'hair_color',
    name: 'Azabache con mechón blanco (Poliosis)',
    description: 'Mechón blanco frontal en una cabellera azabache (poliosis).',
    promptEn: 'jet black hair with a stark white frontal poliosis streak',
  },
  {
    id: 'hcolor_total_albinism',
    category: 'hair_color',
    name: 'Albinismo total',
    description: 'Albinismo total con cejas invisibles.',
    promptEn: 'pure albino white hair and pale barely visible eyebrows',
  },
  {
    id: 'hcolor_chemical_moss',
    category: 'hair_color',
    name: 'Verde musgo químico',
    description: 'Verde musgo antinatural por intoxicación química.',
    promptEn: 'unnatural chemically stained moss-green hair',
  },
] as const;

/**
 * Paleta complementaria de piel, pelaje, plumaje y escamas adaptada a las 8 razas.
 */
export const SKIN_TONES: readonly SkinToneEntry[] = [
  {
    id: 'skin_alabaster_pale',
    name: 'Alabastro pálido / Marfil',
    description: 'Tez muy clara con subtonos fríos o traslúcidos.',
    previewHex: '#EFE2D6',
    compatibleRaceIds: ['human', 'elf', 'dwarf'],
    promptEn: 'pale alabaster ivory skin',
    tags: ['light', 'seraphic', 'subterranean'],
  },
  {
    id: 'skin_warm_olive',
    name: 'Oliva cálido curtido',
    description: 'Piel bronceada por exposición solar constante.',
    previewHex: '#C6966B',
    compatibleRaceIds: ['human', 'elf', 'dwarf'],
    promptEn: 'sun-weathered warm olive skin',
    tags: ['nomad', 'warm'],
  },
  {
    id: 'skin_deep_umber',
    name: 'Ébano / Tierra oscura',
    description: 'Tez marrón profunda con matices cálidos.',
    previewHex: '#5C3A28',
    compatibleRaceIds: ['human', 'elf', 'dwarf'],
    promptEn: 'deep rich umber dark brown skin',
    tags: ['warm', 'sturdy'],
  },
  {
    id: 'skin_ashen_slate',
    name: 'Gris pizarra ceniciento',
    description: 'Tono mineral apagado adaptado a cavernas o ceniza.',
    previewHex: '#7A8086',
    compatibleRaceIds: ['orc', 'dwarf', 'human'],
    promptEn: 'ashen slate-gray mineral skin',
    tags: ['subterranean', 'void_shadow'],
  },
  {
    id: 'skin_moss_green_orc',
    name: 'Verde oliva acorazado',
    description: 'Dermis gruesa verdosa con cicatrices blanquecinas.',
    previewHex: '#566E45',
    compatibleRaceIds: ['orc'],
    promptEn: 'thick weathered olive-green orcish skin',
    tags: ['orc', 'martial'],
  },
  {
    id: 'skin_tawny_lynx',
    name: 'Pelaje ocre moteado',
    description: 'Pelaje corto leonado con rosetas oscuras.',
    previewHex: '#B68952',
    compatibleRaceIds: ['beastfolk_feline'],
    promptEn: 'tawny spotted feline fur',
  },
  {
    id: 'skin_panther_onyx',
    name: 'Pelaje negro azabache',
    description: 'Pelaje felino oscuro lustroso.',
    previewHex: '#232329',
    compatibleRaceIds: ['beastfolk_feline'],
    promptEn: 'sleek panther-black feline fur',
  },
  {
    id: 'skin_corvid_plumage',
    name: 'Plumaje negro iridiscente',
    description: 'Plumas oscuras con reflejos azul petróleo y gris pizarra.',
    previewHex: '#2A3342',
    compatibleRaceIds: ['beastfolk_avian'],
    promptEn: 'iridescent dark corvid plumage feathers',
  },
  {
    id: 'skin_raptor_ochre',
    name: 'Plumaje pardo y crema alpino',
    description: 'Plumas rapaces estriadas en tonos ocres y marfil.',
    previewHex: '#8E7355',
    compatibleRaceIds: ['beastfolk_avian'],
    promptEn: 'streaked raptor brown and cream plumage',
  },
  {
    id: 'skin_jade_scales',
    name: 'Escamas verde jade y obsidiana',
    description: 'Placas de beta-queratina verde profundo con vientre pálido.',
    previewHex: '#355E4B',
    compatibleRaceIds: ['beastfolk_reptilian'],
    promptEn: 'textured jade-green and dark slate reptilian scales',
  },
  {
    id: 'skin_desert_rust_scales',
    name: 'Escamas ocre desértico',
    description: 'Escamas queratinizadas color terracota y arena.',
    previewHex: '#9C5B3A',
    compatibleRaceIds: ['beastfolk_reptilian'],
    promptEn: 'desert terracotta and sand-toned reptilian scales',
  },
  {
    id: 'skin_abyssal_teal',
    name: 'Piel ictioide azul abisal',
    description: 'Escamas húmedas azul verdoso con branquias violáceas.',
    previewHex: '#295F6D',
    compatibleRaceIds: ['beastfolk_ichthyoid'],
    promptEn: 'smooth moist abyssal teal-blue aquatic skin with faint silver scales',
  },
] as const;

export const EYE_ANOMALIES: readonly VisualFeatureEntry[] = [
  {
    id: 'eyeanom_complete_heterochromia',
    category: 'eye_anomaly',
    name: 'Heterocromía Completa',
    description: 'Un iris azul gélido y otro castaño avellana profundo.',
    promptEn: 'complete heterochromia with one icy blue iris and one deep hazel iris',
  },
  {
    id: 'eyeanom_sectoral_heterochromia',
    category: 'eye_anomaly',
    name: 'Heterocromía Sectorial',
    description:
      'Un cuarto del iris derecho teñido de negro absoluto sobre un fondo verde pálido.',
    promptEn: 'sectoral heterochromia with a pitch-black wedge in a pale green iris',
  },
  {
    id: 'eyeanom_arcus_senilis',
    category: 'eye_anomaly',
    name: 'Arco Senil (Arcus Senilis)',
    description:
      'Anillo blanquecino o grisáceo de depósitos lipídicos en la periferia de la córnea, otorgando mirada de estatua antigua.',
    promptEn: 'pale grayish-white corneal rings giving an ancient statue-like gaze',
  },
  {
    id: 'eyeanom_stained_sclera',
    category: 'eye_anomaly',
    name: 'Esclerótica Teñida',
    description:
      'Escleróticas ennegrecidas por quemaduras arcanas o veneno de serpiente, haciendo resaltar pupilas doradas.',
    promptEn: 'blackened pitch-dark sclera making glowing golden pupils stand out',
  },
] as const;

export const CLOTHING_STYLES: readonly VisualFeatureEntry[] = [
  {
    id: 'cloth_wasteland_nomad',
    category: 'clothing',
    name: 'Nómada de Erial',
    description:
      'Capas superpuestas de lona y cuero polvoriento, vendas en los antebrazos, capuchas anchas con visor de tela.',
    promptEn:
      'layered dusty canvas and weathered leather wasteland nomad robes, forearm cloth wraps, wide draped hood',
    tags: ['nomad', 'air', 'survivor'],
  },
  {
    id: 'cloth_declining_imperial',
    category: 'clothing',
    name: 'Militar Imperial en Declive',
    description:
      'Casaca de paño rojo oscuro con charreteras deshilachadas, botones de latón oxidado y botas de montar agrietadas.',
    promptEn:
      'tattered imperial military greatcoat with frayed epaulets, tarnished brass buttons, cracked riding boots',
    tags: ['military', 'square', 'lawful'],
  },
  {
    id: 'cloth_mendicant_monk',
    category: 'clothing',
    name: 'Monje Mendicante / Asceta',
    description:
      'Sayal áspero de arpillera descolorida, atado con soga de cáñamo, sin calzado, con escapularios de madera.',
    promptEn:
      'coarse faded burlap ascetic tunic tied with hemp rope waist cord, barefoot, wooden scapular charms',
    tags: ['monk', 'temperance', 'earth'],
  },
  {
    id: 'cloth_decadent_nobility',
    category: 'clothing',
    name: 'Nobleza Decadente',
    description:
      'Jubones de terciopelo morado con mangas abullonadas rasgadas, gorgueras rígidas de encaje y anillos en cada dedo.',
    promptEn:
      'decadent nobleman velvet doublet with torn puffed sleeves, stiff lace ruff collar, heavy rings on fingers',
    tags: ['noble', 'purple', 'pastel_capable'],
  },
  {
    id: 'cloth_tactical_mercenary',
    category: 'clothing',
    name: 'Utilitario Táctico / Mercenario',
    description:
      'Arnés de cuero pesado con pistoleras cruzadas, cinchas pectorales, placas de armadura asimétricas sobre el brazo ejecutor.',
    promptEn:
      'heavy leather tactical mercenary harness, chest webbing straps, asymmetric steel pauldron',
    tags: ['mercenary', 'tactical', 'triangle'],
  },
  {
    id: 'cloth_alchemist_coat',
    category: 'clothing',
    name: 'Bata de Alquimista / Boticario',
    description:
      'Abrigo largo encerado manchado de reactivos, bandolera con frascos de vidrio y guantes largos de goma.',
    promptEn:
      'stained waxed alchemist long coat, glass potion vial bandolier, long rubberized gloves',
    tags: ['alchemist', 'scholar', 'chemical'],
  },
  {
    id: 'cloth_corsair_sailor',
    category: 'clothing',
    name: 'Corsario / Navegante de Altura',
    description:
      'Casaca abierta de lona impermeable, faja de seda en la cintura, botas altas con vuelta y brújula colgante.',
    promptEn:
      'weathered sea corsair coat, wide waist sash, tall cuffed leather boots',
    tags: ['water', 'nomad', 'rogue'],
  },
  {
    id: 'cloth_beast_hunter',
    category: 'clothing',
    name: 'Cazador de Bestias / Trampero',
    description:
      'Capa corta de piel curtida, hombrera de hueso tallado, carcaj o trampas metálicas al cinto.',
    promptEn:
      'fur-lined beast hunter cloak, carved bone shoulder guard, leather belt with traps',
    tags: ['ranger', 'predator', 'earth'],
  },
  {
    id: 'cloth_inquisitor_cleric',
    category: 'clothing',
    name: 'Clérigo / Inquisidor Canónico',
    description:
      'Sotana estructurada con estola bordada, relicario metálico en el pecho y cinturón de sellos.',
    promptEn:
      'structured clerical vestments with embroidered stole, iron reliquary pendant',
    tags: ['lawful', 'fanatic', 'holy'],
  },
  {
    id: 'cloth_artificer_workshop',
    category: 'clothing',
    name: 'Artificiero de Taller',
    description:
      'Delantal de cuero ignífugo sobre camisa arremangada, cinturón repleto de tenazas, llaves y calibradores.',
    promptEn:
      'heavy fireproof leather smith apron over rolled sleeves, tool belt with calipers and wrenches',
    tags: ['tinker', 'clockwork', 'creator'],
  },
] as const;

export const SUBVERSION_PARADIGMS: readonly SubversionParadigm[] = [
  {
    id: 'aged_titan',
    name: 'Anciano frágil de fuerza titánica',
    apparentVisualParadigm: 'Anciano frágil, decrépito, encorvado',
    realMechanicalCapacity: 'Fuerza titánica explosiva y velocidad sobrehumana',
    internalPsychologicalContrast: 'Mente despiadada y vitalidad juvenil concentrada',
    cognitiveEffect: 'Desconcierto inicial seguido de terror o admiración',
    archetypalExamples: 'Maestro ermitaño marcial, Sabio antiguo de kung-fu',
    promptVisualEn:
      'hunched frail elderly appearance with withered posture and wrinkled face, subtly coiled dense musculature beneath loose garments hinting explosive strength',
    biasHints: {
      preferredShapeIds: ['circle', 'triangle'],
      preferredClothingIds: ['cloth_mendicant_monk', 'cloth_wasteland_nomad'],
    },
  },
  {
    id: 'gentle_colossus',
    name: 'Coloso acorazado pacifista y frágil',
    apparentVisualParadigm: 'Coloso hipertrofiado, acorazado con picos',
    realMechanicalCapacity: 'Fragilidad ósea extrema o habla en susurros infantiles',
    internalPsychologicalContrast:
      'Pacifismo radical, botánico devoto, pánico al dolor',
    cognitiveEffect: 'Desarme emocional, simpatía protectora inmediata',
    archetypalExamples: 'El gigante gentil, el monstruo incomprendido',
    promptVisualEn:
      'towering broad-shouldered armored colossus silhouette with gentle timid posture, delicate botanical satchel and soft caring eyes',
    biasHints: {
      preferredShapeIds: ['square'],
      preferredToneIds: ['color_emerald_green'],
    },
  },
  {
    id: 'pastel_assassin',
    name: 'Asesino letal de silueta tierna y tonos pastel',
    apparentVisualParadigm: 'Asesino letal con silueta redondeada y ropa pastel',
    realMechanicalCapacity: 'Letalidad quirúrgica, maestro de venenos y tortura',
    internalPsychologicalContrast:
      'Sadismo frío y meticuloso tras una sonrisa ingenua',
    cognitiveEffect: 'Terror siniestro (Uncanny Valley moral)',
    archetypalExamples: 'El niño asesino, muñeca mortal',
    promptVisualEn:
      'deceptively harmless rounded silhouette in soft pastel-washed noble attire with an eerily calm innocent smile concealing hidden surgical poison vials',
    biasHints: {
      preferredShapeIds: ['circle'],
      preferredClothingIds: ['cloth_decadent_nobility'],
    },
  },
  {
    id: 'acrobatic_amputee',
    name: 'Guerrero amputado de movilidad acrobática superior',
    apparentVisualParadigm: 'Guerrero con amputación de pierna y muleta tosca',
    realMechanicalCapacity: 'Movilidad acrobática superior; muleta-vaina de estoque',
    internalPsychologicalContrast:
      'Orgullo indomable que rechaza cualquier conmiseración',
    cognitiveEffect: 'Admiración por la maestría biomecánica adaptativa',
    archetypalExamples: 'Espadachín tullido maestro',
    promptVisualEn:
      'fierce proud warrior with lower-leg amputation balanced effortlessly on a custom iron-shod wooden crutch-scabbard, dynamic agile stance',
    biasHints: {
      requiresAmputation: true,
      preferredShapeIds: ['triangle'],
      preferredClothingIds: ['cloth_tactical_mercenary', 'cloth_declining_imperial'],
    },
  },
  {
    id: 'corrupt_seraph',
    name: 'Ángel radiante sociópata',
    apparentVisualParadigm: 'Ángel radiante de blanco puro y mirada seráfica',
    realMechanicalCapacity: 'Sociópata despiadado, traidor consumado, carnicero',
    internalPsychologicalContrast:
      'Vacío afectivo total y narcisismo megalómano destructivo',
    cognitiveEffect: 'Repulsión y traición visceral',
    archetypalExamples: 'El líder mesiánico corrupto (Griffith/Femto)',
    promptVisualEn:
      'immaculate snow-white aristocratic garments and serene angelic gaze with cold detached eyes devoid of empathy',
    biasHints: {
      preferredToneIds: ['color_snow_white', 'color_imperial_purple'],
      preferredClothingIds: ['cloth_decadent_nobility'],
    },
  },
  {
    id: 'compassionate_monster',
    name: 'Monstruo abominable sanador y compasivo',
    apparentVisualParadigm: 'Monstruo abominable con colmillos y piel escamosa',
    realMechanicalCapacity: 'Cirujano de precisión exquisita y terapeuta compasivo',
    internalPsychologicalContrast:
      'Devoción sacerdotal al alivio del sufrimiento ajeno',
    cognitiveEffect: 'Cuestionamiento de los prejuicios visuales del mundo',
    archetypalExamples: 'El médico demoníaco',
    promptVisualEn:
      'intimidating fanged monstrous visage and thick scaled hide paired with delicate surgical instruments, clean bandages, and gentle attentive demeanor',
    biasHints: {
      preferredShapeIds: ['triangle', 'square'],
      preferredToneIds: ['color_emerald_green', 'color_snow_white'],
    },
  },
] as const;
