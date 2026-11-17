import { useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Image as ImageIcon,
  Send,
  X,
} from 'lucide-react';
import type { NpcProfile, TurnaroundPromptOutput } from '../../types/character';

interface TurnaroundPromptPanelProps {
  readonly npc: NpcProfile;
  readonly turnaround: TurnaroundPromptOutput;
}

export function TurnaroundPromptPanel({
  npc,
  turnaround,
}: TurnaroundPromptPanelProps) {
  const [copiedMaster, setCopiedMaster] = useState(false);
  const [copiedNeg, setCopiedNeg] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showApiPanel, setShowApiPanel] = useState(false);

  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiStatus, setApiStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const copyText = async (
    text: string,
    setter: (val: boolean) => void
  ): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      window.setTimeout(() => setter(false), 1800);
    } catch {
      // Fallback silencioso si clipboard está bloqueado
    }
  };

  const apiPayload = {
    prompt: turnaround.masterPrompt,
    negative_prompt: turnaround.negativePrompt,
    aspect_ratio: '16:9',
    seed: npc.seed,
    character_metadata: {
      id: npc.id,
      name: npc.name.fullName,
      race: npc.appearance.race.name,
      subversion: npc.subversion.paradigm?.name ?? null,
      palette_60_30_10: {
        dominant_60: npc.appearance.colorPalette.dominant.previewHex,
        secondary_30: npc.appearance.colorPalette.secondary.previewHex,
        accent_10: npc.appearance.colorPalette.accent.previewHex,
      },
    },
  };

  const handleSendToApi = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = apiEndpoint.trim();
    if (!target) {
      setApiStatus({
        type: 'error',
        message: 'Ingresa una URL de endpoint o webhook compatible (ej. proxy de Fal.ai / Replicate / ComfyUI).',
      });
      return;
    }

    setApiStatus({ type: 'loading', message: 'Enviando solicitud a la API...' });
    try {
      const response = await fetch(target, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });
      const text = await response.text();
      if (!response.ok) {
        setApiStatus({
          type: 'error',
          message: `HTTP ${response.status}: ${text.slice(0, 180) || response.statusText}`,
        });
        return;
      }
      setApiStatus({
        type: 'success',
        message: `Respuesta HTTP ${response.status} recibida (${text.slice(0, 140)}...)`,
      });
    } catch (err) {
      setApiStatus({
        type: 'error',
        message:
          err instanceof Error
            ? `Error de red/CORS: ${err.message}`
            : 'No se pudo contactar con el endpoint.',
      });
    }
  };

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-amber-400" />
          <h2 className="text-sm font-bold tracking-wider text-slate-200 uppercase">
            Generador de Prompts Visuales — Turnaround Sheet (Inglés)
          </h2>
        </div>
        <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 font-mono text-[11px] text-amber-300">
          Aspecto sugerido: 16:9 / 21:9 · 3 Vistas Ortográficas
        </span>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-slate-400">
            Directiva base incluida:{' '}
            <code className="rounded bg-slate-950 px-1.5 py-0.5 text-emerald-300">
              {turnaround.baseDirective}
            </code>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => copyText(turnaround.masterPrompt, setCopiedMaster)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              {copiedMaster ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copiar Prompt
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowApiPanel((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-sky-500/50 bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-200 transition hover:bg-sky-500/25"
            >
              <Send className="h-3.5 w-3.5" />
              Enviar a API
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={turnaround.masterPrompt}
          rows={5}
          aria-label="Prompt maestro de turnaround en inglés"
          className="w-full resize-y rounded-lg border border-slate-700/90 bg-slate-950 p-3 font-mono text-xs leading-relaxed text-slate-100 focus:border-amber-500 focus:outline-none"
        />

        {/* Negative Prompt */}
        <div className="mt-3 flex flex-col gap-2 rounded-lg border border-slate-800 bg-slate-950/60 p-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-semibold tracking-wider text-rose-400 uppercase">
              Negative Prompt recomendado
            </span>
            <p className="mt-0.5 font-mono text-[11px] text-slate-400 break-words">
              {turnaround.negativePrompt}
            </p>
          </div>
          <button
            type="button"
            onClick={() => copyText(turnaround.negativePrompt, setCopiedNeg)}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            {copiedNeg ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copiedNeg ? 'Copiado' : 'Copiar Negative'}
          </button>
        </div>

        {/* Desglose por secciones */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowBreakdown((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200"
          >
            {showBreakdown ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            {showBreakdown ? 'Ocultar desglose por capas' : 'Ver desglose por capas del prompt'}
          </button>

          {showBreakdown && (
            <div className="mt-2 grid gap-2 sm:grid-cols-2 text-xs">
              {[
                { label: 'Formato y Silueta', value: turnaround.sections.styleAndLayout },
                { label: 'Anatomía y Subversión', value: turnaround.sections.anatomyAndShape },
                { label: 'Rostro, Piel y Cabello', value: turnaround.sections.faceAndHair },
                { label: 'Vestimenta', value: turnaround.sections.clothingAndGear },
                { label: 'Paleta 60-30-10', value: turnaround.sections.colorPalette },
                { label: 'Prótesis y Modificaciones', value: turnaround.sections.bodyModsAndProsthetics },
                ...(turnaround.sections.powersAndAura
                  ? [{ label: 'Poderes y Costos', value: turnaround.sections.powersAndAura }]
                  : []),
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-800 bg-slate-950/70 p-2.5"
                >
                  <div className="font-semibold text-slate-300">{item.label}</div>
                  <div className="mt-1 font-mono text-[11px] text-slate-400">{item.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel API / Payload JSON */}
        {showApiPanel && (
          <div className="mt-4 rounded-xl border border-sky-500/30 bg-slate-950 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold tracking-wider text-sky-300 uppercase">
                Integración API / Webhook (Fal.ai, Replicate, ComfyUI Proxy)
              </h3>
              <button
                type="button"
                onClick={() => setShowApiPanel(false)}
                className="text-slate-400 hover:text-slate-200"
                aria-label="Cerrar panel de API"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSendToApi} className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="url"
                placeholder="https://tu-endpoint-o-proxy.local/generate-turnaround"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={apiStatus.type === 'loading'}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-50"
              >
                <Send className="h-3.5 w-3.5" />
                {apiStatus.type === 'loading' ? 'Enviando...' : 'Enviar POST'}
              </button>
              <button
                type="button"
                onClick={() =>
                  copyText(JSON.stringify(apiPayload, null, 2), setCopiedPayload)
                }
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                {copiedPayload ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedPayload ? 'Payload Copiado' : 'Copiar JSON Payload'}
              </button>
            </form>

            {apiStatus.message && (
              <p
                className={`mt-2 text-xs ${
                  apiStatus.type === 'error'
                    ? 'text-rose-400'
                    : apiStatus.type === 'success'
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                }`}
              >
                {apiStatus.message}
              </p>
            )}

            <pre className="mt-3 max-h-44 overflow-auto rounded-lg border border-slate-800 bg-slate-900/70 p-2.5 font-mono text-[11px] text-slate-300">
              {JSON.stringify(apiPayload, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}
