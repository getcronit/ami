import React from 'react'
import Client from 'shopify-buy'

import {GATSBY_MYSHOPIFY_URL, GATSBY_STOREFRONT_API_KEY} from './env'

const StoreContext = React.createContext({
  client: Client.buildClient({
    domain: GATSBY_MYSHOPIFY_URL || '',
    storefrontAccessToken: GATSBY_STOREFRONT_API_KEY || '',
    apiVersion: '2023-01'
  })
})

const withStoreContext = <T extends {}>(
  Component: React.ComponentType<
    T & {
      client: Client
    }
  >
) => (props: any) => (
  <StoreContext.Consumer>
    {context => <Component {...props} {...context} />}
  </StoreContext.Consumer>
)

export {withStoreContext, StoreContext as default}
