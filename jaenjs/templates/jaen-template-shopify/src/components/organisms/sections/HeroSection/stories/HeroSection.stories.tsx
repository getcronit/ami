import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {HeroSection} from '../HeroSection'

import data from './data'

export default {
  title: 'Components/Organisms/Sections/HeroSection',
  component: HeroSection,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof HeroSection>

const Template: ComponentStory<typeof HeroSection> = args => (
  <HeroSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  categoryProducts: data.categoryShowcase.nodes,
  showcaseProducts: data.weaponSpotlight.nodes,
  latestProducts: data.latestProducts.nodes,
  noScroll: false
}
