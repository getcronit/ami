import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {CollectionPage} from '../CollectionPage'

import data from './data'

export default {
  title: 'CollectionPage',
  component: CollectionPage
} as ComponentMeta<typeof CollectionPage>

const Template: ComponentStory<typeof CollectionPage> = args => (
  <CollectionPage {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  shopifyCollection: data.shopifyCollection,
  subCollections: data.subCollections,
  relatedProducts: data.relatedProducts
}
