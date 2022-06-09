import {ComponentMeta, ComponentStory} from '@storybook/react'
import Component from '../JaenLogo'

export default {
  title: 'Components/Atoms/JaenLogo',
  component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => (
  <Component {...args} />
)

export const Default = Template.bind({})
Default.args = {
  boxSize: '16'
}
