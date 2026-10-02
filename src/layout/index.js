// Moldura comum a todas as páginas: <head>, topo com menu e rodapé.
import { esc, linkWhatsApp } from '../util.js';

const ICONE_WHATS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>';
export { ICONE_WHATS };

export function pagina({ site, raiz = '', titulo, descricao, imagem, conteudo, classe = '' }) {
  const tituloCompleto = titulo ? `${titulo} | ${site.nome}` : `${site.nome} | ${site.slogan}`;
  const desc = descricao || site.descricao;
  const og = imagem ? `${site.url_base}/${imagem}` : `${site.url_base}/img/marca/logo.png`;
  const menu = [
    ['Quem somos', 'sobre'],
    ['Projetos', 'catalogo'],
    ['Leis de incentivo', 'leis'],
    ['Notícias', 'noticias'],
    ['Contato', 'contato'],
  ];
  const links = menu.map(([n, id]) => `<li><a href="${raiz}index.html#${id}">${n}</a></li>`).join('');
  const whats = linkWhatsApp(site.contato.whatsapp, 'Olá! Vim pelo site da Torres Produções e gostaria de conversar.');
  const ano = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tituloCompleto)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(tituloCompleto)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(og)}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#C8282E">
<link rel="icon" href="${raiz}img/marca/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${raiz}css/site.css">
<script src="${raiz}js/site.js" defer></script>
</head>
<body class="${classe}">
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
<header class="topo" data-topo>
  <div class="recipiente topo__barra">
    <a class="topo__logo" href="${raiz}index.html" aria-label="${esc(site.nome)}, página inicial">
      <img src="${raiz}img/marca/logo.png" alt="Torres Produções Culturais" width="180" height="73">
    </a>
    <button class="topo__menu-botao" type="button" aria-expanded="false" aria-controls="menu-principal" data-menu-botao>
      <span class="visualmente-oculto">Abrir menu</span><span class="topo__hamburguer" aria-hidden="true"></span>
    </button>
    <nav class="topo__nav" id="menu-principal" aria-label="Principal" data-menu>
      <ul>${links}</ul>
      <a class="botao botao--vermelho topo__cta" href="${whats}" target="_blank" rel="noopener">${ICONE_WHATS}WhatsApp</a>
    </nav>
  </div>
</header>
<main id="conteudo">
${conteudo}
</main>
<footer class="rodape">
  <div class="recipiente rodape__grade">
    <div>
      <img class="rodape__logo" src="${raiz}img/marca/logo.png" alt="Torres Produções Culturais" width="200" height="81" loading="lazy">
      <p class="rodape__slogan">${esc(site.slogan)}</p>
    </div>
    <div>
      <h2 class="rodape__titulo">Fale com a produção</h2>
      <p><a href="${whats}" target="_blank" rel="noopener">${esc(site.contato.telefone)}</a><br>
      <a href="mailto:${esc(site.contato.email)}">${esc(site.contato.email)}</a><br>
      <a href="https://www.instagram.com/${esc(site.contato.instagram)}/" target="_blank" rel="noopener">@${esc(site.contato.instagram)}</a></p>
    </div>
    <div>
      <h2 class="rodape__titulo">Onde estamos</h2>
      <p>${esc(site.contato.cidade)}<br>CNPJ ${esc(site.contato.cnpj)}</p>
    </div>
  </div>
  <div class="recipiente rodape__base">© ${ano} ${esc(site.nome)}</div>
</footer>
<a class="whats-flutuante" href="${whats}" target="_blank" rel="noopener" aria-label="Conversar pelo WhatsApp">${ICONE_WHATS}</a>
</body>
</html>`;
}
