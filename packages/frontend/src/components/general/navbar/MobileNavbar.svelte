<!--
@component
`MobileNavbar` is the mobile navbar for the site.
-->

<script lang="ts">
import { routes } from '$lib/constants'
let listOfRoutes = routes
interface Props {
  showMenu: boolean
}
let { showMenu }: Props = $props()
</script>

<nav
  aria-label="Mobile Site Menu"
  class="w-full list-none flex-col space-y-4 sm:hidden md:mt-8 md:space-y-0 {showMenu
    ? 'mt-4 overscroll-contain border-b pb-4'
    : 'hidden'}">
  <ul>
    {#each listOfRoutes as route}
      <li class="ml-2 w-fit pl-2 tracking-wide hover:underline">
        <a href={route.path} title={route.name} class="hover:underline">
          {route.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
