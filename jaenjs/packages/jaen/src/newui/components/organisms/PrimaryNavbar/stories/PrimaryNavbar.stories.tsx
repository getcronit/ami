import {MenuItem} from '@chakra-ui/react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import Component from '../PrimaryNavbar'

export default {
  title: 'Components/Organisms/PrimaryNavbar',
  component: Component
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = args => (
  <Component {...args} />
)

export const Default = Template.bind({})
Default.args = {
  user: {
    fullname: 'John Doe',
    email: 'john.doe@snek.com'
  },
  userMenuItems: [<MenuItem>Admin</MenuItem>, <MenuItem>Logout</MenuItem>]
}
