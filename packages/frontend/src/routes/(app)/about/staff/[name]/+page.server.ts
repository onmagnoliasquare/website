import { dev } from '$app/environment';

export const csr = dev;

import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { filler, site } from '$lib/variables';
import type { Article, Member } from '$lib/schema';
import { createSiteTitle } from '$lib/helpers';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	// Get name from URL.
	const { name } = event.params;

	/**
	 * Execute queries.
	 *
	 * The two queries below can probably be combined into one query,
	 * where the second query is a sub query of the first. I haven't
	 * figured this out yet, though.
	 */

	const req = await event.fetch(`/api/member/${name}`);
	const member: Member | undefined = await req.json();

	/**
	 * Build page information.
	 */

	if (member) {
		// Attempt to retrieve the member's articles.
		const req = await event.fetch(`/api/member/${name}?articles=true`);
		const articles: Article[] = await req.json();

		const title = member.name;

		let ogTitle = createSiteTitle(site.name, `About ${member.name}`);
		let ogDescription = member.bio ? member.bio : `${title} ${filler.memberDescription}.`;

		if (member.metaInfo) {
			if (member.metaInfo.ogTitle) {
				ogTitle = member.metaInfo.ogTitle;
			}
			if (member.metaInfo) {
				if (member.metaInfo.ogTitle) {
					ogTitle = member.metaInfo.ogTitle;
				}

				if (member.metaInfo.ogDescription) {
					ogDescription = member.metaInfo.ogDescription;
				}
				if (member.metaInfo.ogDescription) {
					ogDescription = member.metaInfo.ogDescription;
				}

				if (member.metaInfo.ogImage) {
					// TODO
				}
			}
			if (member.metaInfo.ogImage) {
				// TODO
			}
		}

		const pageMetaTags = Object.freeze({
			title: createSiteTitle(`About ${member.name}`),
			description: ogDescription,
			openGraph: {
				type: 'profile',
				title: ogTitle,
				description: ogDescription
			},
			twitter: {
				title: ogTitle,
				description: ogDescription
			}
		}) satisfies MetaTagsProps;

		/**
		 * Return page data.
		 */

		/**
		 * Return page data.
		 */

		return {
			title,
			member,
			articles,
			pageMetaTags
		};
	}

	error(404, 'Member not found...');
}) satisfies PageServerLoad;
