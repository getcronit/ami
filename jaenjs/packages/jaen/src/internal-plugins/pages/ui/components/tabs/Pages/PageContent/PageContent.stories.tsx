import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'

import {PageContent} from '.'

export default {
  title: 'Dashboard/components/tabs/pages/PageContent',
  component: PageContent
} as ComponentMeta<typeof PageContent>

type ComponentProps = React.ComponentProps<typeof PageContent>

// Create a template for the component
const Template: Story<ComponentProps> = args => <PageContent {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
Basic.args = {
  template: {
    name: 'page',
    displayName: 'Page',
    children: []
  },
  values: {
    slug: '',
    title: '',
    description: ''
  },
  onSubmit: values => {
    console.log('🚀 ~ file: PageContent.stories.tsx ~ line 43 ~ values', values)
  },
  externalValidation: (valueName, value) => {
    console.log(
      '🚀 ~ file: PageContent.stories.tsx ~ line 49 ~ valueName',
      valueName
    )
    console.log('🚀 ~ file: PageContent.stories.tsx ~ line 49 ~ value', value)

    const siblingsSlugs = ['slug-1', 'slug-2', 'slug-3']

    if (valueName === 'slug' && siblingsSlugs.includes(value)) {
      return 'This slug is already in use.'
    }
  }
}
