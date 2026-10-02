// CONTATO: WhatsApp + formulário de interesse por e-mail.
import { esc, linkWhatsApp } from '../../util.js';
import { ICONE_WHATS } from '../../layout/index.js';

export default function contato({ site, projetos }) {
  const whats = linkWhatsApp(site.contato.whatsapp, 'Olá! Vim pelo site da Torres Produções e gostaria de conversar.');
  const opcoes = [
    '<option value="">Ainda não sei, quero conversar</option>',
    ...projetos.map((p) => `<option value="${esc(p.slug)}">${esc(p.titulo)}</option>`),
    '<option value="patrocinio">Patrocínio via lei de incentivo</option>',
  ].join('');
  return `<section class="secao contato" id="contato" aria-labelledby="contato-titulo">
  <div class="recipiente contato__grade">
    <div class="contato__chamada">
      <h2 class="secao__titulo" id="contato-titulo">Conta pra gente o que sua equipe precisa viver</h2>
      <p class="secao__intro">Respondemos rápido pelo WhatsApp. Se preferir, deixe seu interesse por e-mail e montamos uma proposta com temas, formato e caminho de captação.</p>
      <a class="botao botao--vermelho" href="${whats}" target="_blank" rel="noopener">${ICONE_WHATS}Chamar no WhatsApp</a>
      <dl class="contato__dados">
        <div><dt>Telefone</dt><dd>${esc(site.contato.telefone)}</dd></div>
        <div><dt>E-mail</dt><dd><a href="mailto:${esc(site.contato.email)}">${esc(site.contato.email)}</a></dd></div>
        <div><dt>Instagram</dt><dd><a href="https://www.instagram.com/${esc(site.contato.instagram)}/" target="_blank" rel="noopener">@${esc(site.contato.instagram)}</a></dd></div>
      </dl>
    </div>
    <form class="formulario" data-formulario data-endpoint="${esc(site.formulario.endpoint)}" data-destino="${esc(site.formulario.destino)}" novalidate>
      <h3 class="formulario__titulo">Enviar interesse por e-mail</h3>
      <div class="campo"><label for="f-nome">Seu nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
      <div class="campo"><label for="f-org">Empresa ou instituição</label><input id="f-org" name="organizacao" autocomplete="organization"></div>
      <div class="campo-duplo">
        <div class="campo"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="campo"><label for="f-tel">Telefone</label><input id="f-tel" name="telefone" type="tel" autocomplete="tel"></div>
      </div>
      <div class="campo"><label for="f-interesse">Interesse</label><select id="f-interesse" name="interesse">${opcoes}</select></div>
      <div class="campo"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="mensagem" rows="4" placeholder="Público, data, cidade, tema..."></textarea></div>
      <div class="campo-isca" aria-hidden="true"><label for="f-site">Não preencha</label><input id="f-site" name="_site" tabindex="-1" autocomplete="off"></div>
      <button class="botao" type="submit">Enviar interesse</button>
      <p class="formulario__status" role="status" data-status></p>
    </form>
  </div>
</section>`;
}
