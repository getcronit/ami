import React from 'react'
import {
  FeaturedProductsSection,
  HeroSection,
  HeroSectionProps,
  FeaturedProductsSectionProps
} from '../../organisms/sections'

export interface HomeTemplateProps {
  heroSection: HeroSectionProps
  featuredProductsSection: FeaturedProductsSectionProps
}

export const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <>
      <HeroSection {...props.heroSection} />
      <FeaturedProductsSection {...props.featuredProductsSection} />
    </>
  )
}
