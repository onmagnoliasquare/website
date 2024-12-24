import {defineConfig} from 'sanity'
import {copyPastePlugin} from '@superside-oss/sanity-plugin-copy-paste'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {BookIcon, RobotIcon} from '@sanity/icons'
import {media} from 'sanity-plugin-media'
import {studioDataset, studioProjectId, studioTitle} from './lib/environment'

export default defineConfig({
  name: 'publishing',
  title: studioTitle,
  icon: studioDataset! === 'production' ? BookIcon : RobotIcon,
  projectId: studioProjectId,
  dataset: studioDataset!,
  plugins: [
    structureTool(),
    visionTool(),
    media({
      creditLine: {
        enabled: true,
      },
    }),
    copyPastePlugin(),
  ],
  schema: {
    types: schemaTypes,
  },
  announcements: {
    enabled: false,
  },
})
