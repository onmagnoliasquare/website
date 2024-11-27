<script lang="ts">
	import StaffGrid from '$components/about/StaffGrid.svelte';
	import PageHeader from '$components/PageHeader.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
</script>

<div class="mw8 center">
	<PageHeader>Staff</PageHeader>
	<!-- <p class="tracked-02">Here's a list of everyone that ever was or is...</p> -->
	<StaffGrid members={data.members} />
</div>
