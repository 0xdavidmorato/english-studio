import type { NodeQuiz } from "../../src/assessment/Quiz";

interface QuestionSeed {
  readonly prompt: string;
  readonly options: readonly string[];
  readonly correct: number;
  readonly explanation: string;
}

function quiz(nodeId: string, seeds: readonly QuestionSeed[]): NodeQuiz {
  return {
    nodeId,
    questions: seeds.map((seed, questionIndex) => ({
      id: `${nodeId}.${questionIndex + 1}`,
      prompt: seed.prompt,
      options: seed.options.map((label, optionIndex) => ({
        id: `option-${optionIndex + 1}`,
        label,
      })),
      correctOptionId: `option-${seed.correct + 1}`,
      explanation: seed.explanation,
    })),
  };
}

const seedsByNodeId: Readonly<Record<string, readonly QuestionSeed[]>> = {
  "listening.exercises": [
    { prompt: "What is the best first step when you listen to an audio in English?", options: ["Try to understand every single word", "Listen for the general idea and key words", "Pause after every sentence", "Translate everything mentally"], correct: 1, explanation: "An effective listener starts by grasping the general idea and the key words before focusing on details." },
    { prompt: "Which phrase is a natural way to ask someone to repeat?", options: ["Say it again in Portuguese", "Could you say that again, please?", "Repeat now!", "I do not understand English"], correct: 1, explanation: "\"Could you say that again, please?\" is a polite and natural request to repeat." },
    { prompt: "What does a weak form in connected speech usually affect?", options: ["The spelling of the word", "Function words such as \"to\" and \"and\"", "The meaning of the whole sentence", "Only proper nouns"], correct: 1, explanation: "In connected speech, function words are often reduced, which is part of natural listening." },
  ],
  "speaking.exercises": [
    { prompt: "Which strategy best improves speaking fluency?", options: ["Memorising long texts without context", "Practising short, meaningful phrases regularly", "Only reading about speaking", "Avoiding speaking to prevent mistakes"], correct: 1, explanation: "Regular practice with short, meaningful phrases builds automaticity and fluency." },
    { prompt: "How should you respond to \"How are you?\" in a friendly conversation?", options: ["I am fine, thank you. And you?", "Where is the station?", "Who are you?", "No, thanks."], correct: 0, explanation: "\"I'm fine, thank you. And you?\" keeps the conversation natural and interactive." },
    { prompt: "What matters most for clear pronunciation?", options: ["Speed above all", "Stress, rhythm and intonation", "Never making pauses", "Using only formal words"], correct: 1, explanation: "Stress, rhythm and intonation are essential for being understood in English." },
  ],
  "reading.exercises": [
    { prompt: "What should you do first when reading a text in English?", options: ["Translate word by word", "Skim to get the general idea", "Read the dictionary cover to cover", "Ignore the title and images"], correct: 1, explanation: "Skimming first helps you build context and read with purpose." },
    { prompt: "The word \"daily\" is most likely to mean…", options: ["Every day", "Never", "Once a year", "Secretly"], correct: 0, explanation: "\"Daily\" means happening every day." },
    { prompt: "What is a good way to learn vocabulary from reading?", options: ["Guessing meaning from context before checking", "Skipping every unknown word", "Reading without noting anything", "Only reading one text forever"], correct: 0, explanation: "Guessing from context trains your reading skills; checking afterwards consolidates learning." },
  ],
  "writing.exercises": [
    { prompt: "What is the best structure for a short paragraph?", options: ["Topic sentence, supporting sentences, conclusion", "Random ideas in any order", "One very long sentence", "No structure at all"], correct: 0, explanation: "A clear structure helps the reader follow your ideas." },
    { prompt: "Which sentence is grammatically correct?", options: ["She don't like coffee.", "She doesn't like coffee.", "She not like coffee.", "She doesn't likes coffee."], correct: 1, explanation: "In the present simple, negatives use \"doesn't\" + the base verb." },
    { prompt: "Why is reviewing your own writing important?", options: ["It helps you catch grammar and clarity issues", "It makes the text longer", "It is only needed in exams", "It is a waste of time"], correct: 0, explanation: "Reviewing helps you notice mistakes and improve clarity before sharing." },
  ],
};

export const englishStudioQuizzes: readonly NodeQuiz[] = Object.entries(seedsByNodeId).map(
  ([nodeId, seeds]) => quiz(nodeId, seeds),
);

export function getQuizForNode(nodeId: string): NodeQuiz | null {
  return englishStudioQuizzes.find((quizDefinition) => quizDefinition.nodeId === nodeId) ?? null;
}