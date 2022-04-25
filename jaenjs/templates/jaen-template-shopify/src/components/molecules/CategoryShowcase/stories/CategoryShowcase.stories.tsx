import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {CategoryShowcase} from '../CategoryShowcase'
import data from './data'

export default {
  title: 'Components/Molecules/CategoryShowcase',
  component: CategoryShowcase,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          marginTop: '200px',
          width: '100%',

          height: '500px'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof CategoryShowcase>

const Template: ComponentStory<typeof CategoryShowcase> = args => (
  <CategoryShowcase {...args} />
)

export const Default = Template.bind({})
Default.args = {
  tabs: {
    Handfeuerwaffen: {
      name: 'Handfeuerwaffen',
      path: '/handfeuerwaffen',
      items: data.products
    },
    Flinten: {
      name: 'Flinten',
      path: '/flinten',
      items: data.products
    }
  },
  latestProducts: data.products.slice(0, 3)
}
