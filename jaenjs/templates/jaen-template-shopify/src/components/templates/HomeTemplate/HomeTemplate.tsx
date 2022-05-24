import React from 'react'
import {navigate} from 'gatsby'
import {Text, Box, VStack, Divider} from '@chakra-ui/layout'
import {Field} from '@jaenjs/jaen'
import {useColorModeValue} from '@chakra-ui/react'

import {ParallaxBackground} from '../../molecules/ParallaxBackground'
import {ScrollSpy, ScrollSpyProps} from '../../molecules/ScrollSpy'
import {SideButtons, SideButtonsProps} from '../../molecules/buttons/SideButtons'
import {ScrollToTopButton, ScrollToTopButtonProps} from '../../molecules/buttons/ScrollToTopButton'
// import {StickyStrokeLogo} from '../../molecules/StickyStrokeLogo'
import {
  AboutSection,
  AboutSectionProps,
  FAQSection,
  FAQSectionProps,
  FeaturedProductsSection,
  FeaturedProductsSectionProps,
  FeaturedPartnerSection,
  FeaturedPartnerSectionProps,
  HeroSection,
  HeroSectionProps,
  NewsSection,
  NewsSectionProps,
  ReviewSection,
  ReviewSectionProps,
  ReviewFAQSection,
  ReviewFAQSectionProps,
  PartnerSection,
  PartnerSectionProps
} from '../../organisms/sections'

export interface HomeTemplateProps {
  name: string
  displayName: string
  aboutSection: AboutSectionProps
  faqSection: FAQSectionProps
  heroSection: HeroSectionProps
  featuredProductsSection: FeaturedProductsSectionProps
  featuredPartnerSection: FeaturedPartnerSectionProps
  reviewSection: ReviewSectionProps
  reviewFAQSection: ReviewFAQSectionProps
  newsSection: NewsSectionProps
  partnerSection: PartnerSectionProps
  // sideButtons?: SideButtonsProps
  // scrollToTopButton?: ScrollToTopButtonProps
  // scrollSpy?: ScrollSpyProps
}

export const HomeTemplate = (props: HomeTemplateProps) => {
  return (
    <>
      <Field.Section
        as={VStack}
        props={{
          w: '100%',
          spacing: 0,
          justify: 'center'
        }}
        sectionProps={{
          w: '100%',
          h: '100%',
          position: 'relative',
          mt: 0
        }}
        name={props.name}
        displayName={props.displayName}
        sections={[
          HeroSection({...props.heroSection, anchor:"hero"}),
          FeaturedProductsSection({...props.featuredProductsSection, anchor: "featured"}),
          FeaturedPartnerSection({...props.featuredPartnerSection, partnerAnchor: "partner", featuredAnchor: "featured"}),
          PartnerSection({...props.partnerSection, anchor:"partner"}),
          ReviewSection({...props.reviewSection, anchor:"review"}),
          ReviewFAQSection({...props.reviewFAQSection, reviewAnchor: "review", faqAnchor: "faq"}),
          FAQSection({...props.faqSection, anchor:"faq"}), 
          AboutSection({...props.aboutSection, anchor:"about"}), 
          NewsSection({...props.newsSection, anchor:"news"})
        ]}
      />
      <SideButtons
        onMailButtonClick={() => navigate("/kontakt/")}
        onLocationButtonClick={() => navigate("/impressum/")}
        onPhoneButtonClick={() => navigate("/kontakt/")}
      />
      <ScrollToTopButton onScrollToTopClick={() => null}/>
      <ScrollSpy 
        anchors={[
          {
            name: 'hero',
            label: 'AGT'
          },
          {
            name: 'featured',
            label: 'Empfohlene Produkte'
          },
          {
            name: 'partner',
            label: 'Partner'
          },
          {
            name: 'review',
            label: 'Bewertungen'
          },
          {
            name: 'faq',
            label: 'Fragen'
          },
          {
            name: 'about',
            label: 'Über uns'
          },
          {
            name: 'news',
            label: 'Neuigkeiten'
          }
        ]}
      />
    </>
  )
}
