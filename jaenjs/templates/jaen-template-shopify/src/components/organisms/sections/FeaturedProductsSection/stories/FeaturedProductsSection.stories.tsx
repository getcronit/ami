import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {FeaturedProductsSection} from '../FeaturedProductsSection'

import data from './data'

export default {
  title: 'Components/Organisms/Sections/FeaturedProductsSection',
  component: FeaturedProductsSection,
  decorators: [storyFn => <div style={{}}>{storyFn()}</div>]
} as ComponentMeta<typeof FeaturedProductsSection>

const Template: ComponentStory<typeof FeaturedProductsSection> = args => (
  <FeaturedProductsSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  heading: 'Featured Products',
  featuredProducts: data.products,
}
