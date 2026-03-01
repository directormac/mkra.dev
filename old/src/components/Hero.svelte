<script lang="ts">
	import AnimatedText from './AnimatedText.svelte'
	import { onMount } from 'svelte'
	import RollingText from './RollingText.svelte'

	let disableAnim = false
	onMount(() => {
		// if query param has disableAnim=true
		const urlParams = new URLSearchParams(window.location.search)
		disableAnim = urlParams.get('disable-anim') !== null
	})
</script>

<header
	class="text-center mx-auto flex max-w-[655px] flex-col px-4 pt-12
		xl:container xl:h-[800px] xl:pt-0"
>
	{#if disableAnim}
		<h1 class="text-6xl font-black xl:text-[15rem]">Hello.</h1>
		<h2 class="mt-4 text-5xl font-black xl:text-[13rem]">I'm Mac.</h2>
	{:else}
		<AnimatedText class="text-6xl font-black " text="Hello." tag="h1" />
		<AnimatedText
			text="I'm Mac"
			tag="h2"
			initialDelay={1}
			delay={0.065}
			class="mt-4 text-5xl font-black"
		/>
	{/if}

	<div class="mt-12 max-w-2xl">
		<RollingText />
		<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">A man with many roles and titles.</p>
	</div>
	<a
		href="/"
		class="bg-zinc-900 hover:bg-zinc-700 text-white mt-4 flex mx-auto border-0 py-2 px-8 focus:outline-none rounded text-lg"
	>
		Hire Me
	</a>
</header>

<style>
	@keyframes avatar-animate {
		0% {
			clip-path: inset(50% 50% 50% 50% round 200px);
			rotate: 8deg;
		}
		100% {
			clip-path: inset(0% 0% 0% 0% round 200px);
			rotate: -2deg;
		}
	}
</style>
