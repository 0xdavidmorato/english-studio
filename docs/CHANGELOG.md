# CHANGELOG.md

Regista alterações importantes do projeto English Studio.

## [0.1.0] — Em desenvolvimento

### 2026-08

- **Identidade própria**: o repositório deixou de herdar os nomes, expressões e
  ficheiros do modelo de referência. Todos os identificadores passaram a ser
  exclusivos do English Studio:
  - `englishStudioGraph`, `englishStudioQuizzes`, `EnglishStudioEngine`,
    `EnglishStudioExperience` e `EnglishStudioExperienceProps`.
  - CSS `.studio-core` (substitui antigo core), altura de rede, certificado
    `certificado-english-studio-*.pdf`.
- **Eliminada duplicação de domínio**: removida a pasta `src/` da raiz; o domínio
  e os componentes passam a viver apenas em `ui-shared`, consumido pela web.
- **Configuração**: `basePath` para `/english-studio`; metadados do pacote (
  repository, keywords, descrição) atualizados; alias `@english-studio/ui-shared`
  via tsconfig paths para resolver o código-fonte.
- **Conteúdo**: criado grafo com pilares e sub-nós (`intro`, `vocabulary`,
  `grammar`, `pronunciation`, `exercises`) e cluster `connections`; novo
  `public/content/english/connections.md`.
- **Docs**: todas as páginas de `docs/` reescritas com a identidade do English
  Studio.