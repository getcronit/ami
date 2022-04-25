import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {BulletShowcase} from '../BulletShowcase'

export default {
  title: 'Components/Molecules/BulletShowcase',
  component: BulletShowcase,
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
} as ComponentMeta<typeof BulletShowcase>

const Template: ComponentStory<typeof BulletShowcase> = args => (
  <BulletShowcase {...args} />
)

export const Default = Template.bind({})
Default.args = {
  noScroll: true
}
