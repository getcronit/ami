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


export interface FeatureSectionProps {
  name: string
  displayName: string
}

export interface FeatureProps {
  image: ReactNode
  heading: ReactNode
  lead: ReactNode
}

export const Feature = ({image, heading, lead}: FeatureProps) => {
  return (
    <Box css={{'*': {borderStyle: 'none'}}} h="100%" w='100%' bg={useColorModeValue('white', 'gray.700')} borderRadius="7px" >
      <AspectRatio ratio={16/4} w="100%" css={{img: {objectFit: "cover"}}}>
        <HStack>
          <Flex css={{img: {objectFit: "cover"}}} alignItems="stretch" w="30%" h="100%">
            {image}
          </Flex>
          <Box w="90%" h="100%">
            <Text fontSize="3xl" fontWeight="bold">
              {heading}
            </Text>
            <Text fontSize="md" fontWeight="semibold" color="agt.blue">
              {lead}
            </Text>
          </Box>
        </HStack>
      </AspectRatio>
    </Box>
  )
}

export const FeatureSection = ({name, displayName}: FeatureSectionProps) => connectSection(
  () => {
    return (
      <Feature 
        heading={<Field.Text name="heading" defaultValue="Heading" />}
        lead={<Field.Text name="lead" defaultValue="Lead" />}
        image={<Field.Image
          name="image"
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
        />}
      />
    )
  },
  {
    name: name,
    displayName: displayName
  }
)

export const FeatureSectionJSX = ({name, displayName}: FeatureSectionProps) => (
  <Field.Section
    as={VStack}
    props={{
      w: '100%',
      spacing: 3,
      justify: 'center'
    }}
    sectionProps={{
      w: '100%',
      h: '10%'
    }}
    name={name}
    displayName={displayName}
    sections={[FeatureSection({name: `${name}-item`, displayName: displayName})]}
  />
)