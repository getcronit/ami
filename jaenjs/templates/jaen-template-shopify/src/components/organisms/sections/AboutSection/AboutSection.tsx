import React from 'react'
import {
  Stack,
  Grid,
  GridItem,
  Container,
  Box,
  Flex,
  Text,
  Heading,
  Button,
  HStack,
  ButtonGroup,
  VStack,
  Image,
  Divider,
  AspectRatio
} from '@chakra-ui/react'
import {Field, connectSection} from '@jaenjs/jaen'
import {StaticImage} from 'gatsby-plugin-image'
import {Bullet} from '../../../atoms/Bullet'
import { Header } from '../../Header'

const FeatureSection = connectSection(
  () => {
    return (
      // <AspectRatio ratio={16/7} h="10%" css={{img: {objectFit: "cover"}}}>
      //   <Flex>
      //     <Flex css={{img: {objectFit: "cover"}}} alignItems="stretch" w="40%" h="100%">
      //       <Field.Image
      //         name="image"
      //         width="100%"
      //         height="100%"
      //         defaultValue={
      //           <StaticImage
      //             src="http://honor.ancorathemes.com/wp-content/uploads/2018/03/banner_5_bg.jpg"
      //             alt="Placeholder image for about feature"
      //           />
      //         }
      //       />
      //     </Flex>
      //     <Box w="60%" h="100%">
      //       <Text fontSize="3xl" fontWeight={'bold'}>
      //         <Field.Text name="title" defaultValue={'Titel'} />
      //       </Text>
      //       <Text fontSize="md" fontWeight={'semibold'} color="agt.blue">
      //         <Field.Text name="subtitle" defaultValue={'Subtitel'} />
      //       </Text>
      //     </Box>
      //   </Flex>
      // </AspectRatio>
      <HStack
        w={'100%'}
        borderBottom="1px"
        borderColor="#dbd8d2">
        <AspectRatio ratio={1} boxSize="24">
          <Flex css={{img: {objectFit: "cover"}}} alignItems="stretch" w="100%" h="100%">
            <Field.Image
              name="imagetopleft"
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
                height: "auto !important",
                objectFit: "cover",
              }}
            />
          </Flex>
        </AspectRatio>
        <Box flex={1}>
          <Text fontSize="3xl" fontWeight={'bold'}>
            <Field.Text name="title" defaultValue={'Titel'} />
          </Text>
          <Text fontSize="md" fontWeight={'semibold'} color="agt.blue">
            <Field.Text name="subtitle" defaultValue={'Subtitel'} />
          </Text>
        </Box>
      </HStack>
    )
  },
  {
    name: 'feature',
    displayName: 'Merkmal'
  }
)

export interface AboutSectionProps {
  anchor?: string
  heading: React.ReactNode
  teaser: React.ReactNode
  text: React.ReactNode
}

export const AboutSection = ({
  anchor,
  heading,
  teaser,
  text,
}: AboutSectionProps) => {
  const gridTemplateAreas = `
    "one three"
    "two three"
  `
  return (
    <Box id={anchor} bg="#ece8e1" position='relative' py={8}>
      <Divider
        orientation="vertical"
        position="absolute"
        // w="0"
        h="100%"
        top="0"
        left="5vw"
        // borderLeft="1px"
        borderColor="#dbd8d2"
      />
      <Container position={'relative'} maxW="8xl">
        <Box textAlign="center" my="10">
          <Heading size="2xl">{heading}</Heading>
          <Bullet color="agt.red" w="unset" fontSize="xl" mt="5" mb="10" />
        </Box>
        <Grid templateAreas={gridTemplateAreas} gap={8}>
          <GridItem border="1px" borderColor="gray.200" borderRadius="7px" overflow="hidden" bg="white" area="one">
            <AspectRatio ratio={16/10} boxSize="full" css={{img: {objectFit: "cover"}}}>
              <Box position="relative">
                <Flex css={{img: {objectFit: "cover"}}} alignItems="stretch" w="100%" h="100%">
                  <Field.Image
                    name="imagetopleft"
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
                      height: "auto !important",
                      objectFit: "cover",
                    }}
                  />
                </Flex>
                <Box position="absolute" top="0" left="0" w="60%" h="100%" color="white">
                  <Heading size="xl">
                    CONCEALED HANDGUN LICENSE
                  </Heading>
                  <Text>
                    Starting at Only $45.00. FREE Handgun Rental!
                  </Text>
                </Box>
              </Box>
            </AspectRatio>
          </GridItem>
          <GridItem border="1px" borderColor="gray.200" borderRadius="7px" overflow="hidden" bg="white" area="two">
            <AspectRatio ratio={16/7} boxSize="full" css={{img: {objectFit: "cover"}}}>
              <Flex>
                <Box w="60%" h="100%">
                  <Heading size="xl">
                    CONCEALED HANDGUN LICENSE
                  </Heading>
                  <Text>
                    Starting at Only $45.00. FREE Handgun Rental!
                  </Text>
                </Box>
                <Flex css={{img: {objectFit: "cover"}}} alignItems="stretch" w="60%" h="100%">
                  <Field.Image
                    name="bottomleft"
                    width="100%"
                    height="100%"
                    defaultValue={
                      <StaticImage
                        src="http://honor.ancorathemes.com/wp-content/uploads/2018/03/banner_5_bg.jpg"
                        alt="Placeholder image for about feature"
                      />
                    }
                  />
                </Flex>
              </Flex>
            </AspectRatio>
          </GridItem>
          <GridItem border="1px" borderColor="gray.200" overflow="hidden" borderRadius="7px" bg="white" area="three">
            <Field.Section
              as={VStack}
              props={{
                w: '100%',
                spacing: 0,
                justify: 'center'
              }}
              sectionProps={{
                w: '100%',
                h: '10%'
              }}
              name="features"
              displayName="Merkmale"
              sections={[FeatureSection]}
            />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}
