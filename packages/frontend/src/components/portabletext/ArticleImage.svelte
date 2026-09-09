<script lang="ts">
import PhotoCaption from '$components/custom/PhotoCaption.svelte'
import P from '$components/defaults/P.svelte'
import Image from '$components/Image.svelte'
import type { CustomBlockComponentProps } from '@portabletext/svelte'
import type { SanityImageAsset } from '$lib/sanity/types.generated'

interface Props {
  portableText: CustomBlockComponentProps<SanityImageAsset & { creditLine: string, alt: string }>
}

let { portableText }: Props = $props()
let { value } = $derived(portableText)
</script>

<figure class="max-w-xl center">
  <Image
    media={value}
    loading="lazy"
    class="mb-2"
    width={value.metadata?.dimensions?.width ?? 1920}
    height={value.metadata?.dimensions?.height ?? 1080}
    blurHash={value.metadata?.blurHash}
    alt={value.alt} />
  <figcaption>
    {#if value.title}
      <h2 class="mb-1 font-bold tracking-wide">{value.title}</h2>
    {/if}
    {#if value.description ?? value.creditLine}
      <div class="flex flex-col space-y-1">
        {#if value.description}
          <P class="text-sm">
            {value.description}
          </P>
        {/if}
        <PhotoCaption>
          {value.creditLine}
        </PhotoCaption>
      </div>
    {/if}
  </figcaption>
</figure>
