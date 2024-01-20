<script lang="ts">
	import Navbar from '@components/navbar.svelte';
	import { cn } from '@utils';
	import '../app.pcss';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/caveat';
	import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class={cn('flex min-h-full flex-col')}>
	<Navbar />
	<div class="gap-x-6 py-2 md:container">
		<main class="">
			<slot />
		</main>
	</div>
</div>
