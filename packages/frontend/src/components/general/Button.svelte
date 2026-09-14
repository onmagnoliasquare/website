<!--
@component
Button is a debounced button that awaits the result of an `onclick` callback. The button
becomes disabled when clicked. When the `onclick` callback is complete, the button becomes
enabled.

Since the button awaits a promise, it will be disabled until the promise is resolved.
This means the `onclick` callback must handle the possibility of a timeout. Otherwise,
the button will be in a disabled state forever.

While pressed, the label keeps its place in the layout and the spinner is overlaid on
top of it.
-->
<script lang="ts">
import type { HTMLButtonAttributes } from 'svelte/elements'
import Loading from './Loading.svelte'
import { twMerge, type ClassNameValue } from 'tailwind-merge'

let { onclick: onClick, children, class: buttonClass, ...rest }: HTMLButtonAttributes = $props()

let pressed = $state(false)
</script>

<button
  {...rest}
  class={twMerge('flex flex-col items-center', buttonClass as ClassNameValue)}
  onclick={async e => {
    pressed = true
    if (onClick) {
      await onClick(e)
    }
    pressed = false
  }}
  disabled={pressed}>
  <span class="relative">
    <span class="block" class:opacity-0={pressed}>
      {@render children?.()}
    </span>
    {#if pressed}
      <span class="absolute inset-0 flex items-center justify-center">
        <Loading class="size-4 p-0" />
      </span>
    {/if}
  </span>
</button>
