import {PageProps} from 'gatsby'
import * as React from 'react'
import {Layout} from '../components/Layout'

// markup
const NotFoundPage = (props: PageProps) => {
  return (
    <Layout path={props.path}>
      <h1>NOT FOUND</h1>
    </Layout>
  )
}

export default NotFoundPage
