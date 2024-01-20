<script lang="ts">
	import { Send, Github, Linkedin, Mail } from 'lucide-svelte';
	import type { Website } from '$lib/config';
	import { imageLinkTransformer } from '@utils';

	export let meta: Website;

	const global = meta;

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
		<div class="grid grid-cols-3 gap-6 py-2 md:grid-cols-4 md:gap-4">
			{#each socials as social}
				<a
					href={social.link}
					class="inline-flex items-center justify-center rounded-full bg-green-600 p-2 text-black hover:bg-green-400"
				>
					<span class="text-xs md:text-sm">{social.label}</span>
					<svelte:component this={social.icon} class="md:ml-1" />
				</a>
			{/each}
		</div>
	</div>
	<div class="mx-auto flex justify-end py-4 md:w-1/2 lg:pr-24">
		<img
			src={imageLinkTransformer(global.image, '500')}
			alt={global.title}
			class="h-[200px] w-[200px] rounded-full md:h-[350px] md:w-[350px]"
		/>
	</div>
</div>
