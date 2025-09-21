<script lang="ts">
import { dateFormatter } from '$lib/helpers'

interface Props {
  locale?: string
  date: string
  updated?: boolean
}

let { locale = 'en-US', date, updated = false }: Props = $props()
</script>

<p class="text-sm font-bold tracking-wide">
  {#if updated}
    updated
  {/if}
  <time datetime={date}>{dateFormatter(date, locale)}</time>
</p>
