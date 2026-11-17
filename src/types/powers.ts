/**
 * Tipos del Informe 4: Afinidades Elementales y Poderes (Módulo Opcional).
 * Diseñado como módulo desacoplado que puede activarse o desactivarse en tiempo de ejecución.
 */

import type { WeightedEntry } from './psychology';

export type ElementalAffinityId =
  | 'fire'
  | 'water'
  | 'earth'
  | 'air'
  | 'lightning_metal'
  | 'void_shadow';

export interface ElementalAffinity extends WeightedEntry {
  readonly id: ElementalAffinityId;
  readonly element: string;
  readonly personalityArchetype: string;
  readonly humoralAndWuXing: string;
  readonly martialSomaticStyle: string;
  readonly tacticalCombatRole: string;
  readonly associatedColorIds: readonly string[];
  readonly promptEn: string;
}

export type PrtClassificationId =
  | 'mover'
  | 'shaker'
  | 'brute'
  | 'breaker'
  | 'master'
  | 'tinker'
  | 'blaster'
  | 'thinker'
  | 'striker'
  | 'changer'
  | 'trump'
  | 'stranger';

export interface PrtClassification extends WeightedEntry {
  readonly id: PrtClassificationId;
  readonly name: string;
  readonly description: string;
  readonly containmentProtocol: string;
  readonly promptVisualCueEn: string;
}

export type BiologicalPotentialTier =
  | 'epsilon'
  | 'delta'
  | 'gamma'
  | 'beta'
  | 'alpha'
  | 'omega';

export interface BiologicalPotentialEntry extends WeightedEntry {
  readonly id: BiologicalPotentialTier;
  readonly tierName: string;
  readonly description: string;
  readonly physicalMutationVisible: boolean;
  readonly promptMutationCueEn?: string;
}

export interface PowerCostEntry extends WeightedEntry {
  readonly costType: string;
  readonly mechanism: string;
  readonly symptomaticManifestation: string;
  readonly narrativeConsequence: string;
  readonly promptSymptomCueEn: string;
}

export interface PowersProfile {
  readonly elementalAffinity: ElementalAffinity;
  readonly prtClassification: PrtClassification;
  readonly biologicalTier: BiologicalPotentialEntry;
  readonly operationalCost: PowerCostEntry;
}

export interface PowersModuleConfig {
  readonly enabled: boolean;
  readonly includeSymptomaticVisualsInPrompt?: boolean;
}

export interface PowersDatabase {
  readonly elementalAffinities: readonly ElementalAffinity[];
  readonly prtClassifications: readonly PrtClassification[];
  readonly biologicalTiers: readonly BiologicalPotentialEntry[];
  readonly operationalCosts: readonly PowerCostEntry[];
}
