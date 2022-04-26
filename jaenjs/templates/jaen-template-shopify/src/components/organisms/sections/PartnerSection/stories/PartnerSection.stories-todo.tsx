import React from 'react'
import {Image} from '@chakra-ui/react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {PartnerSection} from '../PartnerSection'

export default {
  title: 'Components/Organisms/Sections/PartnerSection',
  component: PartnerSection,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof PartnerSection>

const Template: ComponentStory<typeof PartnerSection> = args => (
  <PartnerSection />
)

export const Default = Template.bind({})
