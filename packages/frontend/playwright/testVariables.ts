import type { articleTestData } from '$lib/types';

// article404 is an article that shouldn't exist used for 404 page checks.
export const article404 = `/category/news/asdlkjafsjklfegnjkasjfaasldkjfj2093q580`;

// Globals
export const authorUrl = `/about/staff/neo-alabastro`;

// v0.5.x
export const v05TestArticleUrl = `/category/news/v05-article-feature-set--what-a-blast`;
export const v05DummyDataPath = '../dummyData/v5/article.json';
export const v05Category = 'news';
export const v05Slug = 'v05-article-feature-set--what-a-blast';

// v0.6.x
export const v06TestArticleUrl = `/category/news/v06-features`;
export const v06DummyDataPath = `../dummyData/v6/article.json`;
export const v06Category = 'news';
export const v06Slug = `v06-features`;

export const v0_5Article: articleTestData = {
	title: 'v0.5.x',
	dataPath: `../dummyData/v0.5.x/article.json`,
	category: 'news',
	slug: 'v05-article-feature-set--what-a-blast',
	url: '/category/news/v05-article-feature-set--what-a-blast'
};

export const v0_6Article: articleTestData = {
	title: 'v0.6.x',
	dataPath: `../dummyData/v0.6.x/article.json`,
	category: 'news',
	slug: 'v06-features',
	url: '/category/news/v06-features'
};

export const articleTestDataList: Array<articleTestData> = [v0_5Article];
