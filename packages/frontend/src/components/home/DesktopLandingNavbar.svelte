<script lang="ts">
import { routes } from '$lib/constants'
</script>

<nav id="mainNav" aria-label="Main navigation" class="center hidden max-w-2xl sm:block">
  <ul class="flex list-none flex-row border border-neutral-700 p-2">
    {#each routes as route (route.path)}
      <li class="center grow font-semibold tracking-wide text-neutral-700 hover:underline">
        <div class="center w-fit">
          <a href={route.path} title={route.name} class="hover:bg-amber-100">
            {route.name}
          </a>
        </div>
      </li>
    {/each}
  </ul>
</nav>
