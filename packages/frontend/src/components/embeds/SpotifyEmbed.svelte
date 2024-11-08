<script lang="ts">
	import { Spotify } from 'sveltekit-embed';

	interface Props {
		spotifyPath: string;
	}

	let { spotifyPath }: Props = $props();
</script>

<div>
	<Spotify spotifyLink={spotifyPath} height="352px" />
</div>
