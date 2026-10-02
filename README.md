# Site Torres Produções Culturais

Site estático gerado a partir de arquivos JSON. Sem framework e sem dependências: só Node 20+.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run build` | Gera o site em `dist/` e atualiza `PENDENCIAS.md` |
| `npm run dev` | Gera e abre em http://localhost:8080 |
| `IG_TOKEN=... npm run instagram` | Busca posts com a hashtag e atualiza `dados/noticias.json` |

Para o HostGator: rode `npm run build` e envie o conteúdo de `dist/` para a `public_html`.

## Estrutura

```
dados/              conteúdo (é aqui que se edita no dia a dia)
  site.json         contatos, eixos, leis, parceiros, ordem das seções da home
  projetos.json     todos os projetos e serviços (fonte única)
  noticias.json     gerado pelo script do Instagram
  clientes.json     faixa de clientes
public/img/
  projetos/<slug>/  fotos de cada projeto, em ordem de nome (1.webp, 2.webp...)
  clientes/         logos de clientes
  marca/            logo, favicon e foto do "Quem somos"
src/
  base/             tokens de cor e tipografia (trocar identidade visual = editar :root)
  layout/           topo, menu e rodapé
  secoes/<nome>/    cada seção da home: index.js (HTML), estilo.css, comportamento.js
  paginas/          home e página de projeto
scripts/            build, servidor local e Instagram
```

Cada seção é independente: tem seu próprio HTML, CSS e JS. O build junta tudo em
`dist/css/site.css` e `dist/js/site.js`, e cada script só age se encontrar a sua seção na página.

## Tarefas comuns

**Adicionar um projeto:** copie um bloco em `dados/projetos.json`, troque o `slug` (só letras
minúsculas, números e hífen), crie a pasta `public/img/projetos/<slug>/` com as fotos e rode o build.
A página `/projetos/<slug>.html` é criada sozinha.

**Trocar fotos:** substitua os arquivos na pasta do projeto. Sem fotos, o site mostra uma área reservada.

**Vídeos:** em `videos`, coloque só o ID do YouTube (em `https://youtu.be/bWSCgo6WTKQ`, o ID é `bWSCgo6WTKQ`).

**Mudar status:** `status` aceita `repertorio`, `captacao` ou `realizado` (rótulos em `site.json`).

**Tirar uma seção da home:** remova o nome dela de `secoes_home` em `site.json`.

**Nova identidade visual:** edite as variáveis no topo de `src/base/estilo.css` e troque `public/img/marca/logo.png`.

**Formulário de interesse:** sem `formulario.endpoint` em `site.json`, ele abre o e-mail do visitante
com a mensagem pronta. Com um endpoint (Formspree, ou um script PHP no HostGator), envia direto.

## Notícias do Instagram

O script lê os posts da conta Profissional e publica só os que têm a hashtag de `site.json`
(padrão `#torresnoticias`). No GitHub, o workflow roda a cada 6 horas.

Configuração única:
1. Conta do Instagram como Profissional (Comercial ou Criador de conteúdo).
2. App no Meta for Developers com o produto "Instagram API com Login do Instagram" e permissão `instagram_business_basic`.
3. Gerar o token de longa duração e salvar em **Settings → Secrets and variables → Actions** como `IG_TOKEN`.
4. Em **Settings → Pages**, escolher **Source: GitHub Actions**.

O token nunca vai para o site. Se o Instagram falhar, o site continua com as últimas notícias salvas.
