import React from 'react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {CollectionTemplate} from '../CollectionTemplate'
import data from './data'

export default {
  title: 'Components/Templates/CollectionTemplate',
  component: CollectionTemplate
} as ComponentMeta<typeof CollectionTemplate>

const Template: ComponentStory<typeof CollectionTemplate> = args => (
  <CollectionTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  shopifyCollection: data.shopifyCollection,
  subCollections: data.subCollections,
  relatedProducts: data.relatedProducts,
  path: data.path
}
