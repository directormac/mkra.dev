import { visit } from "unist-util-visit";
import { dirname, resolve } from "node:path";
import type { Root, Heading, Image, Parent, Text } from "mdast";
import type { VFile } from "vfile";

/**
 * Remark plugin to replace a '## Header Image' heading with a styled hero image.
 * Uses frontmatter 'headerImage' for the image source.
 */
export const remarkHeaderImage = () => {
  return (tree: Root, file: VFile) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = file.data as any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filePath = file.path || file.history[0] || "unknown";

    const frontmatter = data.astro?.frontmatter || data.fm || {};
    const headerImage = frontmatter.headerImage;

    if (!headerImage) return;

    // We want to use the raw value if it's a string (especially relative paths)
    // so Astro's image service can handle it normally in the pipeline.
    let imageUrl =
      typeof headerImage === "string" ? headerImage : headerImage?.src || "";

    if (!imageUrl) return;

    // Resolve relative paths (./ or ../) relative to the markdown file's directory
    if (imageUrl.startsWith("./") || imageUrl.startsWith("../")) {
      const filePath = file.path || file.history[0];
      if (filePath) {
        const dir = dirname(filePath);
        imageUrl = resolve(dir, imageUrl);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let found = false;

    visit(
      tree,
      "heading",
      (node: Heading, index, parent: Parent | undefined) => {
        if (node.depth !== 2) return;

        const text = node.children
          .filter(c => c.type === "text")
          .map(c => (c as Text).value)
          .join("")
          .trim()
          .toLowerCase();

        if (text !== "header image") return;

        if (!parent || typeof index !== "number") return;

        found = true;

        // Create mdast image node with data.hProperties for HTML attributes
        const imageNode: Image = {
          type: "image",
          url: imageUrl,
          alt: frontmatter.title || "Header image",
          data: {
            hProperties: {
              class: "header-image w-full transition-all duration-500",
              loading: "eager",
            },
          },
        };

        // Wrap in a div using the mdast-util-to-hast data attributes
        // hName forces the paragraph to render as a div
        // hProperties passes the class attribute
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const wrapperNode: any = {
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: {
              class:
                "header-image-wrapper mx-auto mb-10 overflow-hidden    border border-border/20 bg-muted/5 shadow-2xl shadow-accent/5 not-prose",
            },
          },
          children: [imageNode],
        };

        parent.children.splice(index, 1, wrapperNode);
      }
    );
  };
};
