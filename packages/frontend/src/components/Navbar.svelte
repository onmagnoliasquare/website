<script lang="ts">
	import { onMount } from 'svelte';
	import Moon from "../lib/icons/moon.svelte";
  	import Sun from "../lib/icons/sun.svelte";

	let currentTheme = "";

	onMount(() => {
		currentTheme = document.documentElement.dataset.theme;
		// const userPrefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

		// const hasUserSetDarkModeManually = document.documentElement.dataset.theme == "dark";

		// if (!hasUserSetDarkModeManually) {
		// 	setTheme(userPrefersDarkMode ? "dark" : "light");
		// }
	});

	const setTheme = (theme) => {
		document.documentElement.dataset.theme = theme;
		document.cookie = `siteTheme=${theme};max-age=31536000;path="/"`;
		currentTheme = theme;
	};
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/category/news">News</a></li>
		<li><a href="/category/opinion">Opinion</a></li>
		<li><a href="/category/people">People</a></li>
		<li><a href="/category/culture">Culture</a></li>
		<li><a href="/category/professors">Professors</a></li>
		<li><a href="/category/multimedia">Multimedia</a></li>
		<li><a href="/series">Series</a></li>
		<li><a href="/tags">Tags</a></li>
		<li><a href="/about">About</a></li>
		<li class="relative">
			{#if currentTheme == "light"}
			  <a class="moon" href={"#"} on:click={() => setTheme("dark")}>
				<Moon />
			  </a>
			{:else}
			  <a class="sun" href={"#"} on:click={() => setTheme("light")}>
				<Sun />
			  </a>
			{/if}
		  </li>
	</ul>
	<form id="form">
		<input
			type="search"
			id="query"
			name="q"
			placeholder="Search..."
			aria-label="Search through site content"
		/>
		<button>Search</button>
	</form>
</nav>

<style>
	nav,
	ul,
	li,
	form {
		display: inline;
	}
</style>
