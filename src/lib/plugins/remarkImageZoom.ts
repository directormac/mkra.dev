import { visit } from "unist-util-visit";
import type { Root, Image, Parent } from "mdast";
import type { VFile } from "vfile";

/**
 * Remark plugin to wrap markdown images in zoomable containers.
 * Excludes images inside links and images with .no-zoom class.
 */
export const remarkImageZoom = () => {
  return (tree: Root, file: VFile) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = file.data as any;
    const frontmatter = data.astro?.frontmatter || data.fm || {};

    // Skip if zoom is explicitly disabled for this file
    if (frontmatter.imageZoom === false) return;

    const imagesToWrap: Array<{ node: Image; parent: Parent; index: number }> =
      [];

    // First pass: collect images that need wrapping
    visit(tree, "image", (node: Image, index, parent: Parent | undefined) => {
      if (!parent || typeof index !== "number") return;

      // Skip if parent is a link
      if (parent.type === "link") return;

      // Skip if image has .no-zoom class in hProperties
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hProperties = (node.data?.hProperties || {}) as any;
      const className = hProperties.class || "";
      if (className.includes("no-zoom")) return;

      imagesToWrap.push({ node, parent, index });
    });

    // Second pass: wrap collected images (in reverse to maintain indices)
    for (let i = imagesToWrap.length - 1; i >= 0; i--) {
      const { node, parent, index } = imagesToWrap[i];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wrapperNode: any = {
        type: "paragraph",
        data: {
          hName: "image-zoom-zoomable",
          hProperties: {},
        },
        children: [node],
      };

      parent.children.splice(index, 1, wrapperNode);
    }
  };
};
