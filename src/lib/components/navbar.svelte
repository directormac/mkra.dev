<script lang="ts">
	import { cn } from '@utils';
	import LightSwitch from './light-switch.svelte';
	import Link from './link.svelte';
	import { setupViewTransition } from 'sveltekit-view-transition';
	import { matchMedia } from '@utils';
	import * as Sheet from '@ui/sheet';
	import { Button } from './ui/button';
	import { Menu } from 'lucide-svelte';

	const isLargeScreen = matchMedia('(min-width: 768px)');

	const { transition } = setupViewTransition();

	const links = [
		{ label: 'About', href: '/about' },
		{ label: 'Projects', href: '/projects' }
	];

	let positionY: number = 0;
</script>

<svelte:window bind:scrollY={positionY} />
<header use:transition={'header'} class={cn('sticky top-0 z-10 shrink-0')}>
	<div class="h-18 mx-auto flex max-w-7xl items-center justify-between px-4">
		<a href="/" class="hover:underline">
			<span class="font-writing text-4xl font-black md:block"> mkra.dev </span>
		</a>
		{#if $isLargeScreen}
			<div
				class={cn(
					'mx-auto rounded-full px-4 dark:text-white',
					positionY > 50 ? 'bg-zinc-900 text-white' : ''
				)}
			>
				<nav class="flex items-center justify-center gap-x-12 rounded-full p-2 text-sm">
					{#each links as { href, label }}
						<Link {href} {label} />
					{/each}
				</nav>
			</div>
		{:else}
			<div class="ml-auto">
				<Sheet.Root>
					<Sheet.Trigger asChild let:builder>
						<Button builders={[builder]} variant="ghost">
							<Menu />
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="right">
						<nav
							class="flex flex-col items-center justify-center gap-y-4 rounded-full p-2 pt-12 text-xl"
						>
							{#each links as { href, label }}
								<Sheet.Close asChild let:builder>
									<Button variant="ghost" builders={[builder]}>
										<Link {href} {label} />
									</Button>
								</Sheet.Close>
							{/each}
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			</div>
		{/if}
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
