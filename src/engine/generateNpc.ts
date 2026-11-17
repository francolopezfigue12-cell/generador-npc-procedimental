import {
  ALLOMETRIC_SCALING_RULES,
  AMPUTATIONS,
  BIOTYPES,
  BODY_MODIFICATIONS,
  PROSTHETICS,
  RACES,
} from '../data/anatomy.data';
import {
  BIOLOGICAL_POTENTIAL_TIERS,
  ELEMENTAL_AFFINITIES,
  POWER_COSTS,
  PRT_CLASSIFICATIONS,
  getPowersDatabase,
} from '../data/powers.data';
import {
  ALIGNMENTS,
  BINDING_PASSIONS,
  BREAKING_POINTS,
  DEFENSE_MECHANISMS,
  EXTERNAL_MOTIVATIONS,
  FATAL_FLAWS,
  HIDDEN_SECRETS,
  INTERNAL_MOTIVATIONS,
  MINOR_QUIRKS,
  MOTIVATION_ARCHETYPES,
  PENDRAGON_TRAIT_PAIRS,
  SOCIAL_ATTITUDES,
  VIRTUES,
} from '../data/psychology.data';
import {
  AGE_GROUPS,
  CHROMATIC_TONES,
  CLOTHING_STYLES,
  COLOR_SCRIPTS,
  EYEWEAR_DEVICES,
  EYE_ANOMALIES,
  GENDER_PRESENTATIONS,
  HAIR_COLORS,
  HAIR_CUTS,
  PATCHES_AND_MASKS,
  SHAPE_LANGUAGES,
  SKIN_TONES,
  TATTOOS_AND_MARKS,
} from '../data/visuals.data';
import type {
  AllometricScalingRule,
  AmputationEntry,
  BiotypeEntry,
  BodyModificationEntry,
  ProstheticEntry,
  RaceEntry,
  RaceId,
} from '../types/anatomy';
import type {
  AppearanceProfile,
  GeneratorOptions,
  LockableFieldKey,
  LockState,
  NpcProfile,
  SubversionRecord,
} from '../types/character';
import type { PowersProfile } from '../types/powers';
import type { PendragonTraitRoll, PersonalityProfile } from '../types/psychology';
import type {
  AgeGroupEntry,
  ChromaticTone,
  ColorPalette603010,
  ColorScript,
  GenderPresentationEntry,
  ShapeLanguageEntry,
  SkinToneEntry,
  VisualFeatureEntry,
} from '../types/visuals';
import {
  computeEntryWeight,
  evaluateOrganicContrasts,
  resolveSubversionDecision,
} from './contrastRules';
import { generateCharacterName } from './nameGenerator';
import { createSeededRng, generateRandomSeed, type SeededRng } from './rng';

function isLocked(locks: LockState | undefined, key: LockableFieldKey): boolean {
  return Boolean(locks?.[key]);
}

function resolveField<T>(
  locks: LockState | undefined,
  key: LockableFieldKey,
  previousValue: T | undefined,
  generateFn: () => T
): T {
  if (previousValue !== undefined && isLocked(locks, key)) {
    return previousValue;
  }
  return generateFn();
}

function addTags(target: Set<string>, tags?: readonly string[]): void {
  if (!tags) return;
  for (const tag of tags) {
    target.add(tag);
  }
}

function resolveAllometricRule(heightMeters: number, weightKg: number): AllometricScalingRule {
  if (heightMeters > 2.5 || weightKg > 300) {
    return ALLOMETRIC_SCALING_RULES.find((r) => r.id === 'giant') ?? ALLOMETRIC_SCALING_RULES[0];
  }
  if (heightMeters < 1.0 || weightKg < 25) {
    return ALLOMETRIC_SCALING_RULES.find((r) => r.id === 'diminutive') ?? ALLOMETRIC_SCALING_RULES[0];
  }
  return ALLOMETRIC_SCALING_RULES.find((r) => r.id === 'standard') ?? ALLOMETRIC_SCALING_RULES[0];
}

function computeAnthropometry(
  rng: SeededRng,
  raceId: RaceId,
  biotype: BiotypeEntry
): { heightMeters: number; weightKg: number } {
  let heightMin = biotype.heightRangeMeters.min;
  let heightMax = biotype.heightRangeMeters.max;
  let weightMin = biotype.weightRangeKg.min;
  let weightMax = biotype.weightRangeKg.max;

  if (raceId === 'dwarf') {
    heightMin = Math.min(heightMin, 0.92);
    heightMax = Math.min(heightMax, 1.45);
    weightMin = Math.max(22, weightMin * 0.75);
    weightMax = Math.min(95, weightMax * 0.85);
  } else if (raceId === 'elf') {
    weightMin = Math.max(42, weightMin * 0.85);
    weightMax = weightMax * 0.9;
  } else if (raceId === 'orc') {
    weightMin = weightMin * 1.1;
    weightMax = weightMax * 1.15;
  }

  return {
    heightMeters: rng.float(heightMin, heightMax, 2),
    weightKg: rng.float(weightMin, weightMax, 1),
  };
}

function rollPendragonTraits(
  rng: SeededRng,
  activeTags: ReadonlySet<string>
): readonly PendragonTraitRoll[] {
  return PENDRAGON_TRAIT_PAIRS.map((pair) => {
    let min = 4;
    let max = 16;

    if (pair.id === 'valorous_cowardly' && activeTags.has('martial')) {
      min = 10;
      max = 19;
    } else if (pair.id === 'merciful_cruel' && activeTags.has('evil')) {
      min = 1;
      max = 9;
    } else if (pair.id === 'just_arbitrary' && activeTags.has('lawful')) {
      min = 11;
      max = 19;
    } else if (pair.id === 'prudent_reckless' && activeTags.has('chaotic')) {
      min = 1;
      max = 9;
    }

    const leftValue = rng.chance(0.22) ? rng.int(1, 19) : rng.int(min, max);
    const rightValue = 20 - leftValue;
    const dominantSide =
      leftValue > rightValue ? 'left' : rightValue > leftValue ? 'right' : 'balanced';

    return {
      traitId: pair.id,
      leftLabel: pair.leftLabel,
      rightLabel: pair.rightLabel,
      leftValue,
      rightValue,
      dominantSide,
      compulsionTriggered: leftValue >= 16 || rightValue >= 16,
    };
  });
}

function pickOptionalFeature(
  rng: SeededRng,
  pool: readonly VisualFeatureEntry[],
  probability: number,
  activeTags: ReadonlySet<string>
): VisualFeatureEntry | null {
  if (!rng.chance(probability)) return null;
  return rng.weightedPick(pool, (item) => computeEntryWeight(item, activeTags));
}

function buildDistinctColorPalette(
  rng: SeededRng,
  activeTags: ReadonlySet<string>,
  preferredToneIds?: readonly string[],
  forcedDominantId?: string
): ColorPalette603010 {
  const forcedTone = forcedDominantId
    ? CHROMATIC_TONES.find((t) => t.id === forcedDominantId)
    : undefined;

  const dominant: ChromaticTone =
    forcedTone ??
    rng.weightedPick(CHROMATIC_TONES, (tone) =>
      computeEntryWeight(tone, activeTags, preferredToneIds, 2.5)
    );

  const secondaryCandidates = CHROMATIC_TONES.filter((t) => t.id !== dominant.id);
  const secondary: ChromaticTone = rng.weightedPick(secondaryCandidates, (tone) =>
    computeEntryWeight(tone, activeTags, preferredToneIds, 2)
  );

  const accentCandidates = CHROMATIC_TONES.filter(
    (t) => t.id !== dominant.id && t.id !== secondary.id
  );
  const accent: ChromaticTone = rng.pick(accentCandidates);

  return { dominant, secondary, accent };
}

/**
 * Motor principal de generación procedimental de NPCs.
 * Soporta semillas reproducibles, reglas de contraste/subversión, candados granulares
 * y activación/desactivación limpia del módulo de Poderes.
 */
export function generateNpc(options: GeneratorOptions): NpcProfile {
  const { locks, previousProfile, powersConfig } = options;
  const hasPrevious = Boolean(previousProfile);

  const effectiveSeed =
    options.seed && options.seed.trim().length > 0
      ? options.seed.trim()
      : generateRandomSeed();
  const rng = createSeededRng(effectiveSeed);
  const activeTags = new Set<string>();

  // 1. Subversión / Contraste
  const lockedSubversion =
    hasPrevious && isLocked(locks, 'subversion') && previousProfile
      ? {
          isSubverted: previousProfile.subversion.isSubverted,
          paradigm: previousProfile.subversion.paradigm,
        }
      : null;

  const subversionDecision = resolveSubversionDecision(rng, {
    forceSubversion: options.forceSubversion,
    subversionProbability: options.subversionProbability,
    lockedSubversion,
  });

  addTags(activeTags, subversionDecision.psychologyTagHints);

  // 2. Módulo Opcional de Poderes
  const powersDb = getPowersDatabase(powersConfig.enabled);
  let powers: PowersProfile | null = null;

  if (powersDb) {
    const prevPowers = previousProfile?.powers ?? undefined;

    const elementalAffinity = resolveField(
      locks,
      'elementalAffinity',
      prevPowers?.elementalAffinity,
      () =>
        rng.weightedPick(ELEMENTAL_AFFINITIES, (e) =>
          computeEntryWeight(e, activeTags)
        )
    );
    addTags(activeTags, elementalAffinity.tags);
    activeTags.add(elementalAffinity.id);

    const prtClassification = resolveField(
      locks,
      'prtClassification',
      prevPowers?.prtClassification,
      () =>
        rng.weightedPick(PRT_CLASSIFICATIONS, (p) =>
          computeEntryWeight(p, activeTags)
        )
    );
    addTags(activeTags, prtClassification.tags);

    const biologicalTier = resolveField(
      locks,
      'biologicalTier',
      prevPowers?.biologicalTier,
      () => rng.pick(BIOLOGICAL_POTENTIAL_TIERS)
    );

    const operationalCost = resolveField(
      locks,
      'operationalCost',
      prevPowers?.operationalCost,
      () => rng.pick(POWER_COSTS)
    );

    powers = {
      elementalAffinity,
      prtClassification,
      biologicalTier,
      operationalCost,
    };
  }

  // 3. Psicología (10 subdivisiones)
  const prevPsych = previousProfile?.personality;

  const archetype = resolveField(locks, 'archetype', prevPsych?.archetype, () =>
    rng.weightedPick(MOTIVATION_ARCHETYPES, (a) => computeEntryWeight(a, activeTags))
  );
  addTags(activeTags, archetype.tags);

  const alignment = resolveField(locks, 'alignment', prevPsych?.alignment, () =>
    rng.weightedPick(ALIGNMENTS, (al) =>
      computeEntryWeight(al, activeTags, subversionDecision.preferredAlignmentIds)
    )
  );
  addTags(activeTags, alignment.tags);

  const externalMotivation = resolveField(
    locks,
    'externalMotivation',
    prevPsych?.externalMotivation,
    () => rng.weightedPick(EXTERNAL_MOTIVATIONS, (m) => computeEntryWeight(m, activeTags))
  );
  addTags(activeTags, externalMotivation.tags);

  const internalMotivation = resolveField(
    locks,
    'internalMotivation',
    prevPsych?.internalMotivation,
    () => rng.weightedPick(INTERNAL_MOTIVATIONS, (m) => computeEntryWeight(m, activeTags))
  );
  addTags(activeTags, internalMotivation.tags);

  const fatalFlaw = resolveField(locks, 'fatalFlaw', prevPsych?.fatalFlaw, () =>
    rng.weightedPick(FATAL_FLAWS, (f) =>
      computeEntryWeight(f, activeTags, subversionDecision.preferredFlawIds)
    )
  );
  addTags(activeTags, fatalFlaw.tags);

  const minorQuirk = resolveField(locks, 'minorQuirk', prevPsych?.minorQuirk, () =>
    rng.pick(MINOR_QUIRKS)
  );

  const virtue = resolveField(locks, 'virtue', prevPsych?.virtue, () =>
    rng.weightedPick(VIRTUES, (v) =>
      computeEntryWeight(v, activeTags, subversionDecision.preferredVirtueIds)
    )
  );
  addTags(activeTags, virtue.tags);

  const defenseMechanism = resolveField(
    locks,
    'defenseMechanism',
    prevPsych?.defenseMechanism,
    () =>
      rng.weightedPick(DEFENSE_MECHANISMS, (d) =>
        computeEntryWeight(d, activeTags, subversionDecision.preferredDefenseIds)
      )
  );
  addTags(activeTags, defenseMechanism.tags);

  const socialAttitude = resolveField(
    locks,
    'socialAttitude',
    prevPsych?.socialAttitude,
    () => rng.weightedPick(SOCIAL_ATTITUDES, (s) => computeEntryWeight(s, activeTags))
  );
  addTags(activeTags, socialAttitude.tags);

  const hiddenSecret = resolveField(locks, 'hiddenSecret', prevPsych?.hiddenSecret, () =>
    rng.weightedPick(HIDDEN_SECRETS, (s) => computeEntryWeight(s, activeTags))
  );
  addTags(activeTags, hiddenSecret.tags);

  const breakingPoint = resolveField(
    locks,
    'breakingPoint',
    prevPsych?.breakingPoint,
    () => rng.weightedPick(BREAKING_POINTS, (b) => computeEntryWeight(b, activeTags))
  );

  const dyadicTraits = resolveField(locks, 'dyadicTraits', prevPsych?.dyadicTraits, () =>
    rollPendragonTraits(rng, activeTags)
  );

  const bindingPassion = resolveField(
    locks,
    'bindingPassion',
    prevPsych?.bindingPassion,
    () => rng.pick(BINDING_PASSIONS)
  );

  const personality: PersonalityProfile = {
    externalMotivation,
    internalMotivation,
    archetype,
    fatalFlaw,
    minorQuirk,
    virtue,
    defenseMechanism,
    socialAttitude,
    hiddenSecret,
    breakingPoint,
    alignment,
    dyadicTraits,
    bindingPassion,
  };

  // 4. Anatomía, Apariencia, Edad, Género y Subversiones forzadas
  const prevApp = previousProfile?.appearance;
  const paradigmId = subversionDecision.paradigm?.id;

  const race: RaceEntry = resolveField(locks, 'race', prevApp?.race, () =>
    rng.weightedPick(RACES, (r) =>
      computeEntryWeight(r, activeTags, subversionDecision.preferredRaceIds, 2)
    )
  );
  addTags(activeTags, race.tags);

  const ageGroup: AgeGroupEntry = resolveField(
    locks,
    'ageGroup',
    prevApp?.ageGroup,
    () => {
      if (paradigmId === 'aged_titan') {
        return AGE_GROUPS.find((a) => a.id === 'elderly') ?? AGE_GROUPS[3];
      }
      return rng.weightedPick(AGE_GROUPS, (a) => computeEntryWeight(a, activeTags));
    }
  );

  const gender: GenderPresentationEntry = resolveField(
    locks,
    'gender',
    prevApp?.gender,
    () => rng.pick(GENDER_PRESENTATIONS)
  );

  const biotype: BiotypeEntry = resolveField(locks, 'biotype', prevApp?.biotype, () => {
    if (paradigmId === 'gentle_colossus') {
      const colossusPool = BIOTYPES.filter(
        (b) => b.id === 'giant_columnar' || b.id === 'endomorph'
      );
      return rng.pick(colossusPool);
    }
    const preferred =
      subversionDecision.preferredBiotypeIds ?? race.typicalBiotypeIds;
    return rng.weightedPick(BIOTYPES, (b) =>
      computeEntryWeight(b, activeTags, preferred, 3)
    );
  });
  addTags(activeTags, biotype.tags);

  const { heightMeters, weightKg } =
    prevApp && isLocked(locks, 'biotype')
      ? { heightMeters: prevApp.heightMeters, weightKg: prevApp.weightKg }
      : computeAnthropometry(rng, race.id, biotype);

  const allometricRule = resolveAllometricRule(heightMeters, weightKg);

  const shapeLanguage: ShapeLanguageEntry = resolveField(
    locks,
    'shapeLanguage',
    prevApp?.shapeLanguage,
    () => {
      if (paradigmId === 'pastel_assassin') {
        return SHAPE_LANGUAGES.find((s) => s.id === 'circle') ?? SHAPE_LANGUAGES[0];
      }
      return rng.weightedPick(SHAPE_LANGUAGES, (s) =>
        computeEntryWeight(
          s,
          activeTags,
          subversionDecision.paradigm?.biasHints.preferredShapeIds
        )
      );
    }
  );

  const preferredColors =
    paradigmId === 'pastel_assassin'
      ? ['color_pastel_pink', 'color_pastel_lavender', 'color_pastel_mint']
      : subversionDecision.paradigm?.biasHints.preferredToneIds ??
        powers?.elementalAffinity.associatedColorIds;

  const forcedDominantColorId =
    paradigmId === 'corrupt_seraph'
      ? 'color_snow_white'
      : paradigmId === 'pastel_assassin'
        ? rng.pick(['color_pastel_pink', 'color_pastel_lavender', 'color_pastel_mint'])
        : undefined;

  const colorPalette: ColorPalette603010 = resolveField(
    locks,
    'colorPalette',
    prevApp?.colorPalette,
    () =>
      buildDistinctColorPalette(
        rng,
        activeTags,
        preferredColors,
        forcedDominantColorId
      )
  );

  const colorScript: ColorScript | null = resolveField(
    locks,
    'colorScript',
    prevApp?.colorScript,
    () =>
      rng.chance(0.45)
        ? rng.weightedPick(COLOR_SCRIPTS, (c) => computeEntryWeight(c, activeTags))
        : null
  );

  const compatibleSkins = SKIN_TONES.filter((s) =>
    s.compatibleRaceIds.includes(race.id)
  );
  const skinPool = compatibleSkins.length > 0 ? compatibleSkins : SKIN_TONES;

  const skinTone: SkinToneEntry = resolveField(locks, 'skinTone', prevApp?.skinTone, () =>
    rng.weightedPick(skinPool, (s) => computeEntryWeight(s, activeTags))
  );

  const hairCut: VisualFeatureEntry = resolveField(
    locks,
    'hairCut',
    prevApp?.hairCut,
    () => rng.pick(HAIR_CUTS)
  );

  const hairColor: VisualFeatureEntry = resolveField(
    locks,
    'hairColor',
    prevApp?.hairColor,
    () => rng.pick(HAIR_COLORS)
  );

  const eyeAnomaly: VisualFeatureEntry | null = resolveField(
    locks,
    'eyeAnomaly',
    prevApp?.eyeAnomaly,
    () => (rng.chance(0.42) ? rng.pick(EYE_ANOMALIES) : null)
  );

  const clothingStyle: VisualFeatureEntry = resolveField(
    locks,
    'clothingStyle',
    prevApp?.clothingStyle,
    () =>
      rng.weightedPick(CLOTHING_STYLES, (c) =>
        computeEntryWeight(
          c,
          activeTags,
          subversionDecision.paradigm?.biasHints.preferredClothingIds
        )
      )
  );

  const tattooOrMark = resolveField(locks, 'tattooOrMark', prevApp?.tattooOrMark, () =>
    pickOptionalFeature(rng, TATTOOS_AND_MARKS, 0.45, activeTags)
  );

  const eyewear = resolveField(locks, 'eyewear', prevApp?.eyewear, () =>
    pickOptionalFeature(rng, EYEWEAR_DEVICES, 0.35, activeTags)
  );

  const patchOrMask = resolveField(locks, 'patchOrMask', prevApp?.patchOrMask, () =>
    pickOptionalFeature(rng, PATCHES_AND_MASKS, 0.32, activeTags)
  );

  // 5. Amputaciones, Prótesis y Modificaciones Corporales (con integridad entre candados)
  const prevProstheticLocked =
    hasPrevious && isLocked(locks, 'prosthetic') && prevApp?.prosthetic;
  const requiresAmpFromSubversion = Boolean(
    subversionDecision.paradigm?.biasHints.requiresAmputation
  );

  let amputation: AmputationEntry | null;
  if (hasPrevious && isLocked(locks, 'amputation') && prevApp) {
    amputation = prevApp.amputation;
  } else if (prevProstheticLocked) {
    const compatPool = AMPUTATIONS.filter((a) =>
      prevProstheticLocked.compatibleZones.includes(a.zone)
    );
    amputation = rng.pick(compatPool.length > 0 ? compatPool : AMPUTATIONS);
  } else if (requiresAmpFromSubversion || rng.chance(0.28)) {
    const zoneFilter = subversionDecision.forceAmputationZone;
    const pool = zoneFilter
      ? AMPUTATIONS.filter((a) => a.zone === zoneFilter)
      : AMPUTATIONS;
    amputation = rng.pick(pool);
  } else {
    amputation = null;
  }

  let prosthetic: ProstheticEntry | null;
  if (hasPrevious && isLocked(locks, 'prosthetic') && prevApp) {
    prosthetic = prevApp.prosthetic;
  } else if (amputation && amputation.zone !== 'facial_cranial') {
    const compatProsthetics = PROSTHETICS.filter((p) =>
      p.compatibleZones.includes(amputation.zone)
    );
    prosthetic =
      compatProsthetics.length > 0 && rng.chance(0.8)
        ? rng.weightedPick(compatProsthetics, (p) => computeEntryWeight(p, activeTags))
        : null;
  } else {
    prosthetic = null;
  }

  const bodyModifications: readonly BodyModificationEntry[] = resolveField(
    locks,
    'bodyModifications',
    prevApp?.bodyModifications,
    () => {
      const modPool = BODY_MODIFICATIONS.filter(
        (m) => !m.requiresProsthetic || Boolean(prosthetic)
      );
      if (modPool.length > 0 && rng.chance(0.45)) {
        return [rng.weightedPick(modPool, (m) => computeEntryWeight(m, activeTags))];
      }
      return [];
    }
  );

  const appearance: AppearanceProfile = {
    race,
    ageGroup,
    gender,
    biotype,
    heightMeters,
    weightKg,
    allometricRule,
    shapeLanguage,
    colorPalette,
    colorScript,
    hairCut,
    hairColor,
    skinTone,
    eyeAnomaly,
    clothingStyle,
    tattooOrMark,
    eyewear,
    patchOrMask,
    amputation,
    prosthetic,
    bodyModifications,
  };

  // 6. Nombre y Significado
  const name = resolveField(locks, 'name', previousProfile?.name, () =>
    generateCharacterName(rng, race.id)
  );

  // 7. Registro de Contrastes y Subversiones
  const organicContrasts = evaluateOrganicContrasts({
    raceId: race.id,
    biotypeId: biotype.id,
    shapeId: shapeLanguage.id,
    alignmentId: alignment.id,
    virtueId: virtue.id,
    flawId: fatalFlaw.id,
    hasAmputation: Boolean(amputation),
    clothingId: clothingStyle.id,
  });

  const combinedNotes = Array.from(
    new Set([...subversionDecision.contrastNotes, ...organicContrasts])
  );

  const subversion: SubversionRecord = {
    isSubverted: subversionDecision.isSubverted,
    paradigm: subversionDecision.paradigm,
    appliedContrastRules: combinedNotes,
  };

  return {
    id: `${effectiveSeed}-${Math.floor(rng.next() * 9000 + 1000)}`,
    seed: effectiveSeed,
    generatedAtIso: new Date().toISOString(),
    name,
    personality,
    appearance,
    subversion,
    powers,
  };
}
