<script lang="ts">
	import { Link } from 'lucide-svelte';
	import * as HoverCard from '$lib/components/ui/hover-card';

	export let href: string = '',
		label: string = '';
</script>

<HoverCard.Root openDelay={100} closeDelay={200}>
	<HoverCard.Trigger
		{href}
		target="_blank"
		rel="noreferrer noopener"
		class="rounded-sm  hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
	>
		<slot>
			<Link />
		</slot>
	</HoverCard.Trigger>
	<HoverCard.Content class="w-80 dark:bg-zinc-800">
		<div class="flex justify-between space-x-4">
			<div class="space-y-1">
				<h4 class="text-sm font-semibold">{label}</h4>
				<p class="text-sm">{href}</p>
			</div>
		</div>
	</HoverCard.Content>
</HoverCard.Root>
