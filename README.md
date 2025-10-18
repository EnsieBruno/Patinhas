# Patinhas.org - Projeto de Adoção (Projeto de Faculdade)

Este é um projeto front-end completo desenvolvido para atender aos requisitos da disciplina de Desenvolvimento Desenvolvimento Front-End Para Web, com foco em HTML semântico, CSS moderno (Design System, SPA) e Acessibilidade (WCAG).

## 🚀 Visão Geral do Projeto

O site da Patinhas.org é uma plataforma de demonstração para uma ONG de resgate de animais. O projeto foi construído em 4 fases, implementando progressivamente novos requisitos técnicos, desde a estrutura básica de HTML até uma Single Page Application (SPA) acessível com modo escuro.

### ✨ Funcionalidades Principais

* **Estrutura Semântica (Fase 1):** HTML5 semântico em 8 páginas, hierarquia de títulos e imagens otimizadas com `<picture>`.
* **Formulários Complexos (Fase 1):** Formulário de cadastro com validação nativa (HTML5) e máscaras de input (JS).
* **Design System (Fase 2):** CSS modular com variáveis, paleta de 8+ cores acessível e espaçamento modular.
* **Layout Responsivo (Fase 2):** Design "Mobile-first" com 5 breakpoints, usando Flexbox para componentes e CSS Grid para o layout principal.
* **Componentes Avançados (Fase 2):** Cards responsivos, botões com todos os estados (`:hover`, `:focus`, `:active`), e menu hambúrguer funcional.
* **Single Page Application (SPA) (Fase 3):** Navegação sem recarregamento, usando a History API e `fetch` para carregar conteúdo dinamicamente.
* **Validação Avançada (Fase 3):** Verificação de consistência de CPF em tempo real (JavaScript) com feedback visual (`.alert-error`).
* **Acessibilidade (WCAG AA) (Fase 4):**
    * Contraste de cores 4.5:1 (mínimo) em toda a paleta.
    * Navegação completa por teclado (com estados `:focus` visíveis).
    * Textos alternativos (`alt`) descritivos em todas as imagens.
    * Modo Escuro / Alto Contraste com persistência via `localStorage`.
* **Visualização de Dados (Bônus):** Gráficos interativos (Chart.js) na página de Transparência, que são recarregados dinamicamente no SPA.

## 🛠️ Tecnologias Utilizadas

* **HTML5** (Semântico, `<picture>`)
* **CSS3** (Variáveis, Grid, Flexbox, Modular `@import`)
* **JavaScript (ES6+)** (Fetch, DOM, History API, Validação, SPA, localStorage)
* **Chart.js** (Biblioteca de gráficos)

## 📁 Estrutura de Pastas

O projeto segue uma estrutura de pastas organizada, como exigido pelos requisitos:

<pre><code>
projeto/
│
├── index.html # Página principal / "Shell" do SPA
├── sobre.html
├── projetos.html
├── cadastro.html
├── doacoes.html
├── transparencia.html
├── contato.html
├── blog.html
│
├── css/
│ ├── style.css # Arquivo principal de importação
│ ├── style.min.css # Arquivo minificado para produção
│ ├── _variables.css # Design System (cores, fontes, modo escuro)
│ ├── _reset.css # Reset global e estilos do &lt;body&gt;
│ ├── _layout.css # Header, Footer, Main, Grid
│ ├── _components.css # Botões, Cards, Formulários, Toggle
│ └── _responsive.css # Media queries, Menu Hambúrguer
│
├── js/
│ ├── scripts.js # Script principal modularizado (SPA, Validação, Gráficos, UI)
│ └── scripts.min.js # Script minificado para produção
│
├── assets/
│ ├── (imagens .jpg, .webp, .png)
│ └── (áudios .mp4)
│
└── README.md
</code></pre>

## 🚀 Como Executar

Por ser um projeto puramente front-end (HTML, CSS, JS), não é necessário um servidor complexo.

1.  Clone este repositório.
2.  Abra a pasta do projeto.
3.  Abra o arquivo `index.html` diretamente no seu navegador de preferência.

*Obs: Para uma experiência ideal (evitando problemas com CORS no `fetch` do SPA), é recomendado usar uma extensão como o "Live Server" do VS Code.*

## 👤 Autor

* **Bruno Alves da Silva**
