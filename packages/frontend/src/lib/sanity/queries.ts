import groq from 'groq';

export const homepageArticles =
	() => groq`*[_type == "article" && category.slug.current != "multimedia"] | order(date desc) [0..15] {
			_id,
			title,
			subtitle,
			authors[]->{name, slug},
			slug,
			date,
			category->{
				name,
				slug,
			},
			media {
				...,
  				...asset-> {
    				altText,
    				...metadata {
					  	blurHash,
    				  	...dimensions {
    				    	width,
    				    	height
    				  	}
    				}
  				}
			}
		}
`;

export const articlePage = (): string =>
	groq`*[_type == "article" && category->slug.current == $category && slug.current == $slug]{
		title,
		subtitle,
		date,
		media,
		updatedDate,
		metaInfo,
		slug,
		_id,
		content[]{
			_type == "image" => {
				title,
				alt,
				description,
				"attrs": asset-> {
					creditLine,
					metadata
				},
			},
			...
		},
		authors[]->{
			_id,
			name,
			slug
		},
		tags[]->{name, slug},
		category->{_id, name, slug},
		media {
			..., // this will ensure you keep the existing data
			...asset-> {
				creditLine,
				...metadata {
					blurHash,
					...dimensions {
						width,
						height
					}
				}
			}
		},
		series->{name, slug}
	}[0]
`;

export const relatedArticlesTypeA = (): string => groq`
		*[_type == "article" && slug.current != "$slug"] | score(
			boost(author._ref in $authors, 4),
			boost(date match $date, 1.5),
			boost(title match $title, 1.2),
	  		boost(category._ref match $categoryId, 2.3),
			// boost(content[].children[].text match $content, 4),
	  	) | order(_score desc) [0..8] {
	  		_score,
	  		title,
	  		date,
	  		slug,
			authors[]->,
			category->,
			media {
				...,
  				...asset-> {
    				altText,
    				...metadata {
					  	blurHash,
    				  	...dimensions {
    				    	width,
    				    	height
    				  	}
    				}
  				}
			}
		} //[ _score > 0 ]
`;
