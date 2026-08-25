"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Point = { x: number; y: number };

import { ContentPanel, AssessmentSession } from '@english-studio/ui-shared';

export default function NetworkViewClient() {
  const router = useRouter();
  const coreRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const [lines, setLines] = useState<{ from: Point; to: Point }[]>([]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const sessionRef = useRef<AssessmentSession | null>(null);
  const STORAGE_KEY = 'assessmentSession.v1';
  const [progressByNode, setProgressByNode] = useState<Record<string, any>>({});

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        sessionRef.current = AssessmentSession.fromSnapshot(JSON.parse(raw));
      } else {
        sessionRef.current = new AssessmentSession();
      }
    } catch (e) {
      sessionRef.current = new AssessmentSession();
    }
  }

  function persist() {
    if (!sessionRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionRef.current.toSnapshot()));
    } catch (e) {}
  }

  function updateProgress(nodeId: string) {
    if (!sessionRef.current) return;
    setProgressByNode((p) => ({ ...p, [nodeId]: sessionRef.current!.getProgress(nodeId) }));
  }

  useEffect(() => {
    loadSession();
    ['english.listening', 'english.speaking', 'english.reading', 'english.writing'].forEach(updateProgress);
  }, []);

  function measure() {
    const els = [coreRef.current, topRef.current, rightRef.current, bottomRef.current, leftRef.current];
    if (!els[0]) return;
    const rects = els.map((el) => (el ? el.getBoundingClientRect() : null));
    const container = coreRef.current?.offsetParent as HTMLElement | null;
    const containerRect = container ? container.getBoundingClientRect() : null;
    if (!containerRect) return;

    const center = (r: DOMRect | null): Point => ({ x: ((r!.left + r!.right) / 2) - containerRect.left, y: ((r!.top + r!.bottom) / 2) - containerRect.top });
    const c = center(rects[0] ?? null);
    const others = rects.slice(1).map((r) => center(r ?? null));
    setLines(others.map((pt) => ({ from: c, to: pt })));
  }

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    const els = [coreRef.current?.offsetParent, coreRef.current];
    els.forEach((el) => { if (el) ro.observe(el as Element); });
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  function openPanel(label: string) {
    const idMap: Record<string, string> = {
      Listening: 'english.listening',
      Speaking: 'english.speaking',
      Reading: 'english.reading',
      Writing: 'english.writing',
    };
    const nodeId = idMap[label];
    if (!sessionRef.current) loadSession();
    sessionRef.current!.markContentRead(nodeId);
    persist();
    updateProgress(nodeId);
    setSelectedNode(label);
  }

  async function fetchMarkdownFor(nodeLabel: string) {
    const key = nodeLabel.toLowerCase();
    try {
      const res = await fetch(`/content/english/${key}.md`);
      if (!res.ok) return '';
      return await res.text();
    } catch (e) { return ''; }
  }

  async function onQuizSubmit(answers: readonly any[]) {
    if (!selectedNode) throw new Error('No node');
    const idMap: Record<string, string> = {
      Listening: 'english.listening',
      Speaking: 'english.speaking',
      Reading: 'english.reading',
      Writing: 'english.writing',
    };
    const nodeId = idMap[selectedNode];
    if (!sessionRef.current) loadSession();
    // For now we have no quiz object here; if present, submit would use it
    // We'll just persist the snapshot (no scoring) and update progress
    persist();
    updateProgress(nodeId);
    return { nodeId, totalQuestions: 0, correctAnswers: 0, score: 0, passed: false, questions: [] };
  }

  function closePanel() {
    setSelectedNode(null);
  }

  return (
    <div className="knowledge-network" style={{ pointerEvents: 'none' }}>
      <svg className="network-svg" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
        {lines.map((line, i) => (
          <line key={i} className="energy-trail" x1={line.from.x} y1={line.from.y} x2={line.to.x} y2={line.to.y} strokeWidth={2} stroke="url(#grad)" />
        ))}
        <defs>
          <linearGradient id="grad" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#55eaf4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8df8ff" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      <div ref={coreRef} className="tangle-core" role="img" aria-label="English core" style={{ pointerEvents: 'all' }}>
        <div className="core-orb">
          <span className="core-word-core">ENGLISH</span>
        </div>
      </div>

      <div ref={topRef} className="network-node node-top" onClick={() => openPanel('Listening')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div className="node-content">
          <div className="node-icon">🔊</div>
          <div>Listening</div>
          <div className="node-counter">{progressByNode['english.listening']?.attempts?.length ?? 0}</div>
        </div>
      </div>

      <div ref={rightRef} className="network-node node-right" onClick={() => openPanel('Speaking')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div className="node-content">
          <div className="node-icon">🗣️</div>
          <div>Speaking</div>
          <div className="node-counter">{progressByNode['english.speaking']?.attempts?.length ?? 0}</div>
        </div>
      </div>

      <div ref={bottomRef} className="network-node node-bottom" onClick={() => openPanel('Reading')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div className="node-content">
          <div className="node-icon">📖</div>
          <div>Reading</div>
          <div className="node-counter">{progressByNode['english.reading']?.attempts?.length ?? 0}</div>
        </div>
      </div>

      <div ref={leftRef} className="network-node node-left" onClick={() => openPanel('Writing')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div className="node-content">
          <div className="node-icon">✍️</div>
          <div>Writing</div>
          <div className="node-counter">{progressByNode['english.writing']?.attempts?.length ?? 0}</div>
        </div>
      </div>

      {selectedNode ? (
        <div>
          <ContentPanel
            node={{ id: selectedNode.toLowerCase(), name: selectedNode, clusterName: 'English' } as any}
            markdown={''}
            quiz={null}
            assessmentProgress={sessionRef.current ? sessionRef.current.getProgress('english.' + selectedNode.toLowerCase()) : null}
            onQuizSubmit={(answers) => onQuizSubmit(answers)}
            onClose={closePanel}
            onComplete={() => { closePanel(); }}
          />
        </div>
      ) : null}
    </div>
  );
}