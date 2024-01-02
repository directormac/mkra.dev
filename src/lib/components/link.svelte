<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '@utils';

	export let href: string = '';
	export let label: string = '';
</script>

<a
	{href}
	class={cn(
		'text-sm font-bold tracking-wider transition-colors hover:text-blue-600 hover:underline hover:underline-offset-4',
		$page.url.pathname === href ? 'text-green-600' : ''
	)}
>
	{label}
</a>
