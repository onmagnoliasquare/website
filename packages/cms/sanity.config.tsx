import {BookIcon, RobotIcon} from '@sanity/icons'
import {Card, Stack, Text} from '@sanity/ui'
import {visionTool} from '@sanity/vision'
import {copyPastePlugin} from '@superside-oss/sanity-plugin-copy-paste'
import {isDev, type NavbarProps, useWorkspace} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {studioDataset, studioProjectId, studioTitle} from './lib/environment'
import {customDocumentActions} from './plugins/customDocumentActions'
import {schemaTypes} from './schema'
import {structure} from './structure'
import type {Config} from 'sanity'
import {defineConfig} from 'sanity'

const devOnlyPlugins = [visionTool()]

function CustomNavbar(props: NavbarProps) {
  const {dataset} = useWorkspace()

  return (
    <Stack>
      <Card padding={3} tone="primary">
        <Text size={1}>
          Using the <b>{dataset}</b> dataset
        </Text>
      </Card>
      {props.renderDefault(props)} {/* Render the default navbar */}
    </Stack>
  )
}

const config: Config = defineConfig({
  name: 'publishing',
  title: studioTitle,
  icon: studioDataset === 'production' ? BookIcon : RobotIcon,
  projectId: studioProjectId,
  dataset: studioDataset,
  plugins: [
    structureTool({structure: structure}),
    media({
      creditLine: {
        enabled: true,
      },
    }),
    copyPastePlugin(),
    customDocumentActions(),
    ...(isDev ? devOnlyPlugins : []),
  ],
  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },
  announcements: {
    enabled: false,
  },
  // document: {
  //   newDocumentOptions:
  // }
})

export default config
