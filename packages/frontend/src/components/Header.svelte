<!--
@component
`Header` is the header component for the entire website. Included is the navbar and site title.
-->

<script lang="ts">
import MobileNavbar from './general/navbar/MobileNavbar.svelte'
import DesktopNavbar from './general/navbar/DesktopNavbar.svelte'
import SiteTitle from './general/SiteTitle.svelte'
import HamburgerIcon from './icons/HamburgerIcon.svelte'
import omsLogo from '$lib/assets/oms_logo.png'

let showMenu = $state(false)

function toggleNavbar() {
  showMenu = !showMenu
}
</script>

<header>
  <div class="center w-full max-w-7xl border-0 pt-4 sm:mb-0 sm:pb-0 lg:border-x lg:border-dotted">
    <!-- Show no border iff show menu is on -->
    <div
      class={[
        'flex flex-row items-center pb-4 sm:block sm:border-0 sm:pb-0 md:border-b-0',
        showMenu ? 'border-b-0' : 'border-b',
      ]}>
      <div class="flex flex-row">
        <div class="grow">
          <div class="my-2 ml-1 p-2">
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
      <!-- Mobile Menu Button -->
      <div class="absolute right-2 sm:hidden">
        <button
          type="button"
          title="Menu"
          aria-label="Toggle navigation menu"
          class="text-gray-800 p-1"
          onclick={toggleNavbar}>
          <HamburgerIcon />
        </button>
      </div>
    </div>
    <MobileNavbar toggleNavbar={toggleNavbar} showMenu={showMenu} />
  </div>
</header>
