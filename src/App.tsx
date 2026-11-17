import { useState } from 'react';
import { ControlBar } from './components/controls/ControlBar';
import { SavedCharactersGallery } from './components/gallery/SavedCharactersGallery';
import { AppearanceSection } from './components/profile/AppearanceSection';
import { CharacterStoryPanel } from './components/profile/CharacterStoryPanel';
import { PowersSection } from './components/profile/PowersSection';
import { PsychologySection } from './components/profile/PsychologySection';
import { TurnaroundPromptPanel } from './components/turnaround/TurnaroundPromptPanel';
import { CharacterVisualStage } from './components/visual/CharacterVisualStage';
import { FreeLlmApiModal } from './components/visual/FreeLlmApiModal';
import { exportNpcToMarkdown } from './engine/exporters';
import { useNpcGenerator } from './hooks/useNpcGenerator';

function downloadTextFile(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function App() {
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);

  const {
    npc,
    locks,
    lockedCount,
    powersEnabled,
    contrastMode,
    turnaroundPrompt,
    narrative,
    notes,
    generatedImageDataUrl,
    isGeneratingImage,
    imageError,
    freeLlmApiConfig,
    savedCharacters,
    recentHistory,
    isSavedInCollection,
    setNotes,
    setContrastMode,
    updateFreeLlmApiConfig,
    togglePowersModule,
    toggleLock,
    unlockAll,
    generateFresh,
    regenerateUnlocked,
    generateAiImage,
    setManualImage,
    saveCurrentToCollection,
    loadSavedRecord,
    removeSavedRecord,
    toggleFavoriteRecord,
    importRecords,
  } = useNpcGenerator();

  const slug = npc.name.fullName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const handleExportJson = () => {
    downloadTextFile(
      `${slug || 'npc'}-${npc.seed}.json`,
      JSON.stringify({ npc, turnaroundPrompt, generatedImageDataUrl }, null, 2),
      'application/json'
    );
  };

  const handleExportMarkdown = () => {
    downloadTextFile(
      `${slug || 'npc'}-${npc.seed}.md`,
      exportNpcToMarkdown(npc, turnaroundPrompt),
      'text/markdown'
    );
  };

  const hasApiKeyConfigured = freeLlmApiConfig.apiKey.trim().length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <ControlBar
        currentSeed={npc.seed}
        lockedCount={lockedCount}
        savedCount={savedCharacters.length}
        powersEnabled={powersEnabled}
        contrastMode={contrastMode}
        hasApiKeyConfigured={hasApiKeyConfigured}
        onGenerateFresh={generateFresh}
        onRegenerateUnlocked={regenerateUnlocked}
        onTogglePowers={togglePowersModule}
        onChangeContrastMode={setContrastMode}
        onUnlockAll={unlockAll}
        onSaveCollection={() => void saveCurrentToCollection()}
        onOpenApiSettings={() => setIsApiModalOpen(true)}
        onExportJson={handleExportJson}
        onExportMarkdown={handleExportMarkdown}
      />

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">
        {/* 1. PRIMERO LO VISUAL + RESUMEN RÁPIDO */}
        <CharacterVisualStage
          npc={npc}
          locks={locks}
          generatedImageDataUrl={generatedImageDataUrl}
          isGeneratingImage={isGeneratingImage}
          imageError={imageError}
          hasApiKeyConfigured={hasApiKeyConfigured}
          isSavedInCollection={isSavedInCollection}
          onToggleLock={toggleLock}
          onGenerateImage={() => void generateAiImage()}
          onSetManualImage={setManualImage}
          onOpenApiSettings={() => setIsApiModalOpen(true)}
          onSaveToCollection={() => void saveCurrentToCollection()}
        />

        {/* 1.5 HISTORIA DE CORRIDO + NOTAS PERSONALES */}
        <CharacterStoryPanel
          narrative={narrative}
          notes={notes}
          onChangeNotes={setNotes}
        />

        {/* Navegación rápida hacia la información detallada y galería */}
        <nav
          aria-label="Secciones del personaje"
          className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/40 px-3 py-2 text-xs text-slate-400"
        >
          <span className="font-semibold text-slate-300">Ver detalle:</span>
          <a href="#apariencia-detalle" className="rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white">
            Apariencia y Candados
          </a>
          <a href="#psicologia-detalle" className="rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white">
            Psicología (10 Subdivisiones)
          </a>
          <a href="#poderes-detalle" className="rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white">
            Poderes
          </a>
          <a href="#prompt-turnaround" className="rounded-md px-2 py-1 hover:bg-slate-800 hover:text-white">
            Prompt Turnaround
          </a>
          <a href="#coleccion-personajes" className="rounded-md px-2 py-1 text-amber-300 hover:bg-slate-800">
            Mi Colección ({savedCharacters.length})
          </a>
        </nav>

        {/* 2. TODA LA INFORMACIÓN DETALLADA DEL PERSONAJE */}
        <div id="apariencia-detalle">
          <AppearanceSection
            appearance={npc.appearance}
            locks={locks}
            onToggleLock={toggleLock}
          />
        </div>

        <div id="psicologia-detalle">
          <PsychologySection
            personality={npc.personality}
            locks={locks}
            onToggleLock={toggleLock}
          />
        </div>

        <div id="poderes-detalle">
          <PowersSection
            enabled={powersEnabled}
            powers={npc.powers}
            locks={locks}
            onToggleLock={toggleLock}
            onEnableModule={() => togglePowersModule(true)}
          />
        </div>

        <div id="prompt-turnaround">
          <TurnaroundPromptPanel
            npc={npc}
            turnaround={turnaroundPrompt}
          />
        </div>

        {/* 3. COLECCIÓN GUARDADA + HISTORIAL DE SESIÓN */}
        <SavedCharactersGallery
          savedCharacters={savedCharacters}
          recentHistory={recentHistory}
          currentId={npc.id}
          onLoadRecord={loadSavedRecord}
          onDeleteSaved={(id) => void removeSavedRecord(id)}
          onToggleFavorite={(id) => void toggleFavoriteRecord(id)}
          onImportRecords={(records) => void importRecords(records)}
        />
      </main>

      <FreeLlmApiModal
        isOpen={isApiModalOpen}
        config={freeLlmApiConfig}
        onSaveConfig={updateFreeLlmApiConfig}
        onClose={() => setIsApiModalOpen(false)}
      />
    </div>
  );
}

export default App;
