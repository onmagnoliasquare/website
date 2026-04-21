<script lang="ts">
import P from '$components/defaults/P.svelte'
import HoverDim from '$components/general/HoverDim.svelte'
import type { AllMembers } from '$lib/sanity/types'

interface Props {
  member: AllMembers[number]
}

let { member }: Props = $props()
</script>

<a
  data-sveltekit-preload-code="viewport"
  data-sveltekit-preload-data="tap"
  href={`/about/staff/${member.slug}`}
  class="hover:underline w-fit hover:bg-amber-100"
>
  <HoverDim>
    <article class="p-1">
      <P>{member.name}</P>
    </article>
  </HoverDim>
</a>
