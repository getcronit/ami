import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {HomeTemplate} from '../HomeTemplate'
import * as HeroSectionStories from '../../../organisms/sections/HeroSection/stories/HeroSection.stories'
import {
  FeaturedProductsSectionProps,
  HeroSectionProps,
  ReviewSectionProps
} from '../../../organisms/sections'
import * as FeaturedProductsSectionStories from '../../../organisms/sections/FeaturedProductsSection/stories/FeaturedProductsSection.stories'
import * as ReviewSectionStories from '../../../organisms/sections/ReviewSection/stories/ReviewSection.stories'

export default {
  title: 'Components/Templates/HomeTemplate',
  component: HomeTemplate
} as ComponentMeta<typeof HomeTemplate>

const Template: ComponentStory<typeof HomeTemplate> = args => (
  <HomeTemplate {...args} />
)

const heroSectionArgs = HeroSectionStories.Default.args as HeroSectionProps
const featuredProductsSectionArgs = FeaturedProductsSectionStories.Default
  .args as FeaturedProductsSectionProps
const reviewSectionArgs = ReviewSectionStories.Default.args as ReviewSectionProps
  

export const Default = Template.bind({})
Default.args = {
  heroSection: heroSectionArgs,
  featuredProductsSection: featuredProductsSectionArgs,
  reviewSection: reviewSectionArgs
}
