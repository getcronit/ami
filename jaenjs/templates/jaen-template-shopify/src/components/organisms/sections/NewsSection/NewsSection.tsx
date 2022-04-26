import React from 'react'
import {scroller} from 'react-scroll'
import {useColorModeValue} from '@chakra-ui/color-mode'
import {
  AspectRatio,
  VStack,
  Stack,
  useDisclosure,
  Box,
  Heading,
  Text,
  Container,
  HStack,
  Divider
} from '@chakra-ui/react'

import {Bullet} from '../../../atoms/Bullet'
import {Field, useJaenPageIndex} from '@jaenjs/jaen'
import {StaticImage} from 'gatsby-plugin-image'

import {StickyStrokeLogo} from '../../../molecules/StickyStrokeLogo'
import {ParallaxBackground} from '../../../molecules/ParallaxBackground'
import NewsModal from '../../NewsModal'
import {Slider} from '@snek-at/uikit'
import * as style from './style'


export interface NewsSectionProps {
  heading: React.ReactNode
}

export const NewsSection = ({heading}: NewsSectionProps) => {
  const [childId, setChildId] = React.useState<string>()
  const [url, setUrl] = React.useState<string>()

  const index = useJaenPageIndex({
    jaenPageId: 'JaenPage /news/'
  })

  const {isOpen, onOpen, onClose} = useDisclosure()

  if (index.children.length === 0) {
    return null
  }

  return (
    <>
      <StickyStrokeLogo strokeColor="#dbd8d2" backgroundColor="white" />
      <Box position="relative" overflow="hidden" color="ece8e1" pb="4" css={style.Section}>
      <ParallaxBackground strokeColor="#dbd8d2" backgroundColor="white"/>
        <Divider
            orientation='vertical'
            position="absolute"
            className='bspacer'
            // w="0"
            // h="100%"
            top="0"
            left="5vw"
            // borderLeft="1px"
            borderColor="#dbd8d2"
          />
        <Container maxW="8xl" my={4} py={16}>
          <VStack textAlign="center">
            <Heading size={'2xl'} maxW="50vw">
              {heading}
            </Heading>
            <Bullet color="agt.red" w="unset" fontSize="xl" mt="5" mb="10" />
          </VStack>
          <Slider>
            {index.children.map(page => {
              React.useEffect(() => {
                if (
                  window &&
                  window.location.search ===
                    `?${page?.jaenPageMetadata?.title}` &&
                  !isOpen
                ) {
                  setChildId(page.id)
                  onOpen()
                  scroller.scrollTo('news', {offset: -200})
                }
              }, [])
              return index.withJaenPage(
                page.id,
                <Box
                  m={1}
                  width={'lg'}
                  onClick={() => {
                    onOpen()
                    setChildId(page.id)
                    setUrl(`?${page?.jaenPageMetadata?.title}`)
                  }}
                  css={style.CardStyle}>
                  <AspectRatio ratio={16 / 9}>
                    <Field.Image
                      name="main"
                      defaultValue={
                        <StaticImage
                          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                          alt="default image"
                          onDragStart={e => e.preventDefault()}
                          draggable="false"
                          className="image-container"
                          imgClassName="image"
                        />
                      }
                      className="image-container"
                      imgClassName="image"
                    />
                  </AspectRatio>
                  <Stack pt={4}>
                    <Text
                      color={'agt.blue'}
                      fontWeight={600}
                      fontSize={'sm'}
                      letterSpacing={1.1}>
                      <Field.Text name="highlight" defaultValue="Aktion" />
                    </Text>
                    <Heading
                      color={useColorModeValue('gray.700', 'white')}
                      fontSize={'2xl'}
                      fontFamily={'body'}>
                      <Field.Text name="heading" defaultValue="Titel" />
                    </Heading>
                    <Text color={'gray.500'} noOfLines={4}>
                      <Field.Text
                        name="description"
                        defaultValue=" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum."
                      />
                    </Text>
                  </Stack>
                </Box>
              )
            })}
          </Slider>
        </Container>
        {index.withJaenPage(
          childId || '',
          <NewsModal
            url={url || ''}
            highlight={<Field.Text name="highlight" defaultValue="Aktion" />}
            isOpen={isOpen}
            onClose={onClose}
            heading={<Field.Text name="heading" defaultValue="Titel" />}
            text={
              <Field.Text
                name="description"
                defaultValue=" Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum."
              />
            }
            image={
              <Field.Image
                name="main"
                defaultValue={
                  <StaticImage
                    src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="default image"
                  />
                }
              />
            }
          />
        )}
      </Box>
    </>
  )
}
