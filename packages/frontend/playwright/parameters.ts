import type { testPage } from '$lib/types/testing'
import { site } from '$lib/constants'

// article404 is an article that shouldn't exist used for 404 page checks.
export const article404 = `/category/news/asdlkjafsjklfegnjkasjfaasldkjfj2093q580`

// Globals
export const authorUrl = `/about/staff/neo-alabastro`

export const v0_5_x_Article: testPage = {
  testDescription: 'v0.5.x',
  testDataPath: `../fixtures/v0.5.x/article.json`,
  testUrl: '/category/news/v05-article-feature-set--what-a-blast',
  article: {
    category: {
      _id: 'example',
      name: 'News',
      slug: 'news',
    },
    slug: 'v05-article-feature-set--what-a-blast',
    _id: '',
    _type: 'article',
    title: '',
    subtitle: null,
    date: '',
    updatedDate: null,
    authors: [],
    tags: null,
    series: null,
    media: null,
    metaInfo: null,
    content: [],
  },
}

export const v0_6_x_Article: testPage = {
  testDescription: 'v0.6.x',
  testDataPath: `../fixtures/v0.6.x/article.json`,
  testUrl: '/category/news/v06-features',
  article: {
    title: '',
    category: {
      _id: 'example',
      name: 'News',
      slug: 'news',
    },
    slug: 'v06-features',
    _id: '',
    _type: 'article',
    subtitle: null,
    date: '',
    updatedDate: null,
    authors: [],
    tags: null,
    series: null,
    media: null,
    metaInfo: null,
    content: [],
  },
}

export const articleTestDataList: Array<testPage> = [v0_5_x_Article, v0_6_x_Article]

const homePage: testPage = {
  testDescription: 'Homepage',
  testUrl: '/',
  testMetaInfo: {
    ogTitle: site.title,
  },
}

const staffPage: testPage = {
  testDescription: 'Staff page',
  testUrl: '/about/staff',
  testMetaInfo: {
    ogTitle: `Staff – ${site.title}`,
  },
}

const newsPage: testPage = {
  testDescription: 'News page',
  testUrl: '/category/news',
  testMetaInfo: {
    ogTitle: `News – ${site.title}`,
  },
}

const opinionPage: testPage = {
  testDescription: 'Opinion page',
  testUrl: '/category/opinion',
  testMetaInfo: {
    ogTitle: `Opinion – ${site.title}`,
  },
}

const peoplePage: testPage = {
  testDescription: 'People page',
  testUrl: '/category/people',
  testMetaInfo: {
    ogTitle: `People – ${site.title}`,
  },
}

const culturePage: testPage = {
  testDescription: 'Culture page',
  testUrl: '/category/culture',
  testMetaInfo: {
    ogTitle: `Culture – ${site.title}`,
  },
}

const multimediaPage: testPage = {
  testDescription: 'Multimedia page',
  testUrl: '/category/multimedia',
  testMetaInfo: {
    ogTitle: `Multimedia – ${site.title}`,
  },
}

const seriesPage: testPage = {
  testDescription: 'Series page',
  testUrl: '/series',
  testMetaInfo: {
    ogTitle: `Series – ${site.title}`,
  },
}

const archivePage: testPage = {
  testDescription: 'Archive page',
  testUrl: '/archive',
  testMetaInfo: {
    ogTitle: `Archive – ${site.title}`,
  },
}

const article404Page: testPage = {
  testDescription: 'Article 404 page',
  testUrl: article404,
  testMetaInfo: {
    ogTitle: `${site.title} – 404 Error`,
  },
}

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
  article404Page,
]
