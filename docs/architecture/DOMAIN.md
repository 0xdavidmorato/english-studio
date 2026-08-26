# Domínio

## Objetivo

O domínio representa todos os conceitos fundamentais do English Studio, sem
depender de qualquer componente ou framework. É a **fonte de verdade**.

## Grafo de conhecimento

O domínio central é o **grafo** (`Graph`), composto por:

- **Node** — um conceito de aprendizagem (ex.: `listening.intro`, `reading.grammar`).
  Cada nó tem `id`, `name`, `description`, `category`, `clusterId`, relações,
  estado visual e funcional, e referências de conteúdo (`ContentReference`).
- **Cluster** — agrupamento temático; os quatro pilares (`listening`, `speaking`,
  `reading`, `writing`) e as `connections`.
- **Connection** — ligação entre nós de clusters diferentes; tem `intensity`,
  `priority`, `meaning` e `direction`.
- **Journey** — percurso (`core-narrative` linear; `free-exploration` exploratório).
- **NarrativeTimeline** — etapas globais (`initialization`, `introduction`,
  `exploration`, `focus`, `reflection`, `conclusion`).

## IDs e convenção

- Os IDs dos nós seguem `cluster.tema` em minúsculas e hífenes
  (ex.: `listening.vocabulary`, `speaking.pronunciation`).
- O cluster de ligações usa o id `connections`.
- O conteúdo dos nós aponta para ficheiros Markdown em `public/content/english/`.

## Estados

- `FunctionalState`: `locked | unlocked | active | inactive | completed`.
- `VisualState`: `visible | hidden | highlighted | selected | focused | fading`.

## Avaliação

- `NodeQuiz` associa perguntas de escolha múltipla a um nó.
- `AssessmentSession` guarda leituras e tentativas e calcula o melhor resultado
  por nó.
- O **certificado** é elegível quando todos os nós avaliados (os `exercises` das
  quatro habilidades) estão aprovados.

## Conteúdo

- `ContentSource` abstrai a origem dos ficheiros.
- `MarkdownContentLoader` carrega um `ContentReference` e devolve `LoadedContent`.
- `FileSystemContentSource` (Node) lê os ficheiros no web; o mobile usa alternativas.