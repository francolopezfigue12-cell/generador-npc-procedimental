/**
 * Tipos del Informe 1: Psicología, Moralidad y Comportamiento.
 * Modela las 10 subdivisiones de personalidad y el sistema diádico Pendragon.
 */

export interface WeightedEntry {
  readonly id: string;
  readonly tags?: readonly string[];
  readonly defaultWeight?: number;
}

export interface ExternalMotivation extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

export interface InternalMotivation extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

export interface MotivationArchetype extends WeightedEntry {
  readonly archetype: string;
  readonly primaryGoal: string;
  readonly greatestFear: string;
  readonly crisisResponse: string;
  readonly archetypalFlaw: string;
}

export interface FatalFlaw extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

export type MinorQuirkCategory =
  | 'tics_compulsiones'
  | 'manias_sociales'
  | 'fijaciones_consumo'
  | 'habitos_paranoicos'
  | 'vicios_menores';

export interface MinorQuirk extends WeightedEntry {
  readonly category: MinorQuirkCategory;
  readonly categoryLabel: string;
  readonly description: string;
}

export interface Virtue extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

export type DefenseMaturityLevel =
  | 'I_patologico'
  | 'II_inmaduro'
  | 'III_neurotico'
  | 'IV_maduro';

export interface DefenseMechanism extends WeightedEntry {
  readonly maturityLevel: DefenseMaturityLevel;
  readonly maturityLabel: string;
  readonly name: string;
  readonly underlyingImpulse: string;
  readonly behavioralManifestation: string;
  readonly narrativeUtility: string;
}

export interface SocialAttitude extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

export interface HiddenSecret extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

export interface BreakingPoint extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

export type LawChaosAxis = 'Legal' | 'Neutral' | 'Caótico';
export type GoodEvilAxis = 'Bueno' | 'Neutral' | 'Malvado';

export interface AlignmentEntry extends WeightedEntry {
  readonly name: string;
  readonly lawChaos: LawChaosAxis;
  readonly goodEvil: GoodEvilAxis;
  readonly fundamentalPrinciple: string;
  readonly hardBoundary: string;
  readonly forceJustification: string;
}

export interface PendragonTraitPairDef {
  readonly id: string;
  readonly leftLabel: string;
  readonly leftLabelEn: string;
  readonly rightLabel: string;
  readonly rightLabelEn: string;
}

export interface PendragonTraitRoll {
  readonly traitId: string;
  readonly leftLabel: string;
  readonly rightLabel: string;
  /** Puntuación entre 1 y 19; leftValue + rightValue === 20. */
  readonly leftValue: number;
  readonly rightValue: number;
  readonly dominantSide: 'left' | 'right' | 'balanced';
  /** Activado cuando cualquiera de los extremos alcanza >= 16. */
  readonly compulsionTriggered: boolean;
}

export interface BindingPassion extends WeightedEntry {
  readonly name: string;
  readonly description: string;
}

/**
 * Perfil psicológico completo organizado en las 10 subdivisiones narrativas
 * requeridas por el motor de generación y el sistema de candados.
 */
export interface PersonalityProfile {
  /** 1. Objetivo Externo (Want) */
  readonly externalMotivation: ExternalMotivation;
  /** 2. Carencia Subconsciente (Need) */
  readonly internalMotivation: InternalMotivation;
  /** 3. Arquetipo Funcional de Motivación (Campbell/Vogler/Pearson) */
  readonly archetype: MotivationArchetype;
  /** 4. Falla Fatal (Hamartia) */
  readonly fatalFlaw: FatalFlaw;
  /** 5. Defecto Menor / Manía Idiosincrásica */
  readonly minorQuirk: MinorQuirk;
  /** 6. Virtud Destacable */
  readonly virtue: Virtue;
  /** 7. Mecanismo de Defensa Psicológica (Vaillant) */
  readonly defenseMechanism: DefenseMechanism;
  /** 8. Actitud Social Matriz */
  readonly socialAttitude: SocialAttitude;
  /** 9a. Secreto Oculto */
  readonly hiddenSecret: HiddenSecret;
  /** 9b. Punto de Ruptura Conductual */
  readonly breakingPoint: BreakingPoint;
  /** 10a. Alineamiento Clásico Integrado */
  readonly alignment: AlignmentEntry;
  /** 10b. 13 Pares de Rasgos Diádicos (Pendragon) */
  readonly dyadicTraits: readonly PendragonTraitRoll[];
  /** 10c. Pasión Superior Vinculante */
  readonly bindingPassion: BindingPassion;
}

export interface PersonalitySubdivisionMeta {
  readonly index: number;
  readonly id: string;
  readonly label: string;
  readonly description: string;
}
