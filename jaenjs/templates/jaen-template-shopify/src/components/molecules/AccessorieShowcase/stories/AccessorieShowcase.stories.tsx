import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {AccessorieShowcase} from '../AccessorieShowcase'

export default {
  title: 'Components/Molecules/AccessorieShowcase',
  component: AccessorieShowcase,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '600px',
          height: '500px'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof AccessorieShowcase>

const Template: ComponentStory<typeof AccessorieShowcase> = args => (
  <AccessorieShowcase {...args} />
)

export const Default = Template.bind({})
Default.args = {
  noScroll: true
}
