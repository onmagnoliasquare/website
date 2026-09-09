<script lang="ts">
import type { Snippet } from 'svelte'
import P from './defaults/P.svelte'

interface Props {
  title: string
  link: string
  bgColor?: string
  children: Snippet
}

let { title, link, children }: Props = $props()
</script>

<a data-sveltekit-preload-data="tap" href={link}>
  <div class="h-40 border border-dotted hover:border-double hover:bg-amber-100">
    <section>
      <div class="p-4">
        <h2 class="mb-4 font-serif text-3xl font-semibold sm:text-4xl">{title}</h2>
        <P class="text-gray-700 text-lg sm:text-xl">{@render children()}</P>
      </div>
    </section>
  </div>
</a>
