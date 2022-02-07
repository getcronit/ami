import {Box, Divider, Heading, StackDivider, VStack} from '@chakra-ui/react'
import {connectPage, connectSection, Field} from '@jaenjs/jaen'
import {graphql} from 'gatsby'
import * as React from 'react'
import {Footer, Hero, Navbar} from '../components'

import {StaticImage} from 'gatsby-plugin-image'

const CardSection = connectSection(
  () => (
    <div className="card">
      <Field.Image
        name="image"
        defaultValue={
          <StaticImage
            src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
            alt="foo"
            style={{
              width: '100%',
              maxHeight: '200px'
            }}
          />
        }
        style={{
          width: '100%',
          maxHeight: '200px'
        }}
      />

      <div className="container">
        <h4>
          <b>
            <Field.Text name="name-text" defaultValue="John Doe" />
          </b>
        </h4>
        <Field.Text name="job-text" defaultValue="Architect & Engineer" />
      </div>
    </div>
  ),
  {
    displayName: 'Card',
    name: 'card'
  }
)

// markup
const AllFieldsPage: React.FC = () => {
  //const {toggleHideUI, hideUI} = useJaenCoreContext()

  return (
    <>
      <Heading>All fields</Heading>
      <Divider />
      <VStack divider={<StackDivider />}>
        <Box>
          <Heading>Text</Heading>
          <Field.Text name="text" defaultValue="This is a sample text" />
          <Heading>Text with RTF</Heading>
          <Field.Text
            name="text-rtf"
            rtf
            defaultValue="<strong>this is a strong sample text</strong>"
          />
        </Box>
        <Box>
          <Heading>Image</Heading>
          <Field.Image
            name="image"
            defaultValue={
              <StaticImage
                src="https://avatars.githubusercontent.com/u/52858351?v=4"
                alt="foo"
              />
            }
            style={{}}
            imgStyle={{}}
            className="image"
            imgClassName="image"
            width={200}
            height={200}
            layout="fixed"
            onError={() => {}}
            onLoad={() => {}}
            onStartLoad={() => {}}
          />
        </Box>
        <Box>
          <Heading>Choice</Heading>
          <Field.Choice
            name="choice"
            options={['option-1', 'option-2', 'option-3']}
            defaultValue="option-1"
            render={(selectedOption, options) => (
              <div>
                <h1>{selectedOption}</h1>
                <ul>
                  {options.map(option => (
                    <li key={option}>{option}</li>
                  ))}
                </ul>
              </div>
            )}
            renderPopover={(selectedOption, options, select) => (
              <div>
                <h1>{selectedOption}</h1>
                <ul>
                  {options.map(option => (
                    <li key={option} onClick={() => select(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          />
        </Box>
        <Box>
          <Heading>Section</Heading>
          <Field.Section
            name="field1"
            displayName="Field 1"
            sections={[CardSection]}
          />
        </Box>
        <Box>
          <Heading>Index</Heading>
          <Field.Index
            jaenPageId="JaenPage 0b6c2902-d43f-40ad-8f1f-a88b3c930d0f"
            renderPage={page => (
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden">
                1<Heading size="xs">{page.id}</Heading>2
                <Heading as="h2" size="xs">
                  {page.slug}
                </Heading>
                3
                <Heading as="h3" size="xs">
                  {page.jaenPageMetadata?.title}
                </Heading>
                <Field.Text
                  name="rich-text-field-1"
                  defaultValue="<p>richtext2<p>"
                  rtf
                />
              </Box>
            )}
          />
        </Box>
      </VStack>
    </>
  )
}

export default connectPage(AllFieldsPage, {
  displayName: 'All Fields',
  children: ['BlogPage', 'ArticlePage']
})

export const query = graphql`
  query($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`
