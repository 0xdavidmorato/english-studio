import React from 'react';
import Link from 'next/link';
import { colors } from '@english-studio/ui-shared';

export default function SpeakingPage(){
  return (
    <main style={{ padding: 32, minHeight: '100vh', background: colors.background, color: colors.ink }}>
      <h1>Speaking</h1>
      <p style={{ color: colors.muted }}>Exercícios para praticar pronúncia, resposta e fluência.</p>
      <section style={{ marginTop: 24 }}>
        <p>Exemplo rápido: aqui pode estar um gravador de voz e atividades orais.</p>
        <Link href="/english">← Voltar ao núcleo</Link>
      </section>
    </main>
  )
}
