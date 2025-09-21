<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  children: Snippet
}

let { children }: Props = $props()
</script>

<div class="m-2 p-2">
  {@render children()}
</div>
