export interface FreeLlmApiConfig {
  readonly baseUrl: string;
  readonly apiKey: string;
  readonly model: string;
  readonly preferredSize: '1344x768' | '1024x1024';
}

export const DEFAULT_FREELLMAPI_CONFIG: FreeLlmApiConfig = {
  baseUrl: 'http://127.0.0.1:31415',
  apiKey: '',
  model: 'auto',
  preferredSize: '1344x768',
};

const CONFIG_STORAGE_KEY = 'freellmapi_settings_v1';
const PORT_FIX_MIGRATED_KEY = 'freellmapi_port31415_migrated_v1';

export function normalizeBaseUrl(rawUrl: string): string {
  return rawUrl.trim().replace(/\/+$/, '').replace(/\/v1$/i, '');
}

export function loadFreeLlmApiConfig(): FreeLlmApiConfig {
  if (typeof localStorage === 'undefined') {
    return DEFAULT_FREELLMAPI_CONFIG;
  }
  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (!raw) return DEFAULT_FREELLMAPI_CONFIG;
    const parsed = JSON.parse(raw) as Partial<FreeLlmApiConfig>;

    let baseUrl =
      typeof parsed.baseUrl === 'string' && parsed.baseUrl.trim()
        ? parsed.baseUrl
        : DEFAULT_FREELLMAPI_CONFIG.baseUrl;

    // Migrar una sola vez el valor por defecto anterior (localhost:3001) al puerto real de la app desktop (31415)
    if (
      baseUrl === 'http://localhost:3001' &&
      localStorage.getItem(PORT_FIX_MIGRATED_KEY) !== '1'
    ) {
      baseUrl = DEFAULT_FREELLMAPI_CONFIG.baseUrl;
      localStorage.setItem(PORT_FIX_MIGRATED_KEY, '1');
      localStorage.setItem(
        CONFIG_STORAGE_KEY,
        JSON.stringify({ ...parsed, baseUrl })
      );
    }

    return {
      baseUrl,
      apiKey: typeof parsed.apiKey === 'string' ? parsed.apiKey : '',
      model:
        typeof parsed.model === 'string' && parsed.model.trim()
          ? parsed.model
          : DEFAULT_FREELLMAPI_CONFIG.model,
      preferredSize:
        parsed.preferredSize === '1024x1024' ? '1024x1024' : '1344x768',
    };
  } catch {
    return DEFAULT_FREELLMAPI_CONFIG;
  }
}

export function saveFreeLlmApiConfig(config: FreeLlmApiConfig): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignorar errores de almacenamiento
  }
}

function shouldUseLocalViteProxy(targetUrl: string): boolean {
  try {
    const parsed = new URL(targetUrl);
    return (
      typeof window !== 'undefined' &&
      parsed.protocol === 'http:' &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')
    );
  } catch {
    return false;
  }
}

async function performApiFetch(
  targetUrl: string,
  init: { method: 'GET' | 'POST'; headers: Record<string, string>; body?: string }
): Promise<Response> {
  if (shouldUseLocalViteProxy(targetUrl)) {
    return fetch('/__freellmapi', {
      method: init.method,
      headers: {
        ...init.headers,
        'x-freellmapi-target': targetUrl,
      },
      body: init.body,
    });
  }
  return fetch(targetUrl, init);
}

export async function fetchFreeLlmApiModels(
  config: FreeLlmApiConfig
): Promise<string[]> {
  const base = normalizeBaseUrl(config.baseUrl);
  if (!base) {
    throw new Error('Ingresa la dirección donde corre FreeLLMAPI (ej. http://localhost:3001).');
  }

  const headers: Record<string, string> = {};
  if (config.apiKey.trim()) {
    headers.Authorization = `Bearer ${config.apiKey.trim()}`;
  }

  const response = await performApiFetch(`${base}/v1/models`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${bodyText.slice(0, 180) || response.statusText}`
    );
  }

  const json = (await response.json()) as { data?: Array<{ id?: string }> };
  const ids = (json.data ?? [])
    .map((m) => m.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0);

  return Array.from(new Set(ids));
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('No se pudo convertir la imagen recibida.'));
      }
    };
    reader.onerror = () => reject(new Error('Error leyendo imagen recibida.'));
    reader.readAsDataURL(blob);
  });
}

export interface ImageGenerationResult {
  readonly imageDataUrl: string;
  readonly usedSize: string;
}

export function extractImageFromOpenAiPayload(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null;
  const obj = payload as {
    data?: Array<{ b64_json?: string; url?: string }>;
  };
  const first = obj.data?.[0];
  if (!first) return null;

  if (typeof first.b64_json === 'string' && first.b64_json.length > 0) {
    return first.b64_json.startsWith('data:')
      ? first.b64_json
      : `data:image/png;base64,${first.b64_json}`;
  }
  if (typeof first.url === 'string' && first.url.length > 0) {
    return first.url;
  }
  return null;
}

export function formatFreeLlmApiError(status: number, bodyText: string): string {
  if (/no usable keys|all image providers failed/i.test(bodyText)) {
    return 'Tu FreeLLMAPI sí conectó, pero no tiene ninguna clave válida de un proveedor de IMÁGENES activa (solo tienes claves de texto/chat, o están desactivadas). En FreeLLMAPI agrega una clave con soporte de imagen (ej. Hugging Face, Cloudflare Workers AI, Google Gemini/AI Studio o Together) y activa un modelo en "Models → Image".';
  }
  return `HTTP ${status}: ${bodyText.slice(0, 220)}`;
}

export async function generateTurnaroundWithFreeLlmApi(
  config: FreeLlmApiConfig,
  prompt: string,
  _negativePrompt?: string
): Promise<ImageGenerationResult> {
  const base = normalizeBaseUrl(config.baseUrl);
  if (!base) {
    throw new Error('Configura primero la dirección local de FreeLLMAPI (ej. http://127.0.0.1:31415).');
  }
  if (!config.apiKey.trim()) {
    throw new Error('Ingresa tu clave API de FreeLLMAPI en la configuración antes de generar.');
  }

  const sizesToTry: string[] =
    config.preferredSize === '1344x768'
      ? ['1344x768', '1024x1024']
      : ['1024x1024'];

  let lastError = 'Error desconocido generando imagen.';

  for (const size of sizesToTry) {
    const response = await performApiFetch(`${base}/v1/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey.trim()}`,
      },
      body: JSON.stringify({
        model: config.model.trim() || 'auto',
        prompt,
        n: 1,
        size,
        response_format: 'b64_json',
      }),
    });

    const contentType = response.headers.get('content-type') ?? '';

    if (response.ok && contentType.startsWith('image/')) {
      const blob = await response.blob();
      const dataUrl = await blobToDataUrl(blob);
      return { imageDataUrl: dataUrl, usedSize: size };
    }

    if (response.ok) {
      const json = (await response.json()) as unknown;
      const extracted = extractImageFromOpenAiPayload(json);
      if (extracted) {
        return { imageDataUrl: extracted, usedSize: size };
      }
      lastError = 'La respuesta de FreeLLMAPI no incluyó datos de imagen (`b64_json` o `url`).';
      break;
    }

    const errorBody = await response.text();
    lastError = formatFreeLlmApiError(
      response.status,
      errorBody || response.statusText
    );

    // Si falló por resolución panorámica (400/422), reintentar con 1024x1024
    if (response.status >= 400 && response.status < 500 && size !== '1024x1024') {
      continue;
    }
    break;
  }

  throw new Error(lastError);
}
