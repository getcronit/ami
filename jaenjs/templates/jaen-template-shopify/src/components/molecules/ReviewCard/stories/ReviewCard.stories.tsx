import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'
import {ReviewCard} from '../ReviewCard'

export default {
  title: 'Components/Molecules/ReviewCard',
  component: ReviewCard,
  decorators: [
    Story => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '300px'
        }}>
        <Story />
      </div>
    )
  ]
} as ComponentMeta<typeof ReviewCard>

const Template: ComponentStory<typeof ReviewCard> = args => (
  <ReviewCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  reviewImage: '',
  reviewRating: '3',
  reviewName: 'Daniel Peter',
  reviewText: 'Alls good in the neighbourhood'
}
