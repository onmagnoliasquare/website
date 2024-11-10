import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArticlesOfMember, getMember, type Article } from '$lib/sanity';
import type { MetaTagsProps } from 'svelte-meta-tags';
import { filler, site } from '$lib/variables';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { name } = event.params;
	const member = await getMember(name as string);
	const articles: Article[] = await getArticlesOfMember(name as string);
	const title = member.name;

	const ogDescription = member.bio ? member.bio : `${title} ${filler.memberDescription}.`;

	const pageMetaTags = Object.freeze({
		title: `About ${member.name} at ${site.title}`,
		description: ogDescription,
		openGraph: {
			type: 'profile',
			title: `About ${title} at ${site.title}`,
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
