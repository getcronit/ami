import React, {ReactNode} from 'react'
import {
  Grid,
  GridItem,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  HStack,
  VStack,
  Divider,
  AspectRatio,
  useColorModeValue
} from '@chakra-ui/react'
import {Field, connectSection} from '@jaenjs/jaen'
import {StaticImage} from 'gatsby-plugin-image'
import {Bullet} from '../../../atoms/Bullet'
import {FixedStrokeLogo} from '../../../molecules/FixedStrokeLogo'
import {FeatureSectionJSX} from '../FeatureSection'
import {getThemeColor} from '../../../../common/utils'

export interface AboutSectionProps {
  anchor?: string
  name: string
  displayName: string
}

export interface AboutProps {
  anchor?: string
  heading: ReactNode
  toplefttext: ReactNode,
  topleftimage: ReactNode,
  bottomlefttext: ReactNode,
  bottomleftimage: ReactNode,
  rightsection: ReactNode
}

export const About = ({
  anchor,
  heading,
  toplefttext,
  topleftimage,
  bottomlefttext,
  bottomleftimage,
  rightsection
}: AboutProps) => {
  const baseAreas = `
    "one"
    "two"
    "three"
  `

  const lgAreas = `
    "one three"
    "two three"
  `

  return (
    <Box id={anchor} position='relative'>
      <Divider
        orientation="vertical"
        position="absolute"
        h="100%"
        top="0"
        left="calc(4em + 2.5vw)"
        border="1px"
        borderColor="gray.200"
        display={{ base: 'none', '2xl': 'block' }}
      />
      <Box w="100%" h="100%" position="absolute" style={{clip: "rect(0, auto, auto, 0)"}}>
        <FixedStrokeLogo strokeColor={getThemeColor("stroke")} backgroundColor={getThemeColor("background")} />
      </Box>
      <Container position='relative' py="10" maxW="8xl">
        <Box textAlign="center" my="10">
          <Heading size="2xl">
            {heading}
          </Heading>
          <Bullet color="agt.red" w="unset" fontSize="xl" mt="5" mb="10" />
        </Box>
        <Grid templateAreas={{base: baseAreas, lg: lgAreas}} gap={9}>
          <GridItem border="1px" borderColor="gray.200" borderRadius="7px" overflow="hidden" bg={useColorModeValue('white', 'gray.700')} area="one">
            <AspectRatio ratio={16/9} boxSize="full" css={{img: {objectFit: "cover"}}}>
              <Box position="relative">
                <Flex css={{img: {objectFit: "cover"}}} alignItems="stretch" w="100%" h="100%">
                  {topleftimage}
                </Flex>
                <Box position="absolute" top="0" left="0" w="60%" h="100%" color="white">
                  <Text>
                    {toplefttext}
                  </Text>
                </Box>
              </Box>
            </AspectRatio>
          </GridItem>
          <GridItem border="1px" borderColor="gray.200" borderRadius="7px" overflow="hidden" bg={useColorModeValue('white', 'gray.700')} area="two">
            <AspectRatio ratio={16/7} boxSize="full" css={{img: {objectFit: "cover"}}}>
              <Flex>
                <Box w="60%" h="100%">
                  <Text>
                    {bottomlefttext}
                  </Text>
                </Box>
                <Flex css={{img: {objectFit: "cover"}}} alignItems="stretch" w="40%" h="100%">
                  {bottomleftimage}
                </Flex>
              </Flex>
            </AspectRatio>
          </GridItem>
          <GridItem border="1px" borderColor="gray.200" overflow="hidden" borderRadius="7px" bg={useColorModeValue('white', 'gray.700')} area="three">
            {rightsection}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export const AboutSection = ({
  anchor,
  name,
  displayName
}: AboutSectionProps) => 
  connectSection(() => {
    return (
      <About
        anchor={anchor}
        heading={<Field.Text name="heading" defaultValue={'Über uns'} />}
        toplefttext={<Field.Text name="toplefttext" defaultValue={'Über uns'} rtf />}
        topleftimage={
          <Field.Image
            name="topleftimage"
            width="100%"
            height="100%"
            defaultValue={
              <StaticImage
                src="http://honor.ancorathemes.com/wp-content/uploads/2018/03/banner_5_bg.jpg"
                alt="Placeholder image for about feature"
              />
            }
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        }
        bottomlefttext={<Field.Text name="bottomlefttext" defaultValue={'Über uns'} rtf />}
        bottomleftimage={
          <Field.Image
            name="bottomleftimage"
            width="100%"
            height="100%"
            defaultValue={
              <StaticImage
                src="http://honor.ancorathemes.com/wp-content/uploads/2018/03/banner_5_bg.jpg"
                alt="Placeholder image for about feature"
              />
            }
            style={{
              width: "100%",
              height: "100%"
            }}
          />
        }
        rightsection={<FeatureSectionJSX name='features' displayName='Merkmale' />}
      />
    )
  },
  {
    name: name,
    displayName: displayName
  }
)

export const AboutSectionJSX = ({name, displayName, anchor}: AboutSectionProps) => (
  <Field.Section
    name={name}
    displayName={displayName}
    sections={[AboutSection({name: `${name}-item`, displayName, anchor})]}
  />
)
