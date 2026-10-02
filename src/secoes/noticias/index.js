// NOTÍCIAS: lidas de dados/noticias.json, que é gerado a partir do Instagram (scripts/instagram.js).
import { esc, formatarData } from '../../util.js';

export default function noticias({ site, noticias }) {
  const lista = (noticias.noticias || []).slice(0, site.instagram.maximo_posts);
  const perfil = `https://www.instagram.com/${site.contato.instagram}/`;
  const soExemplos = lista.length > 0 && lista.every((n) => n.exemplo);
  const cards = lista.map((n) => `<li class="nota">
    <a class="nota__link" href="${esc(n.link || perfil)}" target="_blank" rel="noopener">
      <div class="nota__imagem">${n.imagem ? `<img src="${esc(n.imagem)}" alt="" loading="lazy">` : '<div class="foto-reservada">Sem imagem</div>'}${n.video ? '<span class="nota__video">Vídeo</span>' : ''}</div>
      <time class="nota__data" datetime="${esc(n.data)}">${formatarData(n.data)}</time>
      <h3 class="nota__titulo">${esc(n.titulo)}</h3>
      ${n.texto ? `<p class="nota__texto">${esc(n.texto)}</p>` : ''}
    </a>
  </li>`).join('');
  const vazio = `<p class="noticias__vazio">As novidades publicadas no Instagram aparecem aqui. Enquanto isso, acompanhe pelo perfil.</p>`;
  return `<section class="secao noticias" id="noticias" aria-labelledby="noticias-titulo">
  <div class="recipiente">
    <div class="noticias__cabeca">
      <h2 class="secao__titulo" id="noticias-titulo">O que está acontecendo por aqui</h2>
      <a class="botao botao--vazado" href="${perfil}" target="_blank" rel="noopener">Seguir @${esc(site.contato.instagram)}</a>
    </div>
    ${soExemplos ? '<p class="noticias__aviso">Prévia: as publicações do Instagram marcadas com #' + esc(site.instagram.hashtag) + ' vão aparecer aqui.</p>' : ''}
    ${lista.length ? `<ul class="noticias__grade">${cards}</ul>` : vazio}
  </div>
</section>`;
}
