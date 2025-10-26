import {defineCliConfig} from 'sanity/cli'
import {studioDataset, studioProjectId} from './lib/environment'
import viteConfig from './vite.config'


export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
  deployment: {
    appId: '3d49ade815b8590d16cb61e0',
    autoUpdates: false, // Let's keep updating a package.json thing...
  },
  vite: viteConfig
})
