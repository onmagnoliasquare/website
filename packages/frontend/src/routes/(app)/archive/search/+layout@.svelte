<script lang="ts">
import type { LayoutProps } from './$types'

let { children }: LayoutProps = $props()
</script>

<div class="flex min-h-dvh flex-col">
  <main class="flex grow flex-col">
    {@render children()}
  </main>
</div>
