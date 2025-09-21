<script lang="ts">
import { page } from '$app/stores'
import MainLayout from '$components/MainLayout.svelte'
import { site } from '$lib/constants'
export const msg = $page.error!.message
export const status = $page.status
</script>

<svelte:head>
  <title>{site.title} – {status} Error</title>
</svelte:head>

<MainLayout>
  <div class="flex flex-col min-h-screen justify-center items-center">
    <h1 class="text-6xl font-serif font-bold select-none">{status}</h1>
    <p class="text-xl font-serif font-semibold mt-2 pt-2">{msg}</p>
    <p class="mt-1 pt-1">Looks like something went wrong...</p>
    <p class="mt-2 pt-2"><a href="/">Click here to go back to the homepage</a></p>
  </div>
</MainLayout>
