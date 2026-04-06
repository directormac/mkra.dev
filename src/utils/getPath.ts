import { slugifyAll } from "./slugify";

/**
 * Get full path of a blog post
 * @param id - id of the blog post (aka slug)
 * @param filePath - (DEPRECATED) used for backward compatibility or future folder structure
 * @param includeBase - whether to include `/posts` in return value
 * @returns blog post path
 */
export function getPath(
  id: string,
  _filePath: string | undefined,
  includeBase = true
) {
  // Use the ID which is already relative to the collection base
  // e.g. "sveltekit-query-prerender/index" or "my-post"
  const segments = slugifyAll(id.split("/"));

  // Remove "index" segment if it's the last part (common in folder-based posts)
  // but keep it if it's the ONLY segment (e.g. index.md at root)
  if (segments.length > 1 && segments[segments.length - 1] === "index") {
    segments.pop();
  }

  if (!includeBase) {
    return segments.join("/");
  }

  return ["/posts", ...segments].join("/").replace(/\/+$/, "");
}
