import { useRef, useState } from 'react';
import {
  AlertTriangle,
  BookmarkCheck,
  BookmarkPlus,
  Check,
  Download,
  Loader2,
  Maximize2,
  Settings,
  ShieldAlert,
  Sparkles,
  Trash2,
  Upload,
  Wand2,
  X,
} from 'lucide-react';
import type {
  LockableFieldKey,
  LockState,
  NpcProfile,
} from '../../types/character';
import { LockableCard } from '../common/LockableCard';
import { ProceduralNpcAvatar } from './ProceduralNpcAvatar';

interface CharacterVisualStageProps {
  readonly npc: NpcProfile;
  readonly locks: LockState;
  readonly generatedImageDataUrl: string | null;
  readonly isGeneratingImage: boolean;
  readonly imageError: string | null;
  readonly hasApiKeyConfigured: boolean;
  readonly isSavedInCollection: boolean;
  readonly onToggleLock: (key: LockableFieldKey) => void;
  readonly onGenerateImage: () => void;
  readonly onSetManualImage: (dataUrl: string | null) => void;
  readonly onOpenApiSettings: () => void;
  readonly onSaveToCollection: () => void;
}

function getBarTextClass(toneId: string): string {
  return toneId === 'color_snow_white' || toneId === 'color_amber_yellow'
    ? 'text-slate-950'
    : 'text-white drop-shadow';
}

export function CharacterVisualStage({
  npc,
  locks,
  generatedImageDataUrl,
  isGeneratingImage,
  imageError,
  hasApiKeyConfigured,
  isSavedInCollection,
  onToggleLock,
  onGenerateImage,
  onSetManualImage,
  onOpenApiSettings,
  onSaveToCollection,
}: CharacterVisualStageProps) {
  const [viewMode, setViewMode] = useState<'ai' | 'svg'>('ai');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [justSavedFeedback, setJustSavedFeedback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const showingAiImage = Boolean(generatedImageDataUrl) && viewMode === 'ai';
  const { name, subversion, appearance, personality, powers } = npc;
  const { dominant, secondary, accent } = appearance.colorPalette;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onSetManualImage(reader.result);
        setViewMode('ai');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        if (!blob) continue;
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            onSetManualImage(reader.result);
            setViewMode('ai');
          }
        };
        reader.readAsDataURL(blob);
        break;
      }
    }
  };

  const handleSaveClick = () => {
    onSaveToCollection();
    setJustSavedFeedback(true);
    window.setTimeout(() => setJustSavedFeedback(false), 1800);
  };

  const handleDownloadImage = () => {
    if (!generatedImageDataUrl) return;
    const link = document.createElement('a');
    link.href = generatedImageDataUrl;
    link.download = `${npc.name.givenName.toLowerCase()}-${npc.seed}-turnaround.png`;
    link.click();
  };

  return (
    <section
      onPaste={handlePaste}
      className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 shadow-xl sm:p-5"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA: VISOR VISUAL DEL PERSONAJE */}
        <div className="flex flex-col gap-3 lg:col-span-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold tracking-wider text-slate-200 uppercase">
                Vista Visual del Personaje
              </span>
            </div>

            {generatedImageDataUrl && (
              <div className="inline-flex rounded-lg border border-slate-700 bg-slate-950 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setViewMode('ai')}
                  className={`rounded-md px-2 py-0.5 font-semibold transition ${
                    viewMode === 'ai'
                      ? 'bg-sky-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Imagen IA
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('svg')}
                  className={`rounded-md px-2 py-0.5 font-semibold transition ${
                    viewMode === 'svg'
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Avatar SVG
                </button>
              </div>
            )}
          </div>

          {/* Marco Visual */}
          <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
            {showingAiImage && generatedImageDataUrl ? (
              <>
                <img
                  src={generatedImageDataUrl}
                  alt={`Turnaround generado de ${name.fullName}`}
                  className="max-h-[420px] w-full object-contain"
                />
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    title="Ampliar imagen"
                    aria-label="Ampliar imagen"
                    className="rounded-lg border border-slate-700/80 bg-slate-950/80 p-1.5 text-slate-200 backdrop-blur hover:bg-slate-800"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    title="Descargar imagen"
                    aria-label="Descargar imagen"
                    className="rounded-lg border border-slate-700/80 bg-slate-950/80 p-1.5 text-slate-200 backdrop-blur hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSetManualImage(null)}
                    title="Quitar imagen IA"
                    aria-label="Quitar imagen IA"
                    className="rounded-lg border border-slate-700/80 bg-slate-950/80 p-1.5 text-rose-300 backdrop-blur hover:bg-rose-950"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <ProceduralNpcAvatar npc={npc} className="h-full max-h-[360px] w-full" />
            )}

            {isGeneratingImage && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-950/85 backdrop-blur-xs">
                <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
                <span className="text-xs font-semibold text-sky-200">
                  Generando Turnaround con FreeLLMAPI...
                </span>
                <span className="text-[11px] text-slate-400">
                  Esto puede tardar unos segundos según el proveedor activo
                </span>
              </div>
            )}
          </div>

          {/* Botones de acción visual */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onGenerateImage}
              disabled={isGeneratingImage}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md shadow-sky-500/20 transition hover:bg-sky-400 disabled:opacity-60"
            >
              <Wand2 className="h-4 w-4" />
              {generatedImageDataUrl ? 'Regenerar Imagen IA' : 'Generar Imagen (FreeLLMAPI)'}
            </button>

            <button
              type="button"
              onClick={onOpenApiSettings}
              title="Configurar FreeLLMAPI (URL, Clave API y Modelo)"
              aria-label="Configurar FreeLLMAPI"
              className="relative inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-xs font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
            >
              <Settings className="h-4 w-4" />
              <span
                className={`h-2 w-2 rounded-full ${
                  hasApiKeyConfigured ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
              />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Subir imagen o pegar con Ctrl+V"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              <Upload className="h-3.5 w-3.5" />
              Subir / Pegar
            </button>
          </div>

          {imageError && (
            <div className="rounded-lg border border-rose-500/40 bg-rose-950/30 p-2.5 text-xs text-rose-200">
              <div className="font-semibold">No se pudo generar la imagen</div>
              <p className="mt-0.5 text-rose-300/90">{imageError}</p>
              <button
                type="button"
                onClick={onOpenApiSettings}
                className="mt-1.5 font-semibold text-sky-300 underline hover:text-sky-200"
              >
                Abrir configuración de FreeLLMAPI
              </button>
            </div>
          )}

          {!imageError && !generatedImageDataUrl && (
            <p className="text-[11px] text-slate-500">
              Vista instantánea en SVG mientras pruebas candados. Cuando te guste, genera la ilustración con FreeLLMAPI o pega una imagen (<kbd className="rounded bg-slate-800 px-1">Ctrl+V</kbd>).
            </p>
          )}
        </div>

        {/* COLUMNA DERECHA: RESUMEN RÁPIDO, SUBVERSIÓN Y PALETA */}
        <div className="flex flex-col gap-3.5 lg:col-span-7">
          {/* Nombre + Botón Guardar Colección */}
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="flex-1 min-w-[220px]">
              <LockableCard
                lockKey="name"
                isLocked={Boolean(locks.name)}
                onToggleLock={onToggleLock}
                label="Nombre y Significado"
                badge={name.culturalOrigin}
                title={name.fullName}
                subtitle={name.meaning}
              >
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-300">
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-2 py-0.5">
                    <strong>{appearance.race.name}</strong>
                  </span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-2 py-0.5">
                    {appearance.gender.name} · {appearance.ageGroup.name}
                  </span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-2 py-0.5">
                    {appearance.biotype.name} ({appearance.heightMeters.toFixed(2)} m · {appearance.weightKg} kg)
                  </span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-2 py-0.5">
                    {personality.archetype.archetype}
                  </span>
                  <span className="rounded-md border border-slate-800 bg-slate-950/70 px-2 py-0.5">
                    {personality.alignment.name}
                  </span>
                  {powers && (
                    <span className="rounded-md border border-violet-500/40 bg-violet-950/40 px-2 py-0.5 text-violet-200">
                      {powers.elementalAffinity.element} · {powers.prtClassification.name}
                    </span>
                  )}
                </div>
              </LockableCard>
            </div>
          </div>

          {/* Botón destacado Guardar en Colección */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/15 px-4 py-2.5">
            <div className="text-xs text-slate-300">
              {isSavedInCollection
                ? 'Este personaje está guardado en tu biblioteca permanente.'
                : '¿Te gustó este personaje? Guárdalo junto con su imagen en tu colección.'}
            </div>
            <button
              type="button"
              onClick={handleSaveClick}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
                justSavedFeedback
                  ? 'bg-emerald-400 text-slate-950'
                  : isSavedInCollection
                    ? 'border border-emerald-500/60 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
                    : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 hover:bg-emerald-400'
              }`}
            >
              {justSavedFeedback ? (
                <>
                  <Check className="h-4 w-4" />
                  ¡Guardado!
                </>
              ) : isSavedInCollection ? (
                <>
                  <BookmarkCheck className="h-4 w-4" />
                  Actualizar en Colección
                </>
              ) : (
                <>
                  <BookmarkPlus className="h-4 w-4" />
                  Guardar Personaje
                </>
              )}
            </button>
          </div>

          {/* Subversión y Contraste */}
          <LockableCard
            lockKey="subversion"
            isLocked={Boolean(locks.subversion)}
            onToggleLock={onToggleLock}
            label="Motor de Contraste & Subversión"
            badge={
              subversion.paradigm
                ? 'Subversión Activa'
                : subversion.isSubverted
                  ? 'Contraste Orgánico'
                  : 'Perfil Coherente'
            }
            title={
              subversion.paradigm
                ? subversion.paradigm.name
                : subversion.isSubverted
                  ? 'Contraste emergente por combinación'
                  : 'Sin subversión forzada'
            }
            subtitle={
              subversion.paradigm
                ? `${subversion.paradigm.apparentVisualParadigm} → ${subversion.paradigm.realMechanicalCapacity}`
                : 'Coherencia arquetípica entre silueta, raza y psicología.'
            }
            className={subversion.paradigm ? 'ring-1 ring-rose-500/30' : ''}
          >
            {subversion.paradigm && (
              <div className="mb-2 flex items-start gap-1.5 rounded-lg border border-rose-500/20 bg-rose-950/20 p-2 text-xs text-rose-200">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-rose-400" />
                <span>
                  <strong>Contraste:</strong> {subversion.paradigm.internalPsychologicalContrast} ({subversion.paradigm.cognitiveEffect})
                </span>
              </div>
            )}
            {subversion.appliedContrastRules.length > 0 && (
              <ul className="space-y-1 text-xs text-slate-300">
                {subversion.appliedContrastRules.map((rule) => (
                  <li key={rule} className="flex items-start gap-1.5">
                    <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            )}
          </LockableCard>

          {/* Paleta 60-30-10 */}
          <div className="grid gap-3 sm:grid-cols-3">
            <LockableCard
              lockKey="colorPalette"
              isLocked={Boolean(locks.colorPalette)}
              onToggleLock={onToggleLock}
              label="Paleta 60-30-10"
              title={`${dominant.name} · ${secondary.name} · ${accent.name}`}
              className="sm:col-span-2"
            >
              <div className="flex h-5 w-full overflow-hidden rounded-lg border border-slate-700/80">
                <div
                  style={{ width: '60%', backgroundColor: dominant.previewHex }}
                  className={`flex items-center justify-center text-[10px] font-bold ${getBarTextClass(dominant.id)}`}
                >
                  60%
                </div>
                <div
                  style={{ width: '30%', backgroundColor: secondary.previewHex }}
                  className={`flex items-center justify-center text-[10px] font-bold ${getBarTextClass(secondary.id)}`}
                >
                  30%
                </div>
                <div
                  style={{ width: '10%', backgroundColor: accent.previewHex }}
                  className={`flex items-center justify-center text-[10px] font-bold ${getBarTextClass(accent.id)}`}
                >
                  10%
                </div>
              </div>
            </LockableCard>

            <LockableCard
              lockKey="colorScript"
              isLocked={Boolean(locks.colorScript)}
              onToggleLock={onToggleLock}
              label="Color Script"
              title={appearance.colorScript?.name ?? 'Paleta Estática'}
              subtitle={appearance.colorScript?.referenceCase ?? 'Sin progresión temporal'}
            />
          </div>
        </div>
      </div>

      {/* Modal Lightbox para ampliar la imagen generada */}
      {isLightboxOpen && generatedImageDataUrl && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-2"
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Cerrar vista ampliada"
              className="absolute top-4 right-4 rounded-lg bg-slate-950/80 p-2 text-slate-200 hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={generatedImageDataUrl}
              alt={`Vista ampliada de ${name.fullName}`}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
