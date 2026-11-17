import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Persistencia local en disco dentro de `<proyecto>/coleccion/*.json` (+ `.png`).
 * Evita que los personajes guardados se pierdan si se cambia de puerto o se limpia el navegador.
 */
function diskCollectionPlugin(): Plugin {
  const collectionDir = path.resolve(process.cwd(), 'coleccion');

  function ensureDir() {
    if (!fs.existsSync(collectionDir)) {
      fs.mkdirSync(collectionDir, { recursive: true });
    }
  }

  function safeId(raw: string): string {
    return raw.replace(/[^a-zA-Z0-9_-]/g, '');
  }

  return {
    name: 'disk-collection-plugin',
    configureServer(server) {
      server.middlewares.use('/__collection', (req, res) => {
        ensureDir();
        const urlPath = (req.url ?? '/').split('?')[0];

        if (req.method === 'GET' && urlPath === '/') {
          try {
            const files = fs
              .readdirSync(collectionDir)
              .filter((f) => f.endsWith('.json'));
            const records = files
              .map((file) => {
                try {
                  return JSON.parse(
                    fs.readFileSync(path.join(collectionDir, file), 'utf8')
                  );
                } catch {
                  return null;
                }
              })
              .filter(Boolean);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(records));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: String(err) }));
          }
          return;
        }

        if (req.method === 'POST' && urlPath === '/') {
          const chunks: Buffer[] = [];
          req.on('data', (c: Buffer) => chunks.push(c));
          req.on('end', () => {
            try {
              const record = JSON.parse(Buffer.concat(chunks).toString('utf8')) as {
                id?: string;
                generatedImageDataUrl?: string | null;
              };
              const id = safeId(record.id ?? '');
              if (!id) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'ID inválido' }));
                return;
              }
              fs.writeFileSync(
                path.join(collectionDir, `${id}.json`),
                JSON.stringify(record, null, 2),
                'utf8'
              );
              if (
                typeof record.generatedImageDataUrl === 'string' &&
                record.generatedImageDataUrl.startsWith('data:image/')
              ) {
                const base64Part = record.generatedImageDataUrl.split(',')[1];
                if (base64Part) {
                  fs.writeFileSync(
                    path.join(collectionDir, `${id}.png`),
                    Buffer.from(base64Part, 'base64')
                  );
                }
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, id }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        if (req.method === 'DELETE' && urlPath.length > 1) {
          const id = safeId(urlPath.slice(1));
          if (id) {
            for (const ext of ['.json', '.png']) {
              const target = path.join(collectionDir, `${id}${ext}`);
              if (fs.existsSync(target)) {
                fs.unlinkSync(target);
              }
            }
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
          return;
        }

        res.statusCode = 404;
        res.end();
      });
    },
  };
}

/**
 * Proxy local exclusivo para evitar bloqueos CORS cuando la app (puerto 5185)
 * consulta una instancia local de FreeLLMAPI (ej. http://localhost:3001).
 */
function freeLlmApiLocalProxy(): Plugin {
  return {
    name: 'freellmapi-local-proxy',
    configureServer(server) {
      server.middlewares.use('/__freellmapi', async (req, res) => {
        const targetHeader = req.headers['x-freellmapi-target'];
        const targetRaw = Array.isArray(targetHeader) ? targetHeader[0] : targetHeader;

        if (!targetRaw) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Falta cabecera x-freellmapi-target' }));
          return;
        }

        let targetUrl: URL;
        try {
          targetUrl = new URL(targetRaw);
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'URL de destino inválida' }));
          return;
        }

        const isLoopback =
          targetUrl.protocol === 'http:' &&
          (targetUrl.hostname === 'localhost' || targetUrl.hostname === '127.0.0.1');

        if (!isLoopback) {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: 'El proxy local solo reenvía peticiones a localhost o 127.0.0.1',
            })
          );
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk: Buffer) => chunks.push(chunk));
        req.on('end', async () => {
          try {
            const forwardHeaders: Record<string, string> = {};
            if (typeof req.headers.authorization === 'string') {
              forwardHeaders.authorization = req.headers.authorization;
            }
            if (typeof req.headers['content-type'] === 'string') {
              forwardHeaders['content-type'] = req.headers['content-type'];
            }

            const bodyBuffer = Buffer.concat(chunks);
            const requestInit: RequestInit = {
              method: req.method ?? 'GET',
              headers: forwardHeaders,
              body:
                req.method && req.method !== 'GET' && req.method !== 'HEAD'
                  ? bodyBuffer
                  : undefined,
            };

            let upstream: Response;
            try {
              upstream = await fetch(targetUrl.toString(), requestInit);
            } catch (primaryErr) {
              // En Windows, Node puede intentar IPv6 (::1) para 'localhost' cuando el servidor solo escucha en IPv4 (127.0.0.1)
              if (targetUrl.hostname === 'localhost') {
                const ipv4Fallback = new URL(targetUrl.toString());
                ipv4Fallback.hostname = '127.0.0.1';
                upstream = await fetch(ipv4Fallback.toString(), requestInit);
              } else {
                throw primaryErr;
              }
            }

            res.statusCode = upstream.status;
            const upstreamType = upstream.headers.get('content-type');
            if (upstreamType) {
              res.setHeader('Content-Type', upstreamType);
            }
            const arrayBuf = await upstream.arrayBuffer();
            res.end(Buffer.from(arrayBuf));
          } catch (err) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error:
                  err instanceof Error
                    ? `No se pudo conectar con FreeLLMAPI en ${targetUrl.origin}: ${err.message}`
                    : 'Error de conexión con FreeLLMAPI local',
              })
            );
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), freeLlmApiLocalProxy(), diskCollectionPlugin()],
  server: {
    port: 5185,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
