<script>
	import Navbar from '@components/navbar.svelte';
	import '../app.pcss';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/caveat';
</script>

<div class="flex min-h-full flex-col">
	<Navbar />
	<div class="mx-auto flex w-full max-w-7xl items-start gap-x-6 py-2 sm:px-6">
		<main class="flex-1">
			<slot />
		</main>
	</div>
</div>
