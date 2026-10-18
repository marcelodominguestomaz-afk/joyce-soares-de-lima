# Joyce Soares de Lima — Advocacia e Educação

Site institucional em React, TypeScript, Vite e Tailwind CSS.

Cópia preparada para repositório GitHub. A base relativa permite servir a pasta `dist/` na raiz de um domínio ou em um subdiretório. Conteúdo textual centralizado em `src/data/siteContent.ts`. Sem backend, formulário de envio ou ferramenta própria de análise de navegação.

## Desenvolvimento

```sh
npm install
npm run dev
npm run build
```

A compilação executa a checagem de tipos e gera o site estático em `dist/`.

Com o domínio definido, compile com o endereço completo para que a prévia apareça ao compartilhar o link (WhatsApp, LinkedIn, Facebook):

```sh
SITE_URL=https://seu-dominio.com.br npm run build
```

Sem `SITE_URL`, a imagem de prévia fica com caminho relativo e as redes sociais não a exibem.

## Conteúdo e configuração

- `src/data/siteContent.ts` — identidade, contato, públicos e áreas de atuação, etapas do atendimento, trajetória, formações, galeria, artigos e retrato opcional.
- `src/App.tsx` — seções e interações de navegação, detalhes, abas, galeria, privacidade e créditos.
- `src/styles.css` — identidade visual e regras de adaptação de tela.
- `public/assets/` — imagens e fontes servidas pelo próprio site.
- `asset-sources.json` — autoria, origem, licença e dados das imagens ilustrativas.

As informações profissionais foram organizadas a partir dos documentos fornecidos pelo usuário. Não houve validação externa de diplomas, experiência ou inscrição profissional. Não são exibidos clientes, resultados de processos, depoimentos não aprovados, logotipos institucionais, telefone ou endereço.

## Publicação no GitHub Pages

O fluxo `.github/workflows/deploy.yml` é acionado manualmente na aba **Actions → Publicar site → Run workflow**. Antes do primeiro uso, em **Settings → Pages**, escolha a origem **GitHub Actions**. Se houver domínio, cadastre-o em **Settings → Secrets and variables → Actions → Variables** como `SITE_URL`. Em contas gratuitas, o GitHub Pages só funciona com repositório público.

## Antes de publicar

- [ ] Inserir o número da OAB em `siteContent.oab` (ex.: `'OAB/SP 123.456'`).
- [ ] Revisar os textos com Joyce, em especial as etapas de “Como funciona” (`siteContent.process`), que descrevem o atendimento.
- [ ] Opcional: publicar artigos curtos de orientação e listá-los em `siteContent.articles`. A seção “Conteúdos” só aparece quando houver ao menos um.
- [ ] Confirmar a autorização de uso de imagem das pessoas que aparecem nas fotografias de vivências.
- [ ] Opcional, mas recomendado: incluir um retrato de Joyce em `public/assets/` e preenchê-lo em `siteContent.portrait`. Ele aparece na seção “Sobre”.
- [ ] Definir `SITE_URL` com o domínio final.
- [ ] Trocar `noindex, nofollow` por `index, follow` em `index.html`.

## Publicação inicial

A versão atual mantém `noindex, nofollow` enquanto o conteúdo está em revisão. O número da OAB ainda não foi fornecido. Para publicação aberta, inserir o número real e a UF em `siteContent.oab`, revisar os textos com Joyce e atualizar a diretiva de indexação. Não inserir números fictícios. O canal de contato é `conecteadv@gmail.com` e os botões abrem o aplicativo de e-mail do visitante.

A restrição de identificação profissional está no briefing recebido e no artigo 44 do Código de Ética, com redação da Resolução CFOAB 07/2016. Referência primária consultada em 18 de outubro de 2026 https://www.oab.org.br/leisnormas/legislacao/resolucoes/07-2016

## Imagens e tipografia

Três fotografias ilustrativas foram obtidas a partir de páginas originais de Nina Schneider, Ioann-Mark Kuznietsov e Mstudio. São identificadas como ilustrações e não representam Joyce ou seu escritório. A autoria e os links aparecem no rodapé, em “Créditos das imagens”, e no arquivo de fontes. As cinco fotografias de vivências foram fornecidas pelo usuário. Todas foram redimensionadas para uso na web. Na fotografia vertical com barras de interface, somente a área externa à imagem foi retirada.

Fontes Cormorant Garamond e Manrope distribuídas pelo Google Fonts sob SIL Open Font License. Arquivos de licença em `public/assets/fonts/`.

## Verificação

Checagem de tipos TypeScript e compilação de produção. Inspeção das imagens utilizadas. Conferência estrutural por renderização React no servidor, incluindo links internos e arquivos locais.

Inspeção visual em navegador Chromium nas larguras de 360, 768 e 1440 pixels, sem rolagem horizontal nem erros de console. Testados: menu móvel, cartões de áreas, abas de formação, galeria ampliada e destaque do menu durante a rolagem.
