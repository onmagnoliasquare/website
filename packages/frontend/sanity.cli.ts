import { defineCliConfig } from '@sanity/cli'

const schemaExportPath = '../cms/schema.json'

/**
 * This configuration is strictly for generating types and not for deployment
 * of a Sanity backend, so an `api` object property that has a `projectId` and
 * `dataset` definition is not needed.
 */
export default defineCliConfig({
  typegen: {
    path: './src/lib/sanity/queries.ts',
    schema: schemaExportPath,
    generates: './src/lib/sanity/types.generated.ts',
    overloadClientMethods: true,
    formatGeneratedCode: true,
  },
})
