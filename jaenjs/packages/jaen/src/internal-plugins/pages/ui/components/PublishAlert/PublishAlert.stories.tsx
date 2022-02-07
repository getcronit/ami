import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'

import Component from '.'

export default {
  title: 'Dashboard/components/PublishAlert',
  component: Component
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  onClose: () => null,
  isOpen: true,
  onConfirm: async () => Promise.resolve(true)
}
