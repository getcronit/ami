import React from 'react'
import {Box} from '@chakra-ui/layout'

import {ParallaxBackground} from '../../molecules/ParallaxBackground'
import {ScrollSpy, ScrollSpyProps} from '../../molecules/ScrollSpy'
import {SideButtons, SideButtonsProps} from '../../molecules/buttons/SideButtons'
import {ScrollToTopButton, ScrollToTopButtonProps} from '../../molecules/buttons/ScrollToTopButton'
import {
  AboutSection,
  AboutSectionProps,
  FAQSection,
  FAQSectionProps,
  FeaturedProductsSection,
  HeroSection,
  ReviewSection,
  HeroSectionProps,
  FeaturedProductsSectionProps,
  ReviewSectionProps
} from '../../organisms/sections'

export interface HomeTemplateProps {
  aboutSection: AboutSectionProps
  faqSection: FAQSectionProps
  heroSection: HeroSectionProps
  featuredProductsSection: FeaturedProductsSectionProps
  reviewSection: ReviewSectionProps
  // sideButtons?: SideButtonsProps
  // scrollToTopButton?: ScrollToTopButtonProps
  // scrollSpy?: ScrollSpyProps
}

export const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <>
      <HeroSection anchor="hero" {...props.heroSection} />
      <FeaturedProductsSection anchor="featuredproducts" {...props.featuredProductsSection} />
      <Box position={'relative'}>
        <ParallaxBackground strokeColor="#dbd8d2" backgroundColor="#1f1f1d"/>
        <ReviewSection anchor="reviews" {...props.reviewSection} />
        <FAQSection anchor="faq" {...props.faqSection} />
      </Box>
      <AboutSection anchor="about" {...props.aboutSection} />
      <SideButtons onMailButtonClick={() => null} onLocationButtonClick={() => null} onPhoneButtonClick={() => null}/>
      <ScrollToTopButton onScrollToTopClick={() => null}/>
      <ScrollSpy 
        anchors={[
          {
            name: 'hero',
            label: 'AGT'
          },
          {
            name: 'featuredproducts',
            label: 'Sortiment'
          },
          {
            name: 'reviews',
            label: 'Bewertungen'
          },
          {
            name: 'faq',
            label: 'FAQ'
          },
          {
            name: 'about',
            label: 'Über uns'
          }
        ]}
      />
    </>
  )
}
