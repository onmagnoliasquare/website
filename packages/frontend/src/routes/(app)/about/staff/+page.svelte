<script lang="ts">
	import StaffGrid from '$components/about/StaffGrid.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="center">
	<div class="flex flex-row space-x-2">
		<span id="mini" class="inline text-2xl font-display font-light italic">The</span>
		<div class="inline">
			<PageHeader>Staff</PageHeader>
		</div>
	</div>
	<!-- <p class="tracked-02">Here's a list of everyone that ever was or is...</p> -->
	<StaffGrid members={data.members} />
</div>

<style>
	#mini {
		font-stretch: normal;
	}
</style>
