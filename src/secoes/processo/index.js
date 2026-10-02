// PROCESSO: etapas do Teatro Lúdico Didático, em formato de ingressos.
import { esc } from '../../util.js';

export default function processo({ site }) {
  const etapas = site.processo.etapas.map((e, i) => `<li class="ingresso"><span class="ingresso__numero">${i + 1}</span><span class="ingresso__texto">${esc(e)}</span></li>`).join('');
  return `<section class="secao processo" id="processo" aria-labelledby="processo-titulo">
  <div class="recipiente">
    <h2 class="secao__titulo" id="processo-titulo">${esc(site.processo.titulo)}</h2>
    <p class="secao__intro">${esc(site.processo.texto)}</p>
    <ol class="processo__lista">${etapas}</ol>
    <a class="botao processo__botao" href="projetos/tld-sob-demanda.html">Ver temas possíveis</a>
  </div>
</section>`;
}
