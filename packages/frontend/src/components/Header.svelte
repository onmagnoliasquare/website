<!--
@component
`Header` is the header component for the entire website. Included is the navbar and site title.
-->

<script lang="ts">
import DesktopNavbar from './general/navbar/DesktopNavbar.svelte'
import SiteTitle from './general/SiteTitle.svelte'
import HamburgerIcon from './icons/HamburgerIcon.svelte'
import omsLogo from '$lib/assets/oms_logo.png'
import { afterNavigate } from '$app/navigation'
import { slide } from 'svelte/transition'
import XIcon from './icons/XIcon.svelte'
import MobileNavbar from './general/navbar/MobileNavbar.svelte'

let showMenu = $state(false)

function toggleNavbar() {
  showMenu = !showMenu
}

afterNavigate(() => {
  if (showMenu) toggleNavbar()
})
</script>

<header>
  <div class="center w-full max-w-7xl border-0 pt-4 sm:mb-0 sm:pb-0 lg:border-x lg:border-dotted">
    <!-- Show no border iff show menu is on -->
    <div
      class="flex flex-row items-center border-b pb-4 sm:block sm:border-0 sm:pb-0 md:border-b-0">
      <div class="flex flex-row">
        <div class="grow">
          <div class="mt-2 ml-1 p-2 pt-0 pb-0 sm:pb-2">
            <SiteTitle />
          </div>
          <div class="p-1 sm:p-2">
            <DesktopNavbar />
          </div>
        </div>
        <div class="mr-4 hidden border-4 border-double border-neutral-400 p-2 sm:mr-2 md:block">
          <img alt="" src={omsLogo} class="w-20" />
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
    </div>
  </div>
</header>
