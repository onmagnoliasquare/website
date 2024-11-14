import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { buildSanityQuery, equal, sanityFetch } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { filler, site } from '$lib/variables';
import type { Article, Member } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	let sanityQuery: string;

	// Get name from URL.
	const { name } = event.params;

	/**
	 * Execute queries.
	 *
	 * The two queries below can probably be combined into one query,
	 * where the second query is a sub query of the first. I haven't
	 * figured this out yet, though.
	 */

	sanityQuery = buildSanityQuery({
		type: 'member',
		conditions: [`&& ${equal('slug.current', name as string)}`],
		idx: [0],
		attributes: ['name', 'year', 'bio', 'handles', 'portrait', 'from']
	});

	const member: Member = await sanityFetch(sanityQuery);

	sanityQuery = buildSanityQuery({
		type: 'article',
		conditions: [
			`&& references(*[${equal('_type', 'member')} && ${equal('slug.current', name as string)}]._id)`
		],
		attributes: ['title', 'subtitle', 'date', 'slug', 'media'],
		customAttrs: ['authors[]->{name}', 'category->'],
		order: 'date desc'
	});

	const articles: Article[] = await sanityFetch(sanityQuery);

	/**
	 * Build page information.
	 */

	const title = member.name;

	let ogTitle = `About ${title} at ${site.title}`;
	let ogDescription = member.bio ? member.bio : `${title} ${filler.memberDescription}.`;

	if (member.metaInfo) {
		if (member.metaInfo.ogTitle) {
			ogTitle = member.metaInfo.ogTitle;
		}

		if (member.metaInfo.ogDescription) {
			ogDescription = member.metaInfo.ogDescription;
		}

		if (member.metaInfo.ogImage) {
			// TODO
		}
	}

	const pageMetaTags = Object.freeze({
		title: `About ${member.name} at ${site.title}`,
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

	if (member) {
		return {
			title,
			member,
			articles,
			pageMetaTags
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
