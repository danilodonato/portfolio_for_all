# Portfolio for All

Gerador de portfólio para desenvolvedores: preencha seus dados num painel visual, veja o resultado em tempo real e baixe um site pronto (HTML/CSS/JS puro) para hospedar onde quiser.

## Funcionalidades

- Painel de edição com preview ao vivo (desktop, tablet e mobile)
- Personalização de cores, foto de perfil, currículo (PDF), redes sociais, experiências e projetos
- Suporte a PT-BR/EN nos textos do portfólio gerado
- Exportação em `.zip` com um site estático completo, sem dependências de build para rodar

## Como usar

1. Acesse o gerador (`/generator.html`).
2. Preencha as informações no painel lateral — o preview à direita atualiza em tempo real.
3. Clique em **Baixar Meu Portfólio (.ZIP)**.
4. Extraia o `.zip` e hospede a pasta em qualquer serviço de site estático (Vercel, Netlify, GitHub Pages, etc.).

## Rodando localmente

Pré-requisitos: [Node.js](https://nodejs.org/) 18+.

```bash
npm install
npm run dev
```

Isso abre o projeto em `http://localhost:5173`, com duas páginas:

- `/index.html` — portfólio de exemplo (template base)
- `/generator.html` — painel do gerador

Outros comandos:

```bash
npm run build    # gera o build de produção em dist/
npm run preview  # serve o build de produção localmente
```

## Tecnologias

- [Vite](https://vitejs.dev/) — build e dev server
- JavaScript puro (sem framework) + SCSS
- [GSAP](https://gsap.com/) — animações e scroll effects
- [Swiper](https://swiperjs.com/) — carrossel de imagens
- [JSZip](https://stuk.github.io/jszip/) + [FileSaver.js](https://github.com/eligrey/FileSaver.js) — geração e download do `.zip`

## Deploy

O projeto é 100% estático. Para colocar o gerador no ar, basta conectar o repositório na [Vercel](https://vercel.com) ou [Netlify](https://netlify.com) — ambos detectam o Vite automaticamente (`vite build`, saída em `dist/`), sem configuração adicional.

## Contribuindo

Sugestões, bugs e melhorias são bem-vindos! Abra uma [Issue](https://github.com/danilodonato/portfolio_for_all/issues) ou mande um Pull Request.

## Licença

Distribuído sob a licença [MIT](LICENSE).

---

Feito por [Caelium](https://danilodonato.netlify.app)
