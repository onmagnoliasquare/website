<script lang="ts">
import P from '#components/defaults/P.svelte'
import { createAuthorString } from '#lib/helpers/index.ts'
import type { MemberQuery } from '#lib/sanity/types.ts'

interface Props {
  authors: MemberQuery[]
}

let { authors }: Props = $props()
let authorString = $derived(createAuthorString(authors))
</script>

<P class="text-sm font-semibold md:text-sm">
  {authorString}
</P>
