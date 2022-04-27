import React from 'react'
import {withJaenMock} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {FAQSection} from '../FAQSection'
import {jaenPage} from './jaen-data'

export default {
  title: 'Components/Organisms/Sections/FAQSection',
  component: FAQSection,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof FAQSection>

const Template: ComponentStory<typeof FAQSection> = args => (
  <FAQSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  heading: <p>This is me</p>
}
