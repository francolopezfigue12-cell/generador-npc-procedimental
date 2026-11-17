import { Eye } from 'lucide-react';
import type { AppearanceProfile, LockableFieldKey, LockState } from '../../types/character';
import { LockableCard } from '../common/LockableCard';

interface AppearanceSectionProps {
  readonly appearance: AppearanceProfile;
  readonly locks: LockState;
  readonly onToggleLock: (key: LockableFieldKey) => void;
}

export function AppearanceSection({
  appearance,
  locks,
  onToggleLock,
}: AppearanceSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <Eye className="h-4 w-4 text-sky-400" />
        <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
          Diseño Visual, Anatomía y Modificaciones Corporales
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <LockableCard
          lockKey="race"
          isLocked={Boolean(locks.race)}
          onToggleLock={onToggleLock}
          label="Raza / Especie"
          title={appearance.race.name}
          subtitle={appearance.race.morphologicalProfile}
        >
          <p className="text-xs text-slate-400">
            <strong>Atributos base:</strong> {appearance.race.baseMechanicalAttributes}
          </p>
        </LockableCard>

        <LockableCard
          lockKey="ageGroup"
          isLocked={Boolean(locks.ageGroup)}
          onToggleLock={onToggleLock}
          label="Edad / Etapa Vital"
          badge={appearance.ageGroup.ageRangeLabel}
          title={appearance.ageGroup.name}
          subtitle={`Rango aproximado: ${appearance.ageGroup.ageRangeLabel}`}
        />

        <LockableCard
          lockKey="gender"
          isLocked={Boolean(locks.gender)}
          onToggleLock={onToggleLock}
          label="Género / Presentación"
          title={appearance.gender.name}
          subtitle="Define la presentación visual base para el turnaround."
        />

        <LockableCard
          lockKey="biotype"
          isLocked={Boolean(locks.biotype)}
          onToggleLock={onToggleLock}
          label="Biotipo y Escala Alométrica"
          badge={`${appearance.heightMeters.toFixed(2)} m · ${appearance.weightKg} kg`}
          title={appearance.biotype.name}
          subtitle={appearance.biotype.skeletalStructure}
        >
          <div className="space-y-1 text-xs text-slate-400">
            <p>
              <strong>Ley Cuadrático-Cúbica:</strong> {appearance.allometricRule.name}
            </p>
            <p className="text-slate-500">{appearance.allometricRule.anatomicalMitigation}</p>
          </div>
        </LockableCard>

        <LockableCard
          lockKey="shapeLanguage"
          isLocked={Boolean(locks.shapeLanguage)}
          onToggleLock={onToggleLock}
          label="Lenguaje de Formas (Silueta)"
          title={appearance.shapeLanguage.name}
          subtitle={appearance.shapeLanguage.anatomicalProperties}
        >
          <p className="text-xs text-slate-400">
            <strong>Connotación:</strong> {appearance.shapeLanguage.psychologicalConnotations}
          </p>
        </LockableCard>

        <LockableCard
          lockKey="skinTone"
          isLocked={Boolean(locks.skinTone)}
          onToggleLock={onToggleLock}
          label="Piel / Pelaje / Escamas"
          title={appearance.skinTone.name}
          subtitle={appearance.skinTone.description}
        >
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className="h-4 w-8 rounded border border-white/20"
              style={{ backgroundColor: appearance.skinTone.previewHex }}
            />
            <span className="font-mono text-[11px]">{appearance.skinTone.previewHex}</span>
          </div>
        </LockableCard>

        <LockableCard
          lockKey="hairCut"
          isLocked={Boolean(locks.hairCut)}
          onToggleLock={onToggleLock}
          label="Peinado / Corte Capilar"
          title={appearance.hairCut.name}
          subtitle={appearance.hairCut.description}
        />

        <LockableCard
          lockKey="hairColor"
          isLocked={Boolean(locks.hairColor)}
          onToggleLock={onToggleLock}
          label="Coloración Capilar"
          title={appearance.hairColor.name}
          subtitle={appearance.hairColor.description}
        />

        <LockableCard
          lockKey="clothingStyle"
          isLocked={Boolean(locks.clothingStyle)}
          onToggleLock={onToggleLock}
          label="Estilo de Vestimenta"
          title={appearance.clothingStyle.name}
          subtitle={appearance.clothingStyle.description}
          className="sm:col-span-2 lg:col-span-1"
        />

        <LockableCard
          lockKey="eyeAnomaly"
          isLocked={Boolean(locks.eyeAnomaly)}
          onToggleLock={onToggleLock}
          label="Anomalía Ocular"
          title={appearance.eyeAnomaly?.name ?? 'Ojos estándar sin anomalías'}
          subtitle={
            appearance.eyeAnomaly?.description ??
            'Iris simétricos sin alteraciones pigmentarias o corneales.'
          }
        />

        <LockableCard
          lockKey="tattooOrMark"
          isLocked={Boolean(locks.tattooOrMark)}
          onToggleLock={onToggleLock}
          label="Tatuajes y Marcas Dérmicas"
          title={appearance.tattooOrMark?.name ?? 'Sin marcas ni tatuajes'}
          subtitle={
            appearance.tattooOrMark?.description ?? 'Dermis limpia sin inscripciones visibles.'
          }
        />

        <LockableCard
          lockKey="eyewear"
          isLocked={Boolean(locks.eyewear)}
          onToggleLock={onToggleLock}
          label="Gafas / Dispositivo Ocular"
          title={appearance.eyewear?.name ?? 'Sin dispositivos ópticos'}
          subtitle={appearance.eyewear?.description ?? 'Visión sin lentes ni monóculos.'}
        />

        <LockableCard
          lockKey="patchOrMask"
          isLocked={Boolean(locks.patchOrMask)}
          onToggleLock={onToggleLock}
          label="Parches y Máscaras"
          title={appearance.patchOrMask?.name ?? 'Rostro descubierto'}
          subtitle={
            appearance.patchOrMask?.description ?? 'Sin parches orbitales ni máscaras faciales.'
          }
        />

        <LockableCard
          lockKey="amputation"
          isLocked={Boolean(locks.amputation)}
          onToggleLock={onToggleLock}
          label="Amputaciones / Lesiones"
          badge={appearance.amputation?.zoneLabel}
          title={appearance.amputation?.name ?? 'Anatomía íntegra (Sin amputaciones)'}
          subtitle={
            appearance.amputation
              ? `Zona afectada: ${appearance.amputation.zoneLabel}.`
              : 'Conserva todas sus extremidades y rasgos craneofaciales.'
          }
        />

        <LockableCard
          lockKey="prosthetic"
          isLocked={Boolean(locks.prosthetic)}
          onToggleLock={onToggleLock}
          label="Prótesis y Reemplazo"
          title={appearance.prosthetic?.categoryLabel ?? 'Sin prótesis'}
          subtitle={
            appearance.prosthetic
              ? `${appearance.prosthetic.manufacturingExamples} (${appearance.prosthetic.articulationMechanism})`
              : 'No utiliza sistemas protésicos de reemplazo.'
          }
        >
          {appearance.prosthetic && (
            <p className="text-xs text-slate-400">
              <strong>Debilidad:</strong> {appearance.prosthetic.costsAndMaintenance}
            </p>
          )}
        </LockableCard>

        <LockableCard
          lockKey="bodyModifications"
          isLocked={Boolean(locks.bodyModifications)}
          onToggleLock={onToggleLock}
          label="Módulos y Modificaciones"
          title={
            appearance.bodyModifications.length > 0
              ? appearance.bodyModifications.map((m) => m.name).join(', ')
              : 'Sin módulos integrados'
          }
          subtitle={
            appearance.bodyModifications.length > 0
              ? appearance.bodyModifications.map((m) => m.description).join(' ')
              : 'Sin compartimentos ocultos ni blindaje subcutáneo.'
          }
        />
      </div>
    </section>
  );
}
