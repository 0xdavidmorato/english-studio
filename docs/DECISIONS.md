# DECISIONS.md

Decisões arquiteturais tomadas e respetiva justificação.

# 2026-07

## Contexto

O repositório `english-studio` foi criado a partir de um modelo de referência,
tendo herdado nomes, expressões e documentação do mesmo. Decidiu-se dar ao
projeto uma **identidade própria**, mantendo a arquitetura e a experiência visual
como referência, mas com nomes, ficheiros e conteúdo exclusivos.

## Decisões

### D1 — Domínio partilhado vive em `ui-shared` (fonte única)
- **Decisão**: remover a pasta `src/` da raiz e usar apenas `ui-shared` como
  fonte do domínio, engine, componentes e tokens.
- **Justificação**: elimina duplicação e divergência entre duas cópias do mesmo
  código; a web resolve `@english-studio/ui-shared` para o código-fonte via
  tsconfig `paths`.

### D2 — Renomeação dos identificadores
- **Decisão**: renomear todos os identificadores herdados do modelo de referência
  (grafo, quizzes, engine e experiência) para o prefixo exclusivo
  `EnglishStudio`/`englishStudio`, e a classe CSS do núcleo para `studio-core`.
- **Justificação**: nomes, expressões e ficheiros exclusivos de cada projeto,
  sem duplicar referências alheias.

### D3 — Estrutura de nós segue o modelo de referência com IDs próprios
- **Decisão**: o grafo usa clusters por habilidade e sub-nós
  (`intro`, `vocabulary`, `grammar`, `pronunciation`, `exercises`), com IDs
  exclusivos (`listening.intro`, `speaking.pronunciation`, ...) e um cluster
  `connections`.
- **Justificação**: mantém a experiência visual e a estrutura de nós do modelo,
  mas com domínio próprio.

### D4 — Certificado por evolução
- **Decisão**: o certificado é emitido quando os `exercises` das quatro
  habilidades estão aprovados, em PDF local não verificável externamente.
- **Justificação**: alinha o certificado com a visão de evolução no estudo de
  inglês.

### D5 — Alias de resolução no monorepo
- **Decisão**: `@english-studio/ui-shared` resolve para `ui-shared/src` na web
  (tsconfig paths) e para `dist/index.js` (tokens) no mobile.
- **Justificação**: web usa o código-fonte; mobile consome tokens portáveis.