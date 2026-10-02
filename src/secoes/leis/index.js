// LEIS DE INCENTIVO: menção breve, só as que a produtora trabalha.
import { esc } from '../../util.js';

export default function leis({ site }) {
  const lista = site.leis.lista.map((l) => `<li>${esc(l)}</li>`).join('');
  return `<section class="secao leis" id="leis" aria-labelledby="leis-titulo">
  <div class="recipiente leis__grade">
    <div>
      <h2 class="secao__titulo" id="leis-titulo">Leis de incentivo</h2>
      <p class="secao__intro">${esc(site.leis.texto)}</p>
      <a class="botao" href="index.html?interesse=patrocinio#contato">Quero patrocinar um projeto</a>
    </div>
    <ul class="leis__lista">${lista}</ul>
  </div>
</section>`;
}
