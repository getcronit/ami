import React from 'react'
import {
  Stack,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  HStack,
  ButtonGroup,
  VStack,
  AspectRatio
} from '@chakra-ui/react'
import {Field, connectSection} from '@jaenjs/jaen'
import {StaticImage} from 'gatsby-plugin-image'
import {Bullet} from '../../../atoms/Bullet'

const FeatureSection = connectSection(
  () => {
    return (
      <HStack
        w={'100%'}
        p={8}
        boxShadow="2px 0 0 0 #1f1f1d, 0 2px 0 0 #1f1f1d, 2px 2px 0 0 #1f1f1d,   /* Just to fix the corner */2px 0 0 0 #1f1f1d inset,  0 2px 0 0 #1f1f1d inset;">
        <Box flex={1}>
          <Text fontSize="3xl" fontWeight={'bold'}>
            <Field.Text name="title" defaultValue={'Titel'} />
          </Text>
          <Text fontSize="md" fontWeight={'semibold'} color="agt.blue">
            <Field.Text name="subtitle" defaultValue={'Subtitel'} />
          </Text>
        </Box>
        <AspectRatio ratio={1} boxSize="16">
          <Field.Image
            name="image"
            defaultValue={
              <StaticImage
                src="https://webstrot.com/html/weapon/light_version/assets/images/icons/01.png"
                alt="Placeholder image for about feature"
              />
            }
            style={{
              objectFit: 'contain'
            }}
          />
        </AspectRatio>
      </HStack>
    )
  },
  {
    name: 'feature',
    displayName: 'Merkmal'
  }
)

export interface AboutSectionProps {
  heading: React.ReactNode
  teaser: React.ReactNode
  text: React.ReactNode
}

export const AboutSection = ({
  heading,
  teaser,
  text,
}: AboutSectionProps) => {
  return (
    <Box bg="#ece8e1" position='relative' py={8}>
      <Container position={'relative'} maxW="8xl">
        <Flex
          direction={{
            base: 'column',
            md: 'row'
          }}>
          <Box w="100%">
            <Stack id="about" direction={{base: 'column', lg: 'row'}}>
              <Stack flex={1} justify={{lg: 'center'}}>
                <Box>
                  <Heading mb={5} size={'2xl'}>
                    <Field.Text name="heading" defaultValue={'Headingl'} />
                  </Heading>
                  <Bullet color="agt.red" w="unset" fontSize="xl" mb="10" />
                </Box>
                <Box py="3">
                  <Field.Text name="text" defaultValue={'textl'} />
                </Box>
                <ButtonGroup>
                  <Button
                    colorScheme="agt.blueScheme"
                    variant="outline"
                    size="lg">
                    Mehr erfahren
                  </Button>
                  <Button colorScheme="agt.blueScheme" variant="solid" size="lg">
                    Shop
                  </Button>
                </ButtonGroup>
              </Stack>
            </Stack>
          </Box>

          <Field.Section
            as={VStack}
            props={{
              w: '100%',
              spacing: 0,
              px: {base: 4, md: 36},
              py: {base: 8, md: 16},
              justify: 'center'
            }}
            sectionProps={{
              w: '100%'
            }}
            name="features"
            displayName="Merkmale"
            sections={[FeatureSection]}
          />
        </Flex>
      </Container>
    </Box>
  )
}
