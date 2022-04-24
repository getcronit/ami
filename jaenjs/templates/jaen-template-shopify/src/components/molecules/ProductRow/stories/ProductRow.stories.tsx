import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductRow} from '../ProductRow'
import * as ProductPageStories from '../../../templates/ProductTemplate/stories/ProductTemplate.stories'
import {getProductTags} from '@snek-at/gatsby-theme-shopify'

export default {
  title: 'Components/Molecules/ProductRow',
  component: ProductRow
} as ComponentMeta<typeof ProductRow>

const Template: ComponentStory<typeof ProductRow> = args => (
  <ProductRow {...args} />
)

const shopifyProduct = ProductPageStories.Simple.args?.shopifyProduct!

const tags = getProductTags(shopifyProduct)

export const Simple = Template.bind({})
Simple.args = {
  title: shopifyProduct.title,
  featuredMedia: shopifyProduct.featuredMedia.image,
  categoryString: tags.categoryString,
  otherString: tags.otherString
}
