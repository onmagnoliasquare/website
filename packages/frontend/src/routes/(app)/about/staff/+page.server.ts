import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import createSiteTitle from '$lib/createSiteTitle';
import { getAllMembers } from '$lib/sanity';

export const load: PageServerLoad = (async () => {
	const title = 'Staff';
	const members = await getAllMembers();

	return {
		title,
		members
	};

	throw error(404, 'Not found');
}) satisfies PageServerLoad;
