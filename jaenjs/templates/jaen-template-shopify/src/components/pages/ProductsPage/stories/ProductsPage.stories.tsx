import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductsPage} from '../ProductsPage'

import data from './data'

export default {
  title: 'ProductsPage',
  component: ProductsPage
} as ComponentMeta<typeof ProductsPage>

const Template: ComponentStory<typeof ProductsPage> = args => (
  <ProductsPage {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  products: data.products,
  implicitTags: data.implicitTags,
  tags: data.tags,
  path: '/products',
  minPrice: data.minPrice,
  maxPrice: data.maxPrice,
  sortOptions: data.sortOptions,
}
