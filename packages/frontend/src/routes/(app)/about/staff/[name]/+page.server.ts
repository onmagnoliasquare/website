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

	const ogDescription = member.bio ? member.bio : `${title} ${filler.memberDescription}.`;

	const ogTitle = `About ${title} at ${site.title}`;

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
