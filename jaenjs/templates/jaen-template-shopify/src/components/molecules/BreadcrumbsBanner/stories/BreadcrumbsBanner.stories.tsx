import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {BreadcrumbsBanner} from '../BreadcrumbsBanner'

export default {
  title: 'Components/Molecules/BreadcrumbsBanner',
  component: BreadcrumbsBanner
} as ComponentMeta<typeof BreadcrumbsBanner>

const Template: ComponentStory<typeof BreadcrumbsBanner> = args => (
  <BreadcrumbsBanner {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  title: 'Arex Zero Alpha',
  path: '/waffen/pistolen/arex-zero-alpha'
}
