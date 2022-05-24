import React from 'react'
import {withJaenMock, Field} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {HeroSectionJSX} from '../HeroSection'
import {jaenData} from './jaen-data'
import data from './data'

export default {
  title: 'Components/Organisms/Sections/HeroSection',
  component: HeroSectionJSX,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage: {...jaenData.jaenPage}})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof HeroSectionJSX>

const Template: ComponentStory<typeof HeroSectionJSX> = args => (
  <HeroSectionJSX {...args} />
)

export const Default = Template.bind({})
Default.args = {
  anchor: "",
  name: "hero",
  displayName: "Hero",
  categoryProducts: data.categoryShowcase.nodes,
  spotlightProducts: data.weaponSpotlight.nodes,
  latestProducts: data.latestProducts.nodes,
}