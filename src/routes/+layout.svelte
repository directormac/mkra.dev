<script lang="ts">
	import Navbar from '@components/navbar.svelte';
	import { cn } from '@utils';
	import '../app.pcss';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/caveat';
	import 'carta-md/light.css';
	import '@cartamd/plugin-code/default.css';
	import { ModeWatcher } from 'mode-watcher';
	import Separator from '@components/ui/separator/separator.svelte';
</script>

<ModeWatcher />

<div class={cn('flex min-h-full flex-col ')}>
	<Navbar />
	<div class="container gap-x-6 py-2">
		<main>
			<slot />
		</main>
		<Separator />
		<div class="flex justify-center py-4">Handcrafted by mac</div>
	</div>
</div>
