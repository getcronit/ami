import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {default as Component} from './JaenActivationButton'
export default {
  title: 'NewUI/JaenActivationButton',
  component: Component
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})
