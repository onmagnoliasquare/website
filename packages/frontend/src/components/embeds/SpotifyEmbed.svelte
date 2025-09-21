<script lang="ts">
import GeneralObserver from './GeneralObserver.svelte'

interface Props {
  spotifyPath?: string
  width?: string
  height?: string
  disable_observer?: boolean
  iframe_styles?: string
}

let {
  spotifyPath = '',
  width = '100%',
  height = '352px',
  disable_observer = false,
  iframe_styles = `
			border-radius: 0.8rem;
			height: ${height};
			width: ${width};
		`,
}: Props = $props()
</script>

<GeneralObserver disable_observer={disable_observer}>
  <iframe
    data-testid="spotify"
    title={`spotify-${spotifyPath}`}
    class="spotify-sveltekit-embed"
    src={`https://open.spotify.com/embed/${spotifyPath}`}
    frameBorder="0"
    allow="encrypted-media"
    style={iframe_styles}
  ></iframe>
</GeneralObserver>
