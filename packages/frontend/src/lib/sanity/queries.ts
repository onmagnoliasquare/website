/**
 * Queries in this file do not need to be "real"; you can make dummy queries
 * to generate types for the Sanity API.
 */

import { defineQuery } from 'groq'

const basicMetadata = /* GROQ */ `
	_id,
	_type
`

const essentialQueryData = /* GROQ */ `
	_id,
	name,
	"slug": slug.current
`

export const maybeAllMembersQuery = defineQuery(`
	*[_type == "member"] | order(lower(name) asc) {
		${essentialQueryData},
		bio
	}
`)

export const maybeMemberQuery = defineQuery(`
	*[_type == "member" && _id == $id] {
		${essentialQueryData}
	}[0]
`)

const memberQueryData = /* GROQ */ `
	year,
	bio,
	handles,
	from,
	portrait { ..., asset-> },
	committee->{ name }
`

export const maybeMemberPageQuery = defineQuery(`
	*[_type == "member" && slug.current == $slug] {
		${essentialQueryData},
		${memberQueryData},
		metaInfo
	}[0]
`)

/**
 * This does not include content written in the article.
 */
const basicPostData = /* GROQ */ `
	title,
	"slug": slug.current,
	subtitle,
	date,
	updatedDate,
	authors[]->{ ${essentialQueryData} },
	tags[]->{ ${essentialQueryData} },
	category->{ ${essentialQueryData} },
	series->{ ${essentialQueryData} },
	media
`

const mediaData = /* GROQ */ `
	media {
		...,
		asset->{
			...,
			creditLine
    }
	}
`

const articleData = /* GROQ */ `
	${basicMetadata},
	${basicPostData},
	${mediaData}
`

export const maybeCategoryPageQuery = defineQuery(`
	*[_type == "category" && slug.current == $slug] {
		${essentialQueryData},
		description,
		useCustomCss,
		metaInfo
	}[0]
`)

// See: https://www.sanity.io/docs/developer-guides/paginating-with-groq#k3b34cbbe5153
export const maybeCategoryPagePaginateArticlesQuery = defineQuery(`
	*[_type == "article" && category->slug.current == $slug && (date < $lastDate || (date == $lastDate && _id > $lastId))] | order(date desc) [0..19] {
		${articleData}
	}
`)

export const maybeCategoryPageInitialArticlesQuery = defineQuery(`
	*[_type == "article" && category->slug.current == $slug] | order(date desc) [0..19] {
		${articleData}
	}
`)

export const maybeSeriesPageQuery = defineQuery(`
	*[_type == "series" && slug.current == $slug] {
		${essentialQueryData},
		description,
		useCustomCss,
		metaInfo
	}[0]
`)

export const maybeSeriesPageInitialArticlesQuery = defineQuery(`
	*[_type == "article" && series->slug.current == $slug] | order(date desc) [0..19] {
		${articleData}
	}
`)

export const maybeAllSeriesQuery = defineQuery(`
	*[_type == "series" && count(*[_type == "article" && references(^._id)]) >= 1] | order(lower(name) asc) {
		${essentialQueryData},
		description
	}
`)

export const maybeAllTagsQuery = defineQuery(`
	*[_type == "tag"] | order(lower(name) asc) {
		${essentialQueryData}
	}
`)

export const maybeTagPageQuery = defineQuery(`
	*[_type == "tag" && slug.current == $slug] {
		${essentialQueryData},
		description,
		metaInfo
	}[0]
`)

export const maybeTagPageInitialArticlesQuery = defineQuery(`
	*[_type == "article" && $slug in tags[]->slug.current] | order(date desc) [0..19] {
		${articleData}
	}
`)

export const maybeSingleMemberArticlesQuery = defineQuery(`
	*[_type == "article" && references(*[_type == "member" && slug.current == $slug]._id)] | order(date desc) {
		${articleData}
	}
`)

export const homepageArticleQuery = defineQuery(`
	*[_type == "article" && category.slug.current != "multimedia"] | order(date desc) [0..19] {
		${articleData}
	}
`)

export const sitemapArticlesDataQuery = defineQuery(`
	*[_type == "article"] {
		'slug': slug.current,
		'category': category->slug.current,
		'date': coalesce(updatedDate, date),
	}
`)

export const maybeArticlePageQuery = defineQuery(`
	*[_type == "article" && category->slug.current == $category && slug.current == $slug]{
		${articleData},
		metaInfo,
		content[]{
			...,
			_type == "image" => {
				...,
				...asset-> { metadata, creditLine },
			}
		},
	}[0]
`)

export const maybeSingleArticleQuery = defineQuery(`
	*[_type == "article" && category->slug.current == $category && slug.current == $slug]{
		${articleData},
		metaInfo
	}[0]
`)

export const relatedArticlesTypeA = defineQuery(`
  *[_type == "article" && slug.current != $slug] | score(
    boost(author._ref in $authors, 4),
    boost(date match $date, 1.5),
    boost(title match $title, 1.2),
    boost(category._ref match $categoryId, 2.3),
    // boost(content[].children[].text match $content, 4),
  ) | order(_score desc) [0..8] {
    _score,
		${articleData}
  } //[ _score > 0 ]
`)

export const sitemapAuthorsQuery = defineQuery(`
	*[_type == "member"] {
		'slug': slug.current,
		updatedAt
	}
`)

export const sitemapArticlesQuery = defineQuery(`
	*[_type == "article"] {
		'slug': slug.current,
		'category': category->slug.current,
		'date': coalesce(updatedDate, date),
	}
`)

export const sitemapSeriesQuery = defineQuery(`
	*[_type == "series"] {
		'slug': slug.current,
		date
	}
`)

export const sitemapTagsQuery = defineQuery(`
	*[_type == "tag"] {
		'slug': slug.current,
		date
	}
`)

const baseSearchProjection = `
  _score,
  _id,
  title,
  subtitle,
  authors[]->{ name, "slug": slug.current },
  'slug' : '/category/' + category->slug.current + '/' + slug.current,
  'category': coalesce(category->name, 'none'),
  'type': _type,
  date,
  media
`

const mixedMatchFilter = `
  _type == 'article'
    && (
    title match $searchQuery + '*'
    || subtitle match $searchQuery + '*'
    || series->name match $searchQuery + '*'
    || category->name match $searchQuery + '*'
    || authors[]->name match $searchQuery + '*'
    ) && defined(category->slug.current) && defined(slug.current)
`

/**
 * How many results one page holds, and how many the query actually fetches.
 *
 * These are string literals because Sanity's TypeGen rejects a slice built from
 * parameters ("slicing must use constant numbers").
 *
 * Given the major scale, the number 12 is the closest approximation to a scaled
 * 1.25 * 10.
 */
const searchPageSize = '12'
const searchFetchSize = '13'
export const resultsPerPage = Number(searchPageSize)

/**
 * "Mixed-match" means the query contains a mix of exact matches and non-exact
 * matches.
 */
export const searchMixedMatchQuery = defineQuery(`
  *[${mixedMatchFilter} && !(_id in $seenIds)] | score(
    boost(title match $searchQuery, 20),
    boost(title match $searchQuery + '*', 18),
    boost(subtitle match $searchQuery + '*', 15)
  ) {
    ${baseSearchProjection},
    '_rank': _score + select(count(authors[@->name match $searchQuery + '*']) > 0 => 12, 0)
  } | order(_rank desc, date desc, _id asc) [0...${searchFetchSize}]
`)

export const searchMixedMatchTotalQuery = defineQuery(`
  {
    'total': count(*[${mixedMatchFilter}])
  }
`)
