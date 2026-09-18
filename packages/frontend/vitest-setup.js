import '@testing-library/svelte/vitest'
import '@testing-library/jest-dom/vitest'

/**
 * jsdom implements no Web Animations API, so any component using a Svelte
 * transition throws on `element.animate`. This stand-in finishes on the next
 * microtask, which is what lets an outro complete and the node actually leave
 * the DOM — without it a transitioning element never unmounts and tests that
 * assert on its absence hang instead of passing.
 */
class FinishedAnimation {
  /** @type {(() => void) | null} */
  onfinish = null
  /** @type {unknown} */
  effect = null
  currentTime = 0
  playState = 'finished'

  constructor() {
    queueMicrotask(() => {
      this.onfinish?.()
    })
  }

  cancel() {
    this.playState = 'idle'
  }
}

// This file is shared with the `server` project, which runs in node and has no
// `Element` at all. Only the sliver of `Animation` that Svelte's transitions
// actually touch is provided, so the cast past the full interface is deliberate.
if (typeof Element !== 'undefined') {
  Element.prototype.animate = () =>
    /** @type {Animation} */ (/** @type {unknown} */ (new FinishedAnimation()))
}
