<script lang="ts">
interface Props {
  tagName: string
}

let { tagName }: Props = $props()
</script>

<span class="tracking-wide hover:underline">
  {#if tagName === 'on century avenue' || tagName === 'oca'}
    <span class=" font-bold text-nyu-purple-400">
      # {tagName}
    </span>
  {:else}
    # {tagName}
  {/if}
</span>
