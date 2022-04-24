import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ProductCard} from '../ProductCard'
import * as ProductPageStories from '../../../templates/ProductTemplate/stories/ProductTemplate.stories'

export default {
  title: 'Components/Molecules/ProductCard',
  component: ProductCard,
  decorators: [
    storyFn => (
      <div
        style={{
          width: '300px',
          height: '300px',
          margin: '100px'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof ProductCard>

const Template: ComponentStory<typeof ProductCard> = args => (
  <ProductCard {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  product: ProductPageStories.Simple.args?.shopifyProduct
}

export const WithBorderline = Template.bind({})
WithBorderline.args = {
  product: ProductPageStories.Simple.args?.shopifyProduct,
  borderline: true
}
