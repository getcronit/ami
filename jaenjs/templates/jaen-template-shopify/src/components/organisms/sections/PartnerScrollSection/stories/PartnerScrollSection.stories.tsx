import React from 'react'
import {Box} from '@chakra-ui/react'
import {withJaenMock} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {StaticImage} from 'gatsby-plugin-image'
import {Field} from '@jaenjs/jaen'

import {PartnerScrollSectionJSX} from '../PartnerScrollSection'
import {jaenData} from './jaen-data'

export default {
  title: 'Components/Organisms/Sections/PartnerScrollSection',
  component: PartnerScrollSectionJSX,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage: jaenData.jaenPage})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof PartnerScrollSectionJSX>

const Template: ComponentStory<typeof PartnerScrollSectionJSX> = args => (
  <div
    style={{
      width: '900px',
      height: '300px',
      margin: '100px'
    }}>
      <PartnerScrollSectionJSX
        name={args.name}
        displayName={args.displayName}
      />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  name: 'partner',
  displayName: 'Partner'
}