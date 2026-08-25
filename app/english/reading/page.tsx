import React from 'react';
import Link from 'next/link';
import { colors } from '@english-studio/ui-shared';

export default function ReadingPage(){
  return (
    <main style={{ padding: 32, minHeight: '100vh', background: colors.background, color: colors.ink }}>
      <h1>Reading</h1>
      <p style={{ color: colors.muted }}>Textos e exercícios para melhorar compreensão de leitura.</p>
      <section style={{ marginTop: 24 }}>
        <p>Exemplo rápido: aqui entram textos com perguntas e vocabulário.</p>
        <Link href="/english">← Voltar ao núcleo</Link>
      </section>
    </main>
  )
}
