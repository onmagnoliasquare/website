import {defineCliConfig} from 'sanity/cli'
import {studioDataset, studioProjectId} from './lib/environment'

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
  studioHost: 'onmagnoliasquare',
})
