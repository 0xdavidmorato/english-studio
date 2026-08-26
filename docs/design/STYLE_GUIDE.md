# Direção visual

Esta guia traduz a referência visual oficial em decisões de apresentação. Não
altera o Graph, a Engine ou o conteúdo.

## Composição

- Fundo escuro profundo com gradientes subtis (cian/azul).
- Rede central (grafo) como protagonista; a identidade no cabeçalho.
- Cartões e painéis em sobreposição translúcida com `backdrop-filter`.

## Cor

Tokens em `ui-shared/src/design/tokens.ts`:

- `background` `#020711` — base.
- `ink` `#e8f8fb` — texto principal.
- `muted` `#7695a4` — texto secundário.
- `cyan` / `cyan700` — acentos e relevo.
- `success` `#62dc9b`, `warning` `#f5c84e`, `info` `#58eff7` — estados de avaliação.

## Tipografia

- `fontFamily`: Inter, com fallback de sistema.
- Escala base `16px`; escala de tipos `[12, 14, 16, 20, 24, 32, 48]`.
- Usar espaçamento generoso nas palavras e nos cartões.

## Formas e raios

- `radii.card: 12`, `radii.round: 9999`, `radii.small: 6`.
- Nós circulares; cartões com cantos suaves.

## Movimento

- `motion.easeOrganic: cubic-bezier(0.22, 0.8, 0.25, 1)`.
- Animações com propósito (foco, ligação, conclusão) e ritmo moderado.

## Acessibilidade

- Contraste adequado sobre o fundo escuro.
- Estados de foco visíveis e navegação por teclado.
- Suporte a `prefers-reduced-motion`.