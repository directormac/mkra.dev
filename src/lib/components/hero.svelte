<script lang="ts">
	import { Skeleton } from '@ui/skeleton';
	import { Github, Linkedin, Mail } from 'lucide-svelte';

	const socials = [
		{ link: 'https://github.com/directormac', icon: Github },
		{ link: 'https://www.linkedin.com/in/markasena', icon: Linkedin },
		{ link: 'mailto:mac@mkra.dev', icon: Mail }
	];
</script>

<div class="flex flex-col-reverse items-center py-24 md:flex-row">
	<div class="flex w-1/2 flex-col gap-4">
		<h1 class="scroll-m-20 text-2xl font-bold tracking-tight md:text-4xl lg:text-7xl">
			Hello, I'm mac.
		</h1>
		<p class="py-4 text-xl font-medium tracking-wide">
			<span class="ml-8">A </span>
			seasoned network engineer with over a decade of experience, I've transitioned into full-stack web
			development, driven by a passion for building innovative solutions. I bring a wealth of expertise
			to guide your projects through the ever-evolving technological landscape.
		</p>
		<div class="flex gap-4 py-2">
			{#each socials as social}
				<a href={social.link} class="rounded-full bg-green-500 p-2 text-black hover:bg-green-300">
					<svelte:component this={social.icon} />
				</a>
			{/each}
		</div>
	</div>
	<div class="mx-auto flex w-1/2 justify-end">
		<Skeleton class="h-[380px] w-[380px] rounded-full" />
	</div>
</div>
