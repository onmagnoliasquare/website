import {BookIcon, RobotIcon} from '@sanity/icons'
import {visionTool} from '@sanity/vision'
import {copyPastePlugin} from '@superside-oss/sanity-plugin-copy-paste'
import type {Config, WorkspaceOptions} from 'sanity'
import {defineConfig, isDev, type NavbarProps, useWorkspace} from 'sanity'
import {structureTool} from 'sanity/structure'
import {media} from 'sanity-plugin-media'
import {studioDataset, studioProjectId, studioTitle} from './lib/environment'
import {customDocumentActions} from './plugins/customDocumentActions'
import {schemaTypes} from './schema'
import {structure} from './structure'
import {crossDatasetDuplicator} from '@sanity/cross-dataset-duplicator'
import React from 'react'
import {Card, Stack, Text} from '@sanity/ui'
import {ThemeColorCardToneKey} from '@sanity/ui/theme'

import pkg from './package.json' with { type: 'json' }

const devOnlyPlugins = [
  // Vision tool is for querying stuff; a regular user isn't doing this.
  visionTool(),
  // Duplicator is off-limits for regular users in production. Sorry~!
  crossDatasetDuplicator({
    types: ['article', 'member', 'tag']
  }),
]

const CustomNavbar = (
  tone: ThemeColorCardToneKey
): ((props: NavbarProps) => React.ReactElement<NavbarProps>) => {
  return props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {dataset} = useWorkspace()
    return (
      <Stack>
        <Card padding={3} tone={tone}>
          <Text size={1}>
            Using the <b>{dataset}</b> dataset
          </Text>
        </Card>
        {props.renderDefault(props)} {/* Render the default navbar */}
      </Stack>
    )
  }
}

const baseWorkspace: Config = {
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
  announcements: {
    enabled: false,
  },
}

const prodConfig: Config = {
  ...baseWorkspace,
  title: "Publishing@OMS",
  icon: BookIcon,
  projectId: studioProjectId,
  dataset: 'production',
  studio: {
    components: {
      navbar: props =>(
        <Stack>
          <Card padding={3} tone={'transparent'}>
            <Text size={1}>
              <b>{pkg.version}</b>
            </Text>
          </Card>
          {props.renderDefault(props)} {/* Render the default navbar */}
        </Stack>
      ) ,
    },
  },
}

const devConfig: WorkspaceOptions[] = [
  {
    ...baseWorkspace,
    title: 'Development',
    name: 'development',
    basePath: '/dev',
    studio: {
      components: {
        navbar: CustomNavbar('transparent'),
      },
    },
  },
  {
    ...baseWorkspace,
    title: 'Staging',
    dataset: 'staging',
    name: 'staging',
    basePath: '/staging',
    studio: {
      components: {
        navbar: CustomNavbar('suggest'),
      },
    },
  },
  {
    ...baseWorkspace,
    name: 'production',
    dataset: 'production',
    title: '⚠️ Production (LIVE) ⚠️',
    basePath: '/production',
    studio: {
      components: {
        navbar: CustomNavbar('caution'),
        layout: props => {
          return <>
            {props.renderDefault(props)}
            <div style={{ position: 'absolute', bottom: 50, left: 10, zIndex: 20, backgroundColor: 'red'}}>
              <p style={{color: 'white', fontWeight: 'bold', padding: 10}}>
                <em>THIS IS A LIVE DATASET!</em>
              </p>
            </div>
          </>
        },
      },
    },
  },
]

export default defineConfig(isDev ? devConfig : prodConfig)
