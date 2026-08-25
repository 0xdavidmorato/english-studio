"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import MarkdownContent from '../../components/MarkdownContent';
import { colors, AssessmentSession } from '@english-studio/ui-shared';
import { QuizPanel } from '../../../ui-shared/src/ui/QuizPanel';

export default function ListeningPage(){
  const sampleQuiz: any = {
    nodeId: 'english.listening',
    questions: [
      { id: 'q1', prompt: 'What is the main topic of the recording?', options: [{ id: 'a', label: 'A travel story' }, { id: 'b', label: 'A weather report' }, { id: 'c', label: 'A cooking recipe' }], correctOptionId: 'a', explanation: 'The speaker talks about a trip.' },
      { id: 'q2', prompt: 'Which word was emphasized?', options: [{ id: 'a', label: 'quickly' }, { id: 'b', label: 'beautiful' }, { id: 'c', label: 'often' }], correctOptionId: 'b', explanation: 'The speaker emphasized the word "beautiful".' },
    ],
  };

  const STORAGE_KEY = 'assessmentSession.v1';
  const sampleProgressDefault: any = { nodeId: 'english.listening', isRead: false, attempts: [], latestResult: null, bestResult: null, isPassed: false };

  const sessionRef = useRef<AssessmentSession | null>(null);
  const [progress, setProgress] = useState<any>(sampleProgressDefault);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const snapshot = JSON.parse(raw);
        sessionRef.current = AssessmentSession.fromSnapshot(snapshot);
      } else {
        sessionRef.current = new AssessmentSession();
      }
    } catch (e) {
      sessionRef.current = new AssessmentSession();
    }

    // mark as read whenever the lesson is opened and persist
    sessionRef.current.markContentRead(sampleQuiz.nodeId);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionRef.current.toSnapshot()));
    } catch (e) {
      // ignore storage errors
    }

    setProgress(sessionRef.current.getProgress(sampleQuiz.nodeId));
  }, []);

  function handleQuizSubmit(answers: readonly any[]) {
    if (!sessionRef.current) sessionRef.current = new AssessmentSession();
    const result = sessionRef.current.submit(sampleQuiz, answers);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionRef.current.toSnapshot()));
    } catch (e) {
      // ignore storage errors
    }

    setProgress(sessionRef.current.getProgress(sampleQuiz.nodeId));
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
            <QuizPanel quiz={sampleQuiz} progress={progress} onBack={() => {}} onSubmit={handleQuizSubmit} />
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <Link href="/english">← Voltar ao núcleo</Link>
        </div>
      </section>
    </main>
  )
}
