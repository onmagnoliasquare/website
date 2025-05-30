import type { Category, Image, Member, MetaInfo, Series, Tag } from '$lib/schema';
import type { PortableTextBlock } from '@portabletext/types';
import type { Slug } from '@sanity/types';

export type BasicArticleQueryResult = {
	_id: string;
	title: string;
	subtitle: string;
	authors: Member[];
	slug: Slug;
	date: string;
	category: Category;
	media?: Image;
};

export type FetchBasicArticleQueryResult = BasicArticleQueryResult;

export type BasicArticleQueryResults = BasicArticleQueryResult[];

export type FetchBasicArticleQueryResults = BasicArticleQueryResults;

export type DetailedArticleQueryResult = BasicArticleQueryResult & {
	updatedDate?: string;
	content?: PortableTextBlock[];
	tags?: Tag[];
	series?: Series;
	metaInfo?: MetaInfo;
};

export type FetchDetailedArticleQueryResult = DetailedArticleQueryResult;

export type ScoredArticleQueryResult = BasicArticleQueryResult & {
	_score: number;
};

export type FetchScoredArticleQueryResult = ScoredArticleQueryResult;

export type ScoredArticleQueryResults = ScoredArticleQueryResult[];

export type FetchScoredArticleQueryResults = ScoredArticleQueryResults;

export type HomepageArticleQueryResult = BasicArticleQueryResults;

export type FetchHomepageArticleQueryResult = HomepageArticleQueryResult;
