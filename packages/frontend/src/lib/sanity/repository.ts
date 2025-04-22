import { db } from '$lib/database';
import type {
	DetailedArticleQueryResult,
	FetchDetailedArticleQueryResult,
	FetchHomepageArticleQueryResult,
	FetchScoredArticleQueryResults,
	HomepageArticleQueryResult,
	ScoredArticleQueryResults
} from '$lib/types/api';
import { articlePage, homepageArticles, relatedArticlesTypeA } from './queries';

export const fetchArticlePage = async (
	slug: string,
	category: string
): Promise<FetchDetailedArticleQueryResult> => {
	return db.fetch<DetailedArticleQueryResult>(articlePage(), { category, slug });
};

export const fetchRelatedArticles = async (
	params: {
		slug: string;
		authors: string[];
	},
	relatedBy: {
		title: string;
		date: string;
		content: string;
		categoryId: string;
		authors: string[];
	}
): Promise<FetchScoredArticleQueryResults> => {
	return db.fetch<ScoredArticleQueryResults>(relatedArticlesTypeA(), {
		...params,
		...relatedBy
	});
};

export const fetchHomepageArticles = async (): Promise<FetchHomepageArticleQueryResult> => {
	return db.fetch<HomepageArticleQueryResult>(homepageArticles());
};
