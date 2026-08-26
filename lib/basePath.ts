// Caminho base usado quando o site é publicado em GitHub Pages.
// Deve corresponder à mesma lógica de next.config.ts (basePath/assetPrefix).
export const basePath =
  process.env.GITHUB_ACTIONS === "true" && process.env.PLAYWRIGHT_TEST !== "true"
    ? "/english-studio"
    : "";

export function withBasePath(path: string): string {
  return path.startsWith("/") && basePath ? `${basePath}${path}` : path;
}