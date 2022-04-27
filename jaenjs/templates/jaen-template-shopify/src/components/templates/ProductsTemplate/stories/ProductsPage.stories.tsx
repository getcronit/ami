import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductsTemplate} from '../ProductsTemplate'
import data from './data'

export default {
  title: 'Components/Templates/ProductsTemplate',
  component: ProductsTemplate
} as ComponentMeta<typeof ProductsTemplate>

const Template: ComponentStory<typeof ProductsTemplate> = args => (
  <ProductsTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  products: data.products,
  implicitTags: data.implicitTags,
  tags: data.tags,
  path: '/products',
  minPrice: data.minPrice,
  maxPrice: data.maxPrice,
  sortOptions: data.sortOptions
}
