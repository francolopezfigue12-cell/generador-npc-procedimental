import type {
  BiologicalPotentialEntry,
  ElementalAffinity,
  PowerCostEntry,
  PowersDatabase,
  PrtClassification,
} from '../types/powers';

/**
 * Base de datos del Informe 4: Afinidades Elementales y Poderes (Módulo Opcional).
 * Puede cargarse o ignorarse por completo mediante `getPowersDatabase(enabled)`.
 */

export const ELEMENTAL_AFFINITIES: readonly ElementalAffinity[] = [
  {
    id: 'fire',
    element: 'Fuego',
    personalityArchetype: 'Apasionado, colérico, volátil, impaciente, dominante',
    humoralAndWuXing: 'Colérico / Fase Fuego (Corazón/Intestino Delgado)',
    martialSomaticStyle:
      'Ofensiva directa continua, golpes lineales explosivos (Shaolin del Norte)',
    tacticalCombatRole: 'Daño masivo de choque (Burst DPS), ruptura de formaciones',
    associatedColorIds: ['color_crimson_red', 'color_rust_orange'],
    promptEn: 'subtle heat-distortion ember motifs and scorched flame sigils',
    tags: ['aggressive', 'fire', 'dominant'],
  },
  {
    id: 'water',
    element: 'Agua',
    personalityArchetype: 'Adaptable, empático, evasivo, fluido, profundo',
    humoralAndWuXing: 'Flemático / Fase Agua (Riñón/Vejiga)',
    martialSomaticStyle:
      'Desvío de fuerza entrante, movimientos circulares fluidos (Tai Chi Chuan)',
    tacticalCombatRole: 'Dispersión cinética, control de masas, mitigación defensiva',
    associatedColorIds: ['color_ultramarine_blue'],
    promptEn: 'fluid water-ripple patterns and condensed frost mist motifs',
    tags: ['water', 'adaptive', 'defensive'],
  },
  {
    id: 'earth',
    element: 'Tierra',
    personalityArchetype: 'Inamovible, terco, paciente, estoico, pragmático',
    humoralAndWuXing: 'Melancólico / Fase Tierra (Bazo/Estómago)',
    martialSomaticStyle:
      'Posturas enraizadas pesadas, golpes de codo y puño masivos (Hung Gar)',
    tacticalCombatRole:
      'Tanque defensivo, creación de barreras físicas, anclaje',
    associatedColorIds: ['color_emerald_green', 'color_rust_orange'],
    promptEn: 'mineral stone-crust accents and grounded heavy stance',
    tags: ['earth', 'square', 'tank'],
  },
  {
    id: 'air',
    element: 'Aire',
    personalityArchetype: 'Desapegado, errático, pacífico, escurridizo, curioso',
    humoralAndWuXing: 'Sanguíneo / Fase Madera (Hígado/Vesícula)',
    martialSomaticStyle:
      'Movimiento helicoidal espiral, fintas acrobáticas constantes (Baguazhang)',
    tacticalCombatRole: 'Alta movilidad tridimensional, interrupción de proyectiles',
    associatedColorIds: ['color_snow_white', 'color_amber_yellow'],
    promptEn: 'billowing wind-swept cloth folds and airy weightless stance',
    tags: ['air', 'agile', 'nomad'],
  },
  {
    id: 'lightning_metal',
    element: 'Rayo / Metal',
    personalityArchetype: 'Preciso, implacable, perfeccionista, tajante, frío',
    humoralAndWuXing: 'Fase Metal (Pulmón/Intestino Grueso)',
    martialSomaticStyle:
      'Ataques de penetración instantánea a puntos vitales (Wing Chun / Baji Quan)',
    tacticalCombatRole:
      'Asesinato quirúrgico de objetivos prioritarios, perforación',
    associatedColorIds: ['color_amber_yellow', 'color_ultramarine_blue'],
    promptEn: 'sharp metallic arc-conductor needles and faint static spark motifs',
    tags: ['lightning_metal', 'triangle', 'precision'],
  },
  {
    id: 'void_shadow',
    element: 'Vacío / Sombra',
    personalityArchetype: 'Introspectivo, nihilista, desapegado de la moral común',
    humoralAndWuXing: 'Atemperado / Éter cósmico',
    martialSomaticStyle:
      'Sigilo asimétrico, golpes que no generan inercia sonora',
    tacticalCombatRole:
      'Anulación sensorial, infiltración absoluta, terror psicológico',
    associatedColorIds: ['color_jet_black', 'color_imperial_purple'],
    promptEn: 'shadow-absorbing matte void cloak and eerie dark cosmic aura',
    tags: ['void_shadow', 'stealth', 'nihilist'],
  },
] as const;

export const PRT_CLASSIFICATIONS: readonly PrtClassification[] = [
  {
    id: 'mover',
    name: 'Mover',
    description: 'Habilidades que alteran el desplazamiento o teletransporte propio.',
    containmentProtocol: 'Fijar clavos de sujeción al suelo, negar líneas de visión.',
    promptVisualCueEn: 'streamlined kinetic propulsion harness and light agile boots',
    tags: ['agile', 'air'],
  },
  {
    id: 'shaker',
    name: 'Shaker',
    description:
      'Alteración del entorno circundante a gran escala (campos de fuerza, espinas de piedra).',
    containmentProtocol: 'Evacuar el área, no buscar cobertura fija.',
    promptVisualCueEn: 'environmental field emitter gauntlets or arcane catalyst staff',
    tags: ['control', 'earth'],
  },
  {
    id: 'brute',
    name: 'Brute',
    description:
      'Fuerza sobrehumana, regeneración tisular o resistencia biológica aumentada.',
    containmentProtocol:
      'Fuego de supresión a distancia con munición pesada; nunca entablar cuerpo a cuerpo.',
    promptVisualCueEn: 'dense hyper-muscular frame with reinforced battle scars',
    tags: ['square', 'tank', 'martial'],
  },
  {
    id: 'breaker',
    name: 'Breaker',
    description:
      'Capacidad de transitar hacia un estado físico alternativo anómalo (humo, luz o energía).',
    containmentProtocol: 'Emplear armas disruptivas específicas para su estado.',
    promptVisualCueEn: 'partially phasing translucent energy wisps around extremities',
    tags: ['arcane', 'void_shadow'],
  },
  {
    id: 'master',
    name: 'Master',
    description:
      'Generación, control o invocación de esbirros vivos, autómatas o mentes ajenas.',
    containmentProtocol: 'Priorizar la neutralización del invocador, ignorar a los peones.',
    promptVisualCueEn: 'commanding ritual insignia and miniature tethered drone or familiar totem',
    tags: ['ruler', 'manipulative'],
  },
  {
    id: 'tinker',
    name: 'Tinker',
    description:
      'Creación de tecnología anómala no replicable por la ciencia estándar.',
    containmentProtocol:
      'Incautar talleres y herramientas; impedir el acceso a piezas de repuesto.',
    promptVisualCueEn: 'eccentric modular gizmo belt, custom brass-and-coil backpack rig',
    tags: ['tinker', 'clockwork', 'creator'],
  },
  {
    id: 'blaster',
    name: 'Blaster',
    description: 'Proyectiles ofensivos de energía o materia a larga distancia.',
    containmentProtocol:
      'Cobertura balística móvil, flanqueo rápido para cerrar la distancia.',
    promptVisualCueEn: 'vented energy-channeling bracers and scorched glove tips',
    tags: ['fire', 'ranged'],
  },
  {
    id: 'thinker',
    name: 'Thinker',
    description:
      'Capacidad cognitiva o de percepción hipertrofiada (precognición, telepatía).',
    containmentProtocol:
      'Mantener silencio de radio, empleo de desinformación caótica.',
    promptVisualCueEn: 'hyper-attentive analytical posture with temple sensory bands or notebooks',
    tags: ['scholar', 'sage'],
  },
  {
    id: 'striker',
    name: 'Striker',
    description:
      'Efectos de contacto directo de corto alcance a través del tacto o armas cuerpo a cuerpo.',
    containmentProtocol:
      'Mantener estricta distancia de seguridad; empleo de armas largas.',
    promptVisualCueEn: 'wrapped armored knuckles and engraved touch-channeling melee weapon',
    tags: ['martial', 'assassin'],
  },
  {
    id: 'changer',
    name: 'Changer',
    description:
      'Metamorfosis de la propia estructura anatómica biológica (alas, caparazones, garras).',
    containmentProtocol: 'Adaptar el armamento según la forma asumida.',
    promptVisualCueEn: 'asymmetrical chitinous bone spurs or partial morphing limb traits',
    tags: ['monster', 'biological'],
  },
  {
    id: 'trump',
    name: 'Trump',
    description:
      'Poderes que alteran, anulan, potencian o copian los poderes de otros metahumanos.',
    containmentProtocol: 'Desplegar fuerzas no metahumanas convencionales.',
    promptVisualCueEn: 'nullifying geometric talismans and dampener cuffs on belt',
    tags: ['arcane', 'tactical'],
  },
  {
    id: 'stranger',
    name: 'Stranger',
    description:
      'Infiltración, borrado de recuerdos en testigos, sigilo cognitivo indetectable.',
    containmentProtocol:
      'Uso de contraseñas de verificación cruzada constantes y monitoreo automatizado.',
    promptVisualCueEn: 'unremarkable shadowed silhouette with high collar concealing lower face',
    tags: ['stealth', 'void_shadow'],
  },
] as const;

export const BIOLOGICAL_POTENTIAL_TIERS: readonly BiologicalPotentialEntry[] = [
  {
    id: 'epsilon',
    tierName: 'Epsilon',
    description:
      'Deformaciones físicas severas sin poderes útiles o con habilidades contraproducentes.',
    physicalMutationVisible: true,
    promptMutationCueEn: 'pronounced asymmetrical physical mutations',
  },
  {
    id: 'delta',
    tierName: 'Delta',
    description:
      'Habilidades menores que no otorgan ventaja táctica significativa (ej. cambio cosmético de pigmento).',
    physicalMutationVisible: false,
  },
  {
    id: 'gamma',
    tierName: 'Gamma',
    description:
      'Poderes marcialmente útiles pero acompañados de deformidad o alteración anatómica visible permanente.',
    physicalMutationVisible: true,
    promptMutationCueEn: 'permanent visible anatomical mutation marks',
  },
  {
    id: 'beta',
    tierName: 'Beta',
    description:
      'Poderes de combate formidables pero con fallos de control o activación involuntaria bajo estrés.',
    physicalMutationVisible: false,
  },
  {
    id: 'alpha',
    tierName: 'Alpha',
    description:
      'Habilidades poderosas de escala bélica con control voluntario total y aspecto humano preservado.',
    physicalMutationVisible: false,
  },
  {
    id: 'omega',
    tierName: 'Omega',
    description:
      'Poder cuyo límite superior de escala no puede ser definido por la física conocida; capacidad de alteración planetaria o de escala de extinción.',
    physicalMutationVisible: false,
  },
] as const;

export const POWER_COSTS: readonly PowerCostEntry[] = [
  {
    id: 'cost_physiological_overload',
    costType: 'Sobrecarga Fisiológica',
    mechanism: 'Ruptura de capilares craneales por presión energética',
    symptomaticManifestation:
      'Epistaxis (sangrado nasal severo), desprendimiento de retina, vómito con sangre',
    narrativeConsequence: 'Pérdida progresiva de puntos de vida (HP); ceguera temporal',
    promptSymptomCueEn: 'faint dried bloodstain beneath the nose and bloodshot eyes',
  },
  {
    id: 'cost_thermal_shock',
    costType: 'Shock Térmico Interno',
    mechanism:
      'Incapacidad del organismo para disipar el calor o frío generado',
    symptomaticManifestation:
      'Fiebre letal abrasadora (>41°C) o necrosis por congelación de extremidades',
    narrativeConsequence: 'Penalización severa a tiradas de destreza y fatiga extrema',
    promptSymptomCueEn: 'frostbitten darkened fingertips or heat-flushed skin veins',
  },
  {
    id: 'cost_caloric_drain',
    costType: 'Drenaje Calórico Masivo',
    mechanism: 'El poder consume reservas moleculares de glucosa y ATP',
    symptomaticManifestation:
      'Adelgazamiento súbito, hambre atroz incontrolable, calambres musculares',
    narrativeConsequence:
      'Estado de inanición; necesidad imperativa de consumir alimento concentrado',
    promptSymptomCueEn: 'gaunt hollow cheeks and ration pouches strapped to belt',
  },
  {
    id: 'cost_tissue_degeneration',
    costType: 'Degeneración Tisular',
    mechanism: 'Mutagénesis celular acumulativa tras cada descarga',
    symptomaticManifestation:
      'Pérdida de sensibilidad táctil en manos, necrosis cutánea, caída capilar',
    narrativeConsequence: 'Disminución permanente de atributos físicos máximos',
    promptSymptomCueEn: 'bandaged necrotic skin patches and thinning hair',
  },
  {
    id: 'cost_empathy_erosion',
    costType: 'Erosión de la Empatía',
    mechanism: 'Desconexión neurológica de la corteza prefrontal',
    symptomaticManifestation:
      'Trato a los aliados como piezas prescindibles; insensibilidad al dolor ajeno',
    narrativeConsequence: 'Reducción del valor de Humanidad; tensión con aliados',
    promptSymptomCueEn: 'unnervingly blank unblinking expression',
  },
  {
    id: 'cost_catalyst_dependency',
    costType: 'Dependencia de Catalizador',
    mechanism: 'La habilidad requiere un reactivo consumible externo',
    symptomaticManifestation:
      'Necesidad de ingerir metales raros, quemar incienso o portar gemas puras',
    narrativeConsequence:
      'Vulnerabilidad crítica si es desarmado o capturado sin recursos',
    promptSymptomCueEn: 'bandolier of alchemical catalyst vials and mineral shards',
  },
  {
    id: 'cost_magical_backlash',
    costType: 'Resaca Mágica (Backlash)',
    mechanism: 'El exceso de energía no canalizada revierte contra el usuario',
    symptomaticManifestation:
      'Aturdimiento mental, alucinaciones sensoriales, inversión del flujo de poder',
    narrativeConsequence:
      'El personaje sufre el 50% del daño infligido a su objetivo',
    promptSymptomCueEn: 'crackling rebound burn scars spiralling along forearms',
  },
] as const;

export const POWERS_DATABASE: PowersDatabase = {
  elementalAffinities: ELEMENTAL_AFFINITIES,
  prtClassifications: PRT_CLASSIFICATIONS,
  biologicalTiers: BIOLOGICAL_POTENTIAL_TIERS,
  operationalCosts: POWER_COSTS,
};

/**
 * Accesor del módulo opcional de poderes.
 * Retorna `null` cuando el módulo está desactivado para evitar fugas de contexto
 * en campañas de baja fantasía o realismo estricto.
 */
export function getPowersDatabase(enabled: boolean): PowersDatabase | null {
  return enabled ? POWERS_DATABASE : null;
}
