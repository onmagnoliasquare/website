<!--
@component
Button is a debounced button that awaits the result of an `onclick` callback. The button
becomes disabled when clicked. When the `onclick` callback is complete, the button becomes
enabled.

Since the button awaits a promise, it will be disabled until the promise is resolved.
This means the `onclick` callback must handle the possibility of a timeout. Otherwise,
the button will be in a disabled state forever.
-->
<script lang="ts">
import type { HTMLButtonAttributes } from 'svelte/elements'

let { onclick: onClick, children, ...rest }: HTMLButtonAttributes = $props()

let pressed = $state(false)
</script>

<button
  {...rest}
  onclick={async e => {
    pressed = true
    if (onClick) {
      await onClick(e)
    }
    pressed = false
  }}
  disabled={pressed}
>
  {@render children?.()}
</button>
