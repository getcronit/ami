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
          overflow: 'hidden',
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
    New: {
      title: 'New',
      items: data.products,
    },
    Handfeuerwaffen: {
      title: 'Handfeuerwaffen',
      items: data.products,
    },
    Flinten: {
      title: 'Flinten',
      items: data.products,
    }
  }
}
