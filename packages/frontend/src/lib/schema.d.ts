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
	name: string;
	year?: number;
	netid?: string;
	bio?: string;
	portrait?: CustomImageAsset;
	slug: Slug;
	from: From;
	handles: Handles;
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
	_type: 'category';
	_createdAt: string;
	name: string;
	slug: Slug;
	description: string;
	useCustomCss?: boolean;
	metaInfo: MetaInfo;
}

export interface Article {
	_type: 'post';
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
	series: Series;
	category: Category;
	tags: Tag[];
	authors: Member[];
	content: PortableTextBlock[];
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
	media: Image;

	/**
	 * HeaderImage exists because ImageAsset, for some reason,
	 * does not have an `altText` attribute. Hopefully, in
	 * the future, it receives one. For now, this must be
	 * implemented.
	 */
	headerImage: CustomImageAsset;

	metaInfo: MetaInfo;
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
	title?: string;
	description?: string;
	alt: string;
}
