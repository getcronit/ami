import React from 'react'
import {withJaenMock} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {FAQAccordion} from '../FAQAccordion'
import {jaenPage} from './jaen-data'

export default {
  title: 'Components/Molecules/FAQAccordion',
  component: FAQAccordion,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof FAQAccordion>

const Template: ComponentStory<typeof FAQAccordion> = args => (
  <FAQAccordion {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: "faq",
  displayName: "Frage"
}
