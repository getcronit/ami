import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {PrivacyTemplate} from '../PrivacyTemplate'

export default {
  title: 'PrivacyTemplate',
  component: PrivacyTemplate
} as ComponentMeta<typeof PrivacyTemplate>

const Template: ComponentStory<typeof PrivacyTemplate> = args => (
  <PrivacyTemplate {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  path: '/privacy'
}
