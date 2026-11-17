import type { NpcProfile, TurnaroundPromptOutput } from '../types/character';

/**
 * Frase base obligatoria exigida por Fase 4 para forzar la hoja de modelo ortográfica.
 */
export const MANDATORY_TURNAROUND_DIRECTIVE =
  'character turnaround sheet, front view, side view, back view, flat colors, animated concept art style, full body';

const DEFAULT_NEGATIVE_PROMPT =
  'cropped limbs, cut off feet, cut off head, overlapping figures, busy background, 3d render, photorealistic, watermark, text, inconsistent outfit';

/**
 * Ensambla un prompt corto y directo en inglés optimizado para modelos tipo FLUX
 * (sin saturar de tokens ni mezclar negative prompts dentro del prompt positivo).
 */
export function buildTurnaroundPrompt(
  profile: NpcProfile,
  options?: { includeSymptomaticPowerVisuals?: boolean }
): TurnaroundPromptOutput {
  const { appearance, subversion, powers } = profile;

  const styleAndLayout = `${MANDATORY_TURNAROUND_DIRECTIVE}, neutral A-pose, solid light-gray background`;

  const anatomyParts = [
    `${appearance.ageGroup.promptEn} ${appearance.gender.promptEn} ${appearance.race.promptEn}`,
    appearance.biotype.promptEn,
    appearance.allometricRule.id !== 'standard' ? appearance.allometricRule.promptEn : null,
    subversion.paradigm ? subversion.paradigm.promptVisualEn : null,
  ].filter(Boolean);

  const anatomyAndShape = anatomyParts.join(', ');

  const { dominant, secondary, accent } = appearance.colorPalette;
  const colorPalette = `${dominant.promptEn} and ${secondary.promptEn} outfit with ${accent.promptEn} accents`;

  const faceAndHairParts = [
    appearance.skinTone.promptEn,
    `${appearance.hairCut.promptEn}, ${appearance.hairColor.promptEn}`,
    appearance.eyeAnomaly ? appearance.eyeAnomaly.promptEn : null,
    appearance.eyewear ? appearance.eyewear.promptEn : null,
    appearance.patchOrMask ? appearance.patchOrMask.promptEn : null,
    appearance.tattooOrMark ? appearance.tattooOrMark.promptEn : null,
  ].filter(Boolean);

  const faceAndHair = faceAndHairParts.join(', ');
  const clothingAndGear = appearance.clothingStyle.promptEn;

  const bodyModsParts: string[] = [];
  if (appearance.amputation && appearance.prosthetic) {
    bodyModsParts.push(
      `${appearance.amputation.promptEn} with ${appearance.prosthetic.promptEn}`
    );
  } else if (appearance.amputation) {
    bodyModsParts.push(appearance.amputation.promptEn);
  }
  for (const mod of appearance.bodyModifications) {
    bodyModsParts.push(mod.promptEn);
  }
  const bodyModsAndProsthetics =
    bodyModsParts.length > 0 ? bodyModsParts.join(', ') : 'intact limbs';

  let powersAndAura: string | null = null;
  if (powers) {
    const powerParts = [
      powers.elementalAffinity.promptEn,
      powers.biologicalTier.promptMutationCueEn ?? null,
      options?.includeSymptomaticPowerVisuals !== false
        ? powers.operationalCost.promptSymptomCueEn
        : null,
    ].filter(Boolean);
    powersAndAura = powerParts.length > 0 ? powerParts.join(', ') : null;
  }

  const orderedSections = [
    styleAndLayout,
    anatomyAndShape,
    faceAndHair,
    clothingAndGear,
    colorPalette,
    bodyModsParts.length > 0 ? bodyModsAndProsthetics : null,
    powersAndAura,
  ].filter(Boolean);

  const masterPrompt = orderedSections.join('. ') + '.';

  return {
    masterPrompt,
    negativePrompt: DEFAULT_NEGATIVE_PROMPT,
    baseDirective: MANDATORY_TURNAROUND_DIRECTIVE,
    sections: {
      styleAndLayout,
      anatomyAndShape,
      colorPalette,
      faceAndHair,
      clothingAndGear,
      bodyModsAndProsthetics,
      powersAndAura,
    },
  };
}
