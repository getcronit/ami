import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {FAQSection} from '../FAQSection'

export default {
  title: 'Components/Organisms/Sections/FAQSection',
  component: FAQSection,
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
} as ComponentMeta<typeof FAQSection>

const Template: ComponentStory<typeof FAQSection> = args => (
  <FAQSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  heading: <p>This is me</p>
}
