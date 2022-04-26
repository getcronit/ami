import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {ProductSpotlight} from '../ProductSpotlight'

import data from './data'

export default {
  title: 'Components/Molecules/ProductSpotlight',
  component: ProductSpotlight,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '500px'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof ProductSpotlight>

const Template: ComponentStory<typeof ProductSpotlight> = args => (
  <ProductSpotlight {...args} />
)

export const Default = Template.bind({})
Default.args = {
  products: data.products
}
