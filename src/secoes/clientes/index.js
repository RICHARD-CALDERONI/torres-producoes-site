// CLIENTES: faixa de logos em movimento. Itens "exemplo" viram reservas de espaço.
import { esc } from '../../util.js';

export default function clientes({ clientes }) {
  const lista = clientes.clientes || [];
  if (!lista.length) return '';
  const itens = lista.map((c) => c.logo
    ? `<li class="clientes__item"><img src="img/clientes/${esc(c.logo)}" alt="${esc(c.nome)}" loading="lazy"></li>`
    : `<li class="clientes__item clientes__item--reserva">${c.exemplo ? 'Logo do cliente' : esc(c.nome)}</li>`).join('');
  return `<section class="secao clientes" id="clientes" aria-labelledby="clientes-titulo">
  <div class="recipiente">
    <h2 class="clientes__titulo" id="clientes-titulo">Quem já levou a Torres para dentro de casa</h2>
  </div>
  <div class="clientes__faixa">
    <ul class="clientes__trilho">${itens}</ul>
    <ul class="clientes__trilho" aria-hidden="true">${itens}</ul>
  </div>
</section>`;
}
