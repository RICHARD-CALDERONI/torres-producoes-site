// Menu do celular e borda do topo ao rolar.
const botao = document.querySelector('[data-menu-botao]');
const menu = document.querySelector('[data-menu]');
if (botao && menu) {
  const fechar = () => { botao.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-aberto'); };
  botao.addEventListener('click', () => {
    const aberto = botao.getAttribute('aria-expanded') === 'true';
    botao.setAttribute('aria-expanded', String(!aberto));
    menu.classList.toggle('is-aberto', !aberto);
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', fechar));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fechar(); });
}
const topo = document.querySelector('[data-topo]');
if (topo) {
  const marcar = () => topo.classList.toggle('is-rolado', window.scrollY > 8);
  marcar();
  window.addEventListener('scroll', marcar, { passive: true });
}
