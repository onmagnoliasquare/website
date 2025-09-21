<script lang="ts">
import { dateFormatter } from '$lib/helpers'

interface Props {
  locale?: string
  date: string
}

let { locale = 'en-US', date }: Props = $props()
</script>

<time datetime={date}>{dateFormatter(date, locale)}</time>
