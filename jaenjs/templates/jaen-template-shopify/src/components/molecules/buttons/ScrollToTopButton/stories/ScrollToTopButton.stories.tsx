import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ScrollToTopButton, ScrollToTopButtonProps} from '../ScrollToTopButton'


export default {
  title: 'Components/Molecules/buttons/ScrollToTopButton',
  component: ScrollToTopButton
} as ComponentMeta<typeof ScrollToTopButton>

const Template: ComponentStory<typeof ScrollToTopButton> = args => (
  <ScrollToTopButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onScrollToTopClick: () => null
}
