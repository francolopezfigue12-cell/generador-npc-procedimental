import { describe, expect, it } from 'vitest';
import { generateNpc } from './generateNpc';
import { buildCharacterNarrative } from './narrativeBuilder';

describe('Constructor de Historia de Corrido', () => {
  it('genera 3 párrafos sin poderes y 4 párrafos cuando el módulo de poderes está activo', () => {
    const npcSinPoderes = generateNpc({
      seed: 'STORY-1',
      powersConfig: { enabled: false },
    });
    const storySin = buildCharacterNarrative(npcSinPoderes);
    expect(storySin.paragraphs).toHaveLength(3);
    expect(storySin.fullText).toContain(npcSinPoderes.name.fullName);

    const npcConPoderes = generateNpc({
      seed: 'STORY-2',
      powersConfig: { enabled: true },
    });
    const storyCon = buildCharacterNarrative(npcConPoderes);
    expect(storyCon.paragraphs).toHaveLength(4);
    expect(storyCon.fullText).toContain(npcConPoderes.powers!.elementalAffinity.element);
  });
});
