<script lang="ts">
import type { Member } from '$lib/schema'
import StaffClickable from './StaffClickable.svelte'

interface Props {
  members: Member[]
}

let { members }: Props = $props()
</script>

<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
  {#each members as member}
    <StaffClickable member={member} />
  {/each}
</div>
