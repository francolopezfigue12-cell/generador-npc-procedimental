import { useCallback, useEffect, useMemo, useState } from 'react';
import { generateNpc } from '../engine/generateNpc';
import { buildCharacterNarrative } from '../engine/narrativeBuilder';
import { generateRandomSeed } from '../engine/rng';
import { buildTurnaroundPrompt } from '../prompts/turnaroundPromptBuilder';
import {
  generateTurnaroundWithFreeLlmApi,
  loadFreeLlmApiConfig,
  saveFreeLlmApiConfig,
  type FreeLlmApiConfig,
} from '../services/freellmapi';
import {
  deleteSavedCharacter,
  getAllSavedCharacters,
  getRecentHistory,
  importSavedCharacters,
  pushRecentHistory,
  upsertSavedCharacter,
} from '../storage/npcDatabase';
import type {
  LockableFieldKey,
  LockState,
  NpcProfile,
  SavedNpcRecord,
} from '../types/character';

export type ContrastMode = 'classic' | 'balanced' | 'high' | 'forced';

const CONTRAST_CONFIG: Record<
  ContrastMode,
  { label: string; forceSubversion: boolean; subversionProbability: number }
> = {
  classic: {
    label: 'Clásico Coherente (0% forzada)',
    forceSubversion: false,
    subversionProbability: 0,
  },
  balanced: {
    label: 'Balanceado (35% contraste)',
    forceSubversion: false,
    subversionProbability: 0.35,
  },
  high: {
    label: 'Alto Contraste (70%)',
    forceSubversion: false,
    subversionProbability: 0.7,
  },
  forced: {
    label: 'Forzar Subversión (100%)',
    forceSubversion: true,
    subversionProbability: 1,
  },
};

export { CONTRAST_CONFIG };

export function useNpcGenerator() {
  const [powersEnabled, setPowersEnabled] = useState<boolean>(true);
  const [contrastMode, setContrastMode] = useState<ContrastMode>('balanced');
  const [locks, setLocks] = useState<LockState>({});
  const [npc, setNpc] = useState<NpcProfile>(() =>
    generateNpc({
      seed: generateRandomSeed(),
      powersConfig: { enabled: true },
      subversionProbability: 0.35,
    })
  );

  const [generatedImageDataUrl, setGeneratedImageDataUrl] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);
  const [freeLlmApiConfig, setFreeLlmApiConfig] = useState<FreeLlmApiConfig>(() =>
    loadFreeLlmApiConfig()
  );

  const [savedCharacters, setSavedCharacters] = useState<SavedNpcRecord[]>([]);
  const [recentHistory, setRecentHistory] = useState<SavedNpcRecord[]>([]);

  // Cargar colección e historial persistidos desde IndexedDB al iniciar
  useEffect(() => {
    let active = true;
    void (async () => {
      const [saved, history] = await Promise.all([
        getAllSavedCharacters(),
        getRecentHistory(),
      ]);
      if (!active) return;
      setSavedCharacters(saved);
      setRecentHistory(history);
    })();
    return () => {
      active = false;
    };
  }, []);

  // Registrar automáticamente cada personaje nuevo en el historial reciente
  useEffect(() => {
    let active = true;
    void pushRecentHistory(npc, generatedImageDataUrl).then((updated) => {
      if (active) setRecentHistory(updated);
    });
    return () => {
      active = false;
    };
  }, [npc, generatedImageDataUrl]);

  const lockedCount = useMemo(
    () => Object.values(locks).filter(Boolean).length,
    [locks]
  );

  const turnaroundPrompt = useMemo(() => buildTurnaroundPrompt(npc), [npc]);
  const narrative = useMemo(() => buildCharacterNarrative(npc), [npc]);

  const isSavedInCollection = useMemo(
    () => savedCharacters.some((item) => item.id === npc.id),
    [npc.id, savedCharacters]
  );

  const updateFreeLlmApiConfig = useCallback((next: FreeLlmApiConfig) => {
    setFreeLlmApiConfig(next);
    saveFreeLlmApiConfig(next);
  }, []);

  const generateFresh = useCallback(
    (explicitSeed?: string) => {
      const cfg = CONTRAST_CONFIG[contrastMode];
      const nextNpc = generateNpc({
        seed: explicitSeed ?? generateRandomSeed(),
        powersConfig: { enabled: powersEnabled },
        forceSubversion: cfg.forceSubversion,
        subversionProbability: cfg.subversionProbability,
      });
      setNpc(nextNpc);
      setGeneratedImageDataUrl(null);
      setNotes('');
      setImageError(null);
    },
    [contrastMode, powersEnabled]
  );

  const regenerateUnlocked = useCallback(() => {
    const cfg = CONTRAST_CONFIG[contrastMode];
    const nextNpc = generateNpc({
      seed: generateRandomSeed(),
      powersConfig: { enabled: powersEnabled },
      forceSubversion: cfg.forceSubversion,
      subversionProbability: cfg.subversionProbability,
      locks,
      previousProfile: npc,
    });
    setNpc(nextNpc);
    setGeneratedImageDataUrl(null);
    setImageError(null);
  }, [contrastMode, locks, npc, powersEnabled]);

  const togglePowersModule = useCallback((nextEnabled: boolean) => {
    setPowersEnabled(nextEnabled);
    if (!nextEnabled) {
      setNpc((prev) => ({ ...prev, powers: null }));
      setLocks((prev) => ({
        ...prev,
        elementalAffinity: false,
        prtClassification: false,
        biologicalTier: false,
        operationalCost: false,
      }));
    } else {
      setNpc((prev) => {
        if (prev.powers) return prev;
        const allLocked: LockState = {
          name: true,
          externalMotivation: true,
          internalMotivation: true,
          archetype: true,
          fatalFlaw: true,
          minorQuirk: true,
          virtue: true,
          defenseMechanism: true,
          socialAttitude: true,
          hiddenSecret: true,
          breakingPoint: true,
          alignment: true,
          dyadicTraits: true,
          bindingPassion: true,
          race: true,
          ageGroup: true,
          gender: true,
          biotype: true,
          shapeLanguage: true,
          colorPalette: true,
          colorScript: true,
          hairCut: true,
          hairColor: true,
          skinTone: true,
          eyeAnomaly: true,
          clothingStyle: true,
          tattooOrMark: true,
          eyewear: true,
          patchOrMask: true,
          amputation: true,
          prosthetic: true,
          bodyModifications: true,
          subversion: true,
        };
        return generateNpc({
          seed: generateRandomSeed(),
          powersConfig: { enabled: true },
          locks: allLocked,
          previousProfile: prev,
        });
      });
    }
  }, []);

  const toggleLock = useCallback((key: LockableFieldKey) => {
    setLocks((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const unlockAll = useCallback(() => {
    setLocks({});
  }, []);

  const generateAiImage = useCallback(async () => {
    setIsGeneratingImage(true);
    setImageError(null);
    try {
      const result = await generateTurnaroundWithFreeLlmApi(
        freeLlmApiConfig,
        turnaroundPrompt.masterPrompt,
        turnaroundPrompt.negativePrompt
      );
      setGeneratedImageDataUrl(result.imageDataUrl);
    } catch (err) {
      setImageError(
        err instanceof Error
          ? err.message
          : 'Error inesperado al generar imagen con FreeLLMAPI.'
      );
    } finally {
      setIsGeneratingImage(false);
    }
  }, [freeLlmApiConfig, turnaroundPrompt.masterPrompt, turnaroundPrompt.negativePrompt]);

  const setManualImage = useCallback((dataUrl: string | null) => {
    setGeneratedImageDataUrl(dataUrl);
    setImageError(null);
  }, []);

  const saveCurrentToCollection = useCallback(async () => {
    const existing = savedCharacters.find((item) => item.id === npc.id);
    const record: SavedNpcRecord = {
      id: npc.id,
      profile: npc,
      generatedImageDataUrl,
      isFavorite: existing?.isFavorite ?? false,
      savedAtIso: new Date().toISOString(),
      notes: notes.trim() || undefined,
    };
    await upsertSavedCharacter(record);
    setSavedCharacters((prev) => {
      const others = prev.filter((item) => item.id !== record.id);
      return [record, ...others];
    });
  }, [generatedImageDataUrl, npc, savedCharacters]);

  const loadSavedRecord = useCallback((record: SavedNpcRecord) => {
    setPowersEnabled(Boolean(record.profile.powers));
    setNpc(record.profile);
    setGeneratedImageDataUrl(record.generatedImageDataUrl ?? null);
    setNotes(record.notes ?? '');
    setImageError(null);
    setLocks({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const removeSavedRecord = useCallback(async (id: string) => {
    await deleteSavedCharacter(id);
    setSavedCharacters((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toggleFavoriteRecord = useCallback(
    async (id: string) => {
      const target = savedCharacters.find((item) => item.id === id);
      if (!target) return;
      const updated: SavedNpcRecord = {
        ...target,
        isFavorite: !target.isFavorite,
      };
      await upsertSavedCharacter(updated);
      setSavedCharacters((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    },
    [savedCharacters]
  );

  const importRecords = useCallback(async (records: readonly SavedNpcRecord[]) => {
    const imported = await importSavedCharacters(records);
    if (imported > 0) {
      const refreshed = await getAllSavedCharacters();
      setSavedCharacters(refreshed);
    }
  }, []);

  return {
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
  };
}
