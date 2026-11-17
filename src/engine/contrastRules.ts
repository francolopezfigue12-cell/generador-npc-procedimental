import { SUBVERSION_PARADIGMS } from '../data/visuals.data';
import type { WeightedEntry } from '../types/psychology';
import type { SubversionCategory, SubversionParadigm } from '../types/visuals';
import type { SeededRng } from './rng';

/**
 * Calcula un peso positivo para una entrada según afinidad por etiquetas (`tags`)
 * y una lista opcional de IDs preferidos.
 */
export function computeEntryWeight<T extends WeightedEntry>(
  entry: T,
  activeTags: ReadonlySet<string>,
  preferredIds?: readonly string[],
  boostFactor = 3
): number {
  let weight = entry.defaultWeight ?? 1;

  if (preferredIds?.includes(entry.id)) {
    weight *= 6;
  }

  if (entry.tags && entry.tags.length > 0 && activeTags.size > 0) {
    let matches = 0;
    for (const tag of entry.tags) {
      if (activeTags.has(tag)) {
        matches += 1;
      }
    }
    weight += matches * boostFactor;
  }

  return Math.max(0.1, weight);
}

export interface SubversionDecision {
  readonly isSubverted: boolean;
  readonly paradigm: SubversionParadigm | null;
  readonly contrastNotes: string[];
  readonly psychologyTagHints: readonly string[];
  readonly preferredAlignmentIds?: readonly string[];
  readonly preferredVirtueIds?: readonly string[];
  readonly preferredFlawIds?: readonly string[];
  readonly preferredDefenseIds?: readonly string[];
  readonly preferredRaceIds?: readonly string[];
  readonly preferredBiotypeIds?: readonly string[];
  readonly forceAmputationZone?: 'lower_limb' | 'upper_limb';
}

const PARADIGM_RULES: Readonly<
  Record<
    SubversionCategory,
    Omit<SubversionDecision, 'isSubverted' | 'paradigm'>
  >
> = {
  aged_titan: {
    contrastNotes: [
      'Subversión física: apariencia anciana y encorvada que oculta fuerza titánica y reflejos letales.',
    ],
    psychologyTagHints: ['martial', 'disciplined', 'stoic'],
    preferredBiotypeIds: ['ectomorph', 'dwarf_brachymorph'],
    preferredDefenseIds: ['def_sublimation', 'def_suppression'],
    preferredVirtueIds: ['virtue_temperance', 'virtue_fortitude'],
  },
  gentle_colossus: {
    contrastNotes: [
      'Subversión de silueta: coloso imponente cuadrado con fragilidad osteomuscular y temperamento pacifista.',
    ],
    psychologyTagHints: ['compassionate', 'pacifist', 'protective'],
    preferredBiotypeIds: ['giant_columnar', 'endomorph'],
    preferredAlignmentIds: ['align_ng', 'align_lg'],
    preferredVirtueIds: ['virtue_lucidity', 'virtue_magnanimity'],
  },
  pastel_assassin: {
    contrastNotes: [
      'Subversión cromática y de forma: silueta amable redondeada y tonos luminosos que ocultan sadismo quirúrgico.',
    ],
    psychologyTagHints: ['assassin', 'cold', 'sadistic'],
    preferredBiotypeIds: ['endomorph', 'dwarf_brachymorph', 'ectomorph'],
    preferredAlignmentIds: ['align_ne', 'align_le', 'align_ce'],
    preferredDefenseIds: ['def_isolation_of_affect', 'def_rationalization'],
  },
  acrobatic_amputee: {
    contrastNotes: [
      'Subversión biomecánica: amputación de miembro inferior compensada con movilidad acrobática y orgullo indomable.',
    ],
    psychologyTagHints: ['martial', 'proud', 'agile'],
    preferredBiotypeIds: ['ectomorph', 'mesomorph'],
    preferredVirtueIds: ['virtue_fortitude'],
    preferredFlawIds: ['flaw_hubris'],
    forceAmputationZone: 'lower_limb',
  },
  corrupt_seraph: {
    contrastNotes: [
      'Subversión moral: estética radiante angelical en blanco puro que enmascara sociopatía y megalomanía.',
    ],
    psychologyTagHints: ['fanatic', 'evil', 'tyrant', 'hubris'],
    preferredAlignmentIds: ['align_le', 'align_ne'],
    preferredFlawIds: ['flaw_hubris', 'flaw_fanaticism'],
    preferredDefenseIds: ['def_reaction_formation', 'def_rationalization'],
  },
  compassionate_monster: {
    contrastNotes: [
      'Subversión de especie: morfología monstruosa con colmillos o escamas dedicada a la cirugía compasiva y la sanación.',
    ],
    psychologyTagHints: ['compassionate', 'altruistic', 'scholar'],
    preferredRaceIds: ['orc', 'beastfolk_reptilian', 'beastfolk_ichthyoid'],
    preferredAlignmentIds: ['align_ng', 'align_lg'],
    preferredVirtueIds: ['virtue_magnanimity', 'virtue_lucidity'],
  },
};

/**
 * Decide si se aplica una subversión cognitiva explícita y retorna las guías
 * de peso y contraste asociadas.
 */
export function resolveSubversionDecision(
  rng: SeededRng,
  options: {
    forceSubversion?: boolean;
    subversionProbability?: number;
    lockedSubversion?: { isSubverted: boolean; paradigm: SubversionParadigm | null } | null;
  }
): SubversionDecision {
  if (options.lockedSubversion) {
    if (!options.lockedSubversion.isSubverted || !options.lockedSubversion.paradigm) {
      return {
        isSubverted: false,
        paradigm: null,
        contrastNotes: [],
        psychologyTagHints: [],
      };
    }
    const rules = PARADIGM_RULES[options.lockedSubversion.paradigm.id];
    return {
      isSubverted: true,
      paradigm: options.lockedSubversion.paradigm,
      ...rules,
      contrastNotes: [...rules.contrastNotes],
    };
  }

  const probability = options.subversionProbability ?? 0.35;
  const shouldSubvert = options.forceSubversion || rng.chance(probability);

  if (!shouldSubvert) {
    return {
      isSubverted: false,
      paradigm: null,
      contrastNotes: [],
      psychologyTagHints: [],
    };
  }

  const paradigm = rng.pick(SUBVERSION_PARADIGMS);
  const rules = PARADIGM_RULES[paradigm.id];

  return {
    isSubverted: true,
    paradigm,
    ...rules,
    contrastNotes: [...rules.contrastNotes],
  };
}

/**
 * Detecta micro-contrastes orgánicos surgidos de la combinación aleatoria
 * incluso cuando no hay un paradigma forzado.
 */
export function evaluateOrganicContrasts(input: {
  raceId: string;
  biotypeId: string;
  shapeId: string;
  alignmentId: string;
  virtueId: string;
  flawId: string;
  hasAmputation: boolean;
  clothingId: string;
}): string[] {
  const notes: string[] = [];

  if (input.shapeId === 'circle' && ['align_le', 'align_ne', 'align_ce'].includes(input.alignmentId)) {
    notes.push('Contraste visual-moral: silueta suave/amigable combinada con alineamiento malvado.');
  }
  if (input.shapeId === 'triangle' && ['align_lg', 'align_ng'].includes(input.alignmentId)) {
    notes.push('Contraste visual-moral: rasgos angulosos predatorios en un personaje moralmente benevolente.');
  }
  if (input.biotypeId === 'giant_columnar' && input.virtueId === 'virtue_lucidity') {
    notes.push('Contraste alométrico: físico titánico columnar acompañado de lucidez conciliadora y pacifista.');
  }
  if (input.hasAmputation && input.clothingId === 'cloth_tactical_mercenary') {
    notes.push('Contraste operativo: extremidad amputada adaptada activamente a combate táctico.');
  }
  if (input.raceId === 'orc' && input.flawId === 'flaw_fanaticism') {
    notes.push('Tensión cultural: fisiología orca disciplinada bajo un código doctrinal rígido.');
  }

  return notes;
}
