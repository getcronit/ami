import {Button} from '@chakra-ui/react'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'

import Component from '.'

export default {
  title: 'fields/SectionField/components/popovers/SectionAdd',
  component: Component
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Example: Story<ComponentProps> = Template.bind({})
Example.args = {
  children: <Button>Add Section</Button>,
  header: <h2>Add Section</h2>,
  sections: [
    {
      name: 'BoxSection',
      displayName: 'Box Section'
    },
    {
      name: 'CardSection',
      displayName: 'Card Section'
    }
  ],
  onSelect: () => {}
}
