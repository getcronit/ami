import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'

import Component from '.'

export default {
  title: 'Dashboard/components/tabs/Settings',
  component: Component
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const SettingsTab: Story<ComponentProps> = Template.bind({})
SettingsTab.args = {
  data: {
    siteMetadata: {
      title: 'My Site',
      description: 'My site description',
      siteUrl: 'https://example.com'
    }
  }
}
