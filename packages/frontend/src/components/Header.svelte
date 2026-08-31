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
  <div class="w-full max-w-7xl center border-0 lg:border-x lg:border-dotted pt-4 sm:mb-0 sm:pb-0">
    <!-- Show no border iff show menu is on -->
    <div
      class={[
        'flex flex-row sm:block md:border-b-0 sm:border-0 items-center pb-4 sm:pb-0',
        showMenu ? 'border-b-0' : 'border-b',
      ]}
    >
      <div class="flex flex-row">
        <div class="grow">
          <div class="p-2 my-2 ml-1">
            <SiteTitle />
          </div>
          <div class="p-1 sm:p-2">
            <DesktopNavbar />
          </div>
        </div>
        <div class="hidden md:block border-4 border-double border-neutral-400 p-2 mr-4 sm:mr-2">
          <img alt="" src={omsLogo} class="w-20" />
        </div>
      </div>
      <!-- Mobile Menu Button -->
      <div class="absolute right-2 sm:hidden">
        <button type="button" title="Menu" class="text-gray-800 p-1" onclick={toggleNavbar}>
          <HamburgerIcon />
        </button>
      </div>
    </div>
    <MobileNavbar toggleNavbar={toggleNavbar} showMenu={showMenu} />
  </div>
</header>
