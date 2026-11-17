/**
 * Motor PRNG determinista (Mulberry32 + hash FNV-1a) para que cada personaje
 * tenga una semilla reproducible y las selecciones ponderadas sean auditables.
 */

export interface SeededRng {
  readonly seed: string;
  /** Número pseudoaleatorio en [0, 1). */
  next: () => number;
  /** Entero en [min, max] inclusive. */
  int: (min: number, max: number) => number;
  /** Flotante en [min, max] con precisión decimal opcional. */
  float: (min: number, max: number, decimals?: number) => number;
  /** Booleano con probabilidad p en [0, 1]. */
  chance: (probability: number) => boolean;
  /** Selección uniforme de un arreglo no vacío. */
  pick: <T>(items: readonly T[]) => T;
  /** Selección ponderada usando pesos positivos calculados dinámicamente. */
  weightedPick: <T>(items: readonly T[], getWeight: (item: T) => number) => T;
}

function hashSeed(seed: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function generateRandomSeed(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let partA = '';
  let partB = '';
  for (let i = 0; i < 4; i += 1) {
    partA += chars[Math.floor(Math.random() * chars.length)];
    partB += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${partA}-${partB}`;
}

export function createSeededRng(seedInput?: string): SeededRng {
  const seed = seedInput && seedInput.trim().length > 0 ? seedInput.trim() : generateRandomSeed();
  let state = hashSeed(seed) || 0x6d2b79f5;

  const next = (): number => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const int = (min: number, max: number): number => {
    const low = Math.ceil(Math.min(min, max));
    const high = Math.floor(Math.max(min, max));
    return Math.floor(next() * (high - low + 1)) + low;
  };

  const float = (min: number, max: number, decimals = 2): number => {
    const val = min + next() * (max - min);
    const factor = 10 ** decimals;
    return Math.round(val * factor) / factor;
  };

  const chance = (probability: number): boolean => next() < probability;

  const pick = <T>(items: readonly T[]): T => {
    if (items.length === 0) {
      throw new Error('Cannot pick from an empty array.');
    }
    return items[Math.floor(next() * items.length)];
  };

  const weightedPick = <T>(items: readonly T[], getWeight: (item: T) => number): T => {
    if (items.length === 0) {
      throw new Error('Cannot weightedPick from an empty array.');
    }
    const weights = items.map((item) => Math.max(0, getWeight(item)));
    const total = weights.reduce((acc, w) => acc + w, 0);
    if (total <= 0) {
      return pick(items);
    }
    let roll = next() * total;
    for (let i = 0; i < items.length; i += 1) {
      roll -= weights[i];
      if (roll <= 0) {
        return items[i];
      }
    }
    return items[items.length - 1];
  };

  return { seed, next, int, float, chance, pick, weightedPick };
}
