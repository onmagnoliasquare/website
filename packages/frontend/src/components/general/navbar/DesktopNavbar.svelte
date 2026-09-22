<!--
@component
`DesktopNavbar` is the desktop navbar component for the entire website.
-->

<script lang="ts">
import NavItems from './NavItems.svelte'
import SearchBar from './SearchBar.svelte'
</script>

<div class="relative hidden flex-row items-center space-x-1 border-b sm:flex">
  <NavItems />
  <SearchBar />
</div>
