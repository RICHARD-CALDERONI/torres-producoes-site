// PARCEIROS
import { esc } from '../../util.js';

export default function parceiros({ site }) {
  const itens = site.parceiros.map((p) => {
    const nome = p.projeto ? `<a href="projetos/${esc(p.projeto)}.html">${esc(p.nome)}</a>` : esc(p.nome);
    return `<li class="parceiro"><h3>${nome}</h3><p>${esc(p.texto)}</p></li>`;
  }).join('');
  return `<section class="secao parceiros" id="parceiros" aria-labelledby="parceiros-titulo">
  <div class="recipiente">
    <h2 class="secao__titulo" id="parceiros-titulo">Parceiros que entram em cena com a gente</h2>
    <ul class="parceiros__lista">${itens}</ul>
  </div>
</section>`;
}
