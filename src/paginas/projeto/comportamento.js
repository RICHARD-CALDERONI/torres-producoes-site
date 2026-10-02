// Galeria (troca de foto) e vídeos do YouTube carregados só no clique.
const galeria = document.querySelector('[data-galeria]');
if (galeria) {
  const principal = galeria.querySelector('[data-galeria-principal]');
  galeria.querySelectorAll('[data-foto]').forEach((b) => b.addEventListener('click', () => {
    principal.src = b.dataset.foto;
    galeria.querySelectorAll('[data-foto]').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
  }));
}
document.querySelectorAll('[data-video]').forEach((b) => b.addEventListener('click', () => {
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${b.dataset.video}?autoplay=1&rel=0`;
  iframe.title = b.getAttribute('aria-label');
  iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  const caixa = document.createElement('div');
  caixa.className = 'video';
  caixa.append(iframe);
  b.replaceWith(caixa);
}, { once: true }));
