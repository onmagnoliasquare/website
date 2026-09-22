<script lang="ts">
import { routes } from '$lib/constants'
import MobileSearchBar from './MobileSearchBar.svelte'
let listOfRoutes = routes
interface Props {
  showMenu: boolean
  withSearch?: boolean
}

const { showMenu, withSearch = false }: Props = $props()
</script>

{#if showMenu}
  <nav aria-label="Mobile Site Menu" class="flex flex-row items-center">
    <ul
      class="xs:text-xl h-fit list-none flex-col space-y-6 text-lg sm:hidden md:mt-8 md:space-y-0">
      <li class="ml-2 w-fit pl-2 font-medium tracking-wide">
        <a href="/" title="Home">Home</a>
      </li>
      {#each listOfRoutes as route}
        <li class="ml-2 w-fit pl-2 font-medium tracking-wide">
          <a href={route.path} title={route.name}>
            {route.name}
          </a>
        </li>
      {/each}
      {#if withSearch}
        <li class="ml-2 w-full pl-2 tracking-wide">
          <MobileSearchBar />
        </li>
      {/if}
    </ul>
  </nav>
{/if}
