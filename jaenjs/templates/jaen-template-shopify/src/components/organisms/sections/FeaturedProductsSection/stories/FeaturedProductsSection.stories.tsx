import React from 'react'
import {withJaenMock} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'
import {Field} from '@jaenjs/jaen'

import {FeaturedProductsSectionJSX} from '../FeaturedProductsSection'
import {jaenData} from './jaen-data'
import data from './data'

export default {
  title: 'Components/Organisms/Sections/FeaturedProductsSection',
  component: FeaturedProductsSectionJSX,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage: {...jaenData.jaenPage}})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof FeaturedProductsSectionJSX>

const Template: ComponentStory<typeof FeaturedProductsSectionJSX> = args => (
  <FeaturedProductsSectionJSX {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: "featured",
  displayName: "Empfohlen",
  anchor: "",
  productsPagePath: "",
  featuredProducts: data.products
}
