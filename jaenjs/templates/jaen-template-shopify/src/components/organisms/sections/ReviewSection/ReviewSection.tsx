import React from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  Divider
} from '@chakra-ui/layout'
import {useBreakpointValue} from '@chakra-ui/media-query'
import {AnimatePresence} from 'framer-motion'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {ReviewCard} from '../../../molecules/ReviewCard'
import {ParallaxBackground} from '../../../molecules/ParallaxBackground'
import {StickyStrokeLogo} from '../../../molecules/StickyStrokeLogo'

import {Bullet} from '../../../atoms/Bullet'
import {Slider} from '@snek-at/uikit'
import * as style from './style'


interface ReviewType {
  id: string
  sourceImage: string
  source: string
  rating: string
  body: string
}
export interface ReviewSectionProps {
  heading: React.ReactNode
  data: ReviewType[]
}

export const ReviewSection = ({heading, data}: ReviewSectionProps) => {
  const reviewsForSlider = data.map((review: ReviewType) => (
    <ReviewCard
      reviewId={review.id}
      reviewImage={review.sourceImage}
      reviewName={review.source}
      reviewRating={review.rating}
      reviewText={review.body}
    />
  ))

  return (
    <>
      <StickyStrokeLogo strokeColor="#dbd8d2" backgroundColor="#1f1f1d" />
      <Box position="relative" bg="agt.gray" overflow="hidden" color="ece8e1" py={16} css={style.Section}>
        <ParallaxBackground strokeColor="#dbd8d2" backgroundColor="#1f1f1d"/>
        <Divider
            orientation='vertical'
            position="absolute"
            // w="0"
            // h="100%"
            top="0"
            left="5vw"
            // borderLeft="1px"
            borderColor="#dbd8d2"
          />
        <VStack textAlign="center">
          <Heading size={'2xl'} color="white" maxW="50vw">
            {heading}
          </Heading>
          <Bullet color="agt.red" w="unset" fontSize="xl" mt="5" mb="10" />
        </VStack>

        <Container maxW="8xl" py={16}>
          <Slider>{reviewsForSlider}</Slider>
        </Container>
      </Box>
    </>
  )
}
