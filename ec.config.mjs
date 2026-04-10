import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections';
// import { pluginFullscreen } from 'expressive-code-fullscreen';
// import { pluginFileIcons } from "@xt0rted/expressive-code-file-icons";
import { pluginLanguageLogo } from 'ec-lang-logo';

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
  themes: ["catppuccin-latte", "catppuccin-mocha"],
  plugins: [
    pluginLineNumbers(),
    pluginCollapsibleSections(),
    // pluginFullscreen({
    //   // enabled: true,
    //   showOnHoverOnly: true,
    //   fullscreenButtonTooltip: 'View code in fullscreen',
    //   enableEscapeKey: true,
    //   exitOnBrowserBack: true,
    //   animationDuration: 250,
    //   addToUntitledBlocks: false,
    // }),
    // pluginFileIcons({
    //   iconClass: "size-4 flex-shrink-0",
    //   titleClass: "flex items-center gap-1",
    // }),
    pluginLanguageLogo( { 
      color: 'original'
    })
  ],
  styleOverrides: {
    fullscreen: {
      // Catppuccin Mocha Mauve theme.
      toolbarBg: 'rgba(30, 30, 46, 0.95)',
      toolbarBorder: 'rgba(203, 166, 247, 0.3)',
      buttonBg: 'rgba(24, 24, 37, 0.9)',
      buttonBgHover: 'rgba(49, 50, 68, 0.9)',
      buttonBgActive: 'rgba(17, 17, 27, 0.9)',
      buttonText: '#cdd6f4',
      buttonBorder: 'rgba(203, 166, 247, 0.4)',
      buttonFocus: 'rgba(203, 166, 247, 0.8)',
      containerBg: 'rgba(17, 17, 27, 0.9)',
      contentShadow: 'rgba(0, 0, 0, 0.4)',
      hintBg: 'rgba(24, 24, 37, 0.95)',
      hintText: '#cdd6f4',
      hintBorder: 'rgba(203, 166, 247, 0.3)',
    }
  },
  defaultProps: {
    showLineNumbers: false
  }
};
