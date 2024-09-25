import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {BookIcon, RobotIcon} from '@sanity/icons'
import {media} from 'sanity-plugin-media'

export default defineConfig([
  {
    name: 'production',
    title: 'Publishing',

    basePath: '/publish',
    subtitle: 'Write, edit, and publish content',
    icon: BookIcon,

    projectId: '1ah7xxlt',
    dataset: 'production',

    plugins: [
      structureTool(),
      media({
        creditLine: {
          enabled: true,
        },
      }),
    ],

    schema: {
      types: schemaTypes,
    },
  },
  {
    name: 'development',
    title: 'Development',

    basePath: '/development',
    subtitle: 'Tech team backend workspace',
    icon: RobotIcon,

    projectId: '1ah7xxlt',
    dataset: 'development',

    plugins: [
      structureTool(),
      visionTool(),
      media({
        creditLine: {
          enabled: true,
        },
      }),
    ],

    schema: {
      types: schemaTypes,
    },
  },
])
