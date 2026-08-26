# Regras de comportamento da Engine

Este documento especifica o comportamento executável da **EnglishStudioEngine**.
`PROJECT.md` permanece a especificação oficial; em caso de conflito, `PROJECT.md`
e as decisões em `DECISIONS.md` prevalecem.

## Foco

- `focus(nodeId)` seleciona um nó, calcula as ligações incidentes
  (`focusedConnections`) e os nós relacionados (`relatedNodes`).
- Nós `locked` ou indisponíveis na jornada ativa não podem ser focados.
- `blur` limpa o foco.

## Estados funcionais

- Transições: `unlocked|inactive -> active`, `active -> inactive`,
  `unlocked|active|inactive -> completed`.
- `reset` repõe todos os estados a partir do grafo.

## Jornadas

- `journeyStart(id)` inicia a jornada com esse id do grafo.
- Jornada `linear` avança para o próximo nó a cada conclusão.
- Jornada `exploratory` permite focar qualquer nó da jornada.
- `recordJourneyCompletion` só aceita a conclusão do nó atual numa jornada linear.
- A validação do grafo exige IDs de nós e jornadas únicos, e jornadas com pelo
  menos um nó existente.

## Timeline

- `timelineChange` avança para a próxima etapa da `narrativeTimeline`.
- O estado `currentStage` inicia na primeira etapa da timeline.