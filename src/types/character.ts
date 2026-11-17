/**
 * Contratos principales del personaje generado, sistema de candados (Locks)
 * y salida del ensamblador de prompts Turnaround.
 */

import type {
  AllometricScalingRule,
  AmputationEntry,
  BiotypeEntry,
  BodyModificationEntry,
  ProstheticEntry,
  RaceEntry,
} from './anatomy';
import type { PowersModuleConfig, PowersProfile } from './powers';
import type { PersonalityProfile } from './psychology';
import type {
  AgeGroupEntry,
  ColorPalette603010,
  ColorScript,
  GenderPresentationEntry,
  ShapeLanguageEntry,
  SkinToneEntry,
  SubversionParadigm,
  VisualFeatureEntry,
} from './visuals';

/**
 * Nombre y significado del NPC (Fase 2).
 * Nota: los informes .md fuente no incluyen tabla de nombres, por lo que
 * este contrato alimentará el diccionario de nombres/etimologías de Fase 2.
 */
export interface CharacterName {
  readonly fullName: string;
  readonly givenName: string;
  readonly surnameOrEpithet: string;
  readonly meaning: string;
  readonly culturalOrigin: string;
}

export interface AppearanceProfile {
  readonly race: RaceEntry;
  readonly ageGroup: AgeGroupEntry;
  readonly gender: GenderPresentationEntry;
  readonly biotype: BiotypeEntry;
  readonly heightMeters: number;
  readonly weightKg: number;
  readonly allometricRule: AllometricScalingRule;
  readonly shapeLanguage: ShapeLanguageEntry;
  readonly colorPalette: ColorPalette603010;
  readonly colorScript: ColorScript | null;
  readonly hairCut: VisualFeatureEntry;
  readonly hairColor: VisualFeatureEntry;
  readonly skinTone: SkinToneEntry;
  readonly eyeAnomaly: VisualFeatureEntry | null;
  readonly clothingStyle: VisualFeatureEntry;
  readonly tattooOrMark: VisualFeatureEntry | null;
  readonly eyewear: VisualFeatureEntry | null;
  readonly patchOrMask: VisualFeatureEntry | null;
  readonly amputation: AmputationEntry | null;
  readonly prosthetic: ProstheticEntry | null;
  readonly bodyModifications: readonly BodyModificationEntry[];
}

export interface SubversionRecord {
  readonly isSubverted: boolean;
  readonly paradigm: SubversionParadigm | null;
  readonly appliedContrastRules: readonly string[];
}

export interface NpcProfile {
  readonly id: string;
  readonly seed: string;
  readonly generatedAtIso: string;
  readonly name: CharacterName;
  readonly personality: PersonalityProfile;
  readonly appearance: AppearanceProfile;
  readonly subversion: SubversionRecord;
  /** Presente solo si el módulo opcional de poderes está activo. */
  readonly powers: PowersProfile | null;
}

/**
 * Claves granulares para el sistema de Candados (Fase 3).
 * Permite bloquear cualquier rasgo individual antes de presionar "Regenerar".
 */
export type LockableFieldKey =
  | 'name'
  // Personalidad (10 subdivisiones)
  | 'externalMotivation'
  | 'internalMotivation'
  | 'archetype'
  | 'fatalFlaw'
  | 'minorQuirk'
  | 'virtue'
  | 'defenseMechanism'
  | 'socialAttitude'
  | 'hiddenSecret'
  | 'breakingPoint'
  | 'alignment'
  | 'dyadicTraits'
  | 'bindingPassion'
  // Apariencia y anatomía
  | 'race'
  | 'ageGroup'
  | 'gender'
  | 'biotype'
  | 'shapeLanguage'
  | 'colorPalette'
  | 'colorScript'
  | 'hairCut'
  | 'hairColor'
  | 'skinTone'
  | 'eyeAnomaly'
  | 'clothingStyle'
  | 'tattooOrMark'
  | 'eyewear'
  | 'patchOrMask'
  | 'amputation'
  | 'prosthetic'
  | 'bodyModifications'
  // Subversión y módulo opcional de poderes
  | 'subversion'
  | 'elementalAffinity'
  | 'prtClassification'
  | 'biologicalTier'
  | 'operationalCost';

export type LockState = Partial<Record<LockableFieldKey, boolean>>;

export interface GeneratorOptions {
  readonly seed?: string;
  readonly powersConfig: PowersModuleConfig;
  readonly forceSubversion?: boolean;
  /** Probabilidad [0..1] de forzar un paradigma de contraste si forceSubversion es false. */
  readonly subversionProbability?: number;
  readonly locks?: LockState;
  readonly previousProfile?: NpcProfile | null;
}

export interface TurnaroundPromptOutput {
  readonly masterPrompt: string;
  readonly negativePrompt: string;
  readonly baseDirective: string;
  readonly sections: {
    readonly styleAndLayout: string;
    readonly anatomyAndShape: string;
    readonly colorPalette: string;
    readonly faceAndHair: string;
    readonly clothingAndGear: string;
    readonly bodyModsAndProsthetics: string;
    readonly powersAndAura: string | null;
  };
}

export interface SavedNpcRecord {
  readonly id: string;
  readonly profile: NpcProfile;
  /** Imagen turnaround generada o subida en formato Data URL / URL persistida. */
  readonly generatedImageDataUrl: string | null;
  readonly isFavorite: boolean;
  readonly savedAtIso: string;
  readonly notes?: string;
}
