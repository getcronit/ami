import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {PrivacyTemplate} from '../PrivacyTemplate'

export default {
  title: 'Components/Templates/PrivacyTemplate',
  component: PrivacyTemplate
} as ComponentMeta<typeof PrivacyTemplate>

const Template: ComponentStory<typeof PrivacyTemplate> = args => (
  <PrivacyTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  path: '/privacy'
}
