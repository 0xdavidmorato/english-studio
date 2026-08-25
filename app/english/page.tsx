import React from 'react';
import Link from 'next/link';
import { colors } from '@english-studio/ui-shared';

export default function EnglishCore() {
  return (
    <main className="experience" style={{ padding: 32, minHeight: '100vh', background: colors.background, color: colors.ink }}>
      <h1 style={{ marginBottom: 8 }}>English Studio — Core</h1>
      <p style={{ color: colors.muted }}>Nó central: as 4 habilidades fundamentais do inglês</p>

      <section style={{ display: 'flex', gap: 18, marginTop: 24, flexWrap: 'wrap' }}>
        <article style={{ flex: '1 1 240px', padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
          <h2>Core</h2>
          <p>Central node that connects the four essential English skills.</p>
          <div style={{ marginTop: 12 }}>
            <Link href="/english/listening">Open Listening →</Link>
          </div>
        </article>

        <article style={{ flex: '1 1 240px', padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
          <h3>Listening</h3>
          <p>Develop comprehension of spoken English (audio clips, exercises).</p>
          <div style={{ marginTop: 12 }}>
            <Link href="/english/listening">Start Listening →</Link>
          </div>
        </article>

        <article style={{ flex: '1 1 240px', padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
          <h3>Speaking</h3>
          <p>Practice pronunciation, fluency and spoken interaction.</p>
          <div style={{ marginTop: 12 }}>
            <Link href="/english/speaking">Start Speaking →</Link>
          </div>
        </article>

        <article style={{ flex: '1 1 240px', padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
          <h3>Reading</h3>
          <p>Improve reading comprehension and vocabulary recognition.</p>
          <div style={{ marginTop: 12 }}>
            <Link href="/english/reading">Start Reading →</Link>
          </div>
        </article>

        <article style={{ flex: '1 1 240px', padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.02)' }}>
          <h3>Writing</h3>
          <p>Practice written production: sentences, emails, essays.</p>
          <div style={{ marginTop: 12 }}>
            <Link href="/english/writing">Start Writing →</Link>
          </div>
        </article>
      </section>

    </main>
  );
}
