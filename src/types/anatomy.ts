/**
 * Tipos del Informe 3: Razas, Especies, Escalamiento Alométrico, Amputaciones y Prótesis.
 */

import type { WeightedEntry } from './psychology';

export type RaceId =
  | 'human'
  | 'orc'
  | 'elf'
  | 'dwarf'
  | 'beastfolk_feline'
  | 'beastfolk_avian'
  | 'beastfolk_reptilian'
  | 'beastfolk_ichthyoid';

export type BiotypeId =
  | 'ectomorph'
  | 'mesomorph'
  | 'endomorph'
  | 'giant_columnar'
  | 'dwarf_brachymorph';

export interface NumericRange {
  readonly min: number;
  readonly max: number;
  readonly unit: 'm' | 'kg';
  /** Texto exacto observado en el Markdown original para trazabilidad. */
  readonly rawMarkdown: string;
  /** Marca si el dígito inicial fue truncado en el .md original por escape de '$'. */
  readonly inferredLeadingDigit?: boolean;
}

export interface RaceEntry extends WeightedEntry {
  readonly id: RaceId;
  readonly name: string;
  readonly morphologicalProfile: string;
  readonly metabolicAdaptation: string;
  readonly baseMechanicalAttributes: string;
  readonly ecologicalNiche: string;
  readonly typicalBiotypeIds: readonly BiotypeId[];
  readonly promptEn: string;
}

export interface BiotypeEntry extends WeightedEntry {
  readonly id: BiotypeId;
  readonly name: string;
  readonly heightLabel: string;
  readonly heightRangeMeters: NumericRange;
  readonly weightRangeKg: NumericRange;
  readonly skeletalStructure: string;
  readonly physicalAdvantages: string;
  readonly physicalDisadvantages: string;
  readonly promptEn: string;
}

export interface AllometricScalingRule {
  readonly id: 'giant' | 'diminutive' | 'standard';
  readonly name: string;
  readonly thresholdDescription: string;
  readonly anatomicalMitigation: string;
  readonly circulatoryPhysiology: string;
  readonly metabolismNote: string;
  readonly promptEn: string;
}

export type AmputationZone = 'upper_limb' | 'lower_limb' | 'facial_cranial';

export interface AmputationEntry extends WeightedEntry {
  readonly zone: AmputationZone;
  readonly zoneLabel: string;
  readonly name: string;
  readonly promptEn: string;
}

export type ProstheticTechTier =
  | 'primitive'
  | 'clockwork'
  | 'biological_alchemical'
  | 'cybernetic_scifi';

export interface ProstheticEntry extends WeightedEntry {
  readonly tier: ProstheticTechTier;
  readonly categoryLabel: string;
  readonly manufacturingExamples: string;
  readonly articulationMechanism: string;
  readonly fieldAdvantages: string;
  readonly costsAndMaintenance: string;
  readonly compatibleZones: readonly AmputationZone[];
  readonly promptEn: string;
}

export interface BodyModificationEntry extends WeightedEntry {
  readonly name: string;
  readonly description: string;
  readonly requiresProsthetic: boolean;
  readonly promptEn: string;
}
