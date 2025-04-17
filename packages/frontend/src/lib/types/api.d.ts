import type { Category, CustomImageAsset, Member, MetaInfo, Series, Tag } from '$lib/schema';
import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';

export type BasicArticleQueryResult = {
	_id: string;
	title: string;
	subtitle: string;
	authors: Member[];
	slug: Slug;
	date: string;
	category: Category;
	media: CustomImageAsset;
};

export type FetchBasicArticleQueryResult = BasicArticleQueryResult;

export type BasicArticleQueryResults = BasicArticleQueryResult[];

export type FetchBasicArticleQueryResults = BasicArticleQueryResults;

export type DetailedArticleQueryResult = BasicArticleQueryResult & {
	updatedDate: string;
	asset: ImageAsset;
	content?: PortableTextBlock[];
	tags: Tag[];
	series: Series;
	metaInfo: MetaInfo;
};

export type FetchDetailedArticleQueryResult = DetailedArticleQueryResult;

export type ScoredArticleQueryResult = BasicArticleQueryResult & {
	_score: number;
};

export type FetchScoredArticleQueryResult = ScoredArticleQueryResult;

export type ScoredArticleQueryResults = ScoredArticleQueryResult[];

export type FetchScoredArticleQueryResults = ScoredArticleQueryResults;
