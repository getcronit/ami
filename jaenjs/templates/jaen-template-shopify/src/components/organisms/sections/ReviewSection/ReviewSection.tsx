import React, {ReactNode} from 'react'
import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Divider
} from '@chakra-ui/layout'
import {Field, connectSection} from '@jaenjs/jaen'
import {Slider} from '@snek-at/uikit'

import {ReviewCard} from '../../../molecules/ReviewCard'
import {FixedStrokeLogo} from '../../../molecules/FixedStrokeLogo'
import {ParallaxBackground} from '../../../molecules/ParallaxBackground'
import {Bullet} from '../../../atoms/Bullet'
import {getThemeColor} from '../../../../common/utils'
import * as style from './style'


export interface ReviewItem {
  id: string
  sourceImage: string
  source: string
  rating: number
  body: string
}

export interface ReviewSectionProps {
  name: string
  displayName: string
  anchor?: string
  googleReviews: ReviewItem[]
}

export interface ReviewProps {
  anchor?: string
  bg?: string
  heading: ReactNode
  googleReviews: ReviewItem[]
}

export const Review = ({anchor, heading, googleReviews, bg}: ReviewProps) => {
  const reviewsForSlider = googleReviews.map((review: ReviewItem) => (
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
      <Box id={anchor} position="relative" overflow="hidden" bg={bg} color="ece8e1" pb="16" css={style.Section}>
        <Divider
          orientation='vertical'
          position="absolute"
          boxSizing='border-box'
          // w="0"
          // h="100%"
          top="0"
          left="calc(4em + 2.5vw)"
          // borderLeft="1px"
          borderColor="stroke"
          display={{ base: 'none', '2xl': 'block' }}
        />
        <Divider
          orientation='horizontal'
          position="absolute"
          boxSizing='border-box'
          w={{ base: '100%', '2xl': "calc(90vw - 4em - 2.5vw)" }}
          // h="100%"
          bottom="0"
          left={{ base: '0', '2xl': "calc(4em + 2.5vw)" }}
          // borderLeft="1px"
          borderColor="stroke"
        />
        <Divider
          orientation={undefined}
          position="absolute"
          boxSizing='border-box'
          style={{transformOrigin: 'left', transform: 'rotate(330deg)'}}
          w="15vw"
          bottom="0"
          left='90vw'
          borderColor="stroke"
          display={{ base: 'none', '2xl': 'block' }}
        />
        <Box w="100%" h="100%" position="absolute" style={{clip: "rect(0, auto, auto, 0)"}}>
          <FixedStrokeLogo strokeColor={getThemeColor("stroke")} backgroundColor={getThemeColor("agt.darkbackground")} />
        </Box>
        <Container position='relative' py="10" maxW="8xl">
          <Box textAlign="center" my="10">
            <Heading color="white" size="2xl">
              {heading}
            </Heading>
            <Bullet color="agt.red" w="unset" fontSize="xl" mt="5" mb="10" />
          </Box>
          <Slider flexDir="column" alignItems="stretch" w="100%" elementProps={{boxSize: "none"}}>
            <HStack spacing="9" h='100%' py="5" width="max-content" minW="100%" justifyContent="center">
              {reviewsForSlider}
            </HStack>
          </Slider>
        </Container>
      </Box>
    </>
  )
}

export const ReviewSection = ({
  name,
  displayName,
  anchor, 
  googleReviews
}: ReviewSectionProps) => 
  connectSection(() => {
    return (
      <Review
        anchor={anchor}
        bg="agt.darkbackground"
        heading={<Field.Text name="heading" defaultValue="Bewertungen" />}
        googleReviews={googleReviews}
      />
    )
  },
  {
    name: name,
    displayName: displayName
  }
)

export const ReviewSectionJSX = ({name, displayName, anchor, googleReviews}: ReviewSectionProps) => (
  <Field.Section
    name={name}
    displayName={displayName}
    sections={[ReviewSection({name: `${name}-item`, displayName, anchor, googleReviews})]}
  />
)
