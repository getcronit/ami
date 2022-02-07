import {Heading} from '@chakra-ui/react'
import {connectTemplate, Field} from '@jaenjs/jaen'
import {graphql} from 'gatsby'
import React from 'react'
import {StaticImage} from 'gatsby-plugin-image'

export default connectTemplate(
  () => {
    return (
      <>
        <Heading size="xl" as="h1">
          This is a Article
        </Heading>
        <Field.Text name="test" defaultValue="<p>Hello World</p>" />
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
      </>
    )
  },
  {displayName: 'Articles Page', children: ['BlogPage']}
)

export const query = graphql`
  query($jaenPageId: String!) {
    ...JaenPageQuery
  }
`
