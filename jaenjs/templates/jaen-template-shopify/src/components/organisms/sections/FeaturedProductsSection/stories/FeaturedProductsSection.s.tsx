import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {FeaturedProductsSection} from '../FeaturedProductsSection'

import data from './data'

export default {
  title: 'Components/Organisms/Sections/FeaturedProductsSection',
  component: FeaturedProductsSection,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '300px'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof FeaturedProductsSection>

const Template: ComponentStory<typeof FeaturedProductsSection> = args => (
  <FeaturedProductsSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  categoryProducts: data.products,
  getPath: (handle: string) => `/produkte/${handle}`
}
