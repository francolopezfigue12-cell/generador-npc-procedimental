/**
 * Tipos del Informe 2: Diseño Visual, Color, Shape Language y Subversión Cognitiva.
 * Incluye tokens descriptivos en inglés (`promptEn`) para alimentar la Fase 4 (Turnaround).
 */

import type { WeightedEntry } from './psychology';

export type ColorProportionRole = 'dominant_60' | 'secondary_30' | 'accent_10';

export interface ColorProportionRule {
  readonly role: ColorProportionRole;
  readonly label: string;
  readonly percentage: 60 | 30 | 10;
  readonly saturationRange: string;
  readonly usageDescription: string;
}

export interface ChromaticTone extends WeightedEntry {
  readonly name: string;
  readonly symbolism: string;
  readonly positiveMeaning: string;
  readonly negativeMeaning: string;
  readonly recommendedApplication: string;
  /** Color de previsualización sugerido para swatches en UI (no proviene de la tabla .md). */
  readonly previewHex: string;
  readonly promptEn: string;
}

export interface ColorPalette603010 {
  readonly dominant: ChromaticTone;
  readonly secondary: ChromaticTone;
  readonly accent: ChromaticTone;
}

export interface ColorScript extends WeightedEntry {
  readonly name: string;
  readonly referenceCase: string;
  readonly progression: string;
  readonly suggestedToneIds: readonly string[];
}

export type ShapePrimitiveId = 'circle' | 'square' | 'triangle';

export interface ShapeLanguageEntry extends WeightedEntry {
  readonly id: ShapePrimitiveId;
  readonly name: string;
  readonly psychologicalConnotations: string;
  readonly anatomicalProperties: string;
  readonly conventionalArchetypes: string;
  readonly structuralSubversion: string;
  readonly promptEn: string;
}

export type DistinctiveFeatureCategory =
  | 'tattoo'
  | 'eyewear'
  | 'patch_mask'
  | 'hair_cut'
  | 'hair_color'
  | 'skin_tone'
  | 'eye_anomaly'
  | 'clothing';

export interface SkinToneEntry extends WeightedEntry {
  readonly name: string;
  readonly description: string;
  readonly previewHex: string;
  readonly compatibleRaceIds: readonly string[];
  readonly promptEn: string;
}

export interface AgeGroupEntry extends WeightedEntry {
  readonly id: 'young_adult' | 'adult' | 'veteran' | 'elderly';
  readonly name: string;
  readonly ageRangeLabel: string;
  readonly promptEn: string;
}

export interface GenderPresentationEntry extends WeightedEntry {
  readonly id: 'masculine' | 'feminine' | 'androgynous';
  readonly name: string;
  readonly promptEn: string;
}

export interface VisualFeatureEntry extends WeightedEntry {
  readonly category: DistinctiveFeatureCategory;
  readonly name: string;
  readonly description: string;
  readonly promptEn: string;
}

export type SubversionCategory =
  | 'aged_titan'
  | 'gentle_colossus'
  | 'pastel_assassin'
  | 'acrobatic_amputee'
  | 'corrupt_seraph'
  | 'compassionate_monster';

export interface SubversionParadigm extends WeightedEntry {
  readonly id: SubversionCategory;
  readonly name: string;
  readonly apparentVisualParadigm: string;
  readonly realMechanicalCapacity: string;
  readonly internalPsychologicalContrast: string;
  readonly cognitiveEffect: string;
  readonly archetypalExamples: string;
  readonly promptVisualEn: string;
  /** Reglas declarativas para guiar los pesos/forzados de la Fase 2. */
  readonly biasHints: {
    readonly preferredShapeIds?: readonly ShapePrimitiveId[];
    readonly requiresAmputation?: boolean;
    readonly preferredClothingIds?: readonly string[];
    readonly preferredToneIds?: readonly string[];
  };
}
