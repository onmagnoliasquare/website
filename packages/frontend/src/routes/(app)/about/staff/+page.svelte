<script lang="ts">
	import NormalCentering from '$components/NormalCentering.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<NormalCentering>
	<PageHeader>Staff</PageHeader>
	<p class="tracked-02">Here's a list of everyone that ever was or is...</p>
	<ul class="list pa0">
		{#each data.members as member}
			<li>
				{#if member.slug.current}
					<a href={`/about/staff/${member.slug.current}`}>
						<p class="pa0 ma0 tracked-02 serif f4 fw3">
							{member.name}
						</p>
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</NormalCentering>

<style>
	ul > li > a {
		text-decoration: none;
		color: var(--text-color);
	}

	ul > li > a:hover {
		/* background-color: var(--gold); */
		text-decoration: underline;
	}

	p {
		display: inline;
		text-align: left;
	}
</style>
