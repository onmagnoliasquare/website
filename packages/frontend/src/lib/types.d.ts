// Types related to code, not data.

import type { Article, MetaInfo } from './schema';

/**
 * `testArticle` type defines a test article. The word "test" here is used
 * as a noun, not a verb.
 */
export interface testPage {
	testDescription: string;
	testDataPath?: string;
	testUrl: string;
	testMetaInfo?: MetaInfo;

	article?: Article;
}
