<script lang="ts">
	import { Button } from '@ui/button';
	import { Sun, Moon } from 'lucide-svelte';

	import { toggleMode } from 'mode-watcher';
</script>

<Button on:click={toggleMode} variant="ghost" size="icon">
	<Sun
		class="h-[1rem] rotate-0 scale-100 transition-all md:h-[1.2rem] md:w-[1.2rem] dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1rem] rotate-90 scale-0 transition-all md:h-[1.2rem] md:w-[1.2rem] dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
