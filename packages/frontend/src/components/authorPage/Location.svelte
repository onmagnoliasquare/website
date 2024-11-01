<script lang="ts">
	import { getCountryName, getFlagEmoji } from '$lib/helpers';
	import type { From } from '$lib/sanity';

	export let location: From;

	// Locale determines the language the viewer sees the location in.
	export let locale: string = 'en-US';

	let flagEmoji: string;
	let countryName: string;
	let regionName: string;
	let cityName: string;

	if (location.country) {
		flagEmoji = getFlagEmoji(location.country);
		countryName = getCountryName(location.country, locale) as string;
	}

	if (location.region) {
		regionName = location.region;
	}

	if (location.city) {
		cityName = location.city;
	}
</script>

<p class="tracked-02 pa0 ma0 f6">
	{#if countryName}
		{flagEmoji}&nbsp;{countryName}
	{/if}
	{#if regionName}
		—
		{#if cityName}
			{cityName},
		{/if}
		{regionName}
	{/if}
</p>
