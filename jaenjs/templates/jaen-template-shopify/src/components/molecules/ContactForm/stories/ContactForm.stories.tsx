import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ContactForm} from '../ContactForm'

export default {
  title: 'Components/Molecules/ContactForm',
  component: ContactForm
} as ComponentMeta<typeof ContactForm>

const Template: ComponentStory<typeof ContactForm> = args => (
  <ContactForm {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  requestOptions: ['Option 1', 'Option 2', 'Option 3']
}
