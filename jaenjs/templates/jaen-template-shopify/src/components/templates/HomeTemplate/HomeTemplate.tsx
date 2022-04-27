import React from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  Divider
} from '@chakra-ui/layout'

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
import {ParallaxBackground} from '../../molecules/ParallaxBackground'

export interface HomeTemplateProps {
  aboutSection: AboutSectionProps
  faqSection: FAQSectionProps
  heroSection: HeroSectionProps
  featuredProductsSection: FeaturedProductsSectionProps
  reviewSection: ReviewSectionProps
}

export const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <>
      <HeroSection {...props.heroSection} />
      <FeaturedProductsSection {...props.featuredProductsSection} />
      <Box position={'relative'}>
        <ParallaxBackground strokeColor="#dbd8d2" backgroundColor="#1f1f1d"/>
        <ReviewSection {...props.reviewSection} />
        <FAQSection {...props.faqSection} />
      </Box>
      <AboutSection {...props.aboutSection} />
    </>
  )
}
