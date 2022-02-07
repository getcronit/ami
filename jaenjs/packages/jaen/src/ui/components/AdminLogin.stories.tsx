import {JaenPageProvider} from '@jaen-pages/internal/services/page'
import {withSnekFinder} from '@jaen/withSnekFinder'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {default as Component} from './AdminLogin'

export default {
  title: 'NewUI/AdminLogin',
  component: Component
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  onLogin: (e, p) => {
    alert(`${e} ${p}`)
  },
  onLiveDemo: () => {
    alert('Live Demo')
  }
}
