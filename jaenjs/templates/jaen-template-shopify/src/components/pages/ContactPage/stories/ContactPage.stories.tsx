import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ContactPage} from '../ContactPage'

export default {
  title: 'ContactPage',
  component: ContactPage
} as ComponentMeta<typeof ContactPage>

const Template: ComponentStory<typeof ContactPage> = args => (
  <ContactPage {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  path: '/contact',
  phone: '+49 1234567890',
  email: 'email@test.com',
  address: 'Test Street 123, 12345 Test City'
}
