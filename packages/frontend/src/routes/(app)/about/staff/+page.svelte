<script lang="ts">
	import StaffGrid from '$components/about/StaffGrid.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="flex flex-row space-x-2">
	<span class="mini inline text-lg sm:text-2xl font-display font-light italic">The</span>
	<div class="inline">
		<PageHeader>Staff</PageHeader>
	</div>
</div>
<div class="center">
	<!-- <p class="tracked-02">Here's a list of everyone that ever was or is...</p> -->
	<div class="m-2 p-2">
		<StaffGrid members={data.members} />
	</div>
</div>
