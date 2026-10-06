<script lang="ts">
import P from '$components/defaults/P.svelte'
import { createAuthorString } from '#lib/helpers/index.js'
import type { MemberQuery } from '#lib/sanity/types.js'

interface Props {
  authors: MemberQuery[]
}

let { authors }: Props = $props()
let authorString = $derived(createAuthorString(authors))
</script>

<P class="text-sm font-semibold md:text-sm">
  {authorString}
</P>
