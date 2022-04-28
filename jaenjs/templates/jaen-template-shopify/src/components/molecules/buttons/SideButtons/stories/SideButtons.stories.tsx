import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {SideButtons, SideButtonsProps} from '../SideButtons'


export default {
  title: 'Components/Molecules/buttons/SideButtons',
  component: SideButtons
} as ComponentMeta<typeof SideButtons>

const Template: ComponentStory<typeof SideButtons> = args => (
  <SideButtons {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onMailButtonClick: () => null,
  onLocationButtonClick: () => null,
  onPhoneButtonClick: () => null
}
