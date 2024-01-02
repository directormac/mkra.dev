<script lang="ts">
	import { cn } from '@utils';
	import LightSwitch from './light-switch.svelte';
	import Link from './link.svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { matchMedia } from '@utils';

	const isLargeScreen = matchMedia('(min-width: 768px)');

	const { transition } = setupViewTransition();

	const links = [
		{ label: 'About', href: '/about' },
		{ label: 'Projects', href: '/projects' }
	];
</script>

<header use:transition={'header'} class="shrink-0 border-b">
	<div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
		<a href="/" class="hover:underline">
			<span class="font-writing text-4xl font-black md:block"> mkra </span>
		</a>
		<div class="mx-auto">
			<nav class="flex items-center justify-center gap-x-8 rounded-full p-2">
				{#each links as { href, label }}
					<Link {href} {label} />
				{/each}
			</nav>
		</div>
		<div class={cn('flex items-center p-2')}>
			<LightSwitch />
		</div>
	</div>
</header>

<style>
	:global(::view-transition-old(header)),
	:global(::view-transition-new(header)) {
		animation-duration: 1s;
	}
</style>
