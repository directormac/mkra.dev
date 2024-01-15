<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center gap-y-28">
	<h1
		class="mx-auto scroll-m-20 text-center text-2xl font-extrabold tracking-tight md:text-4xl lg:text-5xl"
	>
		Ops {$page.status}
	</h1>
	<h2>The page you requested does not exist.</h2>
</div>
