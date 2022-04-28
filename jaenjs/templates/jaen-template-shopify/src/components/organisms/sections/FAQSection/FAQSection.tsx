import React from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel
} from '@chakra-ui/accordion'
import {
  Box,
  Container,
  Heading,
  Stack,
  Divider
} from '@chakra-ui/layout'
import {connectSection, Field} from '@jaenjs/jaen'

import {ContactForm} from '../../../molecules/ContactForm'
import {FAQAccordion} from '../../../molecules/FAQAccordion'

export interface FAQSectionProps {
  anchor?: string
  heading: React.ReactNode
}

export const FAQSection = ({anchor, heading}: FAQSectionProps) => {
  return (
    <Box id={anchor} w="full" position="relative" overflow="hidden" color="ece8e1" py="16">
      {/* <ParallaxBackground strokeColor="#dbd8d2" backgroundColor="#1f1f1d"/> */}
      <Divider
        orientation='vertical'
        position="absolute"
        top="0"
        left="5vw"
        borderColor="#dbd8d2"
      />
      <Container maxW="8xl" h="100%">
        <Stack
          direction={{base: 'column', md: 'row'}}
          h="100%"
          justifyContent="center"
          alignItems="center"
          spacing={8}>
          <Box w={{base: '100%', md: '50%'}} css={{'*': {borderStyle: 'none'}}} h="100%">
            <Heading mb="5" color="white">
              {heading}
            </Heading>
            <FAQAccordion name="faq" displayName="Frage" />
          </Box>
          <Box
            w={{base: '100%', md: '50%'}}
            bg="white"
            boxSizing='border-box'
            borderLeft="1px"
            borderColor="gray.200"
            borderRadius="5px"
            p="10"
            h="100%">
            <Heading mb="5" as="h3">
              Jetzt Anfragen
            </Heading>
            <ContactForm
              requestOptions={['Option A', 'Option B', 'Option C']}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}
