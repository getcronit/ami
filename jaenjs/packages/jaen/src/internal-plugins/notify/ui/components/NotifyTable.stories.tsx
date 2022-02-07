import {SunIcon} from '@chakra-ui/icons'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import Component from './NotifyTableCard'

export default {
  title: 'notify/NotifyTableCard',
  component: Component
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Example: Story<ComponentProps> = Template.bind({})
Example.args = {
  data: [
    {
      name: 'Vacation',
      description:
        'This is a notification about vacation. When active, it will be displayed on all pages for the first time a user visits.',
      logo: SunIcon,
      status: 'active'
    }
  ]
}
