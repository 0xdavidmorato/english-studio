"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Props { src: string }

export default function MarkdownContent({ src }: Props) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`Failed to fetch ${src}: ${res.status}`);
        const text = await res.text();
        if (mounted) setContent(text);
      } catch (err: any) {
        if (mounted) setError(err.message ?? String(err));
      }
    }
    load();
    return () => { mounted = false };
  }, [src]);

  if (error) return <div style={{ color: "#f88" }}>Erro ao carregar conteúdo: {error}</div>;
  if (!content) return <div>Carregando conteúdo…</div>;

  return <article className="markdown-content"><ReactMarkdown>{content}</ReactMarkdown></article>;
}
