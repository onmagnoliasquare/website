<script lang="ts">
	import { page } from '$app/stores';
	import { siteUrl } from '$lib/variables';

	/**
	 * SEO is a modified version of this code from Reddit:
	 * https://old.reddit.com/r/sveltejs/comments/1e1bcb6/how_you_guys_manage_metadataseo_in_svelte_kit/lcswtoq/
	 *
	 * SEO functionality like this component can also be
	 * achieved with https://github.com/oekazuma/svelte-meta-tags
	 * In the case in which we do switch to this library,
	 * we could still keep this code for backup or learning reasons.
	 */

	interface Props {
		title: string;
		description?: string;
		image?: string;
		currentSiteUrl?: string;
	}

	let {
		title,
		description,
		image = '/og-default-preview.png',
		currentSiteUrl = siteUrl
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og_site_name" content={`"${currentSiteUrl}"`} />
	<meta property="og:url" content={`${currentSiteUrl}${$page.url.pathname.toString()}`} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={currentSiteUrl} />
	<meta property="twitter:url" content={`${currentSiteUrl}${$page.url.pathname.toString()}`} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{@html `  <script type="application/ld+json">{
   "@context": "https://schema.org",
   "@type": "Website",
   "name": "${title}",
   "url": "${currentSiteUrl}${$page.url.pathname}",
   "logo": ${image}  }</script>`}
</svelte:head>
