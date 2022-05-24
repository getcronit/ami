import React, {ReactNode} from 'react'
import {
  Box,
  Flex,
  Text,
  HStack,
  VStack,
  AspectRatio,
  useColorModeValue
} from '@chakra-ui/react'
import {Field, connectSection} from '@jaenjs/jaen'
import {StaticImage} from 'gatsby-plugin-image'
import {Slider} from '@snek-at/uikit'


export interface PartnerScrollSectionProps {
  name: string
  displayName: string
}

export interface PartnerScrollProps {
  image: ReactNode
}

export const PartnerScroll = ({image}: PartnerScrollProps) => {
  return (
    <Flex css={{img: {objectFit: "cover"}}} 
      alignItems="stretch"
      w="max-content" 
      minW="280px" 
      h="200px" 
      p="5" 
      borderRadius="5px" 
      border="1px"
      borderColor="border"
      bg={useColorModeValue('white', 'gray.700')}>
      {image}
    </Flex>
  )
}

export const PartnerScrollSection = ({name, displayName}: PartnerScrollSectionProps) => connectSection(
  () => {
    return (
      <PartnerScroll
        image={<Field.Image
          name="image"
          height="100%"
          width="fit-content"
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
        />}
      />
    )
  },
  {
    name: name,
    displayName: displayName
  }
)

export const PartnerScrollSectionJSX = ({name, displayName}: PartnerScrollSectionProps) => (
  <Slider flexDir="column" alignItems="stretch" w="100%" elementProps={{boxSize: "none"}}>
    <Field.Section
      as={HStack}
      props={{
        h: '100%',
        py: "5",
        spacing: "5",
        width: "max-content",
        minW: "100%",
        justifyContent: "center"
      }}
      sectionProps={{
        h: '100%',
        // w: '100%'
      }}
      name="partner"
      displayName="Merkmale"
      sections={[PartnerScrollSection({name: `${name}-item`, displayName})]}
    />
  </Slider>
)