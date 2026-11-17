import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  PlugZap,
  Server,
  X,
} from 'lucide-react';
import {
  fetchFreeLlmApiModels,
  type FreeLlmApiConfig,
} from '../../services/freellmapi';

interface FreeLlmApiModalProps {
  readonly isOpen: boolean;
  readonly config: FreeLlmApiConfig;
  readonly onSaveConfig: (next: FreeLlmApiConfig) => void;
  readonly onClose: () => void;
}

const PORT_PRESETS = [
  { url: 'http://127.0.0.1:31415', label: 'http://127.0.0.1:31415 (App Desktop)' },
  { url: 'http://localhost:3001', label: 'http://localhost:3001' },
  { url: 'http://localhost:3000', label: 'http://localhost:3000' },
  { url: 'http://localhost:8000', label: 'http://localhost:8000' },
];

export function FreeLlmApiModal({
  isOpen,
  config,
  onSaveConfig,
  onClose,
}: FreeLlmApiModalProps) {
  const [draft, setDraft] = useState<FreeLlmApiConfig>(config);
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [statusMsg, setStatusMsg] = useState<{
    type: 'ok' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDraft(config);
      setStatusMsg(null);
    }
  }, [isOpen, config]);

  if (!isOpen) return null;

  const handleTestConnection = async (overrideConfig?: FreeLlmApiConfig) => {
    const targetConfig = overrideConfig ?? draft;
    setTesting(true);
    setStatusMsg(null);
    try {
      const models = await fetchFreeLlmApiModels(targetConfig);
      setAvailableModels(models);
      setStatusMsg({
        type: 'ok',
        text:
          models.length > 0
            ? `¡Conectado! Se detectaron ${models.length} modelos disponibles en tu FreeLLMAPI.`
            : '¡Conexión exitosa con FreeLLMAPI! (Puedes usar "auto" o escribir tu modelo).',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error de conexión';
      setStatusMsg({
        type: 'error',
        text: `${message}. Asegúrate de tener FreeLLMAPI encendido en esa dirección.`,
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-sky-500/15 p-2 text-sky-400">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">
                Conectar FreeLLMAPI (Generador de Imágenes)
              </h2>
              <p className="text-xs text-slate-400">
                Usa el servidor FreeLLMAPI instalado en tu PC sin salir de la app
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar configuración"
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          {/* URL Base */}
          <div>
            <label className="block text-xs font-semibold text-slate-300">
              1. Dirección donde corre FreeLLMAPI en tu PC
            </label>
            <p className="mt-0.5 text-[11px] text-slate-400">
              La app de escritorio FreeLLMAPI en tu PC suele usar <code className="text-sky-300">http://127.0.0.1:31415</code> (o <code className="text-slate-300">localhost:3001</code> en versión web).
            </p>
            <input
              type="url"
              required
              value={draft.baseUrl}
              onChange={(e) => setDraft({ ...draft, baseUrl: e.target.value })}
              placeholder="http://127.0.0.1:31415"
              className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {PORT_PRESETS.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => setDraft({ ...draft, baseUrl: preset.url })}
                  className={`rounded-md border px-2 py-0.5 text-[11px] font-mono transition ${
                    draft.baseUrl === preset.url
                      ? 'border-sky-500 bg-sky-500/20 text-sky-200'
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-xs font-semibold text-slate-300">
              2. Tu Clave API de FreeLLMAPI
            </label>
            <p className="mt-0.5 text-[11px] text-slate-400">
              Se guarda únicamente de forma local en tu navegador.
            </p>
            <div className="relative mt-1.5">
              <input
                type={showKey ? 'text' : 'password'}
                value={draft.apiKey}
                onChange={(e) => setDraft({ ...draft, apiKey: e.target.value })}
                placeholder="freellmapi-..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pr-10 pl-3 font-mono text-sm text-slate-100 focus:border-sky-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                aria-label={showKey ? 'Ocultar clave' : 'Mostrar clave'}
                className="absolute inset-y-0 right-2 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Probar conexión */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void handleTestConnection()}
              disabled={testing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/50 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 transition hover:bg-sky-500/25 disabled:opacity-50"
            >
              {testing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <PlugZap className="h-3.5 w-3.5" />
              )}
              Probar Conexión y Cargar Modelos
            </button>
          </div>

          {statusMsg && (
            <div
              className={`space-y-2 rounded-lg border p-2.5 text-xs ${
                statusMsg.type === 'ok'
                  ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-300'
                  : 'border-rose-500/40 bg-rose-950/30 text-rose-300'
              }`}
            >
              <div className="flex items-start gap-2">
                {statusMsg.type === 'ok' && (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                )}
                <span>{statusMsg.text}</span>
              </div>
              {statusMsg.type === 'error' &&
                draft.baseUrl !== 'http://127.0.0.1:31415' && (
                  <button
                    type="button"
                    onClick={() => {
                      const next = { ...draft, baseUrl: 'http://127.0.0.1:31415' };
                      setDraft(next);
                      void handleTestConnection(next);
                    }}
                    className="rounded-md border border-sky-500/40 bg-sky-500/15 px-2.5 py-1 text-[11px] font-semibold text-sky-200 hover:bg-sky-500/25"
                  >
                    Probar con http://127.0.0.1:31415 (App Desktop)
                  </button>
                )}
            </div>
          )}

          {/* Modelo y Tamaño */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300">
                3. Modelo de Imagen
              </label>
              {availableModels.length > 0 ? (
                <select
                  value={draft.model}
                  onChange={(e) => setDraft({ ...draft, model: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                >
                  <option value="auto">auto (enrutador automático)</option>
                  {availableModels.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={draft.model}
                  onChange={(e) => setDraft({ ...draft, model: e.target.value })}
                  placeholder="auto"
                  className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300">
                Formato preferido
              </label>
              <select
                value={draft.preferredSize}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    preferredSize: e.target.value as '1344x768' | '1024x1024',
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs text-slate-100 focus:border-sky-500 focus:outline-none"
              >
                <option value="1344x768">Panorámico 1344x768 (ideal Turnaround)</option>
                <option value="1024x1024">Cuadrado 1024x1024 (máxima compatibilidad)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-800 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-sky-500 px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-sky-400"
            >
              Guardar Configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
