import { describe, expect, it } from 'vitest';
import {
  DEFAULT_FREELLMAPI_CONFIG,
  extractImageFromOpenAiPayload,
  formatFreeLlmApiError,
  generateTurnaroundWithFreeLlmApi,
  normalizeBaseUrl,
} from './freellmapi';

describe('Cliente FreeLLMAPI', () => {
  it('normaliza la URL base eliminando barras finales y sufijo /v1', () => {
    expect(normalizeBaseUrl('http://localhost:3001/')).toBe('http://localhost:3001');
    expect(normalizeBaseUrl('http://localhost:3001/v1/')).toBe('http://localhost:3001');
    expect(normalizeBaseUrl('https://mi-proxy.ejemplo.com/v1')).toBe(
      'https://mi-proxy.ejemplo.com'
    );
  });

  it('extrae imágenes en formato b64_json y url desde respuestas estilo OpenAI', () => {
    expect(
      extractImageFromOpenAiPayload({
        data: [{ b64_json: 'AAAA' }],
      })
    ).toBe('data:image/png;base64,AAAA');

    expect(
      extractImageFromOpenAiPayload({
        data: [{ b64_json: 'data:image/jpeg;base64,BBBB' }],
      })
    ).toBe('data:image/jpeg;base64,BBBB');

    expect(
      extractImageFromOpenAiPayload({
        data: [{ url: 'https://cdn.ejemplo.com/turnaround.png' }],
      })
    ).toBe('https://cdn.ejemplo.com/turnaround.png');

    expect(extractImageFromOpenAiPayload({ data: [] })).toBeNull();
  });

  it('explica claramente en español cuando FreeLLMAPI no tiene claves de imagen configuradas', () => {
    const msg = formatFreeLlmApiError(
      502,
      '{"error":{"message":"image generation error: All image providers failed (no usable keys)."}}'
    );
    expect(msg).toMatch(/proveedor de IMÁGENES/i);
    expect(msg).toMatch(/Hugging Face|Cloudflare|Gemini/i);
  });

  it('exige API Key antes de enviar una petición de imagen', async () => {
    await expect(
      generateTurnaroundWithFreeLlmApi(
        { ...DEFAULT_FREELLMAPI_CONFIG, apiKey: '' },
        'character turnaround sheet',
        'blurry'
      )
    ).rejects.toThrow(/clave API/i);
  });
});
