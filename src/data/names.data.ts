import type { RaceId } from '../types/anatomy';

export interface NameRoot {
  readonly text: string;
  readonly meaning: string;
}

export interface RacialNamePool {
  readonly culturalOrigin: string;
  readonly givenNames: readonly NameRoot[];
  readonly surnamesOrEpithets: readonly NameRoot[];
}

export const RACIAL_NAME_POOLS: Readonly<Record<RaceId, RacialNamePool>> = {
  human: {
    culturalOrigin: 'Linaje Imperial / Tierras Medias',
    givenNames: [
      { text: 'Alden', meaning: 'Viejo amigo / Guardián antiguo' },
      { text: 'Vespera', meaning: 'Estrella del crepúsculo' },
      { text: 'Corvus', meaning: 'Cuervo vigilante' },
      { text: 'Seraphina', meaning: 'La ardiente / Purificadora' },
      { text: 'Gideon', meaning: 'El que derriba murallas' },
      { text: 'Maren', meaning: 'Nacida de la marea' },
      { text: 'Cassian', meaning: 'Portador del yelmo vacío' },
      { text: 'Isolde', meaning: 'Regla de hierro y hielo' },
    ],
    surnamesOrEpithets: [
      { text: 'Vane', meaning: 'Veleta del destino' },
      { text: 'Cenizafría', meaning: 'Sobreviviente de incendio' },
      { text: 'Blackthorn', meaning: 'Espino negro impenetrable' },
      { text: 'de Valmor', meaning: 'Del valle amurallado' },
      { text: 'Vigilante', meaning: 'El que nunca cierra los ojos' },
      { text: 'Kestrel', meaning: 'Cernícalo cazador' },
    ],
  },
  orc: {
    culturalOrigin: 'Clanes de la Estepa Roja',
    givenNames: [
      { text: 'Kragor', meaning: 'Mandíbula de piedra' },
      { text: 'Urzha', meaning: 'Cicatriz que no sangra' },
      { text: 'Thokk', meaning: 'Martillo corto de yunque' },
      { text: 'Ghorza', meaning: 'La que parte el escudo' },
      { text: 'Drakgul', meaning: 'Hueso templado al fuego' },
      { text: 'Shakra', meaning: 'Colmillo partido en duelo' },
    ],
    surnamesOrEpithets: [
      { text: 'Rompehierros', meaning: 'Quien doblega acero a mano limpia' },
      { text: 'Paso-Silente', meaning: 'Cazador sorprendentemente sigiloso' },
      { text: 'Sangregris', meaning: 'De linaje mestizo o ceniciento' },
      { text: 'Puño-de-Basalto', meaning: 'Inamovible en primera línea' },
      { text: 'Tejehuesos', meaning: 'Cirujano o chamán de guerra' },
    ],
  },
  elf: {
    culturalOrigin: 'Casas del Dosel Antiguo',
    givenNames: [
      { text: 'Aelar', meaning: 'Susurro entre hojas altas' },
      { text: 'Sylvaria', meaning: 'Luz filtrada por la espesura' },
      { text: 'Thaelen', meaning: 'Flecha sin viento' },
      { text: 'Elowen', meaning: 'Olmo centenario' },
      { text: 'Caelum', meaning: 'Bóveda celeste distante' },
      { text: 'Nymeria', meaning: 'Raíz sumergida' },
    ],
    surnamesOrEpithets: [
      { text: 'Sombra-de-Haya', meaning: 'Vigilante de fronteras antiguas' },
      { text: 'Espina-Plateada', meaning: 'Defensa elegante y letal' },
      { text: 'Hijo del Eclipse', meaning: 'Marcado por un augurio oscuro' },
      { text: 'Caminanieblas', meaning: 'Errante entre planos húmedos' },
      { text: 'Alba-Eterna', meaning: 'Incorruptible o fanático luminoso' },
    ],
  },
  dwarf: {
    culturalOrigin: 'Gremios de Roca Profunda',
    givenNames: [
      { text: 'Thorin', meaning: 'El que resiste la presión' },
      { text: 'Brynja', meaning: 'Cota de malla forjada' },
      { text: 'Dain', meaning: 'Veta de hierro puro' },
      { text: 'Helga', meaning: 'Consagrada a la piedra' },
      { text: 'Brokkr', meaning: 'Trabajador incansable del fuelle' },
      { text: 'Runa', meaning: 'Secreto tallado en granito' },
    ],
    surnamesOrEpithets: [
      { text: 'Barba-de-Escoria', meaning: 'Maestro de altos hornos' },
      { text: 'Sin-Retorno', meaning: 'Exiliado de su fortaleza natal' },
      { text: 'Punzón-de-Cobre', meaning: 'Relojero y artesano de precisión' },
      { text: 'Carga-Losa', meaning: 'Portador de cargas imposibles' },
      { text: 'Ojo-de-Cuarzo', meaning: 'Evaluador implacable de gemas' },
    ],
  },
  beastfolk_feline: {
    culturalOrigin: 'Cofradías del Matorral y Azoteas',
    givenNames: [
      { text: 'Rhaegar', meaning: 'Salto silencioso al alba' },
      { text: 'Zira', meaning: 'Pupila vertical en penumbra' },
      { text: 'Kajir', meaning: 'Garra retráctil guardada' },
      { text: 'Nalaa', meaning: 'Rastro sobre arena seca' },
      { text: 'Vexis', meaning: 'Siseo de advertencia' },
      { text: 'Sable', meaning: 'Colmillo curvo limpio' },
    ],
    surnamesOrEpithets: [
      { text: 'Pisa-Cristal', meaning: 'Equilibrio absoluto sin dejar huella' },
      { text: 'Cola-Cortada', meaning: 'Superviviente de emboscada' },
      { text: 'Cinco-Sombras', meaning: 'Emboscador nocturno' },
      { text: 'Terciopelo', meaning: 'Suave en trato, letal en garra' },
      { text: 'Cazador-de-Ecos', meaning: 'Rastreador urbano o selvático' },
    ],
  },
  beastfolk_avian: {
    culturalOrigin: 'Nidos de Risco y Corrientes Altas',
    givenNames: [
      { text: 'Aethel', meaning: 'Pluma de corriente térmica' },
      { text: 'Kree', meaning: 'Grito de vigía en acantilado' },
      { text: 'Vireo', meaning: 'Vuelo oblicuo contra el viento' },
      { text: 'Sora', meaning: 'Cielo despejado sin techo' },
      { text: 'Quill', meaning: 'Cálamo afilado para tinta o dardo' },
      { text: 'Zephyra', meaning: 'Brisa occidental cortante' },
    ],
    surnamesOrEpithets: [
      { text: 'Ala-Quebrada', meaning: 'Quien camina cuando otros planean' },
      { text: 'Pico-de-Hierro', meaning: 'Terco y de golpe frontal seco' },
      { text: 'Pluma-Ceniza', meaning: 'Mensajero de zonas devastadas' },
      { text: 'Ojo-de-Cima', meaning: 'Observador a gran distancia' },
      { text: 'Nido-Vacío', meaning: 'Último sobreviviente de su bandada' },
    ],
  },
  beastfolk_reptilian: {
    culturalOrigin: 'Estirpes de Ciénaga y Salar',
    givenNames: [
      { text: 'Sskarr', meaning: 'Escama endurecida al sol' },
      { text: 'Vashj', meaning: 'Corriente inmóvil bajo el junco' },
      { text: 'Zekth', meaning: 'Calor latente en la sangre' },
      { text: 'Kalyx', meaning: 'Muda perfecta de piel' },
      { text: 'Draxil', meaning: 'Diente renovado' },
      { text: 'Ophis', meaning: 'Espiral paciente' },
    ],
    surnamesOrEpithets: [
      { text: 'Sangre-Templada', meaning: 'Sereno y metódico pese a su aspecto' },
      { text: 'Cola-de-Pedernal', meaning: 'Golpe súbito en retirada' },
      { text: 'Sin-Párpados', meaning: 'Mirada fija incapaz de mentir' },
      { text: 'Mano-Firme', meaning: 'Cirujano o alquimista preciso' },
      { text: 'Escama-Vieja', meaning: 'Veterano de múltiples mudas' },
    ],
  },
  beastfolk_ichthyoid: {
    culturalOrigin: 'Fosas Abisales y Estuarios',
    givenNames: [
      { text: 'Nereus', meaning: 'Corriente profunda sin luz' },
      { text: 'Thalassa', meaning: 'Sal antigua del océano' },
      { text: 'Koralis', meaning: 'Arrecife que corta cascos' },
      { text: 'Vaelor', meaning: 'Branquia plateada' },
      { text: 'Ondina', meaning: 'Espuma sobre roca negra' },
      { text: 'Mael', meaning: 'Remolino silencioso' },
    ],
    surnamesOrEpithets: [
      { text: 'Tinta-Negra', meaning: 'Oculta su rastro y sus intenciones' },
      { text: 'Aleta-Rota', meaning: 'Desterrado a tierra firme' },
      { text: 'Pulso-de-Marea', meaning: 'Rítmico, paciente e inevitable' },
      { text: 'Perla-Gris', meaning: 'Guardián de tesoros hundidos' },
      { text: 'Hijo-de-la-Fosa', meaning: 'Adaptado a presiones extremas' },
    ],
  },
};
