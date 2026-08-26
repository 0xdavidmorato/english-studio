import {
  EnglishStudioExperience,
  englishStudioGraph,
  FileSystemContentSource,
  MarkdownContentLoader,
} from "@english-studio/ui-shared";

export default async function Home() {
  const loader = new MarkdownContentLoader(
    new FileSystemContentSource(process.cwd()),
  );

  const contentEntries = await Promise.all(
    englishStudioGraph.nodes.map(async (node) => {
      const reference = node.content[0];
      const loaded = reference ? await loader.load(reference) : null;
      return [node.id, loaded?.body ?? ""] as const;
    }),
  );

  return (
    <EnglishStudioExperience
      graph={englishStudioGraph}
      contentByNodeId={Object.fromEntries(contentEntries)}
    />
  );
}
