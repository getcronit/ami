import React from 'react'
import {withJaenMock} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {NewsSection} from '../NewsSection'

const newsPage = {id: "JaenPage /news/news-page-1", jaenPageMetadata: {title: "News Page 1"}}

export default {
  title: 'Components/Organisms/Sections/NewsSection',
  component: NewsSection,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage: {id: "JaenPage /news/", children: [newsPage, newsPage, newsPage]}, jaenPages: [newsPage]})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof NewsSection>

const Template: ComponentStory<typeof NewsSection> = args => (
  <NewsSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  heading: <h1>test</h1>
}
