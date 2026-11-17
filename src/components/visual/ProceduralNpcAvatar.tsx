import type { NpcProfile } from '../../types/character';

interface ProceduralNpcAvatarProps {
  readonly npc: NpcProfile;
  readonly className?: string;
}

function resolveHairHex(hairColorId: string): string {
  switch (hairColorId) {
    case 'hcolor_marie_antoinette':
      return '#E2E8F0';
    case 'hcolor_raven_blue':
      return '#172033';
    case 'hcolor_copper_rust':
      return '#B45309';
    case 'hcolor_poliosis_streak':
      return '#18181B';
    case 'hcolor_total_albinism':
      return '#F8FAFC';
    case 'hcolor_chemical_moss':
      return '#4D7C0F';
    default:
      return '#334155';
  }
}

function resolveElementGlow(elementId?: string): string {
  switch (elementId) {
    case 'fire':
      return '#EF4444';
    case 'water':
      return '#38BDF8';
    case 'earth':
      return '#22C55E';
    case 'air':
      return '#E2E8F0';
    case 'lightning_metal':
      return '#F59E0B';
    case 'void_shadow':
      return '#A855F7';
    default:
      return '#64748B';
  }
}

export function ProceduralNpcAvatar({
  npc,
  className = '',
}: ProceduralNpcAvatarProps) {
  const { appearance, powers, subversion } = npc;
  const domHex = appearance.colorPalette.dominant.previewHex;
  const secHex = appearance.colorPalette.secondary.previewHex;
  const accHex = appearance.colorPalette.accent.previewHex;
  const skinHex = appearance.skinTone.previewHex;
  const hairHex = resolveHairHex(appearance.hairColor.id);
  const auraHex = resolveElementGlow(powers?.elementalAffinity.id);

  const shapeId = appearance.shapeLanguage.id;
  const raceId = appearance.race.id;
  const hairCutId = appearance.hairCut.id;
  const clothingId = appearance.clothingStyle.id;
  const eyeAnomId = appearance.eyeAnomaly?.id;
  const eyewearId = appearance.eyewear?.id;
  const patchMaskId = appearance.patchOrMask?.id;
  const tattooId = appearance.tattooOrMark?.id;

  const isWideBuild =
    appearance.biotype.id === 'giant_columnar' ||
    appearance.biotype.id === 'endomorph' ||
    shapeId === 'square';
  const shoulderHalfWidth = isWideBuild ? 88 : shapeId === 'triangle' ? 78 : 70;

  const hasUpperLimbLoss = appearance.amputation?.zone === 'upper_limb';
  const hasProstheticArm = hasUpperLimbLoss && Boolean(appearance.prosthetic);
  const prostheticHex =
    appearance.prosthetic?.tier === 'clockwork'
      ? '#D97706'
      : appearance.prosthetic?.tier === 'biological_alchemical'
        ? '#7C2D12'
        : appearance.prosthetic?.tier === 'cybernetic_scifi'
          ? '#94A3B8'
          : '#78350F';

  // Forma de cabeza según Shape Language
  const headRx = shapeId === 'circle' ? 43 : shapeId === 'square' ? 39 : 36;
  const headRy = shapeId === 'circle' ? 45 : 49;

  return (
    <svg
      viewBox="0 0 320 360"
      role="img"
      aria-label={`Representación visual procedimental de ${npc.name.fullName}`}
      className={`select-none ${className}`}
    >
      <defs>
        <radialGradient id={`bg-${npc.id}`} cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor={auraHex} stopOpacity={powers ? '0.28' : '0.16'} />
          <stop offset="65%" stopColor="#0F172A" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#020617" stopOpacity="1" />
        </radialGradient>
      </defs>

      {/* Fondo de estudio */}
      <rect width="320" height="360" rx="16" fill={`url(#bg-${npc.id})`} />

      {/* Geometría de fondo del Shape Language */}
      <g opacity="0.16" stroke={accHex} strokeWidth="2" fill="none">
        {shapeId === 'circle' && <circle cx="160" cy="155" r="108" />}
        {shapeId === 'square' && <rect x="54" y="48" width="212" height="212" rx="10" />}
        {shapeId === 'triangle' && <polygon points="160,34 276,256 44,256" />}
      </g>

      {/* Aura elemental opcional */}
      {powers && (
        <g opacity="0.35" stroke={auraHex} strokeWidth="1.5" fill="none">
          <circle cx="160" cy="148" r="90" strokeDasharray="6 6" />
          <circle cx="160" cy="148" r="118" strokeDasharray="2 8" />
        </g>
      )}

      {/* Capucha de Nómada / Monje detrás de cabeza */}
      {(clothingId === 'cloth_wasteland_nomad' || clothingId === 'cloth_mendicant_monk') && (
        <path
          d="M 94 225 C 88 125, 112 72, 160 72 C 208 72, 232 125, 226 225 Z"
          fill={domHex}
          stroke="#020617"
          strokeWidth="3"
        />
      )}

      {/* Torso y Hombros (60% color dominante) */}
      <g>
        {shapeId === 'square' ? (
          <path
            d={`M ${160 - shoulderHalfWidth} 360 L ${160 - shoulderHalfWidth + 6} 230 L 130 205 L 190 205 L ${160 + shoulderHalfWidth - 6} 230 L ${160 + shoulderHalfWidth} 360 Z`}
            fill={domHex}
            stroke="#020617"
            strokeWidth="3"
          />
        ) : shapeId === 'triangle' ? (
          <path
            d={`M ${160 - shoulderHalfWidth + 16} 360 L ${160 - shoulderHalfWidth - 10} 224 L 134 205 L 186 205 L ${160 + shoulderHalfWidth + 10} 224 L ${160 + shoulderHalfWidth - 16} 360 Z`}
            fill={domHex}
            stroke="#020617"
            strokeWidth="3"
          />
        ) : (
          <path
            d={`M ${160 - shoulderHalfWidth} 360 C ${160 - shoulderHalfWidth} 245, ${160 - shoulderHalfWidth + 10} 214, 134 206 L 186 206 C ${160 + shoulderHalfWidth - 10} 214, ${160 + shoulderHalfWidth} 245, ${160 + shoulderHalfWidth} 360 Z`}
            fill={domHex}
            stroke="#020617"
            strokeWidth="3"
          />
        )}

        {/* Brazo derecho amputado o con prótesis */}
        {hasUpperLimbLoss && !hasProstheticArm && (
          <rect
            x={160 + shoulderHalfWidth - 26}
            y="246"
            width="28"
            height="114"
            rx="8"
            fill="#020617"
            opacity="0.7"
          />
        )}
        {hasProstheticArm && (
          <g>
            <rect
              x={160 + shoulderHalfWidth - 24}
              y="236"
              width="24"
              height="124"
              rx="6"
              fill={prostheticHex}
              stroke="#020617"
              strokeWidth="2.5"
            />
            <line
              x1={160 + shoulderHalfWidth - 24}
              y1="278"
              x2={160 + shoulderHalfWidth}
              y2="278"
              stroke="#020617"
              strokeWidth="2"
            />
            <circle cx={160 + shoulderHalfWidth - 12} cy="256" r="5" fill={accHex} />
          </g>
        )}

        {/* Capa intermedia / correas (30% color secundario) */}
        {clothingId === 'cloth_tactical_mercenary' && (
          <g>
            <path d="M 106 218 L 210 360 L 186 360 L 90 232 Z" fill={secHex} opacity="0.95" />
            <path d="M 218 214 L 252 232 L 236 266 L 200 248 Z" fill={secHex} stroke="#020617" strokeWidth="2.5" />
          </g>
        )}
        {clothingId === 'cloth_declining_imperial' && (
          <g>
            <polygon points="128,205 160,256 192,205 180,205 160,234 140,205" fill={secHex} />
            <rect x="76" y="218" width="26" height="10" rx="4" fill={accHex} />
            <rect x="218" y="218" width="26" height="10" rx="4" fill={accHex} />
            <circle cx="152" cy="278" r="4" fill={accHex} />
            <circle cx="152" cy="304" r="4" fill={accHex} />
            <circle cx="152" cy="330" r="4" fill={accHex} />
          </g>
        )}
        {clothingId === 'cloth_decadent_nobility' && (
          <g>
            <path d="M 116 210 Q 160 244 204 210 L 194 232 Q 160 256 126 232 Z" fill="#F8FAFC" stroke={secHex} strokeWidth="3" />
            <polygon points="160,236 144,360 176,360" fill={secHex} />
          </g>
        )}
        {clothingId === 'cloth_wasteland_nomad' && (
          <path d="M 106 214 Q 160 264 214 214 L 222 252 Q 160 292 98 252 Z" fill={secHex} stroke="#020617" strokeWidth="2" />
        )}
        {clothingId === 'cloth_mendicant_monk' && (
          <path d="M 124 206 L 160 268 L 196 206 L 182 206 L 160 242 L 138 206 Z" fill={secHex} />
        )}

        {/* Detalle focal 10% (broche o gema) */}
        <polygon points="160,238 168,250 160,262 152,250" fill={accHex} stroke="#020617" strokeWidth="1.5" />
      </g>

      {/* Cuello */}
      <rect x="142" y="176" width="36" height="38" rx="10" fill={skinHex} stroke="#020617" strokeWidth="2.5" />

      {/* Rasgos raciales laterales (orejas, aletas, plumas) */}
      <g>
        {raceId === 'elf' && (
          <>
            <polygon points="120,136 84,116 116,154" fill={skinHex} stroke="#020617" strokeWidth="2.5" />
            <polygon points="200,136 236,116 204,154" fill={skinHex} stroke="#020617" strokeWidth="2.5" />
          </>
        )}
        {raceId === 'beastfolk_feline' && (
          <>
            <polygon points="126,110 112,64 148,96" fill={skinHex} stroke="#020617" strokeWidth="2.5" />
            <polygon points="194,110 208,64 172,96" fill={skinHex} stroke="#020617" strokeWidth="2.5" />
          </>
        )}
        {raceId === 'beastfolk_ichthyoid' && (
          <>
            <path d="M 118 128 Q 84 122 92 160 Q 108 156 120 150 Z" fill={accHex} stroke="#020617" strokeWidth="2" />
            <path d="M 202 128 Q 236 122 228 160 Q 212 156 200 150 Z" fill={accHex} stroke="#020617" strokeWidth="2" />
          </>
        )}
        {raceId === 'beastfolk_avian' && (
          <>
            <polygon points="148,88 160,52 172,88" fill={accHex} stroke="#020617" strokeWidth="2" />
          </>
        )}
        {(raceId === 'human' || raceId === 'dwarf' || raceId === 'orc') && (
          <>
            <ellipse cx="118" cy="144" rx="7" ry="12" fill={skinHex} stroke="#020617" strokeWidth="2" />
            <ellipse cx="202" cy="144" rx="7" ry="12" fill={skinHex} stroke="#020617" strokeWidth="2" />
          </>
        )}
      </g>

      {/* Cabeza */}
      {shapeId === 'square' ? (
        <rect
          x={160 - headRx}
          y="92"
          width={headRx * 2}
          height={headRy * 2}
          rx="14"
          fill={skinHex}
          stroke="#020617"
          strokeWidth="3"
        />
      ) : shapeId === 'triangle' ? (
        <path
          d={`M 160 90 C 194 90, 204 118, 198 148 L 176 184 Q 160 194 144 184 L 122 148 C 116 118, 126 90, 160 90 Z`}
          fill={skinHex}
          stroke="#020617"
          strokeWidth="3"
        />
      ) : (
        <ellipse
          cx="160"
          cy="141"
          rx={headRx}
          ry={headRy}
          fill={skinHex}
          stroke="#020617"
          strokeWidth="3"
        />
      )}

      {/* Tatuajes / marcas en rostro o cuello */}
      {tattooId && (
        <g stroke={tattooId === 'tat_arcane_runes' ? '#38BDF8' : '#0F172A'} strokeWidth="2" fill="none" opacity="0.85">
          <path d="M 132 152 L 138 164 L 132 172" />
          <path d="M 188 152 L 182 164 L 188 172" />
          <circle cx="160" cy="112" r="4" />
        </g>
      )}

      {/* Cabello */}
      <g>
        {hairCutId === 'hair_shaved_scarred' && (
          <g stroke="#991B1B" strokeWidth="2" opacity="0.75">
            <line x1="142" y1="100" x2="156" y2="112" />
            <line x1="176" y1="98" x2="170" y2="114" />
          </g>
        )}
        {hairCutId === 'hair_wild_bone_braids' && (
          <g>
            <path d="M 114 148 Q 108 82 160 78 Q 212 82 206 148 Q 192 104 160 106 Q 128 104 114 148 Z" fill={hairHex} stroke="#020617" strokeWidth="2.5" />
            <rect x="110" y="150" width="12" height="44" rx="5" fill={hairHex} stroke="#020617" strokeWidth="2" />
            <rect x="198" y="150" width="12" height="44" rx="5" fill={hairHex} stroke="#020617" strokeWidth="2" />
            <circle cx="116" cy="176" r="4" fill="#FDE68A" />
            <circle cx="204" cy="176" r="4" fill="#FDE68A" />
          </g>
        )}
        {hairCutId === 'hair_samurai_topknot' && (
          <g>
            <ellipse cx="160" cy="76" rx="16" ry="18" fill={hairHex} stroke="#020617" strokeWidth="2.5" />
            <path d="M 134 108 Q 160 88 186 108 Q 160 98 134 108 Z" fill={hairHex} />
          </g>
        )}
        {hairCutId === 'hair_clay_mohawk' && (
          <polygon
            points="146,108 152,50 160,64 168,46 174,108"
            fill={hairHex}
            stroke="#020617"
            strokeWidth="2.5"
          />
        )}
        {hairCutId === 'hair_spiral_cornrows' && (
          <g fill={hairHex} stroke="#020617" strokeWidth="1.5">
            <path d="M 124 122 Q 128 88 160 88 Q 192 88 196 122 Q 178 106 160 106 Q 142 106 124 122 Z" />
            <line x1="142" y1="92" x2="142" y2="110" />
            <line x1="160" y1="89" x2="160" y2="108" />
            <line x1="178" y1="92" x2="178" y2="110" />
          </g>
        )}
        {/* Mechón blanco frontal si es poliosis */}
        {appearance.hairColor.id === 'hcolor_poliosis_streak' && hairCutId !== 'hair_shaved_scarred' && (
          <path d="M 154 88 L 166 88 L 162 114 L 154 110 Z" fill="#F8FAFC" />
        )}
      </g>

      {/* Ojos y Anomalías Oculares */}
      <g>
        {/* Esclerótica */}
        <ellipse
          cx="142"
          cy="138"
          rx="9"
          ry="5.5"
          fill={eyeAnomId === 'eyeanom_stained_sclera' ? '#09090B' : '#F8FAFC'}
          stroke="#020617"
          strokeWidth="1.5"
        />
        <ellipse
          cx="178"
          cy="138"
          rx="9"
          ry="5.5"
          fill={eyeAnomId === 'eyeanom_stained_sclera' ? '#09090B' : '#F8FAFC'}
          stroke="#020617"
          strokeWidth="1.5"
        />
        {/* Iris */}
        <circle
          cx="142"
          cy="138"
          r="4"
          fill={
            eyeAnomId === 'eyeanom_complete_heterochromia'
              ? '#38BDF8'
              : eyeAnomId === 'eyeanom_stained_sclera'
                ? '#FACC15'
                : accHex
          }
        />
        <circle
          cx="178"
          cy="138"
          r="4"
          fill={
            eyeAnomId === 'eyeanom_complete_heterochromia'
              ? '#92400E'
              : eyeAnomId === 'eyeanom_sectoral_heterochromia'
                ? '#4ADE80'
                : eyeAnomId === 'eyeanom_stained_sclera'
                  ? '#FACC15'
                  : accHex
          }
        />
        {/* Arco senil o heterocromía sectorial */}
        {eyeAnomId === 'eyeanom_arcus_senilis' && (
          <>
            <circle cx="142" cy="138" r="4.5" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
            <circle cx="178" cy="138" r="4.5" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
          </>
        )}
        <circle cx="142" cy="138" r="1.8" fill="#020617" />
        <circle cx="178" cy="138" r="1.8" fill="#020617" />
      </g>

      {/* Boca, pico aviar, colmillos de orco o barba de enano */}
      {raceId === 'beastfolk_avian' ? (
        <polygon points="152,150 168,150 160,168" fill="#F59E0B" stroke="#020617" strokeWidth="2" />
      ) : (
        <g>
          <path d="M 148 164 Q 160 168 172 164" stroke="#020617" strokeWidth="2.5" fill="none" />
          {raceId === 'orc' && (
            <>
              <polygon points="146,165 151,155 154,165" fill="#FEF3C7" stroke="#020617" strokeWidth="1" />
              <polygon points="166,165 169,155 174,165" fill="#FEF3C7" stroke="#020617" strokeWidth="1" />
            </>
          )}
          {raceId === 'dwarf' && (
            <path
              d="M 126 158 Q 160 174 194 158 L 184 214 L 160 226 L 136 214 Z"
              fill={hairHex}
              stroke="#020617"
              strokeWidth="2.5"
            />
          )}
        </g>
      )}

      {/* Lentes y Gafas */}
      {eyewearId && (
        <g>
          {eyewearId === 'eye_academic_round' && (
            <g stroke="#CBD5E1" strokeWidth="2" fill="rgba(148,163,184,0.18)">
              <circle cx="142" cy="138" r="12" />
              <circle cx="178" cy="138" r="12" />
              <line x1="154" y1="138" x2="166" y2="138" />
            </g>
          )}
          {eyewearId === 'eye_pince_nez' && (
            <g stroke="#FBBF24" strokeWidth="2" fill="rgba(255,255,255,0.12)">
              <ellipse cx="143" cy="138" rx="11" ry="8" />
              <ellipse cx="177" cy="138" rx="11" ry="8" />
              <path d="M 188 138 Q 204 166 196 206" fill="none" strokeDasharray="3 2" />
            </g>
          )}
          {eyewearId === 'eye_steampunk_goggles' && (
            <g>
              <circle cx="142" cy="138" r="14" fill="rgba(34,197,94,0.35)" stroke="#78350F" strokeWidth="4" />
              <circle cx="178" cy="138" r="14" fill="rgba(34,197,94,0.35)" stroke="#78350F" strokeWidth="4" />
              <line x1="156" y1="138" x2="164" y2="138" stroke="#D97706" strokeWidth="3" />
            </g>
          )}
          {eyewearId === 'eye_tactical_monocle' && (
            <g>
              <circle cx="178" cy="138" r="12" fill="rgba(56,189,248,0.2)" stroke="#E2E8F0" strokeWidth="2.5" />
              <line x1="178" y1="130" x2="178" y2="146" stroke="#38BDF8" strokeWidth="1" />
              <line x1="170" y1="138" x2="186" y2="138" stroke="#38BDF8" strokeWidth="1" />
            </g>
          )}
          {eyewearId === 'eye_blind_smoked' && (
            <g stroke="#451A03" strokeWidth="2.5" fill="#09090B">
              <rect x="128" y="130" width="28" height="16" rx="5" />
              <rect x="164" y="130" width="28" height="16" rx="5" />
              <line x1="156" y1="138" x2="164" y2="138" />
            </g>
          )}
        </g>
      )}

      {/* Parches y Máscaras */}
      {patchMaskId && (
        <g>
          {patchMaskId === 'mask_leather_eyepatch' && (
            <g>
              <line x1="122" y1="124" x2="198" y2="152" stroke="#451A03" strokeWidth="3" />
              <path d="M 130 130 L 154 130 L 150 148 L 134 148 Z" fill="#78350F" stroke="#020617" strokeWidth="2" />
            </g>
          )}
          {patchMaskId === 'mask_armored_eyepatch' && (
            <g>
              <rect x="128" y="126" width="28" height="22" rx="4" fill="#64748B" stroke="#020617" strokeWidth="2" />
              <circle cx="133" cy="131" r="1.5" fill="#E2E8F0" />
              <circle cx="151" cy="143" r="1.5" fill="#E2E8F0" />
            </g>
          )}
          {patchMaskId === 'mask_porcelain_half' && (
            <path
              d="M 160 94 C 190 94, 200 120, 196 152 L 176 184 L 160 188 Z"
              fill="#F8FAFC"
              stroke="#F59E0B"
              strokeWidth="2"
              opacity="0.92"
            />
          )}
          {patchMaskId === 'mask_iron_death' && (
            <g>
              <ellipse cx="160" cy="142" rx="34" ry="44" fill="#475569" stroke="#020617" strokeWidth="3" />
              <rect x="136" y="134" width="16" height="5" rx="2" fill="#020617" />
              <rect x="168" y="134" width="16" height="5" rx="2" fill="#020617" />
              <line x1="150" y1="164" x2="170" y2="164" stroke="#020617" strokeWidth="2" />
            </g>
          )}
          {patchMaskId === 'mask_chemical_respirator' && (
            <g>
              <path d="M 134 152 L 186 152 L 176 188 L 144 188 Z" fill="#1E293B" stroke="#020617" strokeWidth="2.5" />
              <circle cx="136" cy="172" r="10" fill="#334155" stroke="#020617" strokeWidth="2" />
              <circle cx="184" cy="172" r="10" fill="#334155" stroke="#020617" strokeWidth="2" />
              <circle cx="160" cy="170" r="6" fill={accHex} />
            </g>
          )}
        </g>
      )}

      {/* Etiqueta inferior sutil de referencia rápida */}
      <g>
        <rect x="12" y="324" width="296" height="24" rx="8" fill="rgba(2,6,23,0.78)" stroke="rgba(148,163,184,0.22)" />
        <text
          x="160"
          y="340"
          textAnchor="middle"
          fill="#E2E8F0"
          fontSize="10.5"
          fontWeight="600"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          {appearance.race.name} · {appearance.heightMeters.toFixed(2)}m
          {subversion.paradigm ? ' · SUBVERSIÓN' : ''}
        </text>
      </g>
    </svg>
  );
}
