"use client";

import React from 'react';
import Link from 'next/link';
import MarkdownContent from '../../components/MarkdownContent';
import { colors } from '@english-studio/ui-shared';
import { QuizPanel } from '../../ui-shared/src/ui/QuizPanel';

export default function ListeningPage(){
  const sampleQuiz: any = {
    nodeId: 'english.listening',
    questions: [
      { id: 'q1', prompt: 'What is the main topic of the recording?', options: [{ id: 'a', label: 'A travel story' }, { id: 'b', label: 'A weather report' }, { id: 'c', label: 'A cooking recipe' }], correctOptionId: 'a', explanation: 'The speaker talks about a trip.' },
      { id: 'q2', prompt: 'Which word was emphasized?', options: [{ id: 'a', label: 'quickly' }, { id: 'b', label: 'beautiful' }, { id: 'c', label: 'often' }], correctOptionId: 'b', explanation: 'The speaker emphasized the word "beautiful".' },
    ],
  };

  const sampleProgress: any = { nodeId: 'english.listening', isRead: false, attempts: [], latestResult: null, bestResult: null, isPassed: false };

  function handleQuizSubmit(answers: any[]) {
    // simple wrapper to use local scoring logic from ui-shared assessment on the client if needed
    // For now, just return a fake result to the QuizPanel
    const result = { nodeId: sampleQuiz.nodeId, totalQuestions: sampleQuiz.questions.length, correctAnswers: 2, score: 10, passed: true, questions: [] };
    return result;
  }

  return (
    <main style={{ padding: 32, minHeight: '100vh', background: colors.background, color: colors.ink }}>
      <h1>Listening</h1>
      <p style={{ color: colors.muted }}>Exercícios e recursos para treinar a compreensão auditiva.</p>
      <section style={{ marginTop: 24 }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', padding: 12, borderRadius: 8 }}>
          <MarkdownContent src="/content/english/listening.md" />
        </div>

        <div style={{ marginTop: 18 }}>
          <strong>Quiz de exemplo</strong>
          <div style={{ marginTop: 8 }}>
            <QuizPanel quiz={sampleQuiz} progress={sampleProgress} onBack={() => {}} onSubmit={(answers) => handleQuizSubmit(answers)} />
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <Link href="/english">← Voltar ao núcleo</Link>
        </div>
      </section>
    </main>
  )
}
