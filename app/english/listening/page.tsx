import React from 'react';
import Link from 'next/link';
import { colors } from '@english-studio/ui-shared';

export default function ListeningPage(){
  return (
    <main style={{ padding: 32, minHeight: '100vh', background: colors.background, color: colors.ink }}>
      <h1>Listening</h1>
      <p style={{ color: colors.muted }}>Exercícios e recursos para treinar a compreensão auditiva.</p>
      <section style={{ marginTop: 24 }}>
        <p>Exemplo rápido: aqui pode entrar um player de áudio e exercícios.</p>
        <Link href="/english">← Voltar ao núcleo</Link>
      </section>
    </main>
  )
}
