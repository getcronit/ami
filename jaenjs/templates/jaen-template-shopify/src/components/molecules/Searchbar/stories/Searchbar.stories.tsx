import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Searchbar} from '../Searchbar'
import * as ProductsPageStories from '../../../templates/ProductsTemplate/stories/ProductsPage.stories'

export default {
  title: 'Components/Molecules/Searchbar',
  component: Searchbar
} as ComponentMeta<typeof Searchbar>

const Template: ComponentStory<typeof Searchbar> = args => (
  <Searchbar {...args} />
)

export const Default = Template.bind({})
Default.args = {
  searchResultProducts: ProductsPageStories.Simple.args?.products
}
