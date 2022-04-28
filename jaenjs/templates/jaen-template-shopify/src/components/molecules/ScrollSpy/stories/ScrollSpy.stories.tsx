import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ScrollSpy} from '../ScrollSpy'


export default {
  title: 'Components/Molecules/ScrollSpy',
  component: ScrollSpy
} as ComponentMeta<typeof ScrollSpy>

const Template: ComponentStory<typeof ScrollSpy> = args => (
  <ScrollSpy {...args} />
)

export const Default = Template.bind({})
Default.args = {
  anchors: [
    {
      name: 'hero',
      label: 'AGT'
    },
    {
      name: 'featuredproducts',
      label: 'Sortiment'
    },
    {
      name: 'reviews',
      label: 'Bewertungen'
    },
    {
      name: 'news',
      label: 'Neuigkeiten'
    },
    {
      name: 'about',
      label: 'Über uns'
    },
    {
      name: 'faq',
      label: 'FAQ'
    }
  ]
}
