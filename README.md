# English Studio

Plataforma experimental para **estudar e treinar inglês** através das quatro
habilidades fundamentais — **Listening, Speaking, Reading e Writing** — organizadas
num grafo de conhecimento navegável, com quizzes de evolução e emissão de um
**certificado pedagógico em PDF** conforme o teu progresso.

## Como explorar

- **`/`** — experiência de grafo (`EnglishStudioExperience`): navega pelos
  pilares e conceitos, lê o conteúdo e faz os testes.
- **`/english`** — hub com as quatro habilidades e ligações para cada área.
- **`/english/listening | speaking | reading | writing`** — páginas de cada
  habilidade com lições e quiz.
- **`/english/experience`** — pré-visualização da experiência em grafo.

## Arquitetura (monorepo)

| Pacote | Descrição |
| --- | --- |
| `app/` | Aplicação web Next.js (Server Components + client components). |
| `ui-shared/` | Domínio partilhado (grafo, engine, avaliação, certificado, conteúdo) + componentes React e tokens de design, reutilizados entre web e mobile (`@english-studio/ui-shared`). |
| `mobile/` | Scaffold da app mobile com Expo/React Native. |
| `public/content/english/` | Conteúdo das lições em Markdown (fonte das lições e quizzes). |
| `docs/` | Documentação do projeto (visão, arquitetura, regras, decisões, design). |

`ui-shared` é a **fonte única** do domínio e dos componentes. A web resolve
`@english-studio/ui-shared` a partir do código-fonte (via `tsconfig` paths);
o mobile consome o mesmo pacote.

## Comandos

```bash
npm run dev       # servidor de desenvolvimento Next
npm run build     # build estático (next build, output: export)
npm run typecheck # verificação de tipos (tsc --noEmit)
```

## Estado

Projeto em desenvolvimento. A estrutura define a marca e o domínio próprios do
English Studio; os nomes, ficheiros e conteúdo são exclusivos deste repositório.

Contato: david.morato@gmail.com