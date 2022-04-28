import React from 'react'
import {Flex, IconButton} from '@chakra-ui/react'
import {FiArrowUp} from '@react-icons/all-files/fi/FiArrowUp'

export interface ScrollToTopButtonProps {
  onScrollToTopClick: () => void
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = props => {
  return (
    <Flex
      as="aside"
      color="white"
      position="fixed"
      bottom="120px"
      right="40px"
      display={{base: 'none', md: 'flex'}}
      flexDirection="column"
      zIndex="999"
      onClick={() => {
        props.onScrollToTopClick()
      }}>
      <IconButton
        as="a"
        // href="#root"
        bg="agt.blue"
        aria-label="ScrollToTop"
        icon={<FiArrowUp fontSize="40px" />}
      />
    </Flex>
  )
}
