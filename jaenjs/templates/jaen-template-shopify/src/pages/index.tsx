import {PageProps} from 'gatsby'
import * as React from 'react'
import {Layout} from '../components/Layout'

// markup
const IndexPage = (props: PageProps) => {
  return (
    <Layout path={props.path}>
      <h1>Your shop homepage</h1>
    </Layout>
  )
}

export default IndexPage
