import * as anatomyData from './anatomy.data';
import * as powersData from './powers.data';
import * as psychologyData from './psychology.data';
import * as visualsData from './visuals.data';

export * from './psychology.data';
export * from './visuals.data';
export * from './anatomy.data';
export * from './powers.data';

/**
 * Base de datos estructural núcleo (Informes 1, 2 y 3).
 * Siempre disponible independientemente de si se activa el módulo opcional de poderes.
 */
export const CORE_NPC_DATABASE = {
  psychology: {
    subdivisions: psychologyData.PERSONALITY_SUBDIVISIONS,
    externalMotivations: psychologyData.EXTERNAL_MOTIVATIONS,
    internalMotivations: psychologyData.INTERNAL_MOTIVATIONS,
    archetypes: psychologyData.MOTIVATION_ARCHETYPES,
    fatalFlaws: psychologyData.FATAL_FLAWS,
    minorQuirks: psychologyData.MINOR_QUIRKS,
    virtues: psychologyData.VIRTUES,
    defenseMechanisms: psychologyData.DEFENSE_MECHANISMS,
    socialAttitudes: psychologyData.SOCIAL_ATTITUDES,
    hiddenSecrets: psychologyData.HIDDEN_SECRETS,
    breakingPoints: psychologyData.BREAKING_POINTS,
    alignments: psychologyData.ALIGNMENTS,
    pendragonTraitPairs: psychologyData.PENDRAGON_TRAIT_PAIRS,
    bindingPassions: psychologyData.BINDING_PASSIONS,
  },
  visuals: {
    colorProportionRules: visualsData.COLOR_PROPORTION_RULES,
    chromaticTones: visualsData.CHROMATIC_TONES,
    colorScripts: visualsData.COLOR_SCRIPTS,
    shapeLanguages: visualsData.SHAPE_LANGUAGES,
    silhouetteReadabilityRules: visualsData.SILHOUETTE_READABILITY_RULES,
    tattoosAndMarks: visualsData.TATTOOS_AND_MARKS,
    eyewearDevices: visualsData.EYEWEAR_DEVICES,
    patchesAndMasks: visualsData.PATCHES_AND_MASKS,
    hairCuts: visualsData.HAIR_CUTS,
    hairColors: visualsData.HAIR_COLORS,
    skinTones: visualsData.SKIN_TONES,
    eyeAnomalies: visualsData.EYE_ANOMALIES,
    clothingStyles: visualsData.CLOTHING_STYLES,
    subversionParadigms: visualsData.SUBVERSION_PARADIGMS,
  },
  anatomy: {
    races: anatomyData.RACES,
    biotypes: anatomyData.BIOTYPES,
    allometricScalingRules: anatomyData.ALLOMETRIC_SCALING_RULES,
    amputations: anatomyData.AMPUTATIONS,
    prosthetics: anatomyData.PROSTHETICS,
    bodyModifications: anatomyData.BODY_MODIFICATIONS,
  },
} as const;

export const OPTIONAL_POWERS_MODULE = {
  getDatabase: powersData.getPowersDatabase,
  database: powersData.POWERS_DATABASE,
} as const;
