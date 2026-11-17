import { Brain, Flame } from 'lucide-react';
import type { LockableFieldKey, LockState } from '../../types/character';
import type { PersonalityProfile } from '../../types/psychology';
import { LockableCard } from '../common/LockableCard';

interface PsychologySectionProps {
  readonly personality: PersonalityProfile;
  readonly locks: LockState;
  readonly onToggleLock: (key: LockableFieldKey) => void;
}

export function PsychologySection({
  personality,
  locks,
  onToggleLock,
}: PsychologySectionProps) {
  const activeCompulsions = personality.dyadicTraits.filter(
    (t) => t.compulsionTriggered
  );

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <Brain className="h-4 w-4 text-emerald-400" />
        <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
          Psicología, Moralidad y Comportamiento (10 Subdivisiones)
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <LockableCard
          lockKey="externalMotivation"
          isLocked={Boolean(locks.externalMotivation)}
          onToggleLock={onToggleLock}
          label="1. Motivación Externa (Want)"
          title={personality.externalMotivation.name}
          subtitle={personality.externalMotivation.description}
        />

        <LockableCard
          lockKey="internalMotivation"
          isLocked={Boolean(locks.internalMotivation)}
          onToggleLock={onToggleLock}
          label="2. Motivación Interna (Need)"
          title={personality.internalMotivation.name}
          subtitle={personality.internalMotivation.description}
        />

        <LockableCard
          lockKey="archetype"
          isLocked={Boolean(locks.archetype)}
          onToggleLock={onToggleLock}
          label="3. Arquetipo Funcional"
          title={personality.archetype.archetype}
          subtitle={`Meta: ${personality.archetype.primaryGoal}`}
        >
          <div className="space-y-1 text-xs text-slate-400">
            <p>
              <strong>Temor:</strong> {personality.archetype.greatestFear}
            </p>
            <p>
              <strong>Crisis:</strong> {personality.archetype.crisisResponse} ·{' '}
              <strong>Defecto:</strong> {personality.archetype.archetypalFlaw}
            </p>
          </div>
        </LockableCard>

        <LockableCard
          lockKey="fatalFlaw"
          isLocked={Boolean(locks.fatalFlaw)}
          onToggleLock={onToggleLock}
          label="4. Falla Fatal (Hamartia)"
          title={personality.fatalFlaw.name}
          subtitle={personality.fatalFlaw.description}
        />

        <LockableCard
          lockKey="minorQuirk"
          isLocked={Boolean(locks.minorQuirk)}
          onToggleLock={onToggleLock}
          label="5. Defecto Menor / Manía"
          badge={personality.minorQuirk.categoryLabel}
          title={personality.minorQuirk.description}
        />

        <LockableCard
          lockKey="virtue"
          isLocked={Boolean(locks.virtue)}
          onToggleLock={onToggleLock}
          label="6. Virtud Destacable"
          title={personality.virtue.name}
          subtitle={personality.virtue.description}
        />

        <LockableCard
          lockKey="defenseMechanism"
          isLocked={Boolean(locks.defenseMechanism)}
          onToggleLock={onToggleLock}
          label="7. Mecanismo de Defensa (Vaillant)"
          badge={personality.defenseMechanism.maturityLabel}
          title={personality.defenseMechanism.name}
          subtitle={personality.defenseMechanism.behavioralManifestation}
        >
          <p className="text-xs text-slate-400">
            <strong>Impulso:</strong> {personality.defenseMechanism.underlyingImpulse}
          </p>
        </LockableCard>

        <LockableCard
          lockKey="socialAttitude"
          isLocked={Boolean(locks.socialAttitude)}
          onToggleLock={onToggleLock}
          label="8. Actitud Social Matriz"
          title={personality.socialAttitude.name}
          subtitle={personality.socialAttitude.description}
        />

        <LockableCard
          lockKey="hiddenSecret"
          isLocked={Boolean(locks.hiddenSecret)}
          onToggleLock={onToggleLock}
          label="9a. Secreto Oculto"
          title={personality.hiddenSecret.name}
          subtitle={personality.hiddenSecret.description}
        />

        <LockableCard
          lockKey="breakingPoint"
          isLocked={Boolean(locks.breakingPoint)}
          onToggleLock={onToggleLock}
          label="9b. Punto de Ruptura"
          title={personality.breakingPoint.name}
          subtitle={personality.breakingPoint.description}
        />

        <LockableCard
          lockKey="alignment"
          isLocked={Boolean(locks.alignment)}
          onToggleLock={onToggleLock}
          label="10a. Alineamiento y Líneas Rojas"
          badge={`${personality.alignment.lawChaos} / ${personality.alignment.goodEvil}`}
          title={personality.alignment.name}
          subtitle={personality.alignment.fundamentalPrinciple}
        >
          <div className="space-y-1 text-xs text-slate-400">
            <p>
              <strong>Línea Roja:</strong> {personality.alignment.hardBoundary}
            </p>
            <p>
              <strong>Uso de Fuerza:</strong> {personality.alignment.forceJustification}
            </p>
          </div>
        </LockableCard>

        <LockableCard
          lockKey="bindingPassion"
          isLocked={Boolean(locks.bindingPassion)}
          onToggleLock={onToggleLock}
          label="10b. Pasión Superior Vinculante"
          title={personality.bindingPassion.name}
          subtitle={personality.bindingPassion.description}
        />
      </div>

      {/* 13 Pares de Rasgos Diádicos Pendragon */}
      <LockableCard
        lockKey="dyadicTraits"
        isLocked={Boolean(locks.dyadicTraits)}
        onToggleLock={onToggleLock}
        label="10c. Rasgos Diádicos de Pendragon (1–20)"
        badge={
          activeCompulsions.length > 0
            ? `${activeCompulsions.length} compulsiones activas (≥16)`
            : 'Sin compulsiones extremas'
        }
        title="Espectro de Conducta Polarizada"
        subtitle="Cada par suma exactamente 20. Valores ≥ 16 disparan compulsiones conductuales obligatorias."
      >
        <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {personality.dyadicTraits.map((trait) => {
            const leftPct = (trait.leftValue / 20) * 100;
            return (
              <div
                key={trait.traitId}
                className={`rounded-lg border px-2.5 py-1.5 text-xs ${
                  trait.compulsionTriggered
                    ? 'border-amber-500/40 bg-amber-950/20'
                    : 'border-slate-800/80 bg-slate-950/40'
                }`}
              >
                <div className="flex items-center justify-between gap-2 font-medium">
                  <span
                    className={
                      trait.leftValue >= 16
                        ? 'text-amber-300 font-bold'
                        : trait.leftValue > trait.rightValue
                          ? 'text-slate-100'
                          : 'text-slate-400'
                    }
                  >
                    {trait.leftLabel} ({trait.leftValue})
                  </span>
                  {trait.compulsionTriggered && (
                    <Flame
                      className="h-3.5 w-3.5 text-amber-400 shrink-0"
                      aria-label="Compulsión activa"
                    />
                  )}
                  <span
                    className={
                      trait.rightValue >= 16
                        ? 'text-amber-300 font-bold'
                        : trait.rightValue > trait.leftValue
                          ? 'text-slate-100'
                          : 'text-slate-400'
                    }
                  >
                    ({trait.rightValue}) {trait.rightLabel}
                  </span>
                </div>
                <div className="mt-1 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    style={{ width: `${leftPct}%` }}
                    className={
                      trait.compulsionTriggered
                        ? 'bg-amber-400'
                        : 'bg-emerald-500/70'
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </LockableCard>
    </section>
  );
}
