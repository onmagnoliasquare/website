import {StructureBuilder, StructureResolver, StructureResolverContext} from 'sanity/structure'

import webpages from './webpageStructure'
import management from './managementStructure'
import browse from './browseStructure'
import articles from './articlesStructure'

export const structure: StructureResolver = (
  S: StructureBuilder,
  context: StructureResolverContext,
) =>
  S.list()
    .title('Content')
    .items([
      articles(S, context),
      browse(S, context),
      S.divider(),
      webpages(S, context),
      S.divider(),
      management(S, context),
    ])
