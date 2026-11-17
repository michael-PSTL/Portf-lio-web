# Portfólio de Michael Silva Soares

Aplicação React 19 com Vite, preparada para hospedagem estática. Mantém o layout original e usa componentes, estado e efeitos do React. Não precisa de servidor Node em produção.

## Executar e validar

Use Node.js 24 (arquivo `.nvmrc`) e npm:

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run preview
```

O build gera a pasta `dist`. Envie **o conteúdo dessa pasta** ao provedor. Não publique `src` diretamente. O comando `preview` serve apenas para conferir o build localmente.

## Dados e disponibilidade

Copie `.env.example` para `.env` se desejar personalizar a API. `VITE_API_BASE_URL` define a URL pública do backend; sem a variável, o site usa a API Render original. Defina `VITE_API_BASE_URL=` para usar apenas os dados locais de `src/data/fallback.js`.

As chamadas validam HTTP, JSON e formato dos dados, possuem timeout de 12 segundos e são canceladas na desmontagem. Cada recurso mantém os últimos dados disponíveis ou usa dados locais quando falha, sem derrubar a página. Um aviso de conexão permite tentar novamente sem recarregar; ele desaparece quando todos os recursos voltam a responder. Traduções são compartilhadas entre componentes. Atualize `fallback.js` junto com seus projetos e tecnologias. Estatísticas desconhecidas aparecem como `—`, sem inventar números.

Variáveis `VITE_*` entram no JavaScript público durante o build: não coloque senhas ou tokens nelas. A API precisa permitir CORS para o domínio da hospedagem. Fontes Google, ícones de tecnologias e avatar GitHub continuam sendo recursos externos; o conteúdo textual permanece disponível se eles falharem.

## Hospedar

### Vercel, Netlify ou outro servidor estático

- Diretório raiz: este repositório.
- Instalação: `npm ci`.
- Build: `npm run build`.
- Pasta de saída/publicação: `dist`.
- Node.js: 24.
- Configure `VITE_API_BASE_URL` antes do build se necessário.

O site usa âncoras (`#projects`, por exemplo), sem rotas de servidor. Não é necessário redirecionamento SPA. Os arquivos do build usam caminhos relativos, funcionando tanto em domínio próprio quanto em uma subpasta como `/Portf-lio-web/`.

### GitHub Pages

1. Integre as alterações na branch `main`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**.
3. Opcional: em **Settings → Secrets and variables → Actions → Variables**, crie `VITE_API_BASE_URL` para conectar sua API. Sem essa variável, o workflow Pages publica usando os dados locais, evitando dependência da API original.
4. Em **Actions → Deploy GitHub Pages**, clique em **Run workflow**, escolhendo `main`.
5. Após sucesso, o endereço será `https://michael-PSTL.github.io/Portf-lio-web/`.

A publicação é manual para você decidir quando colocar o site no ar. O workflow de validação roda em pushes e pull requests, executa lint, testes e build no Linux e disponibiliza `portfolio-dist` como artefato.

## Ajustes realizados

- Imports corrigidos para sistemas que diferenciam maiúsculas e minúsculas.
- Ícones SVG internos referenciados por fragmento, compatíveis com subpastas.
- Dependências sem uso de Expo, GSAP, Motion e ferramentas CSS removidas.
- Menu móvel com Escape, controle de foco e navegação oculta fora da tabulação.
- Modal nativo de projetos com foco contido, restauração de foco, Escape e links reais por teclado.
- Estados de carregamento, indisponibilidade e lista vazia.
- Removidos widget Spotify fictício, botões de configuração sem ação, estatísticas vazias e links para páginas inexistentes.
- Idioma, título, descrição, fontes sem duplicação, link para pular navegação e redução de movimento.

## Auditoria de dependências

As atualizações compatíveis disponíveis foram aplicadas. Em 17/11/2026, resta o alerta [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) em `picomatch`, dependência de desenvolvimento do Vite, sem versão corrigida publicada. O risco descrito envolve padrões glob maliciosos processados no Node. Essa ferramenta não integra o JavaScript servido pelo site estático; `npm audit --omit=dev` não encontrou vulnerabilidades. Reavalie com `npm audit` ao atualizar as ferramentas. Não use o servidor de desenvolvimento Vite como hospedagem de produção.

Guia de referência: [publicação de sites estáticos com Vite](https://vite.dev/guide/static-deploy).
