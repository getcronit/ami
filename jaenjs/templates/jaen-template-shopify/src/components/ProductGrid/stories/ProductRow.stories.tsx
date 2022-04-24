import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductGrid} from '../ProductGrid'

import * as ProductsPageStories from '../../pages/ProductsPage/stories/ProductsPage.stories'

export default {
  title: 'ProductGrid',
  component: ProductGrid
} as ComponentMeta<typeof ProductGrid>

const Template: ComponentStory<typeof ProductGrid> = args => (
  <ProductGrid {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  heading: 'Related Products',
  products: ProductsPageStories.Simple.args?.products ?? []
}
