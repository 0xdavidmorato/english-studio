import React from 'react';
import Link from 'next/link';
import { colors } from '@english-studio/ui-shared';

export default function WritingPage(){
  return (
    <main style={{ padding: 32, minHeight: '100vh', background: colors.background, color: colors.ink }}>
      <h1>Writing</h1>
      <p style={{ color: colors.muted }}>Tarefas escritas para treinar produção escrita (sentenças, e-mails, textos).</p>
      <section style={{ marginTop: 24 }}>
        <p>Exemplo rápido: aqui entram prompts de escrita e feedback.</p>
        <Link href="/english">← Voltar ao núcleo</Link>
      </section>
    </main>
  )
}
