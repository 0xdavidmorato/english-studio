import React from 'react';
import Link from 'next/link';
import { colors } from '@english-studio/ui-shared';

export default function EnglishCore() {
  return (
    <main className="experience" style={{ padding: 32, minHeight: '100vh', background: colors.background, color: colors.ink }}>
      <div className="network-shell">
        <div style={{ pointerEvents: 'all', width: '100%', maxWidth: 1200, padding: '40px 20px' }}>
          <h1 style={{ marginBottom: 8 }}>English Studio — Core</h1>
          <p style={{ color: colors.muted }}>Nó central: as 4 habilidades fundamentais do inglês</p>

          <section style={{ display: 'flex', gap: 18, marginTop: 24, flexWrap: 'wrap' }}>
            <article className="english-card" style={{ flex: '1 1 240px' }}>
              <h2>Core</h2>
              <p>Central node that connects the four essential English skills.</p>
              <div style={{ marginTop: 12 }}>
                <Link href="/english/listening">Open Listening →</Link>
              </div>
            </article>

            <article className="english-card" style={{ flex: '1 1 240px' }}>
              <h3>Listening</h3>
              <p>Develop comprehension of spoken English (audio clips, exercises).</p>
              <div style={{ marginTop: 12 }}>
                <Link href="/english/listening">Start Listening →</Link>
              </div>
            </article>

            <article className="english-card" style={{ flex: '1 1 240px' }}>
              <h3>Speaking</h3>
              <p>Practice pronunciation, fluency and spoken interaction.</p>
              <div style={{ marginTop: 12 }}>
                <Link href="/english/speaking">Start Speaking →</Link>
              </div>
            </article>

            <article className="english-card" style={{ flex: '1 1 240px' }}>
              <h3>Reading</h3>
              <p>Improve reading comprehension and vocabulary recognition.</p>
              <div style={{ marginTop: 12 }}>
                <Link href="/english/reading">Start Reading →</Link>
              </div>
            </article>

            <article className="english-card" style={{ flex: '1 1 240px' }}>
              <h3>Writing</h3>
              <p>Practice written production: sentences, emails, essays.</p>
              <div style={{ marginTop: 12 }}>
                <Link href="/english/writing">Start Writing →</Link>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}
