import {ImageIcon} from '@sanity/icons'
import {defineType} from 'sanity'
import embeddedLink from './embeddedLink'
import requiredFormattedString from '../primitives/requiredFormattedString'
import formattedText from '../primitives/formattedText'
import formattedString from '../primitives/formattedString'

export default defineType({
  name: 'content',
  type: 'array',
  title: 'Content',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 1', value: 'h2'},
        {title: 'Heading 2', value: 'h3'},
        {title: 'Heading 3', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
        {title: 'Hidden', value: 'blockComment'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {
            title: 'Superscript',
            value: 'superscript',
            icon: () => (
              <span>
                x<sup>2</sup>
              </span>
            ),
            component: ({children}) => (
              <span>
                <sup>{children}</sup>
              </span>
            ),
          },
          {
            title: 'Subscript',
            value: 'subscript',
            icon: () => (
              <span>
                y<sub>2</sub>
              </span>
            ),
            component: ({children}) => (
              <span>
                <sub>{children}</sub>
              </span>
            ),
          },
          {
            title: 'Underline',
            value: 'underline',
            icon: () => (
              <span>
                <u>abc</u>
              </span>
            ),
            component: ({children}) => (
              <span>
                <u>{children}</u>
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
    },
    {
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
          description:
            'Alt text is a description for those hard of seeing; it is a simple description of what is happening in a piece of media. For example, if there is an image that pertains to a dinner hosted by the school, the alt text would be—staff and faculty gathered around a table in-front of the speaker stage.',
          type: requiredFormattedString.name,
        },
      ],
      options: ['blurhash'],
    },
    {
      type: embeddedLink.name,
    },
  ],
})
