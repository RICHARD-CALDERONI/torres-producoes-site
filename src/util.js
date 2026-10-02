// Funções utilitárias compartilhadas por todas as seções e páginas.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const RAIZ_PROJETO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Escapa texto para uso seguro dentro de HTML. */
export function esc(valor = '') {
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function lerJSON(relativo) {
  return JSON.parse(fs.readFileSync(path.join(RAIZ_PROJETO, relativo), 'utf8'));
}

/** Lista as fotos de um projeto, lidas da pasta public/img/projetos/<slug>/ em ordem de nome. */
export function fotosDoProjeto(slug) {
  const pasta = path.join(RAIZ_PROJETO, 'public', 'img', 'projetos', slug);
  if (!fs.existsSync(pasta)) return [];
  return fs.readdirSync(pasta)
    .filter((f) => /\.(webp|jpe?g|png|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }))
    .map((f) => `img/projetos/${slug}/${f}`);
}

export function linkWhatsApp(numero, mensagem) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export function formatarData(iso) {
  if (!iso) return '';
  const d = new Date(`${iso.slice(0, 10)}T12:00:00`);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

/** Une pedaços de HTML ignorando vazios. */
export const html = (partes) => partes.filter(Boolean).join('\n');
