import type { ContentSource } from "../../content";

// FileSystemContentSource relies on Node.js APIs. To keep ui-shared portable
// this implementation performs dynamic imports at runtime and will throw
// a clear error when used in a browser environment.
export class FileSystemContentSource implements ContentSource {
  private readonly root: string;

  constructor(root: string) {
    this.root = root;
  }

  public async read(pathName: string): Promise<string> {
    if (typeof window !== "undefined") {
      throw new Error("FileSystemContentSource: Node.js-only API (cannot read files in the browser)");
    }

    // Dynamically import Node APIs so bundlers don't fail when ui-shared is consumed on web.
    const path = await import("node:path");
    const fs = await import("node:fs/promises");

    const resolvedRoot = path.resolve(this.root);
    const target = path.resolve(resolvedRoot, pathName);
    const relativePath = path.relative(resolvedRoot, target);

    if (
      relativePath === "" ||
      relativePath.startsWith("..") ||
      path.isAbsolute(relativePath)
    ) {
      throw new Error("Content paths must stay inside the configured root.");
    }

    return fs.readFile(target, "utf8");
  }
}
