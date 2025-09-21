import studio from '@sanity/eslint-config-studio'
import {defineConfig} from 'eslint/config'
import baseConfig from '../../eslint.config.mjs'

export default defineConfig([...baseConfig, ...studio])
