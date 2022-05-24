import React, {ReactNode} from 'react'
import {Box, Container, Flex, HStack, Divider, Heading} from '@chakra-ui/layout'
import {useColorModeValue} from '@chakra-ui/react'
import {Field, connectSection} from '@jaenjs/jaen'
import {StaticImage} from 'gatsby-plugin-image'
import {Slider} from '@snek-at/uikit'

import {Bullet} from '../../../atoms/Bullet'
import {FixedStrokeLogo} from '../../../molecules/FixedStrokeLogo'
import {getThemeColor} from '../../../../common/utils'
import {PartnerScrollSection} from '../PartnerScrollSection'
import * as style from './style'

export interface PartnerSectionProps {
  anchor?: string
  name: string
  displayName: string
}

export interface PartnerProps {
  anchor?: string
  heading: ReactNode
  partnerscrollsections: ReactNode
}

export const Partner = ({anchor, heading, partnerscrollsections}: PartnerProps) => {
  return (
    <Box
      id={anchor}
      position="relative"
      overflow="hidden"
      pb="10"
      // pt="6"
      css={style.Section}>
      {/* <Box position="absolute" top="0" bg="red" boxSize="300px"/> */}
      <Divider
        orientation='horizontal'
        position="absolute"
        boxSizing='border-box'
        // w="85vw"
        // h="100%"
        top="0"
        left={{ base: '0', '2xl': "calc(4em + 2.5vw)" }}
        //left="5vw"
        borderColor="#dbd8d2"
      />
      <Divider
        orientation='vertical'
        position="absolute"
        top="0"
        left="calc(4em + 2.5vw)"
        borderColor="#dbd8d2"
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
        <Slider flexDir="column" alignItems="stretch" w="100%" elementProps={{boxSize: "none"}}>
          {partnerscrollsections}
        </Slider>
      </Container>
    </Box>
  )
}

export const PartnerSection = ({
  anchor,
  name,
  displayName
}: PartnerSectionProps) => 
  connectSection(() => {
    return (
      <Partner
        anchor={anchor} 
        heading={<Field.Text name="heading" defaultValue={'Partner'} />}
        partnerscrollsections={
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
            displayName="Partner"
            sections={[PartnerScrollSection({name: `partner-item`, displayName: "Partner"})]}
          />
        }
      />
    )
  },
  {
    name: name,
    displayName: displayName
  }
)

export const PartnerSectionJSX = ({name, displayName, anchor}: PartnerSectionProps) => (
  <Field.Section
    name={name}
    displayName={displayName}
    sections={[PartnerSection({name: `${name}-item`, anchor, displayName})]}
  />
)
