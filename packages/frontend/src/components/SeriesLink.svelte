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
	<div class="hover:bg-amber-100 h-40 border-1 border-dotted hover:border-double">
		<section>
			<div class="p-4">
				<h3 class="font-serif font-semibold text-3xl sm:text-4xl mb-4">{title}</h3>
				<P class="text-gray-700 text-lg sm:text-xl">{@render children?.()}</P>
			</div>
		</section>
	</div>
</a>
