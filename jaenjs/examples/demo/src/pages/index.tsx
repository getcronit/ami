import {connectPage} from '@jaenjs/jaen'
import {graphql} from 'gatsby'
import * as React from 'react'
import {Footer, Hero, Navbar} from '../components'

// markup
const IndexPage: React.FC = () => {
  //const {toggleHideUI, hideUI} = useJaenCoreContext()

  return (
    <>
      <Navbar />
      <Hero />

      <Footer />
    </>
  )
}

export default connectPage(IndexPage, {
  displayName: 'IndexPage',
  children: []
})

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`
