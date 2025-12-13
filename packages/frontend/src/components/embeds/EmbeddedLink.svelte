<script lang="ts">
	import { parseEmbedLink } from '$lib/helpers';
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import type { EmbeddedLink } from '$lib/schema';
	import SpotifyEmbed from './SpotifyEmbed.svelte';

	interface Props {
		portableText: CustomBlockComponentProps<EmbeddedLink>;
	}

	let { portableText }: Props = $props();

	let link = $derived(parseEmbedLink(portableText.value.contentUrl));
</script>

<div class="my-1 py-2">
	{#if link.name === 'spotify'}
		{#if link.path}
			<SpotifyEmbed spotifyPath={link.path} />
		{:else}
			<p>Link path not provided :(</p>
		{/if}
	{/if}
</div>
