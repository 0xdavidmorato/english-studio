import { colors } from '@english-studio/ui-shared';

export default function TestPage() {
  return (
    <main style={{ padding: 24, color: (colors as any).ink, background: (colors as any).background, minHeight: '100vh' }}>
      <h1>UI Shared - Tokens (test)</h1>
      <pre style={{ color: (colors as any).muted, background: 'rgba(0,0,0,0.07)', padding: 12, borderRadius: 8 }}>{JSON.stringify(colors, null, 2)}</pre>
    </main>
  );
}
