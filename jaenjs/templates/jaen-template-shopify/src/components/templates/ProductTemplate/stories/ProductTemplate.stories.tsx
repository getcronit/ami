import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductPage} from '../ProductTemplate'

import data from './data'

export default {
  title: 'ProductPage',
  component: ProductPage
} as ComponentMeta<typeof ProductPage>

const Template: ComponentStory<typeof ProductPage> = args => (
  <ProductPage {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  shopifyProduct: data.shopifyProduct,
  relatedProducts: data.relatedProducts,
  path: `/products/${data.shopifyProduct.handle}`
}
