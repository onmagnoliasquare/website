<script lang="ts">
import { routes } from '$lib/constants'
</script>

<nav id="mainNav" aria-label="Main navigation" class="max-w-2xl hidden center sm:block">
  <ul class="list-none flex flex-row border-neutral-700 border p-2">
    {#each routes as route (route.path)}
      <li class="tracking-wide grow text-neutral-700 hover:underline font-semibold center">
        <div class="w-fit center">
          <a href={route.path} title={route.name} class="hover:bg-amber-100">
            {route.name}
          </a>
        </div>
      </li>
    {/each}
  </ul>
</nav>
