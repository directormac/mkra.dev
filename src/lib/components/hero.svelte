<script lang="ts">
	import { Send, Github, Linkedin, Mail } from 'lucide-svelte';

	import { page } from '$app/stores';

	const global = $page.data.meta;

	const socials = [
		{ label: 'Github', link: `https://github.com/${global.github}`, icon: Github },
		{ label: 'LinkedIn', link: `https://www.linkedin.com/in/${global.linkedin}`, icon: Linkedin },
		{ label: 'Telegram', link: `mailto:${global.telegram}`, icon: Send },
		{ label: 'Mail', link: `mailto:${global.email}`, icon: Mail }
	];
</script>

<div class="flex flex-col-reverse px-4 py-24 md:flex-row md:items-center">
	<div class="flex flex-col md:w-1/2 md:pt-8">
		<h1 class="scroll-m-20 text-2xl font-bold tracking-tight md:text-4xl lg:text-7xl">
			Hello, I'm mark.
		</h1>
		<p class="text-md py-4 font-medium tracking-wide md:text-xl">
			<span class="ml-8"> {global.description}</span>
		</p>
		<div class="flex gap-4 py-2">
			{#each socials as social}
				<a
					href={social.link}
					class="inline-flex rounded-full bg-green-600 p-2 text-black hover:bg-green-400"
				>
					{social.label}
					<svelte:component this={social.icon} class="ml-2" />
				</a>
			{/each}
		</div>
	</div>
	<div class="mx-auto flex justify-end py-4 md:w-1/2 lg:pr-24">
		<img
			src="/color.webp"
			alt="bw"
			class="h-[200px] w-[200px] rounded-full md:h-[350px] md:w-[350px]"
		/>
	</div>
</div>
