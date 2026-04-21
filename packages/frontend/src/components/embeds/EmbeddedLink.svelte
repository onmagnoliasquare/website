<script lang="ts">
	import { parseEmbedLink } from '$lib/helpers';
	import type { CustomBlockComponentProps } from '@portabletext/svelte';
	import SpotifyEmbed from './SpotifyEmbed.svelte';
import type { EmbeddedLink } from '$lib/sanity/types.generated'

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
