<script lang="ts">
import P from '$components/defaults/P.svelte'
import { createAuthorString, dateFormatter } from '$lib/helpers'
import type { SearchMixedMatchQueryResult } from '$lib/sanity/types.generated'
import type { Get } from '@sanity/codegen'

interface Props {
  result: Get<SearchMixedMatchQueryResult, number>
}

const { result }: Props = $props()
const date = $derived(dateFormatter(result.date))
</script>

<div
  class="relative w-full border-l-2 border-l-neutral-800 p-1 px-2 pb-3 pl-3 hover:border-l-nyu-purple-100 hover:opacity-50">
  <a href={result.slug} target="_blank">
    <h2
      class="max-w-[66ch] pb-3 font-display text-xl leading-tight font-semibold font-stretch-condensed hover:underline hover:underline-offset-4 sm:text-2xl">
      {result.title}
    </h2>
    <P class="pb-5 text-sm leading-relaxed sm:text-xs">
      {result.subtitle}
    </P>
    <div class="ml-auto w-fit text-right">
      <P class="mb-2 text-sm leading-tight sm:text-xs">
        <span class="font-semibold italic">{createAuthorString(result.authors)}</span>
        in
        <span class="font-semibold italic">{result.category}</span>
      </P>
      <time datetime={date}>
        <P class="text-sm font-normal md:text-xs">{date}</P>
      </time>
    </div>
  </a>
</div>
