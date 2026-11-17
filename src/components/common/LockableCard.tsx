import type { ReactNode } from 'react';
import { Lock, Unlock } from 'lucide-react';
import type { LockableFieldKey } from '../../types/character';

interface LockableCardProps {
  readonly lockKey: LockableFieldKey;
  readonly isLocked: boolean;
  readonly onToggleLock: (key: LockableFieldKey) => void;
  readonly label: string;
  readonly badge?: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly children?: ReactNode;
  readonly className?: string;
}

export function LockableCard({
  lockKey,
  isLocked,
  onToggleLock,
  label,
  badge,
  title,
  subtitle,
  children,
  className = '',
}: LockableCardProps) {
  return (
    <div
      className={`group relative rounded-xl border p-4 transition-colors ${
        isLocked
          ? 'border-amber-500/60 bg-amber-950/20 shadow-sm shadow-amber-950/30'
          : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              {label}
            </span>
            {badge && (
              <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-300">
                {badge}
              </span>
            )}
          </div>
          <h3 className="mt-1 text-base font-semibold text-slate-100 leading-snug">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-300 leading-relaxed">{subtitle}</p>
          )}
        </div>

        <button
          type="button"
          onClick={() => onToggleLock(lockKey)}
          aria-pressed={isLocked}
          aria-label={isLocked ? `Desbloquear ${label}` : `Bloquear ${label}`}
          title={
            isLocked
              ? 'Bloqueado: se mantendrá al Regenerar'
              : 'Desbloqueado: cambiará al Regenerar'
          }
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
            isLocked
              ? 'border-amber-500/70 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
              : 'border-slate-700/80 bg-slate-800/70 text-slate-400 hover:border-slate-600 hover:text-slate-200'
          }`}
        >
          {isLocked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{isLocked ? 'Fijo' : 'Libre'}</span>
        </button>
      </div>

      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}
