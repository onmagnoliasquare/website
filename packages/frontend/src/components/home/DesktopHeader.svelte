<style>

#quip {
  /* font-family: var(--font-serif); */
  /* font-size: clamp(0.263rem, 1vw + 1rem, 3.737rem); */
  /* line-height: clamp(0.263rem, 1vw + 1rem, 3.737rem); */
  font-variation-settings:
    'wdth' 100,
    'wght' 280,
    'opsz' auto,
    'GRAD' 100;
}
</style>

<script lang="ts">
import DesktopLandingNavbar from './DesktopLandingNavbar.svelte'
import omsLogo from '$lib/assets/oms_logo.png'
import ChineseHeaderName from './ChineseHeaderName.svelte'
import SiteTitle from './SiteTitle.svelte'
</script>

<div class="h-fit grid grid-rows-1 grid-cols-7">
  <div class="col-span-2 col-start-2 p-2">
	  <SiteTitle />
  </div>
  <div class="p-3">
    <img alt="" class="size-fit py-2 m-2" src={omsLogo} />
  </div>
  <div class="col-span-1 col-start-6">
    <ChineseHeaderName />
  </div>
	<div class="col-span-5">
		<DesktopLandingNavbar />
	</div>
</div>
