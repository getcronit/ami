import React from 'react'
import {graphql, PageProps} from 'gatsby'

import {PrivacyPage as PrivacyPageComponent} from '../components/pages'
import {Layout} from '../components/Layout'
import {connectPage} from '@jaenjs/jaen'

const ImprintPage = connectPage(
  ({path}: PageProps) => {
    return (
      <Layout path={path}>
        <PrivacyPageComponent path={path} />
      </Layout>
    )
  },
  {
    displayName: 'LegalPage'
  }
)

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`

export default ImprintPage
