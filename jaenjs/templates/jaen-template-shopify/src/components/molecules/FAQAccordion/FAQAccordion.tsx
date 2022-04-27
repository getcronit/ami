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

interface FAQAccordionSectionItem {
  name: string
  displayName: string
}

const FAQAccordionSectionItem = ({name, displayName}: FAQAccordionSectionItem) => connectSection(
  () => {
    return (
      <AccordionItem>
        <AccordionButton
          borderTopRadius="7px"
          borderBottomRadius="7px"
          _expanded={{
            bg: 'agt.red',
            color: 'white',
            borderBottomRadius: "0px",
            _hover: {bg: '#BD0F1B'}
          }}
          bg="white"
          borderStyle="border-box"
          border="1px solid"
          borderColor="gray.200"
          // borderStyle="solid"
          _hover={{bg: '#D4D4D9'}}
          py="2">
          <Box flex="1" textAlign="left" px={4}>
            <Field.Text name="question" defaultValue="Frage" />
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel
          bg="white"
          pb={4}
          pt={2}
          px={4}
          borderBottomRadius="7px">
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
    name: name,
    displayName: displayName
  }
)

export interface FAQAccordionProps {
  name: string
  displayName: string
}

export const FAQAccordion = ({name, displayName}:FAQAccordionProps) => {
  return (
    <Box css={{'*': {borderStyle: 'none'}}} h="100%">
      <Field.Section
        as={Accordion}
        props={{
          bg: 'white',
          borderRadius: '7px',
          w: '100%',
          defaultIndex: [0]
        }}
        name={name}
        displayName={displayName}
        sections={[FAQAccordionSectionItem({name: `${name}-item`, displayName})]}
      />
    </Box>
  )
}
