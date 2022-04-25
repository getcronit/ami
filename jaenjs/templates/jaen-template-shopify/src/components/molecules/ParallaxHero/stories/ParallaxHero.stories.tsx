import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {ParallaxHero} from '../ParallaxHero'

export default {
  title: 'Components/Molecules/ParallaxHero',
  component: ParallaxHero,
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
} as ComponentMeta<typeof ParallaxHero>

const Template: ComponentStory<typeof ParallaxHero> = args => (
  <ParallaxHero {...args} />
)

export const Default = Template.bind({})
Default.args = {
  noScroll: true
}
