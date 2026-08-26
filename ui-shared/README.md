# ui-shared — English Studio

Pacote workspace com o domínio partilhado do English Studio, reutilizado entre a
aplicação web (Next.js) e a app mobile (Expo/React Native).

## O que contém

- `src/graph/` — grafo de conhecimento (`englishStudioGraph`) e tipos (`Node`, `Cluster`, `Connection`, `Journey`, ...).
- `src/engine/` — `EnglishStudioEngine`: motor que controla o comportamento e a navegação.
- `src/assessment/` — avaliação (`AssessmentSession`, `englishStudioQuizzes`, scoring).
- `src/certificate/` — criação dos detalhes do certificado pedagógico.
- `src/content/` — carregadores de conteúdo Markdown.
- `src/infrastructure/` — stores de progresso (browser) e `FileSystemContentSource`.
- `src/presentation/` — estado de apresentação e layout radial.
- `src/ui/` — componentes React (`EnglishStudioExperience`, `KnowledgeNetwork`, `ContentPanel`, `QuizPanel`, `CertificatePanel`, `NodeIcon`, `NavigationLegend`).
- `src/design/tokens.ts` — tokens de design (cores, tipografia, espaçamento, raios, gradientes, movimento).
- `docs/assets/logo_david.png` — logótipo central da experiência.
- `app-globals.css` — referência de estilos globais para os tokens.

## Como é consumido

- **Web**: o `tsconfig.json` raiz mapeia `@english-studio/ui-shared` para
  `ui-shared/src/index.ts`, portanto a web usa o código-fonte diretamente.
- **Mobile**: consome o pacote pelo `main` (`dist/index.js`), que expõe os tokens
  de design portáveis. A lógica que depende de APIs Node (`FileSystemContentSource`)
  fica apenas no lado web.

## Notas de portabilidade

- `FileSystemContentSource` usa APIs Node.js via *dynamic import* e lança um erro
  claro em ambiente de browser.
- `react-markdown` e `jsPDF` são usados no web; para mobile deverá usar
  alternativas (ex.: `react-native-render-html` e exportação de PDF/partilha).
- Altera os ficheiros em `src/`; o `dist/` é apenas o ponto de entrada CommonJS
  para consumidores Node/Expo.