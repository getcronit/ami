import {connectTemplate, Field} from '@jaenjs/jaen'
import {graphql} from 'gatsby'
import React from 'react'

export default connectTemplate(
  () => {
    return <Field.Text name="test" defaultValue="<p>Hello World</p>" />
  },
  {
    displayName: 'Blog Page',
    children: ['BlogPage', 'ArticlePage'],
    isRootTemplate: true
  }
)

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`
