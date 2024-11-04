<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		link: string;
		bgColor?: string;
		children?: Snippet;
	}

	let { title, link, bgColor = 'purple', children }: Props = $props();
</script>

<div class="mw6 ba border-color w-100 ma2" id={`${bgColor}`}>
	<a data-sveltekit-preload-data="tap" href={link} class="ma0 pa0">
		<div class="flex flex-column">
			<div class="pl4 pt4 pb4">
				<p class="pa0 ma0 f1 serif fw5">{title}</p>
			</div>
			<div class="pl4 pb4">
				<p class="pa0 ma0 f6 tracked-02">{@render children?.()}</p>
			</div>
		</div>
	</a>
</div>

<style>
	a {
		text-decoration: none;
	}

	#green:hover {
		background-color: var(--light-green);
	}

	#purple:hover {
		background-color: var(--light-purple);
	}
</style>
