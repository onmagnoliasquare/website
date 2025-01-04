<script lang="ts">
	import type { Snippet } from 'svelte';
	import P from './defaults/P.svelte';

	interface Props {
		title: string;
		link: string;
		bgColor?: string;
		children: Snippet;
	}

	let { title, link, children }: Props = $props();
</script>

<a data-sveltekit-preload-data="tap" href={link}>
	<div class="hover:bg-amber-100 w-sm h-40 outline outline-dashed">
		<section>
			<div class="p-4">
				<h3 class="font-serif font-semibold text-3xl mb-4">{title}</h3>
				<P class="opacity-70">{@render children?.()}</P>
			</div>
		</section>
	</div>
</a>
