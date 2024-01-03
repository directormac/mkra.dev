<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '@utils';

	export let href: string = '';
	export let label: string = '';
</script>

<a
	{href}
	class={cn(
		'text-sm  tracking-wider transition-colors hover:text-blue-500 hover:underline hover:underline-offset-4',
		$page.url.pathname === href ? 'font-bold underline underline-offset-4' : ''
	)}
>
	{label}
</a>
