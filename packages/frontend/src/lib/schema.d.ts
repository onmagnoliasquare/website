import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';

/**
 * This file mirrors the sanity schema types in the backend. These types
 * can be found in `packages/backend` of this repository. These are purely for
 * type inference and assertion.
 *
 * For some light reading to understand `.d.ts` files, checkout:
 * https://stackoverflow.com/a/21247316/20087581
 */

export interface Member {
	_type: 'member';
	_id: string;
	name: string;
	year?: number;
	netid?: string;
	bio?: string;

	// portrait is used to resolve an image asset to a URL.
	portrait?: CustomImageAsset;

	// asset contains portrait related metadata.
	asset?: { metadata: ImageMetadata };

	slug: Slug;
	from?: From;
	committee?: Committee;
	handles?: Handles;
	metaInfo: MetaInfo;
}

export interface From {
	country?: string;
	city?: string;
	region?: string;
}

export interface Handles {
	instagram?: string;
	facebook?: string;
	linkedin?: string;
	twitter?: string;
	github?: string;
	website?: string;
}

export interface Tag {
	_type: 'tag';
	_createdAt: string;
	name: string;
	slug: Slug;
	description: string;
	useCustomCss?: boolean;
	metaInfo: MetaInfo;
}

export interface Series {
	_type: 'series';
	_createdAt: string;
	name: string;
	slug: Slug;
	description: string;
	useCustomCss?: boolean;
	metaInfo: MetaInfo;
}

export interface Category {
	_id: string;
	_type: 'category';
	_createdAt: string;
	name: string;
	slug: Slug;
	description: string;
	useCustomCss?: boolean;
	metaInfo: MetaInfo;
}

export interface Committee {
	_type: 'committee';
	_createdAt: string;
	name: string;
	slug: Slug;
	description: string;
	useCustomCss?: boolean;
	metaInfo: MetaInfo;
}
export interface Article {
	_id: string;
	_type: 'article';
	_score: number;
	_createdAt: string;

	// This is for when the author gets to choose
	// the updated time for something, in case
	// the time when something is updated is a necessary
	// addition to the article, especially for live
	// news. If that's a thing for us.
	//
	// See `sanity.ts` in packages/backend for more info.
	updatedDate: string;

	title: string;
	subtitle: string;
	abstract?: string;
	date: string;
	slug: Slug;
	series?: Series;
	category: Category;
	tags: Tag[];
	authors: Member[];
	content?: PortableTextBlock[];
	// content: PortableTextComponents[];

	// headerImage and media both refer to the topmost
	// image on an article. headerImage is queried in its
	// own attribute because we need to obtain the
	// `altText`, as well as the `creditLine`, both of
	// which are not present in the sanity `ImageBuilder`
	// package. Which is annoying. Therefore, the `ImageBuilder`
	// takes the `media` attribute in the function
	// signature, and the `altText` is retrieved from
	// the headerImage attribute.
	media?: Image;

	/**
	 * asset exists because ImageAsset, for some reason,
	 * does not have an `altText` attribute. Hopefully, in
	 * the future, it receives one. For now, this must be
	 * implemented.
	 */
	asset?: CustomImageAsset;

	metaInfo: MetaInfo;
	error: ApiError;

	related?: Article[];
}

export interface EmbeddedLink {
	_type: string;
	_key: string;
	contentUrl: string;
}

export interface MetaInfo {
	ogTitle?: string;
	ogTags?: string[];
	ogDescription?: string;
	ogImage?: CustomImageAsset;
}

export interface CustomImageAsset extends ImageAsset {
	alt: string;
}

export interface Image {
	_type: string;
	asset: {
		_ref: string;
		_type: string;
	};
	metadata?: ImageMetadata;
	title?: string;
	description?: string;
	alt: string;
}

export interface ImageMetadata {
	hasAlpha?: boolean;
	lqip?: string;
	isOpaque?: boolean;
	blurHash?: string;
	dimensions?: ImageDimensions;
}

export interface ImageDimensions {
	_type?: string;
	width: number;
	height: number;
	aspectRatio: number;
}

type operators = '==' | '!==';

type equatable = {
	leftSide: string;
	rightSide: string;
	operator: operators;
};

type validQueryableTypes = {
	article: (keyof Article)[];
	member: (keyof Member)[];
	category: (keyof Category)[];
	series: (keyof Series)[];
	tag: (keyof Tag)[];
};

export type SanityQuery<T extends keyof validQueryableTypes> = {
	/**
	 * `type` defines a custom schema type to query for. This is optional
	 * because we may need to construct a query which returns an entire
	 * dataset, like `*[]`, which has no `_type` required.
	 */
	type?: T;

	/**
	 * `attributes` are the default attributes on our
	 * schema types.
	 */
	attributes?: validQueryableTypes[T];

	/**
	 * `customAttrs` are non-default schema attributes. This allows custom
	 * sub-querying or reference following. **DO NOT** put default attributes
	 * in this field.
	 */
	customAttrs?: string[];

	/**
	 * `conditions` are boolean expressions slotted into the initial square
	 * brackets of a query. These filter the dataset according to the
	 * expressions.
	 */
	conditions?: string[];

	/**
	 * `idx` is to access the index of the returned data from a query. Sanity
	 * queries are returned in array format. The first two elements of the array
	 * are the only valid elements. More elements are ignored.
	 *
	 * The first element is the start of a range. The second element is the
	 * end of a range. The first element is required.
	 */
	idx?: number[];

	/**
	 * `order` defines the order in which to receive the data. This is a groq
	 * feature.
	 */
	order?: string;

	/**
	 * `function` is the Sanity GROQ function that wraps the entire query
	 * expression.
	 */
	function?: 'count' | 'round' | 'defined' | 'references';

	/**
	 * `outer` is the outer selection of the square brackets. It starts
	 * with a `.`. The selection is an attribute.
	 */
	outer?: string;
};

/**
 * queryConditions is either an array of conditions or the string literal
 * 'attrs'. If the array is empty, this means conditions are `*[]`. If
 * 'attrs' is used, no conditional square brackets will be used.
 */
type queryConditions = string[] | 'attrs';

/**
 * Query represents a valid Sanity query according to our schema defined
 * in `schema.d.ts`.
 */
export type Query =
	| SanityQuery<'article'>
	| SanityQuery<'member'>
	| SanityQuery<'category'>
	| SanityQuery<'series'>
	| SanityQuery<'tag'>;

export type ApiError = {
	message: string;
	status: number;
};

/**
 * Pages
 */

export interface ArchivePageStatistics {
	categoryCount: categoryCount;
}

export interface categoryCount {
	news: number;
	opinion: number;
	culture: number;
	people: number;
	multimedia: number;
}
