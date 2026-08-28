# Site Torres Produções Culturais

Site institucional em arquivo único (`index.html`) — HTML, CSS, fontes e imagens embutidos. Não precisa de build nem servidor.

## Publicar com GitHub Pages

1. Suba o `index.html` deste pacote na raiz do repositório `RICHARD-CALDERONI/torres-producoes-site` (branch `main`).
   - Pelo site: **Add file → Upload files → Commit changes**.
   - Pelo terminal:
     ```
     git clone https://github.com/RICHARD-CALDERONI/torres-producoes-site.git
     cd torres-producoes-site
     cp /caminho/para/index.html .
     git add index.html && git commit -m "Publica site Torres Produções" && git push
     ```
2. No repositório: **Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save**.
3. Em 1–2 minutos o site fica em:
   `https://richard-calderoni.github.io/torres-producoes-site/`

## Conteúdo

Home, Quem somos, Serviços, Leis de incentivo, Portfólio (filtro por tema), Parceiros, Notícias e Fale conosco.
Contato: (11) 96053-9418 · contato@torresproducoes.com · @torresproducoesculturais · Mairiporã/SP.

O arquivo fonte editável fica no projeto de design (`Site Torres.dc.html`); a cada alteração, gere um novo `index.html` a partir dele.

## Otimização de imagens

As 23 imagens embutidas no bundle vinham como PNG (~9,5 MB de dados brutos, ~13,4 MB de arquivo). Foram recodificadas para WebP (mantendo transparência apenas onde ela é realmente usada), reduzindo o payload de imagens em ~92% — arquivo final com ~1,6 MB.

Como o `index.html` é gerado novamente a cada exportação do design, essa otimização precisa ser reaplicada depois de cada nova geração. Para repetir o processo:

```
node scripts/optimize-images.js index.html
```

