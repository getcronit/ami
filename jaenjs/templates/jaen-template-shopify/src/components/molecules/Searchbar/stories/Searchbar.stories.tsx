import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Searchbar} from '../Searchbar'
import * as ProductsPageStories from '../../../pages/ProductsPage/stories/ProductsPage.stories'

export default {
  title: 'Searchbar',
  component: Searchbar
} as ComponentMeta<typeof Searchbar>

const Template: ComponentStory<typeof Searchbar> = args => (
  <Searchbar {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  searchResultProducts: ProductsPageStories.Simple.args?.products
}
