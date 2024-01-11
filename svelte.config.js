import 'dotenv/config';
import adapterAuto from '@sveltejs/adapter-auto';
import adapterNode from '@sveltejs/adapter-node';
const dev = process.env.NODE_ENV === 'development' ? false : true;
const adapter = process.env.ADAPTER === 'node' ? adapterNode : adapterAuto;
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@components': './src/lib/components',
			'@ui': './src/lib/components/ui',
			'@utils': './src/lib/utils',
			'@types': './src/lib/types'
		},
		csrf: { checkOrigin: dev }
	}
};

export default config;
