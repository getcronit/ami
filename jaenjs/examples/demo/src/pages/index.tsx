import {connectPage, useAnalytics} from '@jaenjs/jaen'
import {graphql} from 'gatsby'
import * as React from 'react'
import {Footer, Hero, Navbar} from '../components'

// markup
const IndexPage: React.FC = () => {
  //const {toggleHideUI, hideUI} = useJaenCoreContext()

  const analytics = useAnalytics()

  return (
    <>
      <Navbar />
      <Hero />

      <Footer />
    </>
  )
}

export default connectPage(IndexPage, {
  displayName: 'IndexPage'
})

export const query = graphql`
  query($jaenPageId: String!) {
    ...JaenPageQuery
  }
`
