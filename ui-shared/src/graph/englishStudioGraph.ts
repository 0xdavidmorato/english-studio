import type { Cluster, Connection, Graph, Node } from "./";

const clusterDefinitions = [
  ["listening", "Listening"],
  ["speaking", "Speaking"],
  ["reading", "Reading"],
  ["writing", "Writing"],
] as const;

const contentNodes = [
  // Listening
  ["listening.intro", "listening", "Introdução", "listening/intro", "Ouvir para compreender"],
  ["listening.vocabulary", "listening", "Vocabulário", "listening/vocabulary", "Vocabulário auditivo em contexto"],
  ["listening.grammar", "listening", "Gramática", "listening/grammar", "Reconhecer estruturas ao ouvir"],
  ["listening.exercises", "listening", "Treino", "listening/exercises", "Exercícios de compreensão auditiva"],
  // Speaking
  ["speaking.intro", "speaking", "Introdução", "speaking/intro", "Falar para comunicar"],
  ["speaking.vocabulary", "speaking", "Vocabulário", "speaking/vocabulary", "Vocabulário oral ativo"],
  ["speaking.grammar", "speaking", "Gramática", "speaking/grammar", "Estruturas para falar com confiança"],
  ["speaking.pronunciation", "speaking", "Pronúncia", "speaking/pronunciation", "Sons, ritmo e entoação"],
  ["speaking.exercises", "speaking", "Treino", "speaking/exercises", "Exercícios de produção oral"],
  // Reading
  ["reading.intro", "reading", "Introdução", "reading/intro", "Ler para extrair sentido"],
  ["reading.vocabulary", "reading", "Vocabulário", "reading/vocabulary", "Reconhecer palavras no texto"],
  ["reading.grammar", "reading", "Gramática", "reading/grammar", "Estruturas visíveis na leitura"],
  ["reading.exercises", "reading", "Treino", "reading/exercises", "Exercícios de compreensão escrita"],
  // Writing
  ["writing.intro", "writing", "Introdução", "writing/intro", "Escrever para organizar o pensamento"],
  ["writing.vocabulary", "writing", "Vocabulário", "writing/vocabulary", "Mensagens e palavras certas"],
  ["writing.grammar", "writing", "Gramática", "writing/grammar", "Aplicar regras ao escrever"],
  ["writing.exercises", "writing", "Treino", "writing/exercises", "Exercícios de produção escrita"],
] as const;

// Ligações periféricas em ciclo à volta do núcleo “Fluency”.
// As linhas não se cruzam: Listening → Speaking → Reading → Writing → Listening.
const connections: Connection[] = [
  { id: "listen-speak", sourceNodeId: "listening.intro", targetNodeId: "speaking.intro", direction: "bidirectional", intensity: 1, priority: 1, meaning: "O que ouves prepara o que falas.", animation: "none" },
  { id: "speak-read", sourceNodeId: "speaking.intro", targetNodeId: "reading.intro", direction: "bidirectional", intensity: 1, priority: 1, meaning: "Falar e ler reforçam vocabulário e estruturas.", animation: "none" },
  { id: "read-write", sourceNodeId: "reading.intro", targetNodeId: "writing.intro", direction: "bidirectional", intensity: 1, priority: 1, meaning: "A leitura alimenta a escrita.", animation: "none" },
  { id: "write-listen", sourceNodeId: "writing.intro", targetNodeId: "listening.intro", direction: "bidirectional", intensity: 1, priority: 1, meaning: "Escrever ajuda a compreender melhor o que ouves.", animation: "none" },
];

const relationIdsByNode = new Map<string, string[]>();
for (const connection of connections) {
  for (const nodeId of [connection.sourceNodeId, connection.targetNodeId]) {
    relationIdsByNode.set(nodeId, [...(relationIdsByNode.get(nodeId) ?? []), connection.id]);
  }
}

const nodes: Node[] = contentNodes.map(([id, clusterId, name, fileName, description]) => ({
  id,
  name,
  description,
  category: "concept",
  clusterId,
  relationIds: relationIdsByNode.get(id) ?? [],
  visualState: "visible",
  functionalState: "unlocked",
  content: [{ path: `public/content/english/${fileName}.md`, format: "markdown" }],
  questions: [],
  examples: [],
  linkIds: [],
}));

const clusters: Cluster[] = clusterDefinitions.map(([id, name]) => ({
  id,
  name,
  description: name,
  nodeIds: nodes.filter((node) => node.clusterId === id).map((node) => node.id),
}));

export const englishStudioGraph: Graph = {
  nodes,
  connections,
  clusters,
  journeys: [
    { id: "core-narrative", name: "Percurso guiado", mode: "linear", nodeIds: ["listening.intro", "speaking.intro", "reading.intro", "writing.intro"] },
    { id: "free-exploration", name: "Exploração livre", mode: "exploratory", nodeIds: nodes.map((node) => node.id) },
  ],
  narrativeTimeline: ["initialization", "introduction", "exploration", "focus", "reflection", "conclusion"],
};