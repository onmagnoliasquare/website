import {ImageIcon} from '@sanity/icons/Image'
import { defineArrayMember, defineType } from 'sanity'
import embeddedLink from './embeddedLink'
import requiredFormattedString from '../primitives/requiredFormattedString'
import formattedText from '../primitives/formattedText'
import formattedString from '../primitives/formattedString'
import {HtmlDescription} from '../../components/HtmlDescription'
import { TbSuperscript, TbSubscript } from 'react-icons/tb'
import { MdFormatUnderlined } from 'react-icons/md'

export default defineType({
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h2' },
        { title: 'Heading 2', value: 'h3' },
        { title: 'Heading 3', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Hidden', value: 'blockComment' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Underline',
            value: 'underline',
            icon: () => <MdFormatUnderlined />,
            component: ({ children }) => (
              <span>
                <u>{children}</u>
              </span>
            ),
          },
          {
            title: 'Superscript',
            value: 'superscript',
            icon: () => <TbSuperscript />,
            component: ({ children }) => (
              <span>
                <sup>{children}</sup>
              </span>
            ),
          },
          {
            title: 'Subscript',
            value: 'subscript',
            icon: () => <TbSubscript />,
            component: ({ children }) => (
              <span>
                <sub>{children}</sub>
              </span>
            ),
          },
          // {
          //   title: 'Lead in',
          //   value: 'leadIn',
          //   icon: () => <span style={{fontFamily: 'serif'}}>LI</span>,
          //   component: ({children}) => (
          //     <span style={{fontFamily: 'serif', fontWeight: 'bolder'}}>{children}</span>
          //   ),
          // },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: formattedString.name,
          description: 'Optional title of the image, displayed in larger text.',
        },
        {
          name: 'description',
          title: 'Description',
          description: 'Optional short image caption, displayed under the image title.',
          type: formattedText.name,
        },
        {
          name: 'alt',
          title: 'Alt Text',
          description: (
            <HtmlDescription>
              Alt-text is a necessary accessibility description describing content in media (often
              an image). For example, alt-text of a picture of a school dinner would read: People
              eating at a table in front of a stage. Learn more about alt-text here:{' '}
              <a href="https://www.a11ywithlindsey.com/blog/writing-alternative-text-matters">
                Writing Alternative Text That Matters
              </a>
              .
            </HtmlDescription>
          ),
          type: requiredFormattedString.name,
        },
      ],
      options: {
        metadata: ['blurhash'],
      },
    }),
    defineArrayMember({
      type: embeddedLink.name,
    }),
  ],
})
