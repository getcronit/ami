import React, {ReactNode} from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel
} from '@chakra-ui/accordion'
import {Box} from '@chakra-ui/layout'
import {useColorModeValue} from '@chakra-ui/react'
import {connectSection, Field} from '@jaenjs/jaen'


export interface FAQAccordionSectionProps {
  name: string
  displayName: string
}

export interface FAQAccordionProps {
  question: ReactNode
  answer: ReactNode
}

export const FAQAccordion = ({question, answer}: FAQAccordionProps) => {
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
        bg={useColorModeValue('white', 'gray.700')}
        borderStyle="border-box"
        border="1px solid"
        borderColor="gray.200"
        // borderStyle="solid"
        _hover={{bg: '#D4D4D9'}}
        py="2">
        <Box flex="1" textAlign="left" px={4}>
          {question}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel
        bg={useColorModeValue('white', 'gray.700')}
        pb={4}
        pt={2}
        px={4}
        borderBottomRadius="7px">
          {answer}
      </AccordionPanel>
    </AccordionItem>
  )
}

export const FAQAccordionSection = ({name, displayName}: FAQAccordionSectionProps) => connectSection(
  () => {
    return (
      <FAQAccordion
        question={<Field.Text name="question" defaultValue="Frage" />}
        answer={<Field.Text
          name="answer"
          defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat."
        />}
      />
    )
  },
  {
    name: name,
    displayName: displayName
  }
)

export const FAQAccordionSectionJSX = ({name, displayName}: FAQAccordionSectionProps) => (
  <Field.Section
    as={Accordion}
    name={name}
    displayName={displayName}
    sections={[FAQAccordionSection({name: `${name}-item`, displayName})]}
  />
)