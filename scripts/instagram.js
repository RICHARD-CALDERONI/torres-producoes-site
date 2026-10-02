// Busca as publicações do Instagram da produtora, filtra pela hashtag definida em
// dados/site.json (instagram.hashtag) e gera dados/noticias.json + imagens em public/img/noticias/.
//
// Requer a variável de ambiente IG_TOKEN: token de longa duração da
// Instagram API com Login do Instagram (conta Profissional, permissão instagram_business_basic).
// O token NUNCA vai para o site: ele só existe aqui, no GitHub Secrets ou no servidor.
//
// Uso: IG_TOKEN=xxxxx node scripts/instagram.js
import fs from 'node:fs';
import path from 'node:path';
import { RAIZ_PROJETO as RAIZ, lerJSON } from '../src/util.js';

const TOKEN = process.env.IG_TOKEN;
const API = 'https://graph.instagram.com';
const PASTA_IMG = path.join(RAIZ, 'public', 'img', 'noticias');
const ARQ_SAIDA = path.join(RAIZ, 'dados', 'noticias.json');

if (!TOKEN) {
  console.log('IG_TOKEN não definido: mantendo dados/noticias.json como está.');
  process.exit(0);
}

const site = lerJSON('dados/site.json');
const hashtag = `#${site.instagram.hashtag}`.toLowerCase();
const maximo = site.instagram.maximo_posts || 6;

async function pegar(url) {
  const r = await fetch(url);
  const corpo = await r.json();
  if (!r.ok || corpo.error) throw new Error(corpo.error?.message || `HTTP ${r.status}`);
  return corpo;
}

/** Primeira linha da legenda vira título; o resto vira texto, sem hashtags. */
function separarLegenda(legenda = '') {
  const limpa = legenda.replace(/#[\p{L}\p{N}_]+/gu, '').replace(/[ \t]+\n/g, '\n').trim();
  const [primeira = '', ...resto] = limpa.split(/\n+/);
  const titulo = primeira.length > 90 ? primeira.slice(0, 87).trimEnd() + '…' : primeira;
  let texto = resto.join(' ').trim();
  if (texto.length > 180) texto = texto.slice(0, 177).trimEnd() + '…';
  return { titulo: titulo || 'Novidade da Torres Produções', texto };
}

async function baixar(url, destino) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`imagem HTTP ${r.status}`);
  fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
}

async function renovarToken() {
  // Tokens de longa duração valem 60 dias e podem ser renovados após 24h de idade.
  try {
    const r = await pegar(`${API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${TOKEN}`);
    const dias = Math.round((r.expires_in || 0) / 86400);
    console.log(`Token renovado: válido por mais ${dias} dias.`);
    if (r.access_token && r.access_token !== TOKEN) {
      console.warn('ATENÇÃO: a Meta devolveu um token diferente. Atualize o secret IG_TOKEN com o novo valor.');
    }
  } catch (e) {
    console.warn(`Não foi possível renovar o token agora: ${e.message}`);
  }
}

try {
  const campos = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
  let url = `${API}/me/media?fields=${campos}&limit=50&access_token=${TOKEN}`;
  const escolhidos = [];
  // Percorre até 4 páginas (200 posts) procurando a hashtag.
  for (let pagina = 0; pagina < 4 && url && escolhidos.length < maximo; pagina++) {
    const resp = await pegar(url);
    for (const m of resp.data || []) {
      if ((m.caption || '').toLowerCase().includes(hashtag)) escolhidos.push(m);
      if (escolhidos.length >= maximo) break;
    }
    url = resp.paging?.next;
  }

  fs.mkdirSync(PASTA_IMG, { recursive: true });
  const noticias = [];
  for (const m of escolhidos) {
    const fonte = m.media_type === 'VIDEO' ? m.thumbnail_url : m.media_url;
    const arquivo = `${m.id}.jpg`;
    let imagem = '';
    try {
      if (fonte) { await baixar(fonte, path.join(PASTA_IMG, arquivo)); imagem = `img/noticias/${arquivo}`; }
    } catch (e) { console.warn(`Imagem do post ${m.id} não baixada: ${e.message}`); }
    noticias.push({ id: m.id, data: m.timestamp?.slice(0, 10), ...separarLegenda(m.caption), imagem, link: m.permalink, video: m.media_type === 'VIDEO' });
  }

  // Remove imagens de posts que saíram da lista.
  const manter = new Set(noticias.map((n) => `${n.id}.jpg`));
  for (const f of fs.readdirSync(PASTA_IMG)) if (!manter.has(f)) fs.rmSync(path.join(PASTA_IMG, f));

  if (noticias.length) {
    fs.writeFileSync(ARQ_SAIDA, JSON.stringify({ atualizado_em: new Date().toISOString(), noticias }, null, 2));
    console.log(`${noticias.length} notícias com ${hashtag} salvas em dados/noticias.json.`);
  } else {
    console.log(`Nenhum post com ${hashtag} encontrado. Mantendo as notícias anteriores.`);
  }
  await renovarToken();
} catch (e) {
  // Falhar aqui não pode derrubar o site: o build segue com as últimas notícias salvas.
  console.error(`Instagram indisponível (${e.message}). Mantendo as notícias anteriores.`);
}
