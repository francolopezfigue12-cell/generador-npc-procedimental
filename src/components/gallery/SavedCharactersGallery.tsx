import { useMemo, useRef, useState } from 'react';
import {
  Archive,
  Download,
  History,
  ImageIcon,
  Search,
  Star,
  Trash2,
  Upload,
} from 'lucide-react';
import type { SavedNpcRecord } from '../../types/character';
import { ProceduralNpcAvatar } from '../visual/ProceduralNpcAvatar';

interface SavedCharactersGalleryProps {
  readonly savedCharacters: readonly SavedNpcRecord[];
  readonly recentHistory: readonly SavedNpcRecord[];
  readonly currentId: string;
  readonly onLoadRecord: (record: SavedNpcRecord) => void;
  readonly onDeleteSaved: (id: string) => void;
  readonly onToggleFavorite: (id: string) => void;
  readonly onImportRecords: (records: readonly SavedNpcRecord[]) => void;
}

type GalleryFilter = 'all' | 'favorites' | 'with_image';

export function SavedCharactersGallery({
  savedCharacters,
  recentHistory,
  currentId,
  onLoadRecord,
  onDeleteSaved,
  onToggleFavorite,
  onImportRecords,
}: SavedCharactersGalleryProps) {
  const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<GalleryFilter>('all');
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const filteredSaved = useMemo(() => {
    const q = query.trim().toLowerCase();
    return savedCharacters.filter((rec) => {
      if (filter === 'favorites' && !rec.isFavorite) return false;
      if (filter === 'with_image' && !rec.generatedImageDataUrl) return false;
      if (!q) return true;
      return (
        rec.profile.name.fullName.toLowerCase().includes(q) ||
        rec.profile.appearance.race.name.toLowerCase().includes(q) ||
        rec.profile.personality.archetype.archetype.toLowerCase().includes(q)
      );
    });
  }, [filter, query, savedCharacters]);

  const handleExportCollection = () => {
    const blob = new Blob([JSON.stringify(savedCharacters, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coleccion-npcs-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (typeof reader.result !== 'string') return;
        const parsed = JSON.parse(reader.result);
        if (Array.isArray(parsed)) {
          onImportRecords(parsed as SavedNpcRecord[]);
        }
      } catch {
        // Ignorar JSON inválido
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const itemsToShow = activeTab === 'saved' ? filteredSaved : recentHistory;

  return (
    <section id="coleccion-personajes" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              activeTab === 'saved'
                ? 'bg-amber-500 text-slate-950'
                : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            <Archive className="h-3.5 w-3.5" />
            Mi Colección Guardada ({savedCharacters.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              activeTab === 'history'
                ? 'bg-sky-500 text-slate-950'
                : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
            }`}
          >
            <History className="h-3.5 w-3.5" />
            Historial Reciente ({recentHistory.length})
          </button>
        </div>

        {activeTab === 'saved' && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportCollection}
              disabled={savedCharacters.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white disabled:opacity-40"
            >
              <Download className="h-3.5 w-3.5" />
              Respaldar Colección (.json)
            </button>

            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImportFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => importInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              <Upload className="h-3.5 w-3.5" />
              Importar
            </button>
          </div>
        )}
      </div>

      {activeTab === 'saved' && savedCharacters.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="relative min-w-[220px] flex-1 max-w-sm">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, raza o arquetipo..."
              className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pr-3 pl-8 text-xs text-slate-100 placeholder:text-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {[
              { id: 'all', label: 'Todos' },
              { id: 'favorites', label: 'Favoritos' },
              { id: 'with_image', label: 'Con Imagen IA' },
            ].map((pill) => (
              <button
                key={pill.id}
                type="button"
                onClick={() => setFilter(pill.id as GalleryFilter)}
                className={`rounded-lg border px-2.5 py-1 font-medium transition ${
                  filter === pill.id
                    ? 'border-amber-500/60 bg-amber-500/15 text-amber-200'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {itemsToShow.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-6 text-center text-xs text-slate-400">
          {activeTab === 'saved'
            ? 'Todavía no tienes personajes guardados con esos criterios. Presiona "Guardar Personaje" arriba cuando te guste uno.'
            : 'Aquí aparecerán automáticamente los últimos personajes que generes en esta sesión.'}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {itemsToShow.map((rec) => {
            const isCurrent = rec.id === currentId;
            return (
              <div
                key={rec.id}
                className={`group flex flex-col overflow-hidden rounded-xl border transition ${
                  isCurrent
                    ? 'border-amber-500/70 bg-amber-950/20'
                    : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onLoadRecord(rec)}
                  className="relative h-44 w-full overflow-hidden bg-slate-950 text-left"
                >
                  {rec.generatedImageDataUrl ? (
                    <img
                      src={rec.generatedImageDataUrl}
                      alt={rec.profile.name.fullName}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <ProceduralNpcAvatar
                      npc={rec.profile}
                      className="h-full w-full"
                    />
                  )}
                  {rec.generatedImageDataUrl && (
                    <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-slate-950/80 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300 backdrop-blur">
                      <ImageIcon className="h-3 w-3" />
                      IA
                    </span>
                  )}
                </button>

                <div className="flex flex-1 flex-col justify-between p-3">
                  <button
                    type="button"
                    onClick={() => onLoadRecord(rec)}
                    className="text-left"
                  >
                    <div className="truncate text-sm font-bold text-slate-100">
                      {rec.profile.name.fullName}
                    </div>
                    <div className="truncate text-xs text-slate-400">
                      {rec.profile.appearance.race.name} ·{' '}
                      {rec.profile.personality.archetype.archetype}
                    </div>
                  </button>

                  <div className="mt-2.5 flex items-center justify-between border-t border-slate-800/80 pt-2">
                    <div className="flex items-center gap-1">
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-white/20"
                        style={{
                          backgroundColor:
                            rec.profile.appearance.colorPalette.dominant.previewHex,
                        }}
                      />
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-white/20"
                        style={{
                          backgroundColor:
                            rec.profile.appearance.colorPalette.secondary.previewHex,
                        }}
                      />
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-white/20"
                        style={{
                          backgroundColor:
                            rec.profile.appearance.colorPalette.accent.previewHex,
                        }}
                      />
                      <span className="ml-1 font-mono text-[10px] text-slate-500">
                        {rec.profile.seed}
                      </span>
                    </div>

                    {activeTab === 'saved' && (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(rec.id)}
                          aria-label={
                            rec.isFavorite ? 'Quitar favorito' : 'Marcar favorito'
                          }
                          className={`rounded-md p-1 transition ${
                            rec.isFavorite
                              ? 'text-amber-400 hover:bg-slate-800'
                              : 'text-slate-500 hover:bg-slate-800 hover:text-amber-300'
                          }`}
                        >
                          <Star
                            className="h-3.5 w-3.5"
                            fill={rec.isFavorite ? 'currentColor' : 'none'}
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteSaved(rec.id)}
                          aria-label={`Eliminar ${rec.profile.name.fullName}`}
                          className="rounded-md p-1 text-slate-500 transition hover:bg-slate-800 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
