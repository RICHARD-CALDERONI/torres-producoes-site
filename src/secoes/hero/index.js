// HERO: o palco. A cortina abre uma única vez ao carregar a página.
import { esc, linkWhatsApp } from '../../util.js';

const COLAGEM = [
  { foto: 'img/projetos/elas-riem/2.webp', alt: 'Palhaças de Elas Riem diante de um arco de circo colorido' },
  { foto: 'img/projetos/broto-de-circo/2.webp', alt: 'Artistas de Broto de Circo com acordeão e bambolê' },
  { foto: 'img/projetos/gibilo-e-seu-trombone/1.webp', alt: 'Palhaço Gibiló tocando trombone' },
];

export default function hero({ site }) {
  const whats = linkWhatsApp(site.contato.whatsapp, 'Olá! Quero levar um espetáculo da Torres Produções para minha organização.');
  const fotos = COLAGEM.map((c, i) => `<figure class="palco__foto palco__foto--${i + 1}"><img src="${c.foto}" alt="${esc(c.alt)}" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></figure>`).join('');
  return `<section class="palco" aria-labelledby="palco-titulo">
  <div class="palco__sanefa" aria-hidden="true"></div>
  <div class="palco__cortina palco__cortina--esq" aria-hidden="true"></div>
  <div class="palco__cortina palco__cortina--dir" aria-hidden="true"></div>
  <div class="recipiente palco__cena">
    <div class="palco__texto">
      <p class="palco__local">${esc(site.contato.cidade)}, desde ${esc(site.contato.desde)}</p>
      <h1 id="palco-titulo" class="palco__titulo">${esc(site.slogan)}</h1>
      <p class="palco__descricao">${esc(site.descricao)}</p>
      <div class="palco__acoes">
        <a class="botao botao--vermelho" href="#catalogo">Ver projetos</a>
        <a class="botao botao--vazado" href="${whats}" target="_blank" rel="noopener">Falar com a produção</a>
      </div>
    </div>
    <div class="palco__colagem">${fotos}</div>
  </div>
  <div class="palco__chao" aria-hidden="true"></div>
</section>`;
}
