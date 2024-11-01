import { error, type ServerLoadEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArticlesOfMember, getMember, type Article } from '$lib/sanity';

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
	const { name } = event.params;
	const member = await getMember(name as string);
	const articles: Article[] = await getArticlesOfMember(name as string);
	const title = member.name;

	if (member) {
		return {
			title,
			member,
			articles
		};
	}

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
