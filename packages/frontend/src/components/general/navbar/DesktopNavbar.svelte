<!--
@component
`DesktopNavbar` is the desktop navbar component for the entire website.
-->

<script lang="ts">
import NavItems from '#components/general/navbar/NavItems.svelte'
import SearchBar from '#components/general/navbar/SearchBar.svelte'
</script>

<div class="relative hidden flex-row items-center space-x-1 border-b sm:flex">
  <NavItems />
  <SearchBar class="text-xs" />
</div>
