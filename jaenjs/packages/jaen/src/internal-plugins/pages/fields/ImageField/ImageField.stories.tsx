import {JaenPageProvider} from '@jaen-pages/internal/services/page'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import Component from '.'
import {EditButtonGroup} from '../../ui/toolbar'

export default {
  title: 'fields/ImageField',
  component: Component,
  decorators: [
    Story => (
      <JaenPageProvider
        jaenPage={{
          id: `JaenPage jaen-page-1`,
          slug: 'jaen-page-1',
          parent: null,
          children: [],
          jaenPageMetadata: {
            title: 'Jaen Page 1',
            description: 'Jaen Page 1 description',
            image: 'https://via.placeholder.com/300x200',
            canonical: 'https://jaen.com/jaen-page-1',
            datePublished: '2020-01-01',
            isBlogPost: false
          },
          jaenFields: {
            'IMA:TextField': {
              'rich-text-field-1': '<p>this is a stored rtf value</p>'
            }
          },
          chapters: {},
          template: 'BlogPage',
          jaenFiles: []
        }}>
        <EditButtonGroup />
        <Story />
      </JaenPageProvider>
    )
  ]
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
Basic.args = {
  name: 'image-field',
  width: 500,
  height: 300
}
