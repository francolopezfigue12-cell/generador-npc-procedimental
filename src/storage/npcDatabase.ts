import type { NpcProfile, SavedNpcRecord } from '../types/character';

const DB_NAME = 'generar_npc_library_db';
const DB_VERSION = 1;
const SAVED_STORE = 'saved_characters';
const HISTORY_STORE = 'recent_history';
const LEGACY_LOCALSTORAGE_KEY = 'npc_generator_roster_v1';
const MIGRATION_DONE_KEY = 'npc_generator_idb_migrated_v1';

const MAX_RECENT_HISTORY = 20;

function hasIndexedDb(): boolean {
  return typeof indexedDB !== 'undefined';
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(SAVED_STORE)) {
        const store = db.createObjectStore(SAVED_STORE, { keyPath: 'id' });
        store.createIndex('savedAtIso', 'savedAtIso', { unique: false });
      }
      if (!db.objectStoreNames.contains(HISTORY_STORE)) {
        const hist = db.createObjectStore(HISTORY_STORE, { keyPath: 'id' });
        hist.createIndex('savedAtIso', 'savedAtIso', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Error abriendo IndexedDB'));
  });
}

function runTx<T>(
  storeName: string,
  mode: IDBTransactionMode,
  executor: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return openDatabase().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const tx = db.transaction(storeName, mode);
        const store = tx.objectStore(storeName);
        const req = executor(store);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error ?? new Error('Error en IndexedDB'));
        tx.oncomplete = () => db.close();
      })
  );
}

/**
 * Migra una sola vez los personajes guardados en localStorage hacia IndexedDB.
 */
async function migrateLegacyLocalStorage(): Promise<void> {
  if (typeof localStorage === 'undefined') return;
  if (localStorage.getItem(MIGRATION_DONE_KEY) === '1') return;

  try {
    const raw = localStorage.getItem(LEGACY_LOCALSTORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && typeof item.id === 'string' && item.name && item.appearance) {
            const profile = item as NpcProfile;
            const record: SavedNpcRecord = {
              id: profile.id,
              profile,
              generatedImageDataUrl: null,
              isFavorite: false,
              savedAtIso: profile.generatedAtIso ?? new Date().toISOString(),
            };
            await runTx(SAVED_STORE, 'readwrite', (s) => s.put(record));
          }
        }
      }
    }
    localStorage.setItem(MIGRATION_DONE_KEY, '1');
  } catch {
    // No bloquear la app si falla migración heredada
  }
}

export async function getAllSavedCharacters(): Promise<SavedNpcRecord[]> {
  const byId = new Map<string, SavedNpcRecord>();

  if (hasIndexedDb()) {
    await migrateLegacyLocalStorage();
    const idbRows = await runTx<SavedNpcRecord[]>(SAVED_STORE, 'readonly', (s) =>
      s.getAll()
    );
    for (const row of idbRows) {
      byId.set(row.id, row);
    }
  }

  // Sincronizar también desde carpeta local `/coleccion/` si el servidor dev está activo
  if (typeof fetch !== 'undefined' && typeof window !== 'undefined') {
    try {
      const res = await fetch('/__collection');
      if (res.ok) {
        const diskRows = (await res.json()) as SavedNpcRecord[];
        for (const row of diskRows) {
          if (row?.id && !byId.has(row.id)) {
            byId.set(row.id, row);
          }
        }
      }
    } catch {
      // Ignorar si no hay servidor dev con middleware de disco
    }
  }

  return Array.from(byId.values()).sort((a, b) =>
    b.savedAtIso.localeCompare(a.savedAtIso)
  );
}

export async function upsertSavedCharacter(record: SavedNpcRecord): Promise<void> {
  if (hasIndexedDb()) {
    await runTx(SAVED_STORE, 'readwrite', (s) => s.put(record));
  }
  if (typeof fetch !== 'undefined' && typeof window !== 'undefined') {
    try {
      await fetch('/__collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    } catch {
      // Ignorar si falla guardado en disco
    }
  }
}

export async function deleteSavedCharacter(id: string): Promise<void> {
  if (hasIndexedDb()) {
    await runTx(SAVED_STORE, 'readwrite', (s) => s.delete(id));
  }
  if (typeof fetch !== 'undefined' && typeof window !== 'undefined') {
    try {
      await fetch(`/__collection/${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
    } catch {
      // Ignorar si falla borrado en disco
    }
  }
}

export async function importSavedCharacters(
  records: readonly SavedNpcRecord[]
): Promise<number> {
  if (!hasIndexedDb() || records.length === 0) return 0;
  const db = await openDatabase();
  return new Promise<number>((resolve, reject) => {
    const tx = db.transaction(SAVED_STORE, 'readwrite');
    const store = tx.objectStore(SAVED_STORE);
    let count = 0;
    for (const rec of records) {
      if (rec && rec.id && rec.profile?.name && rec.profile?.appearance) {
        store.put(rec);
        count += 1;
      }
    }
    tx.oncomplete = () => {
      db.close();
      resolve(count);
    };
    tx.onerror = () => {
      db.close();
      reject(tx.error ?? new Error('Error importando personajes'));
    };
  });
}

export async function getRecentHistory(): Promise<SavedNpcRecord[]> {
  if (!hasIndexedDb()) return [];
  const rows = await runTx<SavedNpcRecord[]>(HISTORY_STORE, 'readonly', (s) => s.getAll());
  return [...rows].sort((a, b) => b.savedAtIso.localeCompare(a.savedAtIso));
}

export async function pushRecentHistory(
  profile: NpcProfile,
  generatedImageDataUrl: string | null
): Promise<SavedNpcRecord[]> {
  if (!hasIndexedDb()) return [];
  const entry: SavedNpcRecord = {
    id: profile.id,
    profile,
    generatedImageDataUrl,
    isFavorite: false,
    savedAtIso: new Date().toISOString(),
  };
  await runTx(HISTORY_STORE, 'readwrite', (s) => s.put(entry));

  const all = await getRecentHistory();
  if (all.length > MAX_RECENT_HISTORY) {
    const toDelete = all.slice(MAX_RECENT_HISTORY);
    for (const old of toDelete) {
      await runTx(HISTORY_STORE, 'readwrite', (s) => s.delete(old.id));
    }
    return all.slice(0, MAX_RECENT_HISTORY);
  }
  return all;
}
