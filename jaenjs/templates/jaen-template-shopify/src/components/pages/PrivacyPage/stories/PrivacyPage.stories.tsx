import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {PrivacyPage} from '../PrivacyPage'

export default {
  title: 'PrivacyPage',
  component: PrivacyPage
} as ComponentMeta<typeof PrivacyPage>

const Template: ComponentStory<typeof PrivacyPage> = args => (
  <PrivacyPage {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  path: '/privacy'
}
