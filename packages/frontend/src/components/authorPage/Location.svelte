<script lang="ts">
import { getCountryName, getFlagEmoji } from '$lib/helpers'
import type { FromLocation } from '$lib/sanity/types.generated'

interface Props {
  location: FromLocation
  // Locale determines the language the viewer sees the location in.
  locale?: string
}

let { location, locale = 'en-US' }: Props = $props()

let flagEmoji = $state<string | undefined>()
let countryName = $state<string | undefined>()
let regionName = $state<string | undefined>()
let cityName = $state<string | undefined>()

// svelte-ignore state_referenced_locally
if (location.country) {
  flagEmoji = getFlagEmoji(location.country)
  countryName = getCountryName(location.country, locale) ?? 'Somewhere in the world...'
}

// svelte-ignore state_referenced_locally
if (location.region) {
  regionName = location.region.trim()
}

// svelte-ignore state_referenced_locally
if (location.city) {
  cityName = location.city.trim()
}
</script>

<p>
  {#if countryName}
    {flagEmoji} {countryName}
  {/if}
  {#if regionName}
    ~
    {#if cityName}
      {cityName},
    {/if}
    {regionName}
  {/if}
</p>
