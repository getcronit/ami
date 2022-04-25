import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {WeaponShowcase} from '../WeaponShowcase'

import data from './data'

export default {
  title: 'Components/Molecules/WeaponShowcase',
  component: WeaponShowcase,
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
} as ComponentMeta<typeof WeaponShowcase>

const Template: ComponentStory<typeof WeaponShowcase> = args => (
  <WeaponShowcase {...args} />
)

export const Default = Template.bind({})
Default.args = {
  weapons: data.products
}
