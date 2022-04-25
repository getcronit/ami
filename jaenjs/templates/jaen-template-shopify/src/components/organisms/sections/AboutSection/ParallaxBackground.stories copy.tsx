import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ParallaxBackground} from './ParallaxHero'
import { relative } from 'path'

export default {
  title: 'Components/Molecules/ParallaxBackground',
  component: ParallaxBackground,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '300px'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof ParallaxBackground>

const Template: ComponentStory<typeof ParallaxBackground> = args => (
  <ParallaxBackground {...args} />
)

export const Dark = Template.bind({})
Dark.args = {
  strokeColor: "#dbd8d2",
  backgroundColor: "#1f1f1d",
  noScroll: true
}

export const Light = Template.bind({})
Light.args = {
  strokeColor: "#dbd8d2",
  backgroundColor: "#ece8e1",
  noScroll: true
}
