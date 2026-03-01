import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
import { pluginFullscreen } from 'expressive-code-fullscreen';

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
  plugins: [
    pluginLineNumbers(),
    pluginCollapsibleSections(),
    pluginFullscreen({
      showOnHoverOnly: true,
      addToUntitledBlocks: true
    })
  ],
  defaultProps: {
    showLineNumbers: false
  }
};
