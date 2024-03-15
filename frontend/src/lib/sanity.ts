import type { PortableTextBlock } from '@portabletext/types';
import { SanityClient, createClient } from '@sanity/client';
import type { ImageAsset, Slug } from '@sanity/types';
import groq from 'groq';

import {
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_DEVELOPER_TOKEN
} from '$env/static/public';

if (!PUBLIC_SANITY_PROJECT_ID || !PUBLIC_SANITY_DATASET) {
	throw new Error('Did you forget to run yarn sanity init --env?');
}

let client: SanityClient;

/**
 * Depending on the environment, either use or don't use the DEVELOPER token.
 */
if (PUBLIC_SANITY_DATASET == 'production') {
	client = createClient({
		projectId: PUBLIC_SANITY_PROJECT_ID,
		dataset: PUBLIC_SANITY_DATASET,
		useCdn: true,
		apiVersion: '2024-03-15'
	});
} else {
	client = createClient({
		projectId: PUBLIC_SANITY_PROJECT_ID,
		dataset: PUBLIC_SANITY_DATASET,
		useCdn: true,
		apiVersion: '2024-03-15',
		token: PUBLIC_DEVELOPER_TOKEN // A token field is required to access private datasets.
	});
}

export { client };

export async function getArticles(): Promise<Article[]> {
	return await client.fetch(groq`*[_type == "article"] | order(_createdAt desc)`);
}

export async function getArticle(slug: string): Promise<Article> {
	return await client.fetch(groq`*[_type == "article" && slug.current == $slug][0]`, {
		slug
	});
}

export interface Author {
	_type: 'member';
	name: string;
	year: number;
	netid: string;
	bio: string;
	portrait: ImageAsset;
}

export interface Article {
	_type: 'post';
	_createdAt: string;
	title: string;
	subtitle: string;
	abstract?: string;
	date: string;
	slug: Slug;
	mainImage?: ImageAsset;
	authors: Author[];
	content: PortableTextBlock[];
}
