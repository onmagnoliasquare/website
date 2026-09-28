<script lang="ts">
import type { HTMLInputAttributes } from 'svelte/elements'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

type Props = HTMLInputAttributes

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
let { value = $bindable(), class: className, name, placeholder, ...props }: Props = $props()
</script>

<input
  {...props}
  class={twMerge('w-full min-w-0 p-1 italic', className as ClassNameValue)}
  bind:value={value}
  type="text"
  name={name}
  placeholder={placeholder}
  autocomplete="off"
  spellcheck="false" />
