import {JaenPageProvider} from '../../internal/services/page'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import Component from '.'
import {EditButton} from '../../ui/toolbar'
import {useField} from '../../internal/services/field'

export default {
  title: 'fields/TextField',
  component: Component,
  decorators: [
    Story => (
      <JaenPageProvider
        jaenPage={{
          id: `JaenPage jaen-page-1}`,
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
        <EditButton />
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
  name: 'text-field',
  defaultValue: 'defaultValue'
}

export const RichText: Story<ComponentProps> = Template.bind({})
RichText.args = {
  name: 'rich-text-field-1',
  defaultValue: '<p>richtext2<p>',
  rtf: true
}

export const Hidden: Story<ComponentProps> = Template.bind({})
Hidden.args = {
  name: 'hidden-text-field',
  defaultValue: 'defaultValue',
  hiddenField: true
}

export const LiveValue: Story<ComponentProps> = () => {
  const field = useField('hidden-text-field', 'IMA:TextField')
  return <>{JSON.stringify(field)}</>
}
