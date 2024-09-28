<script lang="ts">
	import NormalCentering from '$components/NormalCentering.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<NormalCentering>
	<PageHeader>Staff</PageHeader>
	<p class="tracked-02">Here's a list of everyone that ever was or is..</p>
	<ul class="list pa0">
		{#each data.members as member}
			<li>
				<p class="pa0 ma0 tracked-02 newSerif f4 fw6">
					{member.name}
					{#if member.bio}
						<span class="sans-serif fw4 f6 gray">{member.bio}</span>
					{/if}
				</p>
			</li>
		{/each}
	</ul>
</NormalCentering>

<style>
</style>
