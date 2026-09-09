<script lang="ts">
import type { Snippet } from 'svelte'
import P from './defaults/P.svelte'

interface Props {
  title: string
  link: string
  children: Snippet
}

let { title, link, children }: Props = $props()
</script>

<a data-sveltekit-preload-data="tap" href={link}>
  <div class="h-40 w-xs border border-dotted hover:border-double hover:bg-amber-100 sm:w-sm">
    <section>
      <div class="p-4">
        <h3 class="mb-4 font-serif text-3xl font-semibold">{title}</h3>
        <P class="text-gray-700 text-sm sm:text-lg">{@render children()}</P>
      </div>
    </section>
  </div>
</a>
