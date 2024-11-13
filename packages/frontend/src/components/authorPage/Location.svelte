<script lang="ts">
	import { getCountryName, getFlagEmoji } from '$lib/helpers';
	import type { From } from '$lib/schema';

	interface Props {
		location: From;
		// Locale determines the language the viewer sees the location in.
		locale?: string;
	}

	let { location, locale = 'en-US' }: Props = $props();

	let flagEmoji: string | undefined = $state();
	let countryName: string | undefined = $state();
	let regionName: string | undefined = $state();
	let cityName: string | undefined = $state();

	if (location.country) {
		flagEmoji = getFlagEmoji(location.country);
		countryName = getCountryName(location.country, locale) as string;
	}

	if (location.region) {
		regionName = location.region.trim();
	}

	if (location.city) {
		cityName = location.city.trim();
	}
</script>

<p class="tracked-02 pa0 ma0 f6">
	{#if countryName}
		{flagEmoji}&nbsp;{countryName}
	{/if}
	{#if regionName}
		~
		{#if cityName}
			{cityName},
		{/if}
		{regionName}
	{/if}
</p>
