import type { NpcProfile, TurnaroundPromptOutput } from '../types/character';

export function exportNpcToMarkdown(
  npc: NpcProfile,
  turnaround: TurnaroundPromptOutput
): string {
  const { name, personality, appearance, subversion, powers } = npc;
  const compulsions = personality.dyadicTraits.filter((t) => t.compulsionTriggered);

  const lines: string[] = [
    `# ${name.fullName}`,
    `**Significado:** ${name.meaning} (${name.culturalOrigin})`,
    `**Semilla (Seed):** \`${npc.seed}\``,
    '',
    `## Contraste y Subversión`,
    subversion.paradigm
      ? `- **Paradigma:** ${subversion.paradigm.name} — *${subversion.paradigm.apparentVisualParadigm}* -> ${subversion.paradigm.realMechanicalCapacity}`
      : '- **Sin paradigma forzado**',
    ...subversion.appliedContrastRules.map((rule) => `- ${rule}`),
    '',
    `## Apariencia y Anatomía`,
    `- **Raza:** ${appearance.race.name}`,
    `- **Biotipo / Escala:** ${appearance.biotype.name} (${appearance.heightMeters} m, ${appearance.weightKg} kg — ${appearance.allometricRule.name})`,
    `- **Shape Language:** ${appearance.shapeLanguage.name}`,
    `- **Paleta 60-30-10:** 60% ${appearance.colorPalette.dominant.name} | 30% ${appearance.colorPalette.secondary.name} | 10% ${appearance.colorPalette.accent.name}`,
    `- **Piel / Superficie:** ${appearance.skinTone.name}`,
    `- **Cabello:** ${appearance.hairCut.name} (${appearance.hairColor.name})`,
    `- **Vestimenta:** ${appearance.clothingStyle.name}`,
    `- **Anomalía Ocular:** ${appearance.eyeAnomaly?.name ?? 'Ninguna'}`,
    `- **Lentes / Visor:** ${appearance.eyewear?.name ?? 'Ninguno'}`,
    `- **Parche / Máscara:** ${appearance.patchOrMask?.name ?? 'Ninguno'}`,
    `- **Tatuaje / Marca:** ${appearance.tattooOrMark?.name ?? 'Ninguna'}`,
    `- **Amputación:** ${appearance.amputation ? `${appearance.amputation.name} (${appearance.amputation.zoneLabel})` : 'Ninguna'}`,
    `- **Prótesis:** ${appearance.prosthetic?.categoryLabel ?? 'Ninguna'}`,
    `- **Modificaciones Corporales:** ${appearance.bodyModifications.length > 0 ? appearance.bodyModifications.map((m) => m.name).join(', ') : 'Ninguna'}`,
    '',
    `## Psicología (10 Subdivisiones)`,
    `1. **Want (Motivación Externa):** ${personality.externalMotivation.name}`,
    `2. **Need (Motivación Interna):** ${personality.internalMotivation.name}`,
    `3. **Arquetipo:** ${personality.archetype.archetype} (Meta: ${personality.archetype.primaryGoal})`,
    `4. **Falla Fatal (Hamartia):** ${personality.fatalFlaw.name}`,
    `5. **Defecto Menor / Manía:** ${personality.minorQuirk.categoryLabel} — ${personality.minorQuirk.description}`,
    `6. **Virtud:** ${personality.virtue.name}`,
    `7. **Mecanismo de Defensa:** ${personality.defenseMechanism.name} (${personality.defenseMechanism.maturityLabel})`,
    `8. **Actitud Social:** ${personality.socialAttitude.name}`,
    `9. **Secreto y Punto de Ruptura:** ${personality.hiddenSecret.name} | ${personality.breakingPoint.name}`,
    `10. **Sistema Moral:** ${personality.alignment.name} | Pasión: ${personality.bindingPassion.name}`,
    compulsions.length > 0
      ? `    - **Compulsiones Pendragon (>=16):** ${compulsions.map((c) => `${c.leftValue >= 16 ? c.leftLabel : c.rightLabel} (${Math.max(c.leftValue, c.rightValue)}/20)`).join(', ')}`
      : '    - **Compulsiones Pendragon:** Ninguna activa (<16)',
    '',
  ];

  if (powers) {
    lines.push(
      `## Módulo de Poderes y Afinidad Elemental`,
      `- **Afinidad Elemental:** ${powers.elementalAffinity.element} (${powers.elementalAffinity.tacticalCombatRole})`,
      `- **Clasificación Táctica PRT:** ${powers.prtClassification.name} — ${powers.prtClassification.description}`,
      `- **Potencial Biológico:** ${powers.biologicalTier.tierName} — ${powers.biologicalTier.description}`,
      `- **Costo / Penalización:** ${powers.operationalCost.costType} — ${powers.operationalCost.symptomaticManifestation}`,
      ''
    );
  }

  lines.push(
    `## Prompt Turnaround (Inglés)`,
    '```text',
    turnaround.masterPrompt,
    '```',
    '',
    `**Negative Prompt:** \`${turnaround.negativePrompt}\``
  );

  return lines.join('\n');
}
