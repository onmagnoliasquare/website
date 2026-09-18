<script lang="ts">
import { routes } from '$lib/constants'
</script>

<nav id="mainNav" aria-label="Site Menu" class="min-w-0">
  <ul class="list-none">
    {#each routes as route}
      <li class="hidden pr-3 text-sm font-medium tracking-wide sm:inline md:text-base">
        <a href={route.path} title={route.name} class="hover:underline">
          {route.name}
        </a>
      </li>
    {/each}
  </ul>
</nav>
