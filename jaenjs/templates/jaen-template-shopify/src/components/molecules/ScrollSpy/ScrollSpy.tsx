import React from 'react'
import Scrollspy from 'react-scrollspy'
import {scroller as Scroll} from 'react-scroll'
import {Box, Flex, Text} from '@chakra-ui/react'

import {Spy} from '../../../common/assets/Spy'
import * as style from './style'

export interface ScrollSpyProps {
  anchors: Array<{
    name: string
    label: string
  }>
}

export const ScrollSpy = ({anchors}: ScrollSpyProps) => {
  // 'hero', 'featuredproducts', 'reviews', 'news', 'about', 'faq'
  const allItemAnchors = anchors.map(anchor => anchor.name)

  const [activeSection, setActiveSection] = React.useState<string>('hero')

  const scrollTo = (element: string | undefined) => {
    if (element) {
      Scroll.scrollTo(element, {smooth: true, duration: 1000, offset: -100})
    }
  }

  return (
    <Flex
      color="white"
      position="fixed"
      bottom="0"
      left="0"
      display={{base: 'none', md: 'flex'}}
      flexDirection="column"
      zIndex="999"
      css={style.Spy}>
      <Scrollspy
        offset={-500}
        items={allItemAnchors}
        onUpdate={(data: any) => {
          if (typeof data !== 'undefined') setActiveSection(data.id)
        }}
        currentClassName="active-scroll-spyy">
        <Box
          className='scrollto'
          bg="agt.gray"
          py="1"
          px="2"
          borderTopRightRadius={'5px'}>
          {anchors.map((anchor, index) => (
            <Flex
              className='spyblock'
              alignItems="center"
              bg="agt.gray"
              py="1"
              onClick={() => scrollTo(anchor?.name)}>
              <Spy
                className='spy'
                number={index}
                style={{
                  color: anchor?.name != activeSection ? 'transparent' : ''
                }}
              />
              <Text
                fontWeight={'thin'}
                ml="2"
                fontSize={'md'}
                color="white"
                className="text"
                casing={'capitalize'}>
                {anchor?.label}
              </Text>
            </Flex>
          ))}
        </Box>
        <Flex
          className='spyblock spyblock-0'
          alignItems="center"
          bg="agt.gray"
          py="1"
          px="2">
          <Spy
            className='spy'
            number={allItemAnchors.indexOf(activeSection)}
            style={{
              color: anchors.find(anchor => anchor.name === activeSection)?.name != activeSection ? 'transparent' : ''
            }}
          />
          <Text
            fontWeight={'thin'}
            ml="2"
            fontSize={'md'}
            color="white"
            className="text"
            casing={'capitalize'}>
            {anchors.find(anchor => anchor.name === activeSection)?.label}
          </Text>
        </Flex>
      </Scrollspy>
    </Flex>
  )
}
