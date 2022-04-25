import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductTemplate} from '../ProductTemplate'

import data from './data'

export default {
  title: 'Components/Templates/ProductTemplate',
  component: ProductTemplate
} as ComponentMeta<typeof ProductTemplate>

const Template: ComponentStory<typeof ProductTemplate> = args => (
  <ProductTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  shopifyProduct: data.shopifyProduct,
  relatedProducts: data.relatedProducts,
  path: `/products/${data.shopifyProduct.handle}`
}
