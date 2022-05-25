import {useProductSearch} from '@snek-at/gatsby-theme-shopify'
import {SearchProvider} from '@snek-at/gatsby-theme-shopify'
import {PageProps} from 'gatsby'
import * as React from 'react'
import {Layout} from '../components/Layout'
import {Button} from '@chakra-ui/react'

const TestSearch = () => {
  const r = useProductSearch({filters: {}, options: {count: 1}})

  console.log('search', r)

  return (
    <>
      <Button onClick={r.fetchNextPage}>Load more</Button>
      {JSON.stringify(r.products)}
    </>
  )
}

// markup
const NotFoundPage = (props: PageProps) => {
  return (
    <SearchProvider>
      <TestSearch />
      <Layout path={props.path}>
        <h1>NOT FOUND</h1>
      </Layout>
    </SearchProvider>
  )
}

export default NotFoundPage
