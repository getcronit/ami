import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductGrid} from '../ProductGrid'

import * as ProductsPageStories from '../../../templates/ProductsTemplate/stories/ProductsPage.stories'

export default {
  title: 'Components/Molecules/ProductGrid',
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
