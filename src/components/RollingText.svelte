<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { slide, fade } from 'svelte/transition'
	import { sineInOut } from 'svelte/easing'

	export let titles = ['Frontend', '+', 'Backend', '=', 'Fullstack Developer']
	let index = 0
	let roller: ReturnType<typeof setInterval>

	onMount(() => {
		roller = setInterval(() => {
			if (index === titles.length - 1) index = 0
			else index++
		}, 2500)
	})

	onDestroy(() => {
		clearInterval(roller)
	})
</script>

{#key index}
	<h1
		class="bg-transparent text-center text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
		transition:slide={{ axis: 'y', delay: 0, duration: 0, easing: sineInOut }}
	>
		{titles[index]}
	</h1>
{/key}
