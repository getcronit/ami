import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {AuthModal} from '../AuthModal'

export default {
  title: 'Components/Organisms/AuthModal',
  component: AuthModal
} as ComponentMeta<typeof AuthModal>

const Template: ComponentStory<typeof AuthModal> = args => (
  <AuthModal {...args} />
)

export const Login = Template.bind({})
Login.args = {
  isOpen: true,
  onLogin: async () => true
}

export const Logout = Template.bind({})
Logout.args = {
  isOpen: true,
  user: {
    fullName: 'John Doe',
    email: 'john@doe.com'
  },
  onLogout: () => {},
  onClose: () => {}
}
