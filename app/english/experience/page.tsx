"use client";

import React, { useEffect, useState } from "react";
import { TangleExperience } from "../../../ui-shared/src/ui/TangleExperience";
import { colors } from "@english-studio/ui-shared";

export default function ExperiencePage() {
  const [contentByNodeId, setContentByNodeId] = useState<Record<string,string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadAll(){
      const ids = ['core', 'listening', 'speaking', 'reading', 'writing'];
      const entries: Record<string,string> = {};
      for (const id of ids) {
        try {
          const path = `/content/english/${id}.md`;
          const res = await fetch(path);
          entries[id] = res.ok ? await res.text() : `# ${id}\n(Conteúdo não encontrado)`;
        } catch {
          entries[id] = `# ${id}\n(Erro ao carregar)`;
        }
      }
      if (mounted) {
        setContentByNodeId(entries);
        setLoaded(true);
      }
    }
    loadAll();
    return () => { mounted = false };
  }, []);

  // minimal graph matching ui-shared Graph shape
  const graph = {
    nodes: [
      { id: 'core', name: 'Core (English)', description: 'Nó central', category: 'core', clusterId: 'english', relationIds: [], visualState: 'visible', functionalState: 'unlocked', content: [{ path: 'public/content/english/core.md', format: 'markdown' }], questions: [], examples: [], linkIds: [] },
      { id: 'listening', name: 'Listening', description: 'Audição', category: 'skill', clusterId: 'english', relationIds: [], visualState: 'visible', functionalState: 'unlocked', content: [{ path: 'public/content/english/listening.md', format: 'markdown' }], questions: [], examples: [], linkIds: [] },
      { id: 'speaking', name: 'Speaking', description: 'Fala', category: 'skill', clusterId: 'english', relationIds: [], visualState: 'visible', functionalState: 'unlocked', content: [{ path: 'public/content/english/speaking.md', format: 'markdown' }], questions: [], examples: [], linkIds: [] },
      { id: 'reading', name: 'Reading', description: 'Leitura', category: 'skill', clusterId: 'english', relationIds: [], visualState: 'visible', functionalState: 'unlocked', content: [{ path: 'public/content/english/reading.md', format: 'markdown' }], questions: [], examples: [], linkIds: [] },
      { id: 'writing', name: 'Writing', description: 'Escrita', category: 'skill', clusterId: 'english', relationIds: [], visualState: 'visible', functionalState: 'unlocked', content: [{ path: 'public/content/english/writing.md', format: 'markdown' }], questions: [], examples: [], linkIds: [] },
    ],
    connections: [],
    clusters: [{ id: 'english', name: 'English', description: 'English core', nodeIds: ['core','listening','speaking','reading','writing'] }],
    journeys: [],
    narrativeTimeline: ['initialization'],
  } as any;

  return (
    <div style={{ minHeight: '100vh', background: colors.background, color: colors.ink, padding: 20 }}>
      <h1>English — Experience (preview)</h1>
      {loaded ? <TangleExperience graph={graph} contentByNodeId={contentByNodeId} /> : <p>Carregando experiência…</p>}
    </div>
  );
}
