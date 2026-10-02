// Gera o site em dist/ a partir de dados/ + src/ + public/.
// Uso: node scripts/build.js
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { RAIZ_PROJETO as RAIZ, lerJSON, fotosDoProjeto } from '../src/util.js';
import home from '../src/paginas/home.js';
import paginaProjeto from '../src/paginas/projeto/index.js';

const DIST = path.join(RAIZ, 'dist');
const SRC = path.join(RAIZ, 'src');

// 1. Dados
const site = lerJSON('dados/site.json');
const { projetos } = lerJSON('dados/projetos.json');
const noticias = lerJSON('dados/noticias.json');
const clientes = lerJSON('dados/clientes.json');
const eixos = Object.fromEntries(site.eixos.map((e) => [e.id, e]));

const erros = [];
const slugs = new Set();
for (const p of projetos) {
  if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug)) erros.push(`slug inválido em "${p.titulo}"`);
  if (slugs.has(p.slug)) erros.push(`slug repetido: ${p.slug}`);
  slugs.add(p.slug);
  if (!eixos[p.eixo]) erros.push(`"${p.slug}" usa o eixo "${p.eixo}", que não existe em site.json`);
}
if (erros.length) { console.error('Erros nos dados:\n - ' + erros.join('\n - ')); process.exit(1); }

const ctx = { site, projetos, noticias, clientes, eixos, fotos: fotosDoProjeto, raiz: '' };

// 2. Limpa e copia arquivos estáticos
fs.rmSync(DIST, { recursive: true, force: true });
fs.cpSync(path.join(RAIZ, 'public'), DIST, { recursive: true });

// 3. Descobre os módulos de seção (cada pasta em src/secoes/ é uma seção)
const pastasSecoes = fs.readdirSync(path.join(SRC, 'secoes'), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
const secoes = {};
for (const nome of pastasSecoes) {
  secoes[nome] = (await import(pathToFileURL(path.join(SRC, 'secoes', nome, 'index.js')).href)).default;
}

// 4. Junta CSS e JS dos módulos (base -> layout -> seções na ordem da home -> páginas)
const ordem = [
  'base', 'layout',
  ...site.secoes_home.map((s) => `secoes/${s}`),
  ...pastasSecoes.filter((s) => !site.secoes_home.includes(s)).map((s) => `secoes/${s}`),
  'paginas/projeto',
];
const juntar = (arquivo, embrulhar) => ordem
  .map((m) => path.join(SRC, m, arquivo))
  .filter((f) => fs.existsSync(f))
  .map((f) => {
    const rel = path.relative(SRC, f);
    const codigo = fs.readFileSync(f, 'utf8');
    return embrulhar ? `/* ${rel} */\n(() => {\n${codigo}\n})();` : `/* ${rel} */\n${codigo}`;
  }).join('\n\n');
fs.mkdirSync(path.join(DIST, 'css'), { recursive: true });
fs.mkdirSync(path.join(DIST, 'js'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'css', 'site.css'), juntar('estilo.css', false));
fs.writeFileSync(path.join(DIST, 'js', 'site.js'), juntar('comportamento.js', true));

// 5. Páginas
fs.writeFileSync(path.join(DIST, 'index.html'), await home(ctx, secoes));
fs.mkdirSync(path.join(DIST, 'projetos'), { recursive: true });
for (const p of projetos) {
  fs.writeFileSync(path.join(DIST, 'projetos', `${p.slug}.html`), paginaProjeto(p, ctx));
}
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');

// 6. Relatório de pendências (não vai para o site)
const pend = [];
for (const p of projetos) {
  const itens = [...(p._pendente || [])];
  if (!fotosDoProjeto(p.slug).length) itens.push('fotos');
  if (itens.length) pend.push(`| ${p.titulo} | ${itens.join(', ')} |`);
}
const relatorio = `# Pendências de conteúdo

Gerado automaticamente por \`npm run build\` em ${new Date().toLocaleString('pt-BR')}. Não edite à mão.

## Projetos

| Projeto | Falta |
|---|---|
${pend.join('\n')}

"ficha" significa que os dados da ficha técnica são ilustrativos e precisam ser confirmados com o cliente.

## Outras áreas

- Clientes de exemplo na faixa: ${clientes.clientes.filter((c) => c.exemplo).length}
- Notícias de exemplo: ${(noticias.noticias || []).filter((n) => n.exemplo).length}
- Formulário com endpoint próprio: ${site.formulario.endpoint ? 'sim' : 'não (usa mailto)'}
- Logo em alta definição: pendente (img/marca/logo.png veio do PDF)
`;
fs.writeFileSync(path.join(RAIZ, 'PENDENCIAS.md'), relatorio);

console.log(`Site gerado em dist/: home + ${projetos.length} páginas de projeto.`);
console.log(`Pendências de conteúdo: ${pend.length} projetos (ver PENDENCIAS.md).`);
