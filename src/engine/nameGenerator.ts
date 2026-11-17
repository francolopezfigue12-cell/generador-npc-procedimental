import { RACIAL_NAME_POOLS } from '../data/names.data';
import type { RaceId } from '../types/anatomy';
import type { CharacterName } from '../types/character';
import type { SeededRng } from './rng';

/**
 * Genera un nombre compuesto (nombre propio + apellido/epíteto) coherente
 * con el linaje racial y combina ambos significados literales.
 */
export function generateCharacterName(rng: SeededRng, raceId: RaceId): CharacterName {
  const pool = RACIAL_NAME_POOLS[raceId] ?? RACIAL_NAME_POOLS.human;
  const given = rng.pick(pool.givenNames);
  const surname = rng.pick(pool.surnamesOrEpithets);

  return {
    fullName: `${given.text} ${surname.text}`,
    givenName: given.text,
    surnameOrEpithet: surname.text,
    meaning: `"${given.meaning}" — ${surname.meaning}.`,
    culturalOrigin: pool.culturalOrigin,
  };
}
