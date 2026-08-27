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
</script>

<figure class="max-w-xl center">
  <Image
    media={portableText.value}
    loading="lazy"
    class="mb-2"
    width={portableText.value.metadata?.dimensions?.width ?? 1920}
    height={portableText.value.metadata?.dimensions?.height ?? 1080}
    blurHash={portableText.value.metadata?.blurHash}
    alt={portableText.value.alt} />
  <figcaption>
    {#if portableText.value.title}
      <h2 class="mb-1 font-bold tracking-wide">{portableText.value.title}</h2>
    {/if}
    {#if portableText.value.description ?? portableText.value.creditLine}
      <div class="flex flex-col space-y-1">
        {#if portableText.value.description}
          <P class="text-sm">
            {portableText.value.description}
          </P>
        {/if}
        <PhotoCaption>
          {portableText.value.creditLine}
        </PhotoCaption>
      </div>
    {/if}
  </figcaption>
</figure>
