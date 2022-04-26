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
} from '@chakra-ui/layout'
import {connectSection, Field} from '@jaenjs/jaen'
import {ContactForm} from '../../../molecules/ContactForm'

const FaqSectionItem = connectSection(
  () => {
    return (
      <AccordionItem borderColor="#D4D4D9">
        <AccordionButton
          _expanded={{
            bg: 'agt.red',
            color: 'white',
            _hover: {bg: '#BD0F1B'}
          }}
          bg="agt.lightgray"
          _hover={{bg: '#D4D4D9'}}
          py="2">
          <Box flex="1" textAlign="left" px={4}>
            <Field.Text name="question" defaultValue="Frage" />
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          pb={4}
          pt={2}
          px={4}
          borderX="1px"
          borderColor="#D4D4D9">
          <Field.Text
            name="answer"
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat."
          />
        </AccordionPanel>
      </AccordionItem>
    )
  },
  {
    name: 'FaqSectionItem',
    displayName: 'Frage'
  }
)

export interface FAQSectionProps {
  heading: React.ReactNode
}

export const FAQSection = ({heading}: FAQSectionProps) => {
  return (
    <Box w="full" bg="agt.gray" py="16">
      <Container maxW="8xl" h="100%">
        <Stack
          id="faq"
          direction={{base: 'column', md: 'row'}}
          h="100%"
          justifyContent="center"
          alignItems="center"
          spacing={8}>
          <Box w={{base: '100%', md: '50%'}} h="100%">
            <Heading mb="5" color="white">
              {heading}
            </Heading>
            <Field.Section
              as={Accordion}
              props={{
                bg: 'white',
                borderRadius: '7px',
                w: '100%',
                defaultIndex: [0]
              }}
              name="faq"
              displayName="FAQ"
              sections={[FaqSectionItem]}
            />
          </Box>
          <Box
            w={{base: '100%', md: '50%'}}
            bg="agt.lightgray"
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
