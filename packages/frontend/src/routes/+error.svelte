<script lang="ts">
import { page } from '$app/state'
import MainLayout from '$components/MainLayout.svelte'
import { site } from '$lib/constants'

let msg = page.error?.message
let status = page.status
</script>

<svelte:head>
  <title>{site.title} – {status} Error</title>
</svelte:head>

<MainLayout>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <h1 class="font-serif text-6xl font-bold select-none">{status}</h1>
    <p class="mt-2 pt-2 font-serif text-xl font-semibold">{msg}</p>
    <p class="mt-1 pt-1">Looks like something went wrong...</p>
    <p class="mt-2 pt-2"><a href="/">Click here to go back to the homepage</a></p>
  </div>
</MainLayout>
