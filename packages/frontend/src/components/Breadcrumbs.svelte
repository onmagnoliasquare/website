<style>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: end;
}
/* .breadcrumb li:not(:first-child)::before { */
/*   content: '→'; */
/*   margin-right: 3px; */
/*   margin-left: 3px; */
/* } */
</style>

<script lang="ts">
import type { Snippet } from 'svelte'

interface Props {
  children: Snippet
}

const { children }: Props = $props()
</script>

<div class="p-1">
  <ol aria-label="breadcrumbs" class="breadcrumb text-sm font-medium text-neutral-600">
    {@render children()}
  </ol>
</div>
