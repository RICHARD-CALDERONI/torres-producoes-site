// CATÁLOGO: projetos e serviços com filtro por eixo. Os cards levam às páginas /projetos/<slug>.html
import { esc } from '../../util.js';

export function cardProjeto(projeto, { site, eixos, fotos, raiz = '' }) {
  const eixo = eixos[projeto.eixo];
  const foto = fotos(projeto.slug)[0];
  const imagem = foto
    ? `<img src="${raiz}${foto}" alt="" loading="lazy">`
    : `<div class="foto-reservada">Foto em breve</div>`;
  const marca = projeto.tipo === 'servico'
    ? `<span class="etiqueta etiqueta--parceiro">Serviço parceiro${projeto.parceiro ? `: ${esc(projeto.parceiro)}` : ''}</span>`
    : `<span class="etiqueta">${esc(site.status[projeto.status] || '')}</span>`;
  return `<li class="cartaz cartaz--${eixo.cor}" data-eixo="${eixo.id}">
  <a class="cartaz__link" href="${raiz}projetos/${projeto.slug}.html">
    <div class="cartaz__imagem">${imagem}</div>
    <div class="cartaz__corpo">
      <div class="cartaz__etiquetas"><span class="etiqueta cor-${eixo.cor}"><span class="ponto"></span><span class="cartaz__eixo">${esc(eixo.nome)}</span></span>${marca}</div>
      <h3 class="cartaz__titulo">${esc(projeto.titulo)}</h3>
      <p class="cartaz__sinopse">${esc(projeto.sinopse)}</p>
      <span class="cartaz__mais">Conhecer o projeto</span>
    </div>
  </a>
</li>`;
}

export default function catalogo(ctx) {
  const { site, projetos } = ctx;
  const usados = new Set(projetos.map((p) => p.eixo));
  const filtros = [{ id: 'todos', nome: 'Todos' }, ...site.eixos.filter((e) => usados.has(e.id))]
    .map((e, i) => `<button type="button" class="filtro" data-filtro="${e.id}" aria-pressed="${i === 0}">${esc(e.nome)}</button>`).join('');
  const cards = projetos.map((p) => cardProjeto(p, ctx)).join('');
  return `<section class="secao catalogo" id="catalogo" aria-labelledby="catalogo-titulo">
  <div class="recipiente">
    <div class="catalogo__cabeca">
      <h2 class="secao__titulo" id="catalogo-titulo">Projetos e serviços em repertório</h2>
      <p class="secao__intro">Espetáculos, intervenções e experiências que podem ser adaptados ao tema, ao espaço e ao público da sua organização.</p>
    </div>
    <div class="catalogo__filtros" role="group" aria-label="Filtrar por eixo">${filtros}</div>
    <p class="catalogo__contagem" aria-live="polite" data-contagem>${projetos.length} projetos</p>
    <ul class="catalogo__grade" data-catalogo>${cards}</ul>
  </div>
</section>`;
}
