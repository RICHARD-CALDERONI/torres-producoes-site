// PÁGINA DE PROJETO: gerada para cada item de dados/projetos.json em /projetos/<slug>.html
import { esc, linkWhatsApp } from '../../util.js';
import { pagina, ICONE_WHATS } from '../../layout/index.js';
import { cardProjeto } from '../../secoes/catalogo/index.js';

const ROTULOS_FICHA = {
  publico: 'Público', faixa: 'Classificação', duracao: 'Duração',
  formato: 'Formato', elenco: 'Equipe em cena', tecnica: 'Necessidades técnicas',
};

function galeria(fotos, titulo) {
  if (!fotos.length) {
    return `<div class="galeria galeria--vazia"><div class="foto-reservada galeria__principal">Fotos em breve</div></div>`;
  }
  const miniaturas = fotos.length > 1
    ? `<ul class="galeria__miniaturas">${fotos.map((f, i) => `<li><button type="button" data-foto="../${f}" aria-label="Ver foto ${i + 1}" aria-pressed="${i === 0}"><img src="../${f}" alt="" loading="lazy"></button></li>`).join('')}</ul>`
    : '';
  return `<div class="galeria" data-galeria>
    <img class="galeria__principal" src="../${fotos[0]}" alt="Cena de ${esc(titulo)}" data-galeria-principal>
    ${miniaturas}
  </div>`;
}

function videos(lista, titulo) {
  if (!lista.length) return '';
  const itens = lista.map((id) => `<li><button type="button" class="video" data-video="${esc(id)}" aria-label="Assistir vídeo de ${esc(titulo)}">
      <img src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy">
      <span class="video__play" aria-hidden="true"></span>
    </button></li>`).join('');
  return `<section class="projeto__videos" aria-labelledby="videos-titulo">
    <h2 id="videos-titulo">Assista</h2>
    <ul class="projeto__videos-lista">${itens}</ul>
  </section>`;
}

export default function paginaProjeto(projeto, ctx) {
  const { site, eixos, fotos, projetos } = ctx;
  const eixo = eixos[projeto.eixo];
  const listaFotos = fotos(projeto.slug);
  const whats = linkWhatsApp(site.contato.whatsapp, `Olá! Tenho interesse em "${projeto.titulo}". Podemos conversar?`);
  const marca = projeto.tipo === 'servico'
    ? `<span class="etiqueta etiqueta--parceiro">Serviço parceiro${projeto.parceiro ? `: ${esc(projeto.parceiro)}` : ''}</span>`
    : `<span class="etiqueta">${esc(site.status[projeto.status] || '')}</span>`;
  const ficha = Object.entries(ROTULOS_FICHA)
    .filter(([k]) => projeto.ficha && projeto.ficha[k])
    .map(([k, rotulo]) => `<div><dt>${rotulo}</dt><dd>${esc(projeto.ficha[k])}</dd></div>`).join('');
  const temas = (projeto.temas || []).map((t) => `<li>${esc(t)}</li>`).join('');
  const relacionados = projetos.filter((p) => p.eixo === projeto.eixo && p.slug !== projeto.slug).slice(0, 3);
  const ctxRaiz = { ...ctx, raiz: '../' };

  const conteudo = `<article class="projeto projeto--${eixo.cor}">
  <header class="projeto__topo">
    <div class="recipiente">
      <nav class="trilha" aria-label="Você está em"><a href="../index.html#catalogo">Projetos</a> <span aria-hidden="true">/</span> <span>${esc(projeto.titulo)}</span></nav>
      <div class="projeto__etiquetas"><a class="etiqueta cor-${eixo.cor}" href="../index.html?eixo=${eixo.id}#catalogo"><span class="ponto"></span><span class="projeto__eixo">${esc(eixo.nome)}</span></a>${marca}</div>
      <h1 class="projeto__titulo">${esc(projeto.titulo)}</h1>
      <p class="projeto__sinopse">${esc(projeto.sinopse)}</p>
      <div class="projeto__acoes">
        <a class="botao botao--vermelho" href="${whats}" target="_blank" rel="noopener">${ICONE_WHATS}Quero este projeto</a>
        <a class="botao botao--vazado" href="../index.html?interesse=${projeto.slug}#contato">Enviar interesse por e-mail</a>
      </div>
    </div>
  </header>
  <div class="recipiente projeto__midia">${galeria(listaFotos, projeto.titulo)}</div>
  <div class="recipiente projeto__corpo">
    <section class="projeto__sobre" aria-labelledby="sobre-projeto">
      <h2 id="sobre-projeto">Sobre o projeto</h2>
      ${(projeto.contexto || []).map((p) => `<p>${esc(p)}</p>`).join('')}
      ${temas ? `<h3>Temas</h3><ul class="projeto__temas">${temas}</ul>` : ''}
    </section>
    ${ficha ? `<aside class="ficha" aria-labelledby="ficha-titulo"><h2 id="ficha-titulo">Ficha</h2><dl>${ficha}</dl></aside>` : ''}
  </div>
  <div class="recipiente">${videos(projeto.videos || [], projeto.titulo)}</div>
  ${relacionados.length ? `<section class="secao relacionados" aria-labelledby="rel-titulo"><div class="recipiente">
    <h2 class="secao__titulo" id="rel-titulo">Do mesmo eixo</h2>
    <ul class="catalogo__grade">${relacionados.map((p) => cardProjeto(p, ctxRaiz)).join('')}</ul>
  </div></section>` : ''}
</article>`;

  return pagina({
    site, raiz: '../', titulo: projeto.titulo, descricao: projeto.sinopse,
    imagem: listaFotos[0], conteudo, classe: 'pagina-projeto',
  });
}
