# Arquitetura

## Objetivo

A arquitetura do English Studio separa completamente o **domínio**, a **engine**
e a **interface gráfica**. O domínio (grafo, avaliação, conteúdo) é independente
de qualquer framework; a interface apenas representa estados produzidos pela engine.

## Camadas

```
ui-shared/src/
  graph/          # modelo de domínio: Node, Cluster, Connection, Journey, Graph
  engine/         # EnglishStudioEngine: comportamento, foco, jornadas, timeline
  assessment/     # AssessmentSession, quizzes, scoring, progresso
  certificate/    # criação dos detalhes do certificado
  content/        # ContentLoader, ContentSource, MarkdownContentLoader
  infrastructure/ # BrowserAssessmentProgressStore, FileSystemContentSource
  presentation/   # createPresentationState, RadialLayout
  ui/             # componentes React de apresentação (Web)
  design/         # tokens de design
```

## Aplicação web (`app/`)

- `app/page.tsx` (Server Component) carrega o conteúdo do grafo a partir do disco
  (`FileSystemContentSource` + `MarkdownContentLoader`) e entrega a
  `EnglishStudioExperience`.
- `app/english/*` — hub e páginas por habilidade.
- `app/english/experience/page.tsx` — pré-visualização da experiência.

O web resolve `@english-studio/ui-shared` para `ui-shared/src` através de
`tsconfig` paths.

## Aplicação mobile (`mobile/`)

Scaffold Expo/React Native que consome `@english-studio/ui-shared` (tokens de
design). A lógica dependente de APIs Node (conteúdo em filesystem) fica apenas
no web.

## Fluxo de dados

1. O **grafo** (`englishStudioGraph`) define nós, clusters, ligações e jornadas.
2. A **engine** (`EnglishStudioEngine`) interpreta ações (foco, jornada, conclusão)
   e mantém o estado funcional.
3. A **apresentação** (`createPresentationState`) projeta o estado da engine no
   que os componentes vão desenhar.
4. A **interface** (`EnglishStudioExperience`, `KnowledgeNetwork`, `ContentPanel`,
   `QuizPanel`, `CertificatePanel`) apenas desenha e emite ações.
5. O **progresso de avaliação** é persistido localmente
   (`BrowserAssessmentProgressStore`).

## Regras

- O domínio nunca importa React ou Next.
- A interface nunca decide comportamento; apenas emite eventos para a engine.
- O conteúdo Markdown vive em `public/content/english/`, nunca dentro de componentes.
- Os componentes de UI são partilhados em `ui-shared` para reutilização web/mobile.