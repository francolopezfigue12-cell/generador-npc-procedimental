import { describe, expect, it } from 'vitest';
import {
  MANDATORY_TURNAROUND_DIRECTIVE,
  buildTurnaroundPrompt,
} from '../prompts/turnaroundPromptBuilder';
import type { LockState } from '../types/character';
import { exportNpcToMarkdown } from './exporters';
import { generateNpc } from './generateNpc';

describe('Motor de generación procedimental de NPCs (Fases 1, 2 y 4)', () => {
  it('es determinista cuando se proporciona la misma semilla (seed)', () => {
    const npcA = generateNpc({
      seed: 'TEST-SEED-42',
      powersConfig: { enabled: true },
      subversionProbability: 0.5,
    });
    const npcB = generateNpc({
      seed: 'TEST-SEED-42',
      powersConfig: { enabled: true },
      subversionProbability: 0.5,
    });

    expect(npcA.name).toEqual(npcB.name);
    expect(npcA.appearance.race.id).toBe(npcB.appearance.race.id);
    expect(npcA.appearance.colorPalette).toEqual(npcB.appearance.colorPalette);
    expect(npcA.personality.archetype.id).toBe(npcB.personality.archetype.id);
    expect(npcA.powers?.elementalAffinity.id).toBe(npcB.powers?.elementalAffinity.id);
  });

  it('respeta la activación y desactivación del módulo opcional de poderes', () => {
    const sinPoderes = generateNpc({
      seed: 'NO-POWERS-1',
      powersConfig: { enabled: false },
    });
    expect(sinPoderes.powers).toBeNull();

    const conPoderes = generateNpc({
      seed: 'WITH-POWERS-1',
      powersConfig: { enabled: true },
    });
    expect(conPoderes.powers).not.toBeNull();
    expect(conPoderes.powers?.elementalAffinity).toBeDefined();
    expect(conPoderes.powers?.prtClassification).toBeDefined();
    expect(conPoderes.powers?.biologicalTier).toBeDefined();
    expect(conPoderes.powers?.operationalCost).toBeDefined();
  });

  it('conserva exactamente los atributos bloqueados (Locks) al regenerar los desbloqueados', () => {
    const base = generateNpc({
      seed: 'LOCK-BASE-01',
      powersConfig: { enabled: true },
      forceSubversion: true,
    });

    const locks: LockState = {
      name: true,
      race: true,
      clothingStyle: true,
      fatalFlaw: true,
      elementalAffinity: true,
    };

    const regenerated = generateNpc({
      seed: 'LOCK-REGEN-99',
      powersConfig: { enabled: true },
      locks,
      previousProfile: base,
    });

    expect(regenerated.name).toEqual(base.name);
    expect(regenerated.appearance.race.id).toBe(base.appearance.race.id);
    expect(regenerated.appearance.clothingStyle.id).toBe(base.appearance.clothingStyle.id);
    expect(regenerated.personality.fatalFlaw.id).toBe(base.personality.fatalFlaw.id);
    expect(regenerated.powers?.elementalAffinity.id).toBe(
      base.powers?.elementalAffinity.id
    );
  });

  it('mantiene los 13 rasgos diádicos de Pendragon sumando 20 y activando compulsión cuando >= 16', () => {
    const npc = generateNpc({
      seed: 'PENDRAGON-CHECK',
      powersConfig: { enabled: false },
    });

    expect(npc.personality.dyadicTraits).toHaveLength(13);
    for (const trait of npc.personality.dyadicTraits) {
      expect(trait.leftValue + trait.rightValue).toBe(20);
      expect(trait.compulsionTriggered).toBe(
        trait.leftValue >= 16 || trait.rightValue >= 16
      );
    }
  });

  it('fuerza paradigmas de subversión y mantiene consistencia de amputación cuando corresponde', () => {
    const subverted = generateNpc({
      seed: 'SUBVERT-FORCE-77',
      powersConfig: { enabled: false },
      forceSubversion: true,
    });

    expect(subverted.subversion.isSubverted).toBe(true);
    expect(subverted.subversion.paradigm).not.toBeNull();
    expect(subverted.subversion.appliedContrastRules.length).toBeGreaterThan(0);

    if (subverted.subversion.paradigm?.id === 'aged_titan') {
      expect(subverted.appearance.ageGroup.id).toBe('elderly');
    } else if (subverted.subversion.paradigm?.id === 'corrupt_seraph') {
      expect(subverted.appearance.colorPalette.dominant.id).toBe('color_snow_white');
    } else if (subverted.subversion.paradigm?.id === 'pastel_assassin') {
      expect(subverted.appearance.shapeLanguage.id).toBe('circle');
    }
  });

  it('construye un prompt turnaround conciso en inglés para FLUX sin inyectar negative constraints', () => {
    const npc = generateNpc({
      seed: 'PROMPT-SHEET-88',
      powersConfig: { enabled: true },
      forceSubversion: true,
    });

    const turnaround = buildTurnaroundPrompt(npc);

    expect(turnaround.masterPrompt).toContain(MANDATORY_TURNAROUND_DIRECTIVE);
    expect(turnaround.masterPrompt).not.toContain('Negative constraints:');
    expect(turnaround.masterPrompt.split(/\s+/).length).toBeLessThanOrEqual(180);
    expect(turnaround.sections.powersAndAura).not.toBeNull();
  });

  it('incluye edad y género bloqueables en apariencia', () => {
    const base = generateNpc({
      seed: 'AGE-GEN-1',
      powersConfig: { enabled: false },
    });
    const regen = generateNpc({
      seed: 'AGE-GEN-2',
      powersConfig: { enabled: false },
      locks: { ageGroup: true, gender: true },
      previousProfile: base,
    });
    expect(regen.appearance.ageGroup.id).toBe(base.appearance.ageGroup.id);
    expect(regen.appearance.gender.id).toBe(base.appearance.gender.id);
  });

  it('mantiene integridad anatómica cuando una prótesis está bloqueada y la amputación se regenera', () => {
    // Buscamos una semilla base que tenga prótesis o la validamos tras regenerar
    let baseWithProsthetic = generateNpc({
      seed: 'PROSTH-01',
      powersConfig: { enabled: false },
      forceSubversion: true,
    });
    for (let i = 2; i < 40 && !baseWithProsthetic.appearance.prosthetic; i += 1) {
      baseWithProsthetic = generateNpc({
        seed: `PROSTH-${i}`,
        powersConfig: { enabled: false },
        forceSubversion: true,
      });
    }

    expect(baseWithProsthetic.appearance.prosthetic).not.toBeNull();

    const regenerated = generateNpc({
      seed: 'PROSTH-REGEN-999',
      powersConfig: { enabled: false },
      locks: { prosthetic: true },
      previousProfile: baseWithProsthetic,
    });

    expect(regenerated.appearance.prosthetic?.id).toBe(
      baseWithProsthetic.appearance.prosthetic?.id
    );
    expect(regenerated.appearance.amputation).not.toBeNull();
    expect(
      regenerated.appearance.prosthetic?.compatibleZones.includes(
        regenerated.appearance.amputation!.zone
      )
    ).toBe(true);
  });

  it('exporta correctamente el perfil completo y el prompt turnaround a Markdown', () => {
    const npc = generateNpc({
      seed: 'MD-EXPORT-1',
      powersConfig: { enabled: true },
    });
    const turnaround = buildTurnaroundPrompt(npc);
    const md = exportNpcToMarkdown(npc, turnaround);

    expect(md).toContain(`# ${npc.name.fullName}`);
    expect(md).toContain(MANDATORY_TURNAROUND_DIRECTIVE);
    expect(md).toContain('## Módulo de Poderes y Afinidad Elemental');
  });
});
