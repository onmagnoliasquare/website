<script lang="ts">
import type { LayoutProps } from './$types'

let { children }: LayoutProps = $props()
</script>

<div class="m-2 p-2">
  {@render children()}
</div>
