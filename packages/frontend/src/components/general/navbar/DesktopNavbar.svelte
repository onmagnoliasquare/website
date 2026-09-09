<!--
@component
`DesktopNavbar` is the desktop navbar component for the entire website.
-->

<script lang="ts">
import { routes } from '$lib/constants'
let listOfRoutes = routes
</script>

<nav
  id="mainNav"
  aria-label="Site Menu"
  class="relative hidden border-neutral-400 p-2 sm:block sm:divide-x sm:border-b">
  <ul class="list-none">
    {#each listOfRoutes as route}
      <li class="mr-2 hidden pr-2 tracking-wide sm:inline sm:border-r">
        <a href={route.path} title={route.name} class="hover:underline">
          {route.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
