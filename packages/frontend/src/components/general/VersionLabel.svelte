<!--
@component
Labels the semantic version and commit SHA. Runtime environment shows relevant
information.
-->

<script lang="ts">
	import { version as commitSha, dev } from '$app/environment';

	const development = dev || import.meta.env.MODE === 'development';
	const staging = import.meta.env.MODE === 'staging';

	// eslint-disable-next-line no-undef
	const semver = __ONMAGNOLIASQUARE_FRONTEND_VERSION__;
	const sha = commitSha.slice(0, 12);
</script>

<div class="font-mono text-sm">
	{#if development}
		<a href={`https://github.com/onmagnoliasquare/website`} target="_blank">dev@HEAD</a>
	{:else if staging}
		<a href={`https://github.com/onmagnoliasquare/website/tree/staging`} target="_blank">
			<span>staging@{sha}</span>
		</a>
	{:else}
		<a href={`https://github.com/onmagnoliasquare/website/releases/tag/${semver}`} target="_blank">
			<span>v{semver}</span>
		</a>
	{/if}
</div>
