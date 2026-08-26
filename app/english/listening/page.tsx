"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import MarkdownContent from '../../components/MarkdownContent';
import { AssessmentSession, colors, QuizPanel } from '@english-studio/ui-shared';

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
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  function persistSessionSnapshot() {
    if (!sessionRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionRef.current.toSnapshot()));
      const now = new Date();
      setSavedAt(now);
      // clear indicator after 3.5s
      setTimeout(() => setSavedAt((prev) => (prev === now ? null : prev)), 3500);
    } catch (e) {
      // ignore storage errors
    }
  }

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
    persistSessionSnapshot();

    setProgress(sessionRef.current.getProgress(sampleQuiz.nodeId));
  }, []);

  function handleQuizSubmit(answers: readonly any[]) {
    if (!sessionRef.current) sessionRef.current = new AssessmentSession();
    const result = sessionRef.current.submit(sampleQuiz, answers);

    persistSessionSnapshot();

    setProgress(sessionRef.current.getProgress(sampleQuiz.nodeId));
    return result;
  }

  function resetProgress() {
    if (!window.confirm('Reiniciar progresso desta sessão? Esta ação irá apagar o progresso salvo localmente para este dispositivo.')) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    sessionRef.current = new AssessmentSession();
    // immediately mark as not read and save fresh snapshot
    setProgress(sessionRef.current.getProgress(sampleQuiz.nodeId));
    persistSessionSnapshot();
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <strong>Quiz de exemplo</strong>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {savedAt ? <small style={{ color: '#7fd89f' }}>Progresso salvo {savedAt.toLocaleTimeString()}</small> : <small style={{ color: '#9aa0a6' }}>Progresso não salvo</small>}
              <button type="button" onClick={resetProgress} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' }}>Resetar progresso</button>
            </div>
          </div>

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
