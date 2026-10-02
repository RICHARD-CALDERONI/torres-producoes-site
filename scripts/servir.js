// Servidor local simples para testar o site gerado: node scripts/servir.js -> http://localhost:8080
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { RAIZ_PROJETO } from '../src/util.js';

const DIST = path.join(RAIZ_PROJETO, 'dist');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const porta = process.env.PORTA || 8080;

http.createServer((req, res) => {
  let caminho = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (caminho.endsWith('/')) caminho += 'index.html';
  const arquivo = path.join(DIST, path.normalize(caminho));
  if (!arquivo.startsWith(DIST) || !fs.existsSync(arquivo)) { res.writeHead(404); res.end('Não encontrado'); return; }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arquivo)] || 'application/octet-stream' });
  fs.createReadStream(arquivo).pipe(res);
}).listen(porta, () => console.log(`Site em http://localhost:${porta}`));
