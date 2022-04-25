import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {getProductTags} from '@snek-at/gatsby-theme-shopify'
import {ProductRow} from '../ProductRow'
import data from './data'

export default {
  title: 'Components/Molecules/ProductRow',
  component: ProductRow
} as ComponentMeta<typeof ProductRow>

const Template: ComponentStory<typeof ProductRow> = args => (
  <ProductRow {...args} />
)

const shopifyProduct = data.shopifyProduct

const tags = getProductTags(shopifyProduct)

export const Default = Template.bind({})
Default.args = {
  title: shopifyProduct.title,
  featuredMedia: shopifyProduct.featuredMedia.image,
  categoryString: tags.categoryString,
  otherString: tags.otherString
}
