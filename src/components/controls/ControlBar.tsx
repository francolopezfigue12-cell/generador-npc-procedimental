import { useEffect, useState } from 'react';
import {
  Archive,
  BookmarkPlus,
  Dices,
  Download,
  FileText,
  LockOpen,
  RefreshCw,
  Server,
  Sparkles,
  Zap,
} from 'lucide-react';
import { CONTRAST_CONFIG, type ContrastMode } from '../../hooks/useNpcGenerator';

interface ControlBarProps {
  readonly currentSeed: string;
  readonly lockedCount: number;
  readonly savedCount: number;
  readonly powersEnabled: boolean;
  readonly contrastMode: ContrastMode;
  readonly hasApiKeyConfigured: boolean;
  readonly onGenerateFresh: (seed?: string) => void;
  readonly onRegenerateUnlocked: () => void;
  readonly onTogglePowers: (enabled: boolean) => void;
  readonly onChangeContrastMode: (mode: ContrastMode) => void;
  readonly onUnlockAll: () => void;
  readonly onSaveCollection: () => void;
  readonly onOpenApiSettings: () => void;
  readonly onExportJson: () => void;
  readonly onExportMarkdown: () => void;
}

export function ControlBar({
  currentSeed,
  lockedCount,
  savedCount,
  powersEnabled,
  contrastMode,
  hasApiKeyConfigured,
  onGenerateFresh,
  onRegenerateUnlocked,
  onTogglePowers,
  onChangeContrastMode,
  onUnlockAll,
  onSaveCollection,
  onOpenApiSettings,
  onExportJson,
  onExportMarkdown,
}: ControlBarProps) {
  const [seedDraft, setSeedDraft] = useState(currentSeed);

  useEffect(() => {
    setSeedDraft(currentSeed);
  }, [currentSeed]);

  const handleSeedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateFresh(seedDraft.trim() || undefined);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/90 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h1 className="text-lg font-bold tracking-tight text-slate-100 sm:text-xl">
                Generador Procedimental de NPCs
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Visual primero · Psicología profunda · Candados por rasgo · FreeLLMAPI Turnaround
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onGenerateFresh()}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 active:scale-[0.99]"
            >
              <Dices className="h-4 w-4" />
              Generar Personaje
            </button>

            <button
              type="button"
              onClick={onRegenerateUnlocked}
              className="inline-flex items-center gap-2 rounded-lg border border-sky-500/50 bg-sky-500/15 px-3.5 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/25 active:scale-[0.99]"
              title="Mantiene intactos los atributos con candado y regenera solo los desbloqueados"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Regenerar</span>
              {lockedCount > 0 && (
                <span className="rounded-full bg-amber-500/25 px-1.5 py-0.5 text-[11px] font-bold text-amber-300">
                  {lockedCount} fijos
                </span>
              )}
            </button>

            {lockedCount > 0 && (
              <button
                type="button"
                onClick={onUnlockAll}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
              >
                <LockOpen className="h-3.5 w-3.5" />
                Desbloquear ({lockedCount})
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/70 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onTogglePowers(!powersEnabled)}
              role="switch"
              aria-checked={powersEnabled}
              className={`inline-flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition ${
                powersEnabled
                  ? 'border-violet-500/60 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25'
                  : 'border-slate-700 bg-slate-900 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              <Zap className={`h-3.5 w-3.5 ${powersEnabled ? 'text-violet-400' : 'text-slate-500'}`} />
              Poderes: {powersEnabled ? 'Activo' : 'Off'}
            </button>

            <label className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <span className="hidden sm:inline">Contraste:</span>
              <select
                value={contrastMode}
                onChange={(e) => onChangeContrastMode(e.target.value as ContrastMode)}
                className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 focus:border-amber-500 focus:outline-none"
              >
                {(Object.keys(CONTRAST_CONFIG) as ContrastMode[]).map((mode) => (
                  <option key={mode} value={mode}>
                    {CONTRAST_CONFIG[mode].label}
                  </option>
                ))}
              </select>
            </label>

            <form onSubmit={handleSeedSubmit} className="inline-flex items-center gap-1">
              <span className="text-xs text-slate-400">Seed:</span>
              <input
                type="text"
                value={seedDraft}
                onChange={(e) => setSeedDraft(e.target.value)}
                aria-label="Semilla de generación"
                className="w-24 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 font-mono text-xs text-amber-300 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
              >
                Cargar
              </button>
            </form>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenApiSettings}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-sky-500/60"
            >
              <Server className="h-3.5 w-3.5 text-sky-400" />
              <span>FreeLLMAPI</span>
              <span
                className={`h-2 w-2 rounded-full ${
                  hasApiKeyConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            </button>

            <a
              href="#coleccion-personajes"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-amber-500/50 hover:text-amber-300"
            >
              <Archive className="h-3.5 w-3.5" />
              Colección ({savedCount})
            </a>

            <button
              type="button"
              onClick={onSaveCollection}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-1.5 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-500/25"
            >
              <BookmarkPlus className="h-3.5 w-3.5" />
              Guardar
            </button>

            <button
              type="button"
              onClick={onExportMarkdown}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              <FileText className="h-3.5 w-3.5" />
              .MD
            </button>

            <button
              type="button"
              onClick={onExportJson}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              <Download className="h-3.5 w-3.5" />
              .JSON
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
