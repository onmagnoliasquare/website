import type { Article, MetaInfo } from '../schema';

/**
 * `testPage` type defines a testing page for playwright. The word "test" here is used
 * as a noun, not a verb.
 */
export interface testPage {
	testDescription: string;
	testDataPath?: string;
	testUrl: string;
	testMetaInfo?: MetaInfo;

	article?: Article;
}
