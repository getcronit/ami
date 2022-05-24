import React from 'react'
import {withJaenMock} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {NewsCard} from '../NewsCard'
import {jaenData} from './jaen-data'

export default {
  title: 'Components/Molecules/NewsCard',
  component: NewsCard,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage: {...jaenData.jaenPage}})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof NewsCard>


const Template: ComponentStory<typeof NewsCard> = args => (
  <div
    style={{
      margin: "100px"
    }}>
    <NewsCard />
  </div>
)

export const Default = Template.bind({})
