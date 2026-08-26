# Experiência de utilização

Este documento descreve a experiência do English Studio sem depender de
componentes ou frameworks. `PROJECT.md` permanece a especificação oficial.

## Entrada

O utilizador entra diretamente no universo English Studio. A rede completa ocupa
o espaço principal e o conceito central comunica **estudo, treino e evolução**.
O núcleo é também a primeira ação da narrativa: selecioná-lo revela as quatro
habilidades (clusters); selecionar um pilar revela os seus conceitos; selecionar
um conceito abre o respetivo foco e contexto relacional. A legenda acompanha a
navegação.

## Níveis de exploração

- **Nível 0** — visão global: o núcleo central com as habilidades à volta.
- **Nível 1** — os pilares (Listening, Speaking, Reading, Writing) como hubs.
- **Nível 2** — os conceitos de cada pilar (`intro`, `vocabulary`, `grammar`,
  `pronunciation`, `exercises`).

O utilizador seleciona um nó e pode começar a explorar imediatamente. As ligações
entre habilidades (cluster `connections`) reforçam a ideia de que nada vive isolado.

## Organização da tela

A `EnglishStudioExperience` mantém uma cabeçalho com a identidade, o estado,
controlo de movimento, o indicador de certificado e o reset de progresso. A
`NavigationLegend` indica os clusters e o progresso por cluster; o
`KnowledgeNetwork` desenha a rede com o núcleo "Fluency"; o `ContentPanel` mostra
o conteúdo e, se existir, o quiz.

## Acessibilidade

- Navegação por teclado e foco visível.
- Alternar movimento (respeita `prefers-reduced-motion` via `Motion`).
- Linha de conteúdo acessível e, quando necessário, âria-labels.
- Questões legíveis e contraste adequado.

## Movimento

Movimentos suaves e com propósito, sem excesso de efeitos. Cada animação deve
comunicar algo: relevo, foco, ligação, conclusão. O utilizador pode pausar o
movimento.