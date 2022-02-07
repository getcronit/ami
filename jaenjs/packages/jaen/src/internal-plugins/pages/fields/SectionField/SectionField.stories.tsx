import {Box, Wrap, WrapItem} from '@chakra-ui/react'
import {JaenPageProvider} from '@jaen-pages/internal/services/page'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import Component from '.'
import {connectSection} from '../../../..'
import {EditButtonGroup} from '../../ui/toolbar'
import TextField from '../TextField'

export default {
  title: 'fields/SectionField',
  component: Component,
  decorators: [
    Story => (
      <JaenPageProvider
        jaenPage={{
          id: `JaenPage jaen-page-1`,
          slug: 'jaen-page-1',
          parent: null,
          children: [],
          jaenPageMetadata: {
            title: 'Jaen Page 1',
            description: 'Jaen Page 1 description',
            image: 'https://via.placeholder.com/300x200',
            canonical: 'https://jaen.com/jaen-page-1',
            datePublished: '2020-01-01',
            isBlogPost: false
          },
          jaenFields: null,
          jaenFiles: [],
          chapters: {
            'section-field-filled': {
              ptrHead: 'JaenSection foo-bar-baz-1',
              ptrTail: 'JaenSection foo-bar-baz-2',
              sections: {
                'JaenSection foo-bar-baz-1': {
                  jaenFields: null,
                  name: 'BoxSection',
                  ptrNext: 'JaenSection foo-bar-baz-2',
                  ptrPrev: null // this is the first section of the chapter
                },
                'JaenSection foo-bar-baz-2': {
                  jaenFields: null,
                  name: 'BoxSection',
                  ptrNext: null, // this is the last section of the chapter
                  ptrPrev: 'JaenSection foo-bar-baz-1'
                }
              }
            }
          },
          template: 'BlogPage'
        }}>
        <EditButtonGroup />
        <Story />
      </JaenPageProvider>
    )
  ]
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

//#region > Sections
const BoxSection = connectSection(
  () => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      BoxSection
    </Box>
  ),
  {name: 'BoxSection', displayName: 'Box Section'}
)

const FieldsSection = connectSection(
  () => (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
      <TextField name="tf" defaultValue="sample value" />
    </Box>
  ),
  {name: 'FieldsSection', displayName: 'Fields Section'}
)
//#endregion

export const NoSections: Story<ComponentProps> = Template.bind({})
NoSections.args = {
  name: 'section-field',
  displayName: 'Section Field',
  sections: []
}

export const Empty: Story<ComponentProps> = Template.bind({})
Empty.args = {
  name: 'section-field',
  displayName: 'Section Field',
  sections: [BoxSection]
}

export const Filled: Story<ComponentProps> = Template.bind({})
Filled.args = {
  name: 'section-field-filled',
  displayName: 'Section Field',
  sections: [BoxSection]
}

export const WithFields: Story<ComponentProps> = Template.bind({})
WithFields.args = {
  name: 'section-field-filled',
  displayName: 'Section Field with inner fields',
  sections: [FieldsSection]
}

export const MultipleSections: Story<ComponentProps> = Template.bind({})
MultipleSections.args = {
  name: 'section-field-filled',
  displayName: 'Section Field with multiple sections',
  sections: [BoxSection, FieldsSection]
}

export const Styled: Story<ComponentProps> = Template.bind({})
Styled.args = {
  name: 'section-field-filled',
  displayName: 'Section Field with inner fields',
  sections: [BoxSection],
  style: {
    border: 'red 1px solid'
  },
  sectionStyle: {
    border: 'blue 1px solid',
    maxWidth: '100px'
  }
}

export const Wrapped: Story<ComponentProps> = Template.bind({})
Wrapped.args = {
  name: 'section-field-filled',
  displayName: 'Section Field with inner fields',
  sections: [BoxSection],
  as: Wrap,
  sectionAs: WrapItem,
  props: {
    justify: 'center'
  }
}
