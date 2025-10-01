import {CogIcon, ComposeIcon, InfoOutlineIcon} from '@sanity/icons'
import type {FieldGroupDefinition} from 'sanity'

export const InfoGroup: FieldGroupDefinition = {
  name: 'info',
  title: 'Info',
  default: true,
  icon: InfoOutlineIcon,
}

export const ContentGroup: FieldGroupDefinition = {
  name: 'content',
  title: 'Content',
  icon: ComposeIcon,
}

export const SeoGroup: FieldGroupDefinition = {name: 'seo', title: 'SEO', icon: CogIcon}
