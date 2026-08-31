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
  class="sm:divide-x sm:border-b border-neutral-400 p-2 relative hidden sm:block"
>
  <ul class="list-none">
    {#each listOfRoutes as route}
      <li class="mr-2 pr-2 tracking-wide hidden sm:inline sm:border-r">
        <a href={route.path} title={route.name} class="hover:underline">
          {route.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
