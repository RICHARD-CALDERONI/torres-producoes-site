// HOME: monta as seções na ordem definida em dados/site.json -> secoes_home.
// Para tirar uma seção do ar, basta removê-la da lista.
import { pagina } from '../layout/index.js';

export default async function home(ctx, secoes) {
  const partes = [];
  for (const nome of ctx.site.secoes_home) {
    const render = secoes[nome];
    if (!render) { console.warn(`  ! seção "${nome}" listada em site.json mas não encontrada em src/secoes/`); continue; }
    partes.push(render(ctx));
  }
  return pagina({ site: ctx.site, conteudo: partes.join('\n') });
}
