// QUEM SOMOS
import { esc } from '../../util.js';

export default function sobre({ site }) {
  const atuacao = site.atuacao.map((a) => `<li>${esc(a)}</li>`).join('');
  return `<section class="secao sobre" id="sobre" aria-labelledby="sobre-titulo">
  <div class="recipiente sobre__grade">
    <div class="sobre__texto">
      <h2 class="secao__titulo" id="sobre-titulo">A arte como ferramenta de encontro entre pessoas</h2>
      <p>A Torres Produções Culturais desenvolve, produz e realiza projetos artísticos, culturais e educativos voltados à formação humana, à comunicação e ao fortalecimento de culturas organizacionais e comunitárias.</p>
      <p>Atuamos em empresas, instituições, cooperativas e comunidades, por meio de leis de incentivo, editais de chamamento e patrocínio direto, criando ações que aproximam pessoas, fortalecem vínculos e promovem experiências de aprendizagem e transformação.</p>
    </div>
    <figure class="sobre__foto">
      <img src="img/marca/sobre.webp" alt="Dois palhaços sentados sobre um cubo colorido no palco" loading="lazy">
    </figure>
    <div class="sobre__atuacao">
      <h3>Onde a nossa arte atua</h3>
      <ul>${atuacao}</ul>
    </div>
  </div>
</section>`;
}
