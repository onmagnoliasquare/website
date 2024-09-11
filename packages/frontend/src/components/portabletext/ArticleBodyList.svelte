<script lang="ts">
	import type { ListComponentProps } from '$lib/rendererTypes';

	export let portableText: ListComponentProps;

	$: ({ value } = portableText);
	$: ({ listItem } = value);
</script>

<div class="mv4">
	{#if listItem === 'number'}
		<ol><slot /></ol>
	{:else}
		<ul><slot /></ul>
	{/if}
</div>
