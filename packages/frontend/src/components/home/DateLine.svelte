<script lang="ts">
import P from '$components/defaults/P.svelte'
import { dateFormatter } from '$lib/helpers'

interface Props {
  locale?: string
  date: string
}

let { locale = 'en-US', date }: Props = $props()
</script>

<time class="font-semibold" datetime={date}><P class="text-sm md:text-sm font-semibold">{dateFormatter(date, locale)}</P></time>
