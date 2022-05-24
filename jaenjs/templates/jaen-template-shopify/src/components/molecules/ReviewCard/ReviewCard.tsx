//#region > Imports
import React from 'react'
import {
  Box,
  BoxProps,
  Flex,
  Link,
  Text,
  Spacer,
  HStack,
  VStack,
  StackDivider
} from '@chakra-ui/layout'
import {Avatar} from '@chakra-ui/react'
import {IconContext} from '@react-icons/all-files'
import {AiFillStar} from '@react-icons/all-files/ai/AiFillStar'
import {Modal, ModalContent, ModalOverlay} from '@chakra-ui/modal'

import * as style from './style'
//#endregion

//#region > Interfaces
export interface ReviewCardProps {
  reviewText: string
  reviewImage: string
  reviewRating: number
  reviewName: string
}
//#endregion

//#region > Functions
export const ReviewCard = ({
  reviewRating,
  reviewImage,
  reviewText,
  reviewName
}: ReviewCardProps) => {
  const createReviewStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      const color = rating <= i ? '#E2E8F0' : '#ef3340'

      stars.push(
        <IconContext.Provider value={{color: color, size: '20px'}}>
          <AiFillStar />
        </IconContext.Provider>
      )
    }
    return stars
  }

  const stars = createReviewStars(reviewRating)

  return (
    <Box css={style.Borderline}>
      <VStack
        className='borderline'
        bg="primary"
        // minH="200px"
        borderRadius="5px"
        border="1px"
        borderColor="border"
        boxSizing='border-box'
        _hover={{
          before: {borderColor: 'agt.red'},
          _after: {borderColor: 'agt.red'}
        }}
        p="5"
        maxW="sm"
        divider={<StackDivider />}>
        <Text noOfLines={4} minH="100px" mb="1">
          {reviewText}
        </Text>
        <HStack w="100%">
          <Avatar src={reviewImage} boxSize="48px" />
          <Box my="auto">
            <Text fontWeight="bold" isTruncated maxW="100%">
              {reviewName}
            </Text>
            <Flex>{stars.map(star => star)}</Flex>
          </Box>
        </HStack>
      </VStack>
    </Box>
  )
}
//#endregion
