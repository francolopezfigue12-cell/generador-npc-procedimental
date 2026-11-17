import type {
  AlignmentEntry,
  BindingPassion,
  BreakingPoint,
  DefenseMechanism,
  ExternalMotivation,
  FatalFlaw,
  HiddenSecret,
  InternalMotivation,
  MinorQuirk,
  MotivationArchetype,
  PendragonTraitPairDef,
  PersonalitySubdivisionMeta,
  SocialAttitude,
  Virtue,
} from '../types/psychology';

export const PERSONALITY_SUBDIVISIONS: readonly PersonalitySubdivisionMeta[] = [
  {
    index: 1,
    id: 'externalMotivation',
    label: 'Motivación Externa (Want)',
    description: 'Lo que el personaje persigue activamente en el mundo.',
  },
  {
    index: 2,
    id: 'internalMotivation',
    label: 'Motivación Interna (Need)',
    description: 'Carencia psicológica o verdad espiritual para su autorrealización.',
  },
  {
    index: 3,
    id: 'archetype',
    label: 'Arquetipo Funcional',
    description: 'Meta primaria, mayor temor, respuesta en crisis y defecto arquetípico.',
  },
  {
    index: 4,
    id: 'fatalFlaw',
    label: 'Falla Fatal (Hamartia)',
    description: 'Defecto trágico estructural que amenaza con destruir al personaje.',
  },
  {
    index: 5,
    id: 'minorQuirk',
    label: 'Defecto Menor y Manía',
    description: 'Generador de textura conductual en escenas y diálogos.',
  },
  {
    index: 6,
    id: 'virtue',
    label: 'Virtud Destacable',
    description: 'Pilar de resonancia moral y heroica del personaje.',
  },
  {
    index: 7,
    id: 'defenseMechanism',
    label: 'Mecanismo de Defensa (Vaillant)',
    description: 'Estrategia inconsciente para procesar trauma, angustia y amenaza.',
  },
  {
    index: 8,
    id: 'socialAttitude',
    label: 'Actitud Social Matriz',
    description: 'Registro corporal, proxémico y conversacional ante terceros.',
  },
  {
    index: 9,
    id: 'secretAndBreakingPoint',
    label: 'Secreto Oculto y Punto de Ruptura',
    description: 'Disparador de tensión narrativa y colapso conductual extremo.',
  },
  {
    index: 10,
    id: 'moralSystem',
    label: 'Sistema de Valores (Alineamiento, Pendragon y Pasión)',
    description: 'Eje moral, 13 pares diádicos 1-20 y pasión vinculante superior.',
  },
] as const;

export const EXTERNAL_MOTIVATIONS: readonly ExternalMotivation[] = [
  {
    id: 'want_wealth',
    name: 'Adquisición de Recursos y Riqueza',
    description:
      'Acumulación material para garantizar autonomía radical o superar un historial de privación traumática.',
    tags: ['materialist', 'pragmatic', 'ambitious'],
  },
  {
    id: 'want_status',
    name: 'Reconocimiento y Estatus Social',
    description:
      'Búsqueda activa de títulos, gloria marcial o validación jerárquica para enterrar un estigma de inferioridad.',
    tags: ['martial', 'noble', 'proud'],
  },
  {
    id: 'want_vengeance',
    name: 'Venganza y Retribución',
    description:
      'Destrucción sistemática de una facción, individuo o sistema responsable de una herida fundacional (The Ghost / Wound).',
    tags: ['aggressive', 'obsessive', 'dark'],
  },
  {
    id: 'want_protection',
    name: 'Protección y Custodia',
    description:
      'Salvaguarda activa de una comunidad, familia o individuo vulnerable, asumiendo el rol de barrera protectora.',
    tags: ['protective', 'loyal', 'altruistic'],
  },
  {
    id: 'want_knowledge',
    name: 'Revelación Epistémica y Conocimiento',
    description:
      'Obsesión por desentrañar secretos arcanos, científicos o conspirativos prohibidos.',
    tags: ['scholar', 'arcane', 'curious'],
  },
  {
    id: 'want_dominion',
    name: 'Dominio y Reestructuración Política',
    description:
      'Búsqueda del poder soberano para imponer un orden específico sobre el caos circundante.',
    tags: ['lawful', 'dominant', 'ruler'],
  },
  {
    id: 'want_survival',
    name: 'Supervivencia y Evasión',
    description:
      'Búsqueda de anonimato, liberación de cadenas legales/mágicas o escape de un perseguidor implacable.',
    tags: ['stealth', 'evasive', 'paranoid'],
  },
] as const;

export const INTERNAL_MOTIVATIONS: readonly InternalMotivation[] = [
  {
    id: 'need_dismantle_lie',
    name: 'Desarticulación de la Falsa Creencia (The Lie)',
    description:
      'Reconocer y destruir la mentira que el personaje se dice a sí mismo para justificar su inadaptación.',
    tags: ['introspective', 'tragic'],
  },
  {
    id: 'need_shadow_integration',
    name: 'Integración de la Sombra',
    description:
      'Aceptar los impulsos reprimidos (ira, debilidad, ambición) para dejar de proyectarlos destructivamente sobre otros.',
    tags: ['repressed', 'volatile'],
  },
  {
    id: 'need_emotional_autonomy',
    name: 'Autonomía Emocional',
    description:
      'Trascender la necesidad de aprobación paterna, institucional o comunitaria.',
    tags: ['dependent', 'lawful', 'status'],
  },
  {
    id: 'need_reconnection',
    name: 'Reconexión y Vulnerabilidad',
    description:
      'Derribar las defensas afectivas para formar vínculos interdependientes genuinos.',
    tags: ['hermetic', 'lonely', 'guarded'],
  },
  {
    id: 'need_expiation',
    name: 'Expiación del Sentimiento de Culpa',
    description:
      'Perdonarse por un error del pasado que causó un daño irreparable.',
    tags: ['guilt', 'protective', 'tragic'],
  },
  {
    id: 'need_finitude',
    name: 'Aceptación de la Finitud y la Impotencia',
    description:
      'Abandonar el delirio de control absoluto frente a la entropía y el destino.',
    tags: ['hubris', 'control', 'ruler'],
  },
] as const;

export const MOTIVATION_ARCHETYPES: readonly MotivationArchetype[] = [
  {
    id: 'arch_innocent',
    archetype: 'El Inocente',
    primaryGoal: 'Permanecer a salvo, confiar en el orden',
    greatestFear: 'Castigo, abandono, desilusión',
    crisisResponse: 'Negación ingenua, sumisión',
    archetypalFlaw: 'Ceguera voluntaria ante el mal',
    tags: ['circle', 'naive', 'submissive', 'good'],
  },
  {
    id: 'arch_orphan',
    archetype: 'El Huérfano / Realista',
    primaryGoal: 'Recuperar la pertenencia y el cobijo',
    greatestFear: 'Ser explotado, victimización',
    crisisResponse: 'Cinismo pragmático, desconfianza',
    archetypalFlaw: 'Fatalismo paralizante',
    tags: ['pragmatic', 'survivor', 'cynical'],
  },
  {
    id: 'arch_warrior',
    archetype: 'El Guerrero / Héroe',
    primaryGoal: 'Demostrar valía mediante la fuerza',
    greatestFear: 'Debilidad, vulnerabilidad, derrota',
    crisisResponse: 'Confrontación directa y violenta',
    archetypalFlaw: 'Crueldad, arrogancia combativa',
    tags: ['martial', 'square', 'triangle', 'brave'],
  },
  {
    id: 'arch_caregiver',
    archetype: 'El Cuidador',
    primaryGoal: 'Proteger y sustentar a los demás',
    greatestFear: 'Egoísmo propio, ingratitud ajena',
    crisisResponse: 'Sacrificio martirial compulsivo',
    archetypalFlaw: 'Codependencia manipuladora',
    tags: ['circle', 'protective', 'compassionate'],
  },
  {
    id: 'arch_seeker',
    archetype: 'El Buscador / Explorador',
    primaryGoal: 'Experimentar una vida más auténtica',
    greatestFear: 'Atrapamiento, conformidad vacía',
    crisisResponse: 'Huida constante, ruptura de lazos',
    archetypalFlaw: 'Inconstancia crónica',
    tags: ['nomad', 'air', 'chaotic'],
  },
  {
    id: 'arch_rebel',
    archetype: 'El Destructor / Rebelde',
    primaryGoal: 'Destruir lo que no funciona',
    greatestFear: 'Falta de poder, inercia estéril',
    crisisResponse: 'Insurgencia, aniquilación',
    archetypalFlaw: 'Nihilismo desenfrenado',
    tags: ['triangle', 'chaotic', 'fire'],
  },
  {
    id: 'arch_lover',
    archetype: 'El Amante',
    primaryGoal: 'Experimentar comunión e intimidad',
    greatestFear: 'Desconexión, frialdad, soledad',
    crisisResponse: 'Entrega devocional absorbente',
    archetypalFlaw: 'Pérdida total de identidad',
    tags: ['charismatic', 'passionate'],
  },
  {
    id: 'arch_creator',
    archetype: 'El Creador',
    primaryGoal: 'Forjar algo de valor imperecedero',
    greatestFear: 'Mediocridad, falta de visión',
    crisisResponse: 'Obsesión artesanal/intelectual',
    archetypalFlaw: 'Perfeccionismo tiránico',
    tags: ['tinker', 'obsessive', 'craftsman'],
  },
  {
    id: 'arch_ruler',
    archetype: 'El Gobernante',
    primaryGoal: 'Crear una comunidad próspera y ordenada',
    greatestFear: 'Caos, pérdida de control',
    crisisResponse: 'Imposición legislativa o represiva',
    archetypalFlaw: 'Autoritarismo déspota',
    tags: ['lawful', 'square', 'noble', 'dominant'],
  },
  {
    id: 'arch_magician',
    archetype: 'El Mago',
    primaryGoal: 'Comprender y alterar las leyes del cosmos',
    greatestFear: 'Consecuencias negativas imprevistas',
    crisisResponse: 'Transformación radical de la realidad',
    archetypalFlaw: 'Arrogancia demiúrgica (Hubris)',
    tags: ['arcane', 'hubris', 'purple'],
  },
  {
    id: 'arch_sage',
    archetype: 'El Sabio',
    primaryGoal: 'Descubrir la verdad absoluta',
    greatestFear: 'Ser engañado, ignorancia',
    crisisResponse: 'Análisis desapegado, estudio',
    archetypalFlaw: 'Parálisis por análisis, frialdad',
    tags: ['scholar', 'blue', 'dogmatic'],
  },
  {
    id: 'arch_jester',
    archetype: 'El Bufón',
    primaryGoal: 'Vivir en el presente con alegría',
    greatestFear: 'Aburrimiento, dolor existencial',
    crisisResponse: 'Humor corrosivo, irreverencia',
    archetypalFlaw: 'Irresponsabilidad destructiva',
    tags: ['chaotic', 'humor', 'subversive'],
  },
] as const;

export const FATAL_FLAWS: readonly FatalFlaw[] = [
  {
    id: 'flaw_hubris',
    name: 'Hubris (Arrogancia Desmedida)',
    description:
      'Convicción de estar por encima de las leyes humanas, naturales o divinas; conduce al colapso por desestimar las advertencias externas.',
    tags: ['proud', 'ruler', 'magician'],
  },
  {
    id: 'flaw_monomania',
    name: 'Monomanía / Fijación Obsesiva',
    description:
      'Subordinación de todo código ético, salud y lazos personales a un único objetivo excluyente.',
    tags: ['obsessive', 'vengeance', 'scholar'],
  },
  {
    id: 'flaw_thumos',
    name: 'Thumos Descontrolado (Ira Ciega)',
    description:
      'Respuestas de agresión desproporcionada ante afrentas reales o imaginarias que destruyen aliados y recursos estratégicos.',
    tags: ['aggressive', 'fire', 'warrior'],
  },
  {
    id: 'flaw_moral_cowardice',
    name: 'Cobardía Moral / Parálisis Axiológica',
    description:
      'Incapacidad de actuar ante la injusticia cuando la acción requiere asumir un costo personal.',
    tags: ['cowardly', 'submissive', 'evasive'],
  },
  {
    id: 'flaw_avarice',
    name: 'Avaricia / Voracidad Acumulativa',
    description:
      'Incapacidad de fijar un límite al apetito de recursos, territorio o poder, provocando aislamiento paranoide.',
    tags: ['greedy', 'wealth', 'paranoid'],
  },
  {
    id: 'flaw_fanaticism',
    name: 'Rigidez Dogmática / Fanatismo',
    description:
      'Incapacidad para adaptar el marco moral ante la evidencia empírica, sacrificando vidas por abstracciones doctrinales.',
    tags: ['lawful', 'dogmatic', 'white'],
  },
] as const;

export const MINOR_QUIRKS: readonly MinorQuirk[] = [
  {
    id: 'quirk_count_steps',
    category: 'tics_compulsiones',
    categoryLabel: 'Tics y Compulsiones',
    description: 'Contar pasos de forma rítmica al desplazarse.',
  },
  {
    id: 'quirk_align_objects',
    category: 'tics_compulsiones',
    categoryLabel: 'Tics y Compulsiones',
    description: 'Alinear simétricamente los objetos de una mesa.',
  },
  {
    id: 'quirk_clean_hands_metal',
    category: 'tics_compulsiones',
    categoryLabel: 'Tics y Compulsiones',
    description: 'Limpiarse compulsivamente las manos tras tocar metal.',
  },
  {
    id: 'quirk_avoid_authority_gaze',
    category: 'manias_sociales',
    categoryLabel: 'Manías Sociales',
    description: 'Incapacidad de sostener la mirada a figuras de autoridad.',
  },
  {
    id: 'quirk_whisper_last_word',
    category: 'manias_sociales',
    categoryLabel: 'Manías Sociales',
    description: 'Susurrar la última palabra de cada frase.',
  },
  {
    id: 'quirk_laugh_grief',
    category: 'manias_sociales',
    categoryLabel: 'Manías Sociales',
    description: 'Reír en momentos de alta tensión luctuosa.',
  },
  {
    id: 'quirk_unwitnessed_liquids',
    category: 'fijaciones_consumo',
    categoryLabel: 'Fijaciones de Consumo',
    description: 'Negarse a beber líquidos no servidos en su presencia.',
  },
  {
    id: 'quirk_dry_food_only',
    category: 'fijaciones_consumo',
    categoryLabel: 'Fijaciones de Consumo',
    description: 'Consumir únicamente alimentos secos.',
  },
  {
    id: 'quirk_bitter_roots',
    category: 'fijaciones_consumo',
    categoryLabel: 'Fijaciones de Consumo',
    description: 'Masticar raíces amargas constantemente.',
  },
  {
    id: 'quirk_sleep_corner_seated',
    category: 'habitos_paranoicos',
    categoryLabel: 'Hábitos Paranoicos',
    description: 'Dormir invariablemente sentado con la espalda contra una esquina.',
  },
  {
    id: 'quirk_inspect_ceilings',
    category: 'habitos_paranoicos',
    categoryLabel: 'Hábitos Paranoicos',
    description: 'Inspeccionar los techos antes de entrar a cualquier estancia.',
  },
  {
    id: 'quirk_low_stakes_dice',
    category: 'vicios_menores',
    categoryLabel: 'Vicios Menores',
    description: 'Juego compulsivo de dados con apuestas bajas.',
  },
  {
    id: 'quirk_footwear_vanity',
    category: 'vicios_menores',
    categoryLabel: 'Vicios Menores',
    description: 'Vanidad extrema respecto al cuidado del calzado.',
  },
  {
    id: 'quirk_interrupt_technical',
    category: 'vicios_menores',
    categoryLabel: 'Vicios Menores',
    description: 'Tendencia a interrumpir debates técnicos.',
  },
] as const;

export const VIRTUES: readonly Virtue[] = [
  {
    id: 'virtue_temperance',
    name: 'Templanza',
    description:
      'Dominio riguroso de los impulsos biológicos y afectivos frente a la provocación o la privación extrema.',
    tags: ['monk', 'disciplined', 'mature'],
  },
  {
    id: 'virtue_magnanimity',
    name: 'Magnanimidad',
    description:
      'Capacidad de perdonar al adversario derrotado y ofrecer restitución digna a los vencidos.',
    tags: ['noble', 'good', 'mercy'],
  },
  {
    id: 'virtue_fortitude',
    name: 'Fortaleza (Coraje Moral)',
    description:
      'Disposición a sostener la verdad o la defensa del desamparado aun cuando las consecuencias inmediatas sean la tortura o la muerte.',
    tags: ['brave', 'protective', 'martyr'],
  },
  {
    id: 'virtue_loyalty',
    name: 'Lealtad Incondicional',
    description:
      'Fidelidad inquebrantable a un pacto jurado o a un compañero, incluso a costa de la propia reputación o bienestar.',
    tags: ['loyal', 'lawful', 'companion'],
  },
  {
    id: 'virtue_lucidity',
    name: 'Lucidez Integradora',
    description:
      'Habilidad para percibir la verdad sin distorsiones proyectivas y diseñar soluciones pacíficas en escenarios de alta entropía.',
    tags: ['sage', 'pacifist', 'analytical'],
  },
] as const;

export const DEFENSE_MECHANISMS: readonly DefenseMechanism[] = [
  {
    id: 'def_delusional_projection',
    maturityLevel: 'I_patologico',
    maturityLabel: 'Nivel I: Patológico',
    name: 'Proyección Delirante',
    underlyingImpulse: 'Culpa intolerable o colapso de la autoestima.',
    behavioralManifestation:
      'Acusa a aliados de conspirar activamente en su contra; crea enemigos ficticios.',
    narrativeUtility:
      'Dispara arcos de villanía o caída trágica por paranoia destructiva.',
    tags: ['paranoid', 'pathological', 'villain'],
  },
  {
    id: 'def_psychotic_denial',
    maturityLevel: 'I_patologico',
    maturityLabel: 'Nivel I: Patológico',
    name: 'Negación Psicótica',
    underlyingImpulse: 'Muerte de un ser querido o fracaso catastrófico.',
    behavioralManifestation:
      'Habla de los fallecidos en presente; actúa como si la derrota nunca hubiera ocurrido.',
    narrativeUtility:
      'Crea misterios en torno a la cordura del personaje; giros dramáticos.',
    tags: ['trauma', 'pathological', 'delusional'],
  },
  {
    id: 'def_passive_aggression',
    maturityLevel: 'II_inmaduro',
    maturityLabel: 'Nivel II: Inmaduro',
    name: 'Agresión Pasiva',
    underlyingImpulse: 'Resentimiento hacia figuras de poder inaccesibles.',
    behavioralManifestation:
      'Dilación deliberada, sabotaje sutil, olvidos convenientes de órdenes directas.',
    narrativeUtility:
      'Fricción interpersonal sin confrontación directa; comedia ácida o drama tenso.',
    tags: ['submissive', 'resentful', 'immature'],
  },
  {
    id: 'def_schizoid_fantasy',
    maturityLevel: 'II_inmaduro',
    maturityLabel: 'Nivel II: Inmaduro',
    name: 'Fantasía Esquizoide',
    underlyingImpulse: 'Aislamiento social y dolor por rechazo.',
    behavioralManifestation:
      'Monólogos internos grandiosos; ensimismamiento total durante crisis activas.',
    narrativeUtility:
      'Personaje excéntrico que desconecta en combate o negociaciones críticas.',
    tags: ['hermetic', 'eccentric', 'immature'],
  },
  {
    id: 'def_acting_out',
    maturityLevel: 'II_inmaduro',
    maturityLabel: 'Nivel II: Inmaduro',
    name: 'Conducta de Descarga (Acting Out)',
    underlyingImpulse: 'Tensión emocional interna inmanejable.',
    behavioralManifestation:
      'Arrincona a un subordinado, destruye mobiliario, consumo impulsivo de sustancias.',
    narrativeUtility:
      'Ruptura de infiltraciones sigilosas; escalada involuntaria de hostilidades.',
    tags: ['volatile', 'fire', 'immature'],
  },
  {
    id: 'def_rationalization',
    maturityLevel: 'III_neurotico',
    maturityLabel: 'Nivel III: Neurótico',
    name: 'Racionalización',
    underlyingImpulse: 'Decisión moralmente reprobable o vergonzosa.',
    behavioralManifestation:
      'Justifica la traición con cálculos utilitarios fríos ("Era la decisión lógica").',
    narrativeUtility:
      'Pseudo-intelectualismo; tensión ética con personajes deontológicos.',
    tags: ['analytical', 'cold', 'neurotic'],
  },
  {
    id: 'def_displacement',
    maturityLevel: 'III_neurotico',
    maturityLabel: 'Nivel III: Neurótico',
    name: 'Desplazamiento',
    underlyingImpulse: 'Frustración o terror ante una amenaza superior.',
    behavioralManifestation:
      'Descarga la furia contenida contra una criatura inocente o un compañero leal.',
    narrativeUtility: 'Provoca fracturas en la cohesión de la partida o el elenco.',
    tags: ['cruel', 'neurotic', 'volatile'],
  },
  {
    id: 'def_reaction_formation',
    maturityLevel: 'III_neurotico',
    maturityLabel: 'Nivel III: Neurótico',
    name: 'Formación Reactiva',
    underlyingImpulse: 'Atracción hacia lo prohibido o desprecio reprimido.',
    behavioralManifestation:
      'Ostentación puritana fanática, condena pública exagerada del vicio ajeno.',
    narrativeUtility:
      'Revelación hipócrita; villano que predica la pureza mientras se pudre por dentro.',
    tags: ['fanatic', 'hypocrite', 'white', 'neurotic'],
  },
  {
    id: 'def_isolation_of_affect',
    maturityLevel: 'III_neurotico',
    maturityLabel: 'Nivel III: Neurótico',
    name: 'Aislamiento Afectivo',
    underlyingImpulse: 'Trauma agudo o necesidad de ejecutar violencia.',
    behavioralManifestation:
      'Describe atrocidades con tono clínico y desapasionado, sin rastro emocional.',
    narrativeUtility:
      'Eficacia letal perturbadora; frialdad clínica del profesional de la muerte.',
    tags: ['assassin', 'surgeon', 'cold', 'neurotic'],
  },
  {
    id: 'def_sublimation',
    maturityLevel: 'IV_maduro',
    maturityLabel: 'Nivel IV: Maduro',
    name: 'Sublimación',
    underlyingImpulse: 'Pulsiones agresivas o destructivas primarias.',
    behavioralManifestation:
      'Canaliza la rabia y el instinto carnicero en la forja, las artes marciales o la justicia.',
    narrativeUtility:
      'Genera héroes de combate implacables pero moralmente orientados.',
    tags: ['martial', 'mature', 'disciplined'],
  },
  {
    id: 'def_humor',
    maturityLevel: 'IV_maduro',
    maturityLabel: 'Nivel IV: Maduro',
    name: 'Humor y Sarcasmo Desarmante',
    underlyingImpulse: 'Conciencia plena del absurdo o del peligro letal.',
    behavioralManifestation:
      'Comentarios irónicos en el umbral de la muerte; sátira que alivia la tensión del grupo.',
    narrativeUtility:
      'Alivio cómico funcional; desafío mordaz frente a tiranos.',
    tags: ['jester', 'charismatic', 'mature'],
  },
  {
    id: 'def_suppression',
    maturityLevel: 'IV_maduro',
    maturityLabel: 'Nivel IV: Maduro',
    name: 'Supresión',
    underlyingImpulse: 'Sobrecarga de estímulos dolorosos en batalla.',
    behavioralManifestation:
      'Pospone conscientemente el duelo o el pánico hasta que la misión haya concluido.',
    narrativeUtility: 'Resiliencia táctica; liderazgo sereno bajo fuego enemigo.',
    tags: ['stoic', 'commander', 'mature'],
  },
] as const;

export const SOCIAL_ATTITUDES: readonly SocialAttitude[] = [
  {
    id: 'att_hermetic',
    name: 'Hermética / Evitativa',
    description:
      'Monosilábico, prefiere la periferia de los espacios, reacciona a la cercanía física con rigidez muscular.',
    tags: ['stealth', 'shy', 'paranoid'],
  },
  {
    id: 'att_predatory',
    name: 'Depredadora / Dominante',
    description:
      'Invade el espacio personal, evalúa a los interlocutores por su masa muscular y armamento, interrumpe el habla.',
    tags: ['aggressive', 'dominant', 'martial'],
  },
  {
    id: 'att_charismatic',
    name: 'Carismática / Camaleónica',
    description:
      'Modula el acento y el registro según el estatus del interlocutor, sonríe con los ojos entrecerrados, emplea el contacto visual para desarmar.',
    tags: ['social', 'manipulative', 'noble'],
  },
  {
    id: 'att_dogmatic',
    name: 'Dogmática / Pedante',
    description:
      'Corrige el léxico ajeno, cita textos canónicos o leyes locales de manera inoportuna, juzga desde la superioridad teórica.',
    tags: ['scholar', 'lawful', 'fanatic'],
  },
  {
    id: 'att_submissive',
    name: 'Sumisa / Servil',
    description:
      'Disculpas automáticas, postura corporal encorvada, busca permanentemente la mirada de aprobación de la figura dominante.',
    tags: ['submissive', 'cowardly', 'servant'],
  },
] as const;

export const HIDDEN_SECRETS: readonly HiddenSecret[] = [
  {
    id: 'sec_blood_guilt',
    name: 'Culpa de Sangre',
    description:
      'Responsabilidad directa en una masacre o incendio atribuido falsamente a un tercero.',
    tags: ['guilt', 'dark'],
  },
  {
    id: 'sec_stolen_identity',
    name: 'Identidad Suplantada',
    description:
      'Desertor militar o noble desheredado que porta los documentos y las armas de un cadáver.',
    tags: ['deception', 'military', 'noble'],
  },
  {
    id: 'sec_medical_arcane_dependency',
    name: 'Vulnerabilidad Médica o Arcana',
    description:
      'Dependencia absoluta de un compuesto químico diario para no colapsar; infección parasitaria en fase latente.',
    tags: ['medical', 'chemical', 'arcane'],
  },
  {
    id: 'sec_unmentionable_debt',
    name: 'Deuda Jurada Inconfesable',
    description:
      'Un pacto de servidumbre sellado con una potencia hostil que puede exigir cumplimiento en cualquier momento.',
    tags: ['pact', 'blackmail', 'void'],
  },
  {
    id: 'sec_hidden_incompetence',
    name: 'Incompetencia Encubierta',
    description:
      'Carecer de los poderes milagrosos o las credenciales legendarias que la reputación popular le atribuye.',
    tags: ['fraud', 'status', 'fragile'],
  },
] as const;

export const BREAKING_POINTS: readonly BreakingPoint[] = [
  {
    id: 'bp_room_101',
    name: 'Explotación de la Fobia Núcleo (Efecto Habitación 101)',
    description:
      'Ante la exposición forzada al terror primario (confinamiento, ruidos estridentes, mutilación, roedores), la estructura del ego colapsa, sacrificando cualquier convicción con tal de cesar el estímulo.',
    tags: ['phobia', 'collapse'],
  },
  {
    id: 'bp_touchstone_breach',
    name: 'Vulneración del Ancla Afectiva (Touchstone Breach)',
    description:
      'El daño, captura o asesinato del individuo o comunidad que representa su brújula ética detona un estado de furia maníaca o catatonía depresiva.',
    tags: ['protective', 'loyalty', 'rage'],
  },
  {
    id: 'bp_persona_collapse',
    name: 'Demolición Pública de la Máscara (Persona Collapse)',
    description:
      'Ser expuesto ante sus pares como un fraude o cobarde; provoca reacciones homicidas inmediatas o conductas autodestructivas fulminantes.',
    tags: ['status', 'proud', 'fraud'],
  },
  {
    id: 'bp_canonical_betrayal',
    name: 'Traición por la Autoridad Canónica',
    description:
      'El descubrimiento irrefutable de que la orden, religión o mentor al que consagró su existencia opera con hipocresía criminal.',
    tags: ['lawful', 'fanatic', 'faith'],
  },
] as const;

export const ALIGNMENTS: readonly AlignmentEntry[] = [
  {
    id: 'align_lg',
    name: 'Legal Bueno',
    lawChaos: 'Legal',
    goodEvil: 'Bueno',
    fundamentalPrinciple: 'El orden social justo maximiza el bienestar colectivo.',
    hardBoundary: 'Jamás castigar a un inocente, ni siquiera para salvar una ciudad.',
    forceJustification:
      'Medida legítima de contención amparada por la ley y la piedad.',
    tags: ['lawful', 'good'],
  },
  {
    id: 'align_ng',
    name: 'Neutral Bueno',
    lawChaos: 'Neutral',
    goodEvil: 'Bueno',
    fundamentalPrinciple:
      'El alivio del sufrimiento humano trasciende cualquier dogma.',
    hardBoundary: 'No tolerar la opresión justificada bajo excusas burocráticas.',
    forceJustification:
      'Necesaria cuando la empatía directa exige desarmar al agresor.',
    tags: ['good', 'compassionate'],
  },
  {
    id: 'align_cg',
    name: 'Caótico Bueno',
    lawChaos: 'Caótico',
    goodEvil: 'Bueno',
    fundamentalPrinciple: 'La libertad individual es el valor moral supremo.',
    hardBoundary: 'Jamás someterse a la tiranía ni acatar leyes que esclavicen al hombre.',
    forceJustification: 'Herramienta de liberación revolucionaria y ruptura de cadenas.',
    tags: ['chaotic', 'good', 'rebel'],
  },
  {
    id: 'align_ln',
    name: 'Legal Neutral',
    lawChaos: 'Legal',
    goodEvil: 'Neutral',
    fundamentalPrinciple:
      'El código, la tradición y el pacto deben prevalecer sobre el caos.',
    hardBoundary: 'Jamás violar la letra de un contrato sellado bajo la ley.',
    forceJustification:
      'Aplicación inexorable de la disciplina para mantener la cohesión.',
    tags: ['lawful', 'disciplined'],
  },
  {
    id: 'align_tn',
    name: 'Neutral Puro',
    lawChaos: 'Neutral',
    goodEvil: 'Neutral',
    fundamentalPrinciple:
      'El equilibrio cósmico y ecológico no admite fanatismos.',
    hardBoundary:
      'No permitir que ningún bando aniquile por completo la polaridad opuesta.',
    forceJustification:
      'Defensa homeostática de la supervivencia y el balance natural.',
    tags: ['neutral', 'balanced'],
  },
  {
    id: 'align_cn',
    name: 'Caótico Neutral',
    lawChaos: 'Caótico',
    goodEvil: 'Neutral',
    fundamentalPrinciple: 'Cada individuo debe perseguir su propia senda sin ataduras.',
    hardBoundary: 'Jamás permitir que otro individuo dicte su curso de acción.',
    forceJustification:
      'Medio expeditivo de autopreservación y afirmación del capricho.',
    tags: ['chaotic', 'free'],
  },
  {
    id: 'align_le',
    name: 'Legal Malvado',
    lawChaos: 'Legal',
    goodEvil: 'Malvado',
    fundamentalPrinciple:
      'La jerarquía estricta debe usarse para subyugar y explotar.',
    hardBoundary:
      'No quebrar un pacto legal si puede reinterpretarse para devorar al rival.',
    forceJustification:
      'Instrumento metodológico de dominación, purga y castigo ejemplar.',
    tags: ['lawful', 'evil', 'tyrant'],
  },
  {
    id: 'align_ne',
    name: 'Neutral Malvado',
    lawChaos: 'Neutral',
    goodEvil: 'Malvado',
    fundamentalPrinciple:
      'El interés propio descarnado sin lealtad a códigos ni caos.',
    hardBoundary: 'No asumir sacrificios o pérdidas si no garantizan ganancia neta.',
    forceJustification:
      'Vía más corta y pragmática para la eliminación de obstáculos.',
    tags: ['evil', 'pragmatic', 'assassin'],
  },
  {
    id: 'align_ce',
    name: 'Caótico Malvado',
    lawChaos: 'Caótico',
    goodEvil: 'Malvado',
    fundamentalPrinciple:
      'La entropía, la destrucción y la voluntad arbitraria del más fuerte.',
    hardBoundary: 'No aceptar ningún tipo de límite o compromiso civilizatorio.',
    forceJustification:
      'Expresión pura de poder, crueldad sádica y deleite en la ruina.',
    tags: ['chaotic', 'evil', 'sadistic'],
  },
] as const;

export const PENDRAGON_TRAIT_PAIRS: readonly PendragonTraitPairDef[] = [
  { id: 'chaste_lustful', leftLabel: 'Casto', leftLabelEn: 'Chaste', rightLabel: 'Lujurioso', rightLabelEn: 'Lustful' },
  { id: 'energetic_lazy', leftLabel: 'Enérgico', leftLabelEn: 'Energetic', rightLabel: 'Perezoso', rightLabelEn: 'Lazy' },
  { id: 'forgiving_vengeful', leftLabel: 'Indulgente', leftLabelEn: 'Forgiving', rightLabel: 'Vengativo', rightLabelEn: 'Vengeful' },
  { id: 'generous_selfish', leftLabel: 'Generoso', leftLabelEn: 'Generous', rightLabel: 'Egoísta', rightLabelEn: 'Selfish' },
  { id: 'honest_deceitful', leftLabel: 'Honesto', leftLabelEn: 'Honest', rightLabel: 'Falso', rightLabelEn: 'Deceitful' },
  { id: 'just_arbitrary', leftLabel: 'Justo', leftLabelEn: 'Just', rightLabel: 'Arbitrario', rightLabelEn: 'Arbitrary' },
  { id: 'merciful_cruel', leftLabel: 'Misericordioso', leftLabelEn: 'Merciful', rightLabel: 'Cruel', rightLabelEn: 'Cruel' },
  { id: 'modest_proud', leftLabel: 'Modesto', leftLabelEn: 'Modest', rightLabel: 'Soberbio', rightLabelEn: 'Proud' },
  { id: 'prudent_reckless', leftLabel: 'Prudente', leftLabelEn: 'Prudent', rightLabel: 'Temerario', rightLabelEn: 'Reckless' },
  { id: 'spiritual_worldly', leftLabel: 'Espiritual', leftLabelEn: 'Spiritual', rightLabel: 'Terrenal', rightLabelEn: 'Worldly' },
  { id: 'temperate_indulgent', leftLabel: 'Templado', leftLabelEn: 'Temperate', rightLabel: 'Glotón', rightLabelEn: 'Indulgent' },
  { id: 'trusting_suspicious', leftLabel: 'Confiado', leftLabelEn: 'Trusting', rightLabel: 'Receloso', rightLabelEn: 'Suspicious' },
  { id: 'valorous_cowardly', leftLabel: 'Valeroso', leftLabelEn: 'Valorous', rightLabel: 'Cobarde', rightLabelEn: 'Cowardly' },
] as const;

export const BINDING_PASSIONS: readonly BindingPassion[] = [
  {
    id: 'passion_loyalty_lord',
    name: 'Lealtad al Señor / Líder',
    description:
      'Juramento de fidelidad absoluta hacia una figura rectora o comandante.',
  },
  {
    id: 'passion_love_family',
    name: 'Amor a la Familia',
    description:
      'Devoción incondicional hacia el linaje, clan o núcleo afectivo cercano.',
  },
  {
    id: 'passion_faction_hatred',
    name: 'Odio a una Facción Específica',
    description:
      'Rencor visceral e inextinguible dirigido contra un grupo, orden o nación rival.',
  },
  {
    id: 'passion_sacred_hospitality',
    name: 'Hospitalidad Sagrada',
    description:
      'Deber inviolable de proteger, alimentar y dar asilo al huésped bajo su techo.',
  },
  {
    id: 'passion_blood_honor',
    name: 'Honor de la Sangre',
    description:
      'Defensa obsesiva del prestigio ancestral, apellido o código de linaje.',
  },
] as const;
