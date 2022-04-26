import React from 'react'
import {
  FeaturedProductsSection,
  HeroSection,
  ReviewSection,
  HeroSectionProps,
  FeaturedProductsSectionProps,
  ReviewSectionProps
} from '../../organisms/sections'

export interface HomeTemplateProps {
  heroSection: HeroSectionProps
  featuredProductsSection: FeaturedProductsSectionProps
  reviewSection: ReviewSectionProps
}

export const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <>
      <HeroSection {...props.heroSection} />
      <FeaturedProductsSection {...props.featuredProductsSection} />
      <ReviewSection {...props.reviewSection} />
    </>
  )
}
