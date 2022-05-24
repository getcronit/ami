import React from 'react'
import {withJaenMock} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {HomeTemplate} from '../HomeTemplate'
// import {ScrollToTopButtonProps} from '../../../molecules/buttons/ScrollToTopButton'
// import {SideButtonsProps} from '../../../molecules/buttons/SideButtons'
// import {ScrollSpyProps} from '../../../molecules/ScrollSpy'
import {
  AboutSectionProps,
  FAQSectionProps,
  HeroSectionProps,
  ReviewSectionProps,
  ReviewFAQSectionProps,
  FeaturedProductsSectionProps,
  FeaturedPartnerSectionProps,
  NewsSectionProps,
  PartnerSectionProps
} from '../../../organisms/sections'
// import * as ScrollSpyStories from '../../../molecules/ScrollSpy/stories/ScrollSpy.stories'
// import * as ScrollToTopStories from '../../../molecules/buttons/ScrollToTopButton/stories/ScrollToTopButton.stories'
// import * as SideButtonsStories from '../../../molecules/buttons/SideButtons/stories/SideButtons.stories'
import * as AboutSectionStories from '../../../organisms/sections/AboutSection/stories/AboutSection.stories'
import * as FAQSectionStories from '../../../organisms/sections/FAQSection/stories/FAQSection.stories'
import * as HeroSectionStories from '../../../organisms/sections/HeroSection/stories/HeroSection.stories'
import * as FeaturedProductsSectionStories from '../../../organisms/sections/FeaturedProductsSection/stories/FeaturedProductsSection.stories'
import * as ReviewSectionStories from '../../../organisms/sections/ReviewSection/stories/ReviewSection.stories'
import * as ReviewFAQSectionStories from '../../../organisms/sections/ReviewFAQSection/stories/ReviewFAQSection.stories'
import * as NewsSectionStories from '../../../organisms/sections/NewsSection/stories/NewsSection.stories'
import * as PartnerSectionStories from '../../../organisms/sections/PartnerSection/stories/PartnerSection.stories'
import * as FeaturedPartnerSectionStories from '../../../organisms/sections/FeaturedPartnerSection/stories/FeaturedPartnerSection.stories'

import {jaenData as jaenPageAbout} from '../../../organisms/sections/AboutSection/stories/jaen-data'
import {jaenData as jaenPageFAQ} from '../../../organisms/sections/FAQSection/stories/jaen-data'
import {jaenData as jaenPageNews} from '../../../organisms/sections/NewsSection/stories/jaen-data'
import {jaenData as jaenPagePartner} from '../../../organisms/sections/PartnerSection/stories/jaen-data'

import {jaenData} from './jaen-data'

export default {
  title: 'Components/Templates/HomeTemplate',
  component: HomeTemplate,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {
        jaenPage: {
          ...jaenData.jaenPage,
          ...jaenPageAbout.jaenPage, 
          ...jaenPageFAQ.jaenPage, 
          ...jaenPageNews.jaenPage,
          //...jaenPagePartner.jaenPage,
          chapters: {
            ...jaenData.jaenPage.chapters,
            ...jaenPageAbout.jaenPage.chapters, 
            ...jaenPageFAQ.jaenPage.chapters,
            ...jaenPagePartner.jaenPage.chapters
          }
        },
        jaenPages: {
          ...jaenPageNews.jaenPages
        }
      })
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof HomeTemplate>

const aboutSectionArgs = AboutSectionStories.Default.args as AboutSectionProps
const faqSectionArgs = FAQSectionStories.Default.args as FAQSectionProps
const heroSectionArgs = HeroSectionStories.Default.args as HeroSectionProps
const featuredProductsSectionArgs = FeaturedProductsSectionStories.Default.args as FeaturedProductsSectionProps
const featuredPartnerSectionArgs = FeaturedPartnerSectionStories.Default.args as FeaturedPartnerSectionProps
const reviewSectionArgs = ReviewSectionStories.Default.args as ReviewSectionProps
const reviewFAQSectionArgs = ReviewFAQSectionStories.Default.args as ReviewFAQSectionProps
const newsSectionArgs = NewsSectionStories.Default.args as NewsSectionProps
const partnerSectionArgs = PartnerSectionStories.Default.args as PartnerSectionProps
// const scrollToTopButtonArgs = ScrollToTopStories.Default.args as ScrollToTopButtonProps
// const sideButtonsArgs = SideButtonsStories.Default.args as SideButtonsProps
// const scrollSpyArgs = ScrollSpyStories.Default.args as ScrollSpyProps

const Template: ComponentStory<typeof HomeTemplate> = args => (
  <HomeTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: "home",
  displayName: "Sections",
  aboutSection: aboutSectionArgs,
  faqSection: faqSectionArgs,
  heroSection: heroSectionArgs,
  featuredProductsSection: featuredProductsSectionArgs,
  featuredPartnerSection: featuredPartnerSectionArgs,
  reviewSection: reviewSectionArgs,
  reviewFAQSection: reviewFAQSectionArgs,
  newsSection: newsSectionArgs,
  partnerSection: partnerSectionArgs
  // sideButtons: sideButtonsArgs,
  // scrollToTopButton: scrollToTopButtonArgs,
  // scrollSpy: scrollSpyArgs
}
