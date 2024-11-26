<script lang="ts">
	import { semVer } from '$lib/variables';
	// let version = import.meta.env.VITE_RELEASE_VERSION;
</script>

<div class="ph3">
	<a href={`https://github.com/onmagnoliasquare/website/releases/tag/v${semVer}`} target="_blank">
		<p class="f6 pa0 ma0 font-monospace tracked-tight">
			v{semVer}
		</p>
	</a>
</div>
