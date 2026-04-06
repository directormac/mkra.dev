import { visit } from "unist-util-visit";

/**
 * Remark plugin to open external links in a new tab.
 * This version operates on the Markdown AST (mdast).
 */
export const externalLink = (options: { domains?: string[] } = {}) => {
  const internalDomains = options.domains || [];

  return (tree: unknown) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let count = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "link", (node: any) => {
      const urlStr = node.url;
      if (!urlStr || !urlStr.startsWith("http")) return;

      try {
        const url = new URL(urlStr);
        const isInternal = internalDomains.some(domain => {
          const cleanDomain = domain.split(":")[0];
          return (
            url.hostname === cleanDomain ||
            url.hostname.endsWith(`.${cleanDomain}`)
          );
        });

        if (!isInternal) {
          count++;

          // In Remark/MDAST, attributes are handled via data.hProperties for Rehype conversion
          if (!node.data) node.data = {};
          if (!node.data.hProperties) node.data.hProperties = {};

          node.data.hProperties.target = "_blank";
          node.data.hProperties.rel = "noopener noreferrer";

          // Note: Adding the sr-only span in Remark is more complex as it requires
          // modifying the children nodes. For now, let's verify if the attributes work.
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // Not a valid URL
      }
    });
  };
};
