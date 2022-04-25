import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {GoogleMaps} from '../GoogleMaps'

export default {
  title: 'Components/Molecules/GoogleMaps',
  component: GoogleMaps
} as ComponentMeta<typeof GoogleMaps>

const Template: ComponentStory<typeof GoogleMaps> = args => (
  <GoogleMaps {...args} />
)

export const Default = Template.bind({})
Default.args = {
  src:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10977.908361298725!2d14.2921416!3d46.5382484!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0d0d69eedf5cb7d!2sWaffenhandel%20T%C3%BCrk!5e0!3m2!1sen!2sat!4v1647540212169!5m2!1sen!2sat'
}
