<script lang="ts">
import NavItems from './NavItems.svelte'
import Logo from '$components/general/Logo.svelte'
import MobileNavbar from '../general/navbar/MobileNavbar.svelte'
import HamburgerIcon from '$components/icons/HamburgerIcon.svelte'
import { afterNavigate } from '$app/navigation'
import { slide } from 'svelte/transition'
import { site } from '$lib/constants'
import XIcon from '$components/icons/XIcon.svelte'

let showMenu = $state(false)
const toggleNavbar = () => (showMenu = !showMenu)

afterNavigate(() => {
  if (showMenu) toggleNavbar()
})

$effect(() => {
  if (!showMenu) return

  const html = document.documentElement
  const body = document.body
  const scrollbarWidth = window.innerWidth - html.clientWidth
  const previous = {
    htmlOverflow: html.style.overflow,
    bodyPaddingRight: body.style.paddingRight,
  }

  html.style.overflow = 'hidden'
  // Stand in for the scrollbar that just went away, so the page doesn't shift.
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth.toString()}px`

  return () => {
    html.style.overflow = previous.htmlOverflow
    body.style.paddingRight = previous.bodyPaddingRight
  }
})
</script>

<header class="center relative flex w-full flex-row border-b border-dotted sm:mb-0 sm:pb-0">
  <div class="center mb-6 flex w-fit max-w-7xl flex-1 items-end space-x-1 px-1 pt-4">
    <div class="mx-1">
      <a href="/" title={site.title}>
        <Logo />
      </a>
    </div>
    <div class="grow"></div>
    <div class="p-1">
      <NavItems />
    </div>
  </div>
  <div class="fixed bottom-0 z-20 flex w-full flex-col sm:hidden">
    <div class={['relative grow', showMenu && 'touch-none']}>
      {#if showMenu}
        <div
          class="h-full w-full overflow-y-auto overscroll-contain border-t border-dotted border-t-neutral-400 bg-white p-6 shadow-sm"
          transition:slide={{ axis: 'y', duration: 125 }}>
          <MobileNavbar showMenu={showMenu} withSearch={true} />
        </div>
      {/if}
    </div>
    <button
      type="button"
      title="Menu"
      aria-label="Toggle navigation menu"
      aria-expanded={showMenu}
      class="z-30 h-fit w-full border-t border-neutral-400 bg-white p-1 py-4 text-gray-800 shadow-xs sm:hidden"
      onclick={toggleNavbar}>
      {#if showMenu}
        <XIcon />
      {:else}
        <HamburgerIcon />
      {/if}
    </button>
  </div>
</header>
