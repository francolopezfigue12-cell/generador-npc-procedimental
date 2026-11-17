import { Zap, ZapOff } from 'lucide-react';
import type { LockableFieldKey, LockState } from '../../types/character';
import type { PowersProfile } from '../../types/powers';
import { LockableCard } from '../common/LockableCard';

interface PowersSectionProps {
  readonly enabled: boolean;
  readonly powers: PowersProfile | null;
  readonly locks: LockState;
  readonly onToggleLock: (key: LockableFieldKey) => void;
  readonly onEnableModule: () => void;
}

export function PowersSection({
  enabled,
  powers,
  locks,
  onToggleLock,
  onEnableModule,
}: PowersSectionProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Zap className={`h-4 w-4 ${enabled ? 'text-violet-400' : 'text-slate-500'}`} />
          <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
            Afinidades Elementales y Poderes (Módulo Opcional)
          </h2>
        </div>
        <span className="text-xs text-slate-400">
          {enabled ? 'Módulo activo' : 'Módulo desactivado'}
        </span>
      </div>

      {!enabled || !powers ? (
        <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <ZapOff className="mt-0.5 h-5 w-5 text-slate-500 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Módulo de Poderes desactivado
              </h3>
              <p className="text-xs text-slate-400">
                Ideal para mundos realistas o baja fantasía. No se inyectan habilidades sobrenaturales en el perfil ni en el prompt turnaround.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onEnableModule}
            className="shrink-0 rounded-lg border border-violet-500/50 bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-200 transition hover:bg-violet-500/25"
          >
            Activar Poderes para este NPC
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <LockableCard
            lockKey="elementalAffinity"
            isLocked={Boolean(locks.elementalAffinity)}
            onToggleLock={onToggleLock}
            label="Afinidad Elemental"
            badge={powers.elementalAffinity.humoralAndWuXing}
            title={powers.elementalAffinity.element}
            subtitle={powers.elementalAffinity.personalityArchetype}
          >
            <div className="space-y-1 text-xs text-slate-400">
              <p>
                <strong>Estilo Marcial:</strong> {powers.elementalAffinity.martialSomaticStyle}
              </p>
              <p>
                <strong>Rol Táctico:</strong> {powers.elementalAffinity.tacticalCombatRole}
              </p>
            </div>
          </LockableCard>

          <LockableCard
            lockKey="prtClassification"
            isLocked={Boolean(locks.prtClassification)}
            onToggleLock={onToggleLock}
            label="Clasificación Táctica PRT (Worm)"
            title={powers.prtClassification.name}
            subtitle={powers.prtClassification.description}
          >
            <p className="text-xs text-slate-400">
              <strong>Protocolo de Contención:</strong> {powers.prtClassification.containmentProtocol}
            </p>
          </LockableCard>

          <LockableCard
            lockKey="biologicalTier"
            isLocked={Boolean(locks.biologicalTier)}
            onToggleLock={onToggleLock}
            label="Escala Ontológica (Mutante Marvel)"
            badge={powers.biologicalTier.physicalMutationVisible ? 'Mutación visible' : 'Aspecto preservado'}
            title={`Nivel ${powers.biologicalTier.tierName}`}
            subtitle={powers.biologicalTier.description}
          />

          <LockableCard
            lockKey="operationalCost"
            isLocked={Boolean(locks.operationalCost)}
            onToggleLock={onToggleLock}
            label="Costo y Penalización Simétrica"
            title={powers.operationalCost.costType}
            subtitle={powers.operationalCost.symptomaticManifestation}
          >
            <div className="space-y-1 text-xs text-slate-400">
              <p>
                <strong>Mecanismo:</strong> {powers.operationalCost.mechanism}
              </p>
              <p>
                <strong>Consecuencia:</strong> {powers.operationalCost.narrativeConsequence}
              </p>
            </div>
          </LockableCard>
        </div>
      )}
    </section>
  );
}
