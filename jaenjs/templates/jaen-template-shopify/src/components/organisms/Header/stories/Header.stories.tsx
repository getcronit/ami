import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Header} from '../Header'
import * as SearchbarStories from '../../../molecules/Searchbar/stories/Searchbar.stories'

export default {
  title: 'Components/Organisms/Header',
  component: Header
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = args => <Header {...args} />

export const Simple = Template.bind({})
Simple.args = {
  ...SearchbarStories.Simple.args,
  path: '/munition/waffen/waffen-klassen/waffen-klassen-kugeln',
  links: [
    {
      name: 'Waffen',
      path: '/waffen'
    },
    {
      name: 'Munition',
      path: '/munition'
    },
    {
      name: 'Wiederladen',
      path: '/wiederladen'
    },
    {
      name: 'Optik',
      path: '/optik'
    },
    {
      name: 'Laufrohlinge',
      path: '/laufrohlinge'
    }
  ]
}
