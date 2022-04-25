import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {IncomingBuildAlert} from '../IncomingBuildAlert'

export default {
  title: 'NewUI/IncomingBuildAlert',
  component: IncomingBuildAlert
} as ComponentMeta<typeof IncomingBuildAlert>

const Template: ComponentStory<typeof IncomingBuildAlert> = args => (
  <IncomingBuildAlert {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  isOpen: true,
  totalChanges: 23
}
