import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {ProductGrid} from '../ProductGrid'

import data from './data'


export default {
  title: 'Components/Molecules/ProductGrid',
  component: ProductGrid
} as ComponentMeta<typeof ProductGrid>

const Template: ComponentStory<typeof ProductGrid> = args => (
  <ProductGrid {...args} />
)

export const Default = Template.bind({})
Default.args = {
  heading: 'Related Products',
  products: data.products
}
