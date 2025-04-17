import { db } from '$lib/database';
import type {
	DetailedArticleQueryResult,
	FetchDetailedArticleQueryResult,
	FetchScoredArticleQueryResults,
	ScoredArticleQueryResults
} from '$lib/types/api';
import { articlePage, relatedArticlesTypeA } from './queries';

export const fetchArticlePage = async (
	slug: string,
	category: string
): Promise<FetchDetailedArticleQueryResult> => {
	const result = db.fetch<DetailedArticleQueryResult>(articlePage(), { category, slug });
	return result;
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
	// const result = client.fetch<ScoredArticleQueryResults>(relatedArticlesTypeA(), { ...relatedBy });

	const result = db.fetch<ScoredArticleQueryResults>(relatedArticlesTypeA(), {
		...params,
		...relatedBy
	});
	return result;
};
