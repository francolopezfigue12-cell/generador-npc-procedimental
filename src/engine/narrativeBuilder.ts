import type { NpcProfile } from '../types/character';

export interface CharacterNarrative {
  readonly paragraphs: readonly string[];
  readonly fullText: string;
}

function buildPersonLabel(npc: NpcProfile): string {
  const { gender, ageGroup, race } = npc.appearance;
  const raceName = race.name.replace(/^Beastfolk:\s*/i, 'Beastfolk ');

  if (gender.id === 'feminine') {
    const ageWord =
      ageGroup.id === 'young_adult'
        ? 'joven'
        : ageGroup.id === 'adult'
          ? 'adulta'
          : ageGroup.id === 'veteran'
            ? 'madura'
            : 'anciana';
    return `una mujer ${ageWord} de raza ${raceName}`;
  }

  if (gender.id === 'masculine') {
    const ageWord =
      ageGroup.id === 'young_adult'
        ? 'joven'
        : ageGroup.id === 'adult'
          ? 'adulto'
          : ageGroup.id === 'veteran'
            ? 'maduro'
            : 'anciano';
    return `un hombre ${ageWord} de raza ${raceName}`;
  }

  const ageWord =
    ageGroup.id === 'young_adult'
      ? 'joven'
      : ageGroup.id === 'adult'
        ? 'adulta'
        : ageGroup.id === 'veteran'
          ? 'madura'
          : 'anciana';
  return `una persona andrógina ${ageWord} de raza ${raceName}`;
}

/**
 * Convierte todos los datos técnicos del NPC en una biografía de corrido
 * en español natural y sin tecnicismos.
 */
export function buildCharacterNarrative(npc: NpcProfile): CharacterNarrative {
  const { name, appearance, personality, subversion, powers } = npc;
  const personLabel = buildPersonLabel(npc);

  // Párrafo 1: Identidad y apariencia
  const p1Parts: string[] = [
    `${name.fullName} (cuyo nombre significa ${name.meaning.replace(/\.$/, '')}) es ${personLabel}.`,
    `Mide ${appearance.heightMeters.toFixed(2)} m, pesa ${appearance.weightKg} kg y tiene una contextura ${appearance.biotype.name.toLowerCase()}.`,
    `Su piel o superficie es de tono ${appearance.skinTone.name.toLowerCase()}, lleva el cabello en estilo ${appearance.hairCut.name.toLowerCase()} (${appearance.hairColor.name.toLowerCase()}) y viste con estilo ${appearance.clothingStyle.name.toLowerCase()}, dominado por ${appearance.colorPalette.dominant.name.toLowerCase()} con detalles en ${appearance.colorPalette.secondary.name.toLowerCase()} y ${appearance.colorPalette.accent.name.toLowerCase()}.`,
  ];

  const extras: string[] = [];
  if (appearance.eyeAnomaly) {
    extras.push(`presenta ${appearance.eyeAnomaly.name.toLowerCase()}`);
  }
  if (appearance.eyewear) {
    extras.push(`usa ${appearance.eyewear.name.toLowerCase()}`);
  }
  if (appearance.patchOrMask) {
    extras.push(`lleva ${appearance.patchOrMask.name.toLowerCase()}`);
  }
  if (appearance.tattooOrMark) {
    extras.push(`tiene ${appearance.tattooOrMark.name.toLowerCase()}`);
  }
  if (appearance.amputation && appearance.prosthetic) {
    extras.push(
      `sufrió una ${appearance.amputation.name.toLowerCase()} reemplazada por una prótesis ${appearance.prosthetic.categoryLabel.toLowerCase()}`
    );
  } else if (appearance.amputation) {
    extras.push(`tiene una ${appearance.amputation.name.toLowerCase()} sin prótesis`);
  }
  if (extras.length > 0) {
    p1Parts.push(`A simple vista, ${extras.join(', ')}.`);
  }

  if (subversion.paradigm) {
    p1Parts.push(
      `Aunque su aspecto proyecta "${subversion.paradigm.apparentVisualParadigm.toLowerCase()}", en realidad posee "${subversion.paradigm.realMechanicalCapacity.toLowerCase()}".`
    );
  }

  // Párrafo 2: Motivaciones, forma de ser y trato con los demás
  const p2Parts: string[] = [
    `En el fondo, su objetivo principal es ${personality.externalMotivation.name.toLowerCase()} (${personality.externalMotivation.description.charAt(0).toLowerCase() + personality.externalMotivation.description.slice(1).replace(/\.$/, '')}), aunque lo que realmente necesita superar es ${personality.internalMotivation.name.toLowerCase()}.`,
    `Su mayor virtud es la ${personality.virtue.name.toLowerCase()}, pero su gran defecto es ${personality.fatalFlaw.name.toLowerCase()}, acompañado de una manía cotidiana: ${personality.minorQuirk.description.charAt(0).toLowerCase() + personality.minorQuirk.description.slice(1)}`,
    `Cuando está con otras personas suele mostrarse con una actitud ${personality.socialAttitude.name.toLowerCase()} (${personality.socialAttitude.description.charAt(0).toLowerCase() + personality.socialAttitude.description.slice(1).replace(/\.$/, '')}).`,
    `Cuando atraviesa momentos de mucho estrés o peligro, reacciona mediante ${personality.defenseMechanism.name.toLowerCase()}: ${personality.defenseMechanism.behavioralManifestation.charAt(0).toLowerCase() + personality.defenseMechanism.behavioralManifestation.slice(1)}`,
  ];

  // Párrafo 3: Secretos, moral y extremos
  const extremeTraits = personality.dyadicTraits
    .filter((t) => t.compulsionTriggered)
    .map((t) => {
      const label = t.leftValue >= 16 ? t.leftLabel : t.rightLabel;
      const val = Math.max(t.leftValue, t.rightValue);
      return `${label.toLowerCase()} (${val}/20)`;
    });

  const p3Parts: string[] = [
    `Guarda un secreto importante (${personality.hiddenSecret.name.toLowerCase()}): ${personality.hiddenSecret.description.charAt(0).toLowerCase() + personality.hiddenSecret.description.slice(1)}`,
    `Su punto de quiebre sería ${personality.breakingPoint.name.toLowerCase()}.`,
    `En lo moral se alinea como ${personality.alignment.name}, guiado por su pasión principal: ${personality.bindingPassion.name.toLowerCase()}.`,
  ];

  if (extremeTraits.length > 0) {
    p3Parts.push(
      `Sus rasgos de carácter más extremos son ser marcadamente ${extremeTraits.join(', ')}.`
    );
  }

  const paragraphs: string[] = [p1Parts.join(' '), p2Parts.join(' '), p3Parts.join(' ')];

  // Párrafo 4: Poderes (solo si el módulo está activo)
  if (powers) {
    paragraphs.push(
      `En combate canaliza afinidad de ${powers.elementalAffinity.element} (${powers.elementalAffinity.tacticalCombatRole.toLowerCase()}) con habilidades de tipo ${powers.prtClassification.name} (escala ${powers.biologicalTier.tierName}). Sin embargo, usar su poder le cobra un precio duro: ${powers.operationalCost.costType.toLowerCase()} (${powers.operationalCost.symptomaticManifestation.toLowerCase()}).`
    );
  }

  return {
    paragraphs,
    fullText: paragraphs.join('\n\n'),
  };
}
