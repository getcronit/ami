import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductSlider} from '../ProductSlider'
import * as ProductsPageStories from '../../../templates/ProductsTemplate/stories/ProductsPage.stories'

export default {
  title: 'ProductSlider',
  component: ProductSlider
} as ComponentMeta<typeof ProductSlider>

const Template: ComponentStory<typeof ProductSlider> = args => (
  <ProductSlider {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  heading: 'Related Products',
  products: ProductsPageStories.Simple.args?.products ?? []
}
