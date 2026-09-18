<script lang="ts">
import PageHeader from '$components/PageHeader.svelte'
import Centered from '$components/defaults/Centered.svelte'
import HoverDim from '$components/general/HoverDim.svelte'
import type { PageProps } from './$types'

let { data }: PageProps = $props()
</script>

<Centered>
  <div class="flex flex-row">
    <div class="inline">
      <PageHeader>Archive</PageHeader>
    </div>
  </div>
  <div class="my-2">
    <a href="/archive/search">Go to Search</a>
  </div>
  <ul class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6">
    {#each data.tags as tag}
      <li>
        <a
          data-sveltekit-preload-code="viewport"
          data-sveltekit-preload-data="tap"
          href={`/archive/tags/${tag.slug}`}
          title={tag.name}
          class=" w-fit">
          <HoverDim>
            <article class="w-fit p-1 hover:bg-amber-200 hover:underline">
              <data.Tag tagName={tag.name} />
            </article>
          </HoverDim>
        </a>
      </li>
    {/each}
  </ul>
</Centered>
