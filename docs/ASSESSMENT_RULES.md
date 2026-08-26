# Regras de Avaliação e Certificado

## Objetivo

O English Studio tem avaliações de escolha múltipla para consolidar o conhecimento
após a leitura dos conteúdos. A avaliação faz parte da experiência de aprendizagem
e serve para guiar a evolução de cada utilizador.

## Quizzes

- Cada quiz pertence a um **nó** do grafo (`NodeQuiz`).
- Uma pergunta (`QuizQuestion`) tem `id`, `prompt`, `options` (pelo menos duas),
  `correctOptionId` e `explanation`.
- O `scoreQuiz` calcula a nota em **10 valores** (`PASSING_SCORE = 5`).
- A `AssessmentSession` regista leituras (`markContentRead`) e tentativas
  (`submit`), mantendo o **melhor resultado** por nó.

## Progresso

- O progresso é guardado localmente no browser (`localStorage`) através de
  `BrowserAssessmentProgressStore` (chave `english.studio.assessment-progress.v1`).
- É possível reiniciar o progresso local a partir da interface.

## Certificado

- A emissão exige que **todos os nós avaliados** estejam aprovados
  (`isCertificateEligible`).
- No estado atual, os nós avaliados são os `exercises` das quatro habilidades
  (`listening.exercises`, `speaking.exercises`, `reading.exercises`,
  `writing.exercises`).
- O certificado é gerado em **PDF** (via `jsPDF`), local e **não verificável
  externamente** (natureza pedagógica).
- O ficheiro do certificado tem o nome `certificado-english-studio-<nome>.pdf`.

## Validação dos dados

- Os quizzes devem ter identificadores únicos de perguntas e opções.
- Cada pergunta deve referenciar uma opção correta válida.
- Um teste deve comparar os IDs do banco de quizzes com os IDs dos nós do grafo.