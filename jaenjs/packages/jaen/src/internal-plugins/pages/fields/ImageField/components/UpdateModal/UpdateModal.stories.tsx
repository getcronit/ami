import {withSnekFinder} from '@jaen/withSnekFinder'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import Component from '.'

export default {
  title: 'fields/ImageField/components/UpdateModal',
  component: Component,
  decorators: [
    Story => {
      const Component = withSnekFinder(Story)

      return <Component />
    }
  ]
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  onClose: () => null,
  isOpen: true,
  onUpdate: () => {},
  data: {
    image:
      'https://image.gala.de/22313270/t/kQ/v3/w960/r0.6667/-/emilia-clarke.jpg',
    title: 'Neat Emilia Clarke',
    description: 'Emilia Clarke in a black dress on the red carpet'
  }
}
