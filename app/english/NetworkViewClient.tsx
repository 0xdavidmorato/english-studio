"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type Point = { x: number; y: number };

export default function NetworkViewClient() {
  const router = useRouter();
  const coreRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const [lines, setLines] = useState<{ from: Point; to: Point }[]>([]);

  function measure() {
    const els = [coreRef.current, topRef.current, rightRef.current, bottomRef.current, leftRef.current];
    if (!els[0]) return;
    const rects = els.map((el) => (el ? el.getBoundingClientRect() : null));
    const container = coreRef.current?.offsetParent as HTMLElement | null;
    const containerRect = container ? container.getBoundingClientRect() : null;
    if (!containerRect) return;

    const center = (r: DOMRect | null): Point => ({ x: ((r!.left + r!.right) / 2) - containerRect.left, y: ((r!.top + r!.bottom) / 2) - containerRect.top });
    const c = center(rects[0]);
    const others = rects.slice(1).map((r) => center(r));
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

  function goTo(node: string) {
    // map node to route
    const map: Record<string, string> = {
      Listening: '/english/listening',
      Speaking: '/english/speaking',
      Reading: '/english/reading',
      Writing: '/english/writing',
    };
    const route = map[node];
    if (route) router.push(route);
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

      <div ref={topRef} className="network-node node-top" onClick={() => goTo('Listening')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div>Listening</div>
      </div>

      <div ref={rightRef} className="network-node node-right" onClick={() => goTo('Speaking')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div>Speaking</div>
      </div>

      <div ref={bottomRef} className="network-node node-bottom" onClick={() => goTo('Reading')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div>Reading</div>
      </div>

      <div ref={leftRef} className="network-node node-left" onClick={() => goTo('Writing')} style={{ cursor: 'pointer', pointerEvents: 'all' }}>
        <div className="node-halo" />
        <div>Writing</div>
      </div>
    </div>
  );
}
