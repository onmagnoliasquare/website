import type { testPage } from '$lib/types';
import { site } from '$lib/variables';

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

export const v0_5_x_Article: testPage = {
	testDescription: 'v0.5.x',
	testDataPath: `../dummyData/v0.5.x/article.json`,
	testUrl: '/category/news/v05-article-feature-set--what-a-blast',
	article: {
		title: '',
		category: {
			_type: 'category',
			_createdAt: '',
			name: 'News',
			slug: {
				_type: 'slug',
				current: 'news'
			},
			description: '',
			metaInfo: {}
		},
		slug: {
			_type: 'slug',
			current: 'v05-article-feature-set--what-a-blast'
		},
		_id: '',
		_type: 'article',
		_createdAt: '',
		updatedDate: '',
		subtitle: '',
		date: '',
		tags: [],
		authors: [],
		metaInfo: {},
		error: {
			message: '',
			status: 0
		}
	}
};

export const v0_6_x_Article: testPage = {
	testDescription: 'v0.6.x',
	testDataPath: `../dummyData/v0.6.x/article.json`,
	testUrl: '/category/news/v06-features',
	article: {
		title: '',
		category: {
			_type: 'category',
			_createdAt: '',
			name: 'News',
			slug: {
				_type: 'slug',
				current: 'news'
			},
			description: '',
			metaInfo: {}
		},
		slug: {
			_type: 'slug',
			current: 'v06-features'
		},
		_id: '',
		_type: 'article',
		_createdAt: '',
		updatedDate: '',
		subtitle: '',
		date: '',
		tags: [],
		authors: [],
		metaInfo: {},
		error: {
			message: '',
			status: 0
		}
	}
};

export const articleTestDataList: Array<testPage> = [v0_5_x_Article];

const homePage: testPage = {
	testDescription: 'Homepage',
	testUrl: '/',
	testMetaInfo: {
		ogTitle: site.title
	}
};

const staffPage: testPage = {
	testDescription: 'Staff page',
	testUrl: '/about/staff',
	testMetaInfo: {
		ogTitle: `Staff – ${site.title}`
	}
};

const newsPage: testPage = {
	testDescription: 'News page',
	testUrl: '/category/news',
	testMetaInfo: {
		ogTitle: `News – ${site.title}`
	}
};

const opinionPage: testPage = {
	testDescription: 'Opinion page',
	testUrl: '/category/opinion',
	testMetaInfo: {
		ogTitle: `Opinion – ${site.title}`
	}
};

const peoplePage: testPage = {
	testDescription: 'People page',
	testUrl: '/category/people',
	testMetaInfo: {
		ogTitle: `People – ${site.title}`
	}
};

const culturePage: testPage = {
	testDescription: 'Culture page',
	testUrl: '/category/culture',
	testMetaInfo: {
		ogTitle: `Culture – ${site.title}`
	}
};

const multimediaPage: testPage = {
	testDescription: 'Multimedia page',
	testUrl: '/category/multimedia',
	testMetaInfo: {
		ogTitle: `Multimedia – ${site.title}`
	}
};

const seriesPage: testPage = {
	testDescription: 'Series page',
	testUrl: '/series',
	testMetaInfo: {
		ogTitle: `Series – ${site.title}`
	}
};

const archivePage: testPage = {
	testDescription: 'Archive page',
	testUrl: '/archive',
	testMetaInfo: {
		ogTitle: `Archive – ${site.title}`
	}
};

const article404Page: testPage = {
	testDescription: 'Article 404 page',
	testUrl: article404,
	testMetaInfo: {
		ogTitle: `${site.title} – 404 Error`
	}
};

export const pages: Array<testPage> = [
	homePage,
	staffPage,
	newsPage,
	opinionPage,
	peoplePage,
	culturePage,
	multimediaPage,
	seriesPage,
	archivePage,
	article404Page
];
