<script lang="ts">
import P from '$components/defaults/P.svelte'
import { createAuthorString } from '$lib/helpers'
import type { MemberQuery } from '$lib/sanity/types'

interface Props {
  authors: MemberQuery[]
}

let { authors }: Props = $props()
let authorString = $derived(createAuthorString(authors))
</script>

<P class="text-left font-bold text-slate-600">
  {authorString}
</P>
