import React from 'react'
import {withJaenMock, Field} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {PartnerSectionJSX} from '../PartnerSection'
import {jaenData} from './jaen-data'

export default {
  title: 'Components/Organisms/Sections/PartnerSection',
  component: PartnerSectionJSX,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage: {...jaenData.jaenPage}})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof PartnerSectionJSX>

const Template: ComponentStory<typeof PartnerSectionJSX> = args => (
  <PartnerSectionJSX {...args} />
)

export const Default = Template.bind({})
Default.args = {
  anchor: "",
  name: "partner",
  displayName: "Partner",
}
