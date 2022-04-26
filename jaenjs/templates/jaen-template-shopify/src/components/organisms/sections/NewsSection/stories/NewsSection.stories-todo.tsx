import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {NewsSection} from '../NewsSection'

export default {
  title: 'Components/Molecules/NewsSection1',
  component: NewsSection,
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
} as ComponentMeta<typeof NewsSection>

const Template: ComponentStory<typeof NewsSection> = args => (
  <NewsSection {...args} />
)

export const Dark = Template.bind({})
Dark.args = {
  heading: <h1>test</h1>
}
