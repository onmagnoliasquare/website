<script lang="ts">
	import { VersionLabel } from '$lib';
	/**
	 * ======== ROOT LAYOUT ========
	 * */
	import { isDevEnv } from '$lib/sanity';
	import '../styles/onmagnoliasquare.css';
	import '../styles/typography.css';
</script>

<svelte:head>
	<link rel="icon" href="https://fav.farm/🟪" />
</svelte:head>

{#if isDevEnv}
	<div class="w-100 ma0 pa0 bg-red">
		<div class="mw9 center ma0 pa0">
			<div class="flex flex-flow items-center justify-center">
				<p class="ttu sans-serif fw4 tracked-02 f5 fw8 pa0 ma0 white">
					⚠️ Using Development Dataset - not for production use ️⚠️
				</p>
			</div>
		</div>
	</div>
{/if}
<div class="w-100 ma0 pa1">
	<div class="mw9 center ma0 pa0">
		<div class="flex flex-row-reverse items-center justify-left">
			<VersionLabel />
		</div>
	</div>
</div>
<div class="mw9 w-100 center pa1 pa3-l">
	<slot />
</div>
