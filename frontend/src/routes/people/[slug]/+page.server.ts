import {type Article, getArticle} from "$lib/sanity";
import {error, type ServerLoadEvent} from "@sveltejs/kit";
import type {PageServerLoad} from "../../../../.svelte-kit/types/src/routes/$types";

export const load: PageServerLoad = (async (event: ServerLoadEvent) => {
    const { slug } = event.params
    const article: Article = await getArticle(slug as string);

    if (article) {
        return {
            article
        };
    }

    throw error(404, 'Not found');
}) satisfies PageServerLoad;
