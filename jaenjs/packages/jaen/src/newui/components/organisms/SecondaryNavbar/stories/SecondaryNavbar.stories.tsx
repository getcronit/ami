import {ComponentMeta, ComponentStory} from '@storybook/react'
import Component from '../SecondaryNavbar'

export default {
  title: 'Components/Organisms/SecondaryNavbar',
  component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => (
  <Component {...args} />
)

export const Default = Template.bind({})
Default.args = {}
