// LETREIRO: faixa amarela com as linguagens rolando.
import { esc } from '../../util.js';

export default function letreiro({ site }) {
  const itens = site.linguagens.map((l) => `<span>${esc(l)}</span><span class="letreiro__estrela" aria-hidden="true">✦</span>`).join('');
  return `<div class="letreiro" role="region" aria-label="Linguagens">
  <div class="letreiro__trilho">
    <div class="letreiro__grupo">${itens}</div>
    <div class="letreiro__grupo" aria-hidden="true">${itens}</div>
  </div>
</div>`;
}
