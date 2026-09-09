<script lang="ts">
import StaffGrid from '$components/about/StaffGrid.svelte'
import PageHeader from '$components/PageHeader.svelte'
import type { PageProps } from './$types'

let { data }: PageProps = $props()
</script>

<div class="flex flex-row space-x-2">
  <span class="mini inline font-display text-lg font-light italic sm:text-2xl">The</span>
  <div class="inline">
    <PageHeader>Staff</PageHeader>
  </div>
</div>
<div class="center">
  <div class="sm:m-2 sm:p-2">
    <StaffGrid members={data.members} />
  </div>
</div>
