<!--
@component
`Footer` is the footer component for the entire website.
-->

<script lang="ts">
import { footerRoutes, type route, routes, site } from '$lib/constants'
import VersionLabel from './general/VersionLabel.svelte'
import EmailClickable from '$components/EmailClickable.svelte'
</script>

{#snippet navList(r: route[])}
  <ul class="flex flex-col space-x-2">
    {#each r as route (route.path)}
      <li class="mb-1 w-full">
        <a
          href={route.path}
          title={route.name}
          class="font-semibold tracking-wider hover:underline">
          <small>
            {route.name}
          </small>
        </a>
      </li>
    {/each}
  </ul>
{/snippet}

{#snippet Subheader(title: string)}
  <h2 class="mb-2 text-sm font-black tracking-wider">{title}</h2>
{/snippet}

<!-- eslint-disable @typescript-eslint/no-confusing-void-expression -->
<footer
  class="flex w-full flex-col items-baseline space-x-2 border-t border-dotted p-4 sm:flex-wrap sm:p-8">
  <div class="center w-full max-w-7xl">
    <h1 class="mb-6 w-fit border p-2 font-black tracking-wide">
      <a href="/">
        {site.name.toLowerCase()}
      </a>
    </h1>
    <div class="mb-8 flex grid-rows-1 flex-col gap-1 space-y-6 p-2 sm:grid sm:grid-cols-3">
      <section>
        {@render Subheader('categories')}
        {@render navList(routes.slice(0, 5))}
      </section>
      <section>
        {@render Subheader('archive')}
        {@render navList([...routes.slice(5, 7), footerRoutes[0]])}
      </section>
      <section>
        {@render Subheader('info')}
        {@render navList(footerRoutes.slice(1))}
      </section>
    </div>
    <div class="w-full">
      <div class="w-1/2 font-serif text-sm">
        <address>
          Email us:
          <EmailClickable />
        </address>
      </div>
    </div>
    <div class="center inline w-full">
      <div class="justify-left flex flex-row-reverse items-center pr-1">
        <VersionLabel />
      </div>
    </div>
  </div>
</footer>
