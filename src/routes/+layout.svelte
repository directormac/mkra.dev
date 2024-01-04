<script lang="ts">
	import Navbar from '@components/navbar.svelte';
	import { cn } from '@utils';
	import '../app.pcss';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/caveat';
	import { ModeWatcher } from 'mode-watcher';
	import { matchMedia } from '@utils';

	const isLargeScreen = matchMedia('(min-width: 768px)');

	let scrollY: number = 0;
</script>

<svelte:window bind:scrollY />

<ModeWatcher />

<div class={cn('flex min-h-full flex-col')}>
	<Navbar />
	<div class="mx-auto flex w-full max-w-7xl items-start gap-x-6 py-2 sm:px-6">
		<main class="flex-1">
			<slot />
		</main>
	</div>
</div>
