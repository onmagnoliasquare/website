<script lang="ts">
	import type { MarkComponentProps } from '$lib/rendererTypes';

	export let portableText: MarkComponentProps;

	$: ({ markType } = portableText);
</script>

{#if markType === 'strong'}
	<strong class="tracked-02">
		<slot />
	</strong>
{:else if markType === 'em'}
	<em class="tracked-02">
		<slot />
	</em>
{:else if markType === 'code'}
	<code>
		<slot />
	</code>
{:else if markType === 'underline'}
	<span style="text-decoration:underline;" class="tracked-02">
		<slot />
	</span>
{:else if markType === 'strike-through'}
	<del class="tracked-02">
		<slot />
	</del>
{:else}
	<slot />
{/if}
