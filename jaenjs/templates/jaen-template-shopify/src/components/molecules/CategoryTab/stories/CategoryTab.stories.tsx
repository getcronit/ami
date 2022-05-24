import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {CategoryTab} from '../CategoryTab'
import data from './data'

export default {
  title: 'Components/Molecules/CategoryTab',
  component: CategoryTab,
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
} as ComponentMeta<typeof CategoryTab>

const Template: ComponentStory<typeof CategoryTab> = args => (
  <CategoryTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  visible: 'visible',
  products: data.products,
  direction: 'row',
  prefixPath: "/produkte/"
}
