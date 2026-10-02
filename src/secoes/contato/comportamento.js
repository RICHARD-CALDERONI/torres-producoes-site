// Formulário de interesse. Com endpoint configurado em site.json envia direto;
// sem endpoint, abre o programa de e-mail do visitante com a mensagem pronta.
const form = document.querySelector('[data-formulario]');
if (form) {
  const status = form.querySelector('[data-status]');
  const select = form.querySelector('[name="interesse"]');
  const pedido = new URLSearchParams(location.search).get('interesse');
  if (pedido && select.querySelector(`option[value="${CSS.escape(pedido)}"]`)) select.value = pedido;

  const avisar = (texto, erro = false) => { status.textContent = texto; status.classList.toggle('is-erro', erro); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form._site.value) return; // robô preencheu o campo isca
    const obrigatorios = [form.nome, form.email];
    let valido = true;
    obrigatorios.forEach((c) => { const ok = c.checkValidity() && c.value.trim(); c.setAttribute('aria-invalid', String(!ok)); if (!ok) valido = false; });
    if (!valido) { avisar('Preencha seu nome e um e-mail válido para enviarmos a resposta.', true); return; }

    const dados = Object.fromEntries(new FormData(form));
    delete dados._site;
    dados.interesse = select.options[select.selectedIndex].text;
    const endpoint = form.dataset.endpoint;

    if (!endpoint) {
      const corpo = `Nome: ${dados.nome}\nOrganização: ${dados.organizacao || '-'}\nE-mail: ${dados.email}\nTelefone: ${dados.telefone || '-'}\nInteresse: ${dados.interesse}\n\n${dados.mensagem || ''}`;
      location.href = `mailto:${form.dataset.destino}?subject=${encodeURIComponent('Interesse pelo site: ' + dados.interesse)}&body=${encodeURIComponent(corpo)}`;
      avisar('Abrimos seu programa de e-mail com a mensagem pronta. É só enviar.');
      return;
    }
    const botao = form.querySelector('[type="submit"]');
    botao.disabled = true; avisar('Enviando...');
    try {
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(dados) });
      if (!r.ok) throw new Error(r.status);
      form.reset();
      avisar('Interesse enviado. Respondemos em até 2 dias úteis.');
    } catch {
      avisar('Não foi possível enviar agora. Tente pelo WhatsApp ou escreva para ' + form.dataset.destino + '.', true);
    } finally { botao.disabled = false; }
  });
}
