import {defineConfig, isDev, NavbarProps, useWorkspace} from 'sanity'
import {copyPastePlugin} from '@superside-oss/sanity-plugin-copy-paste'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schema'
import {BookIcon, RobotIcon} from '@sanity/icons'
import {media} from 'sanity-plugin-media'
import {studioDataset, studioProjectId, studioTitle} from './lib/environment'
import {Card, Stack, Text} from '@sanity/ui'
import {structure} from './structure'
import {customDocumentActions} from './plugins/customDocumentActions'

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

export default defineConfig({
  name: 'publishing',
  title: studioTitle,
  icon: studioDataset! === 'production' ? BookIcon : RobotIcon,
  projectId: studioProjectId,
  dataset: studioDataset!,
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
  // }kk
})
