"use client";

import React, { useEffect, useState } from "react";
import {
  colors,
  EnglishStudioExperience,
  englishStudioGraph,
} from "@english-studio/ui-shared";

function contentPath(nodeId: string): string {
  const parts = nodeId.split(".");
  if (parts.length === 1) return `/content/english/${parts[0]}.md`;
  return `/content/english/${parts[0]}/${parts.slice(1).join("/")}.md`;
}

export default function ExperiencePage() {
  const [contentByNodeId, setContentByNodeId] = useState<Record<string,string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadAll(){
      const entries: Record<string,string> = {};
      for (const node of englishStudioGraph.nodes) {
        const path = contentPath(node.id);
        try {
          const res = await fetch(path);
          entries[node.id] = res.ok ? await res.text() : `# ${node.name}\n(Conteúdo não encontrado)`;
        } catch {
          entries[node.id] = `# ${node.name}\n(Erro ao carregar)`;
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

  return (
    <div style={{ minHeight: '100vh', background: colors.background, color: colors.ink, padding: 20 }}>
      <h1>English — Experience (preview)</h1>
      {loaded ? <EnglishStudioExperience graph={englishStudioGraph} contentByNodeId={contentByNodeId} /> : <p>Carregando experiência…</p>}
    </div>
  );
}
