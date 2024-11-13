import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArticlesOfMember, getMember } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { filler, site } from '$lib/variables';
import type { Article } from '$lib/schema';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { name } = event.params;
	const member = await getMember(name as string);
	const articles: Article[] = await getArticlesOfMember(name as string);
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
