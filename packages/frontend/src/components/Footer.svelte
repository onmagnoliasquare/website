<!--
@component
`Footer` is the footer component for the entire website.
-->

<script lang="ts">
import { footerRoutes, type route, routes } from '$lib/constants'
import VersionLabel from './general/VersionLabel.svelte'
import EmailClickable from '$components/EmailClickable.svelte'
import Logo from './general/Logo.svelte'
import SiteTitle from './archive/SiteTitle.svelte'
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
  class="mb-20 flex w-full flex-col items-baseline space-x-2 border-t border-dotted p-4 sm:mb-0 sm:flex-wrap sm:p-8">
  <div class="center flex w-full max-w-7xl flex-col items-center sm:block sm:flex-row">
    <div class="w-full">
      <div class="hidden sm:block">
        <a href="/" title="On Magnolia Square" class="w-full p-4">
          <Logo />
        </a>
      </div>
      <div class="block p-4 pl-0 sm:hidden">
        <SiteTitle />
      </div>
    </div>
    <div class="mb-8 hidden grid-rows-1 flex-col gap-1 space-y-6 p-2 sm:grid sm:grid-cols-3">
      <section>
        {@render Subheader('categories')}
        {@render navList(routes.slice(0, 5))}
      </section>
      <section>
        {@render Subheader('archive')}
        {@render navList([...routes.slice(5, 7), ...footerRoutes.slice(0, 2)])}
      </section>
      <section>
        {@render Subheader('info')}
        {@render navList(footerRoutes.slice(2))}
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
