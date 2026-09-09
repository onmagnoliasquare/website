<!--
@component
`MobileNavbar` is the mobile navbar for the site.
-->

<script lang="ts">
import { routes } from '$lib/constants'
let listOfRoutes = routes
interface Props {
  toggleNavbar: () => void
  showMenu: boolean
}
let { toggleNavbar, showMenu }: Props = $props()
</script>

<nav aria-label="Mobile Site Menu">
  <ul
    class="w-full list-none flex-col space-y-4 sm:hidden md:mt-8 md:space-y-0 {showMenu
      ? 'mt-4 overscroll-contain border-b pb-4'
      : 'hidden'}">
    {#each listOfRoutes as route}
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <li
        onclick={() => {
          toggleNavbar()
        }}
        class="ml-2 w-fit pl-2 tracking-wide hover:underline">
        <a href={route.path} title={route.name} class="hover:underline">
          {route.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
