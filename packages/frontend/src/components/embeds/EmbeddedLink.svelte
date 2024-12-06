<script lang="ts">
	import { parseEmbedLink } from '$lib/helpers';
	import SpotifyEmbed from './SpotifyEmbed.svelte';

	interface Props {
		portableText: any;
	}

	let { portableText }: Props = $props();

	let link = parseEmbedLink(portableText.value.contentUrl);
</script>

<div class="mv4">
	{#if link.name == 'spotify'}
		<SpotifyEmbed spotifyPath={link.path!} />
	{/if}
</div>
