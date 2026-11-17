import { useState } from 'react';
import { BookOpen, Check, Copy, StickyNote } from 'lucide-react';
import type { CharacterNarrative } from '../../engine/narrativeBuilder';

interface CharacterStoryPanelProps {
  readonly narrative: CharacterNarrative;
  readonly notes: string;
  readonly onChangeNotes: (next: string) => void;
}

export function CharacterStoryPanel({
  narrative,
  notes,
  onChangeNotes,
}: CharacterStoryPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(narrative.fullText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignorar si clipboard no está disponible
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-amber-400" />
          <h2 className="text-sm font-bold tracking-wider text-slate-100 uppercase">
            Historia del Personaje (Lectura de Corrido)
          </h2>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-amber-500/50 hover:text-amber-200"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              ¡Historia copiada!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copiar Historia
            </>
          )}
        </button>
      </div>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-200">
        {narrative.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-5 border-t border-slate-800/80 pt-4">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
          <StickyNote className="h-3.5 w-3.5 text-sky-400" />
          Notas personales o de campaña (se guardan con el personaje)
        </label>
        <textarea
          value={notes}
          onChange={(e) => onChangeNotes(e.target.value)}
          rows={2}
          placeholder="Ej. Tabernero del puerto en la sesión 3, aliado secreto de los rebeldes..."
          className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
        />
      </div>
    </section>
  );
}
