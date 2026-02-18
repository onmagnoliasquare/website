import {defineCliConfig} from 'sanity/cli'
import {studioDataset, studioProjectId} from './lib/environment'
import viteConfig from './vite.config'

const schemaExportPath = '../frontend/src/lib/sanity/sanity-schemas.json'

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
  reactStrictMode: true,
  schemaExtraction: {
    enabled: true,
    path: schemaExportPath,

    // Set to 'production' for the real thing. Also, the schema doesn't differ
    // between workspaces.
    workspace: 'production',

    // Set to false because we want some flexibility in the frontend types.
    // Useful when we query the CMS for stuff.
    enforceRequiredFields: false,
  },
  typegen: {
    // See: https://www.sanity.io/docs/apis-and-sdks/sanity-typegen#k1a6a147d6737
    schema: schemaExportPath,
    // path: './schema/**/*.{ts,tsx,js,jsx}',
    generates: '../frontend/src/lib/sanity/cms.types.ts',
    overloadClientMethods: true,
  },
  deployment: {
    appId: '3d49ade815b8590d16cb61e0',
    autoUpdates: false, // Let's keep updating a package.json thing...
  },
  vite: viteConfig,
})
