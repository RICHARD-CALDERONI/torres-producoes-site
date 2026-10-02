// Filtro do catálogo por eixo. Também lê ?eixo=<id> na URL.
const grade = document.querySelector('[data-catalogo]');
if (grade) {
  const botoes = document.querySelectorAll('[data-filtro]');
  const contagem = document.querySelector('[data-contagem]');
  const cards = grade.querySelectorAll('[data-eixo]');
  const aplicar = (id) => {
    let visiveis = 0;
    cards.forEach((c) => { const mostra = id === 'todos' || c.dataset.eixo === id; c.hidden = !mostra; if (mostra) visiveis++; });
    botoes.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtro === id)));
    if (contagem) contagem.textContent = `${visiveis} ${visiveis === 1 ? 'projeto' : 'projetos'}`;
  };
  botoes.forEach((b) => b.addEventListener('click', () => aplicar(b.dataset.filtro)));
  const inicial = new URLSearchParams(location.search).get('eixo');
  if (inicial && document.querySelector(`[data-filtro="${CSS.escape(inicial)}"]`)) aplicar(inicial);
}
