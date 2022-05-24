import React from 'react'
import {withJaenMock, Field} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {FeaturedProductsSectionJSX} from '../FeaturedPartnerSection'
import {jaenData} from './jaen-data'
import data from './data'

export default {
  title: 'Components/Organisms/Sections/FeaturedPartnerSection',
  component: FeaturedProductsSectionJSX,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {
        jaenPage: {...jaenData.jaenPage}
      })
      return <MockedStory />
    }
  ]
} as ComponentMeta<typeof FeaturedProductsSectionJSX>

const Template: ComponentStory<typeof FeaturedProductsSectionJSX> = args => (
  <FeaturedProductsSectionJSX {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: 'featuredpartner',
  displayName: 'Empfehlungen/Partner',
  featuredAnchor: '',
  partnerAnchor: '',
  productsPagePath: '',
  featuredProducts: data.products
}
