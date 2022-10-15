import React from 'react'
import Client from 'shopify-buy'

import {GATSBY_MYSHOPIFY_URL, GATSBY_STOREFRONT_API_KEY} from './env'

const StoreContext = React.createContext({
  client: Client.buildClient({
    domain: GATSBY_MYSHOPIFY_URL || '',
    storefrontAccessToken: GATSBY_STOREFRONT_API_KEY || ''
  })
})

const withStoreContext =
  <T extends {}>(
    Component: React.ComponentType<
      T & {
        client: Client.Client
      }
    >
  ) =>
  (props: any) =>
    (
      <StoreContext.Consumer>
        {context => <Component {...props} {...context} />}
      </StoreContext.Consumer>
    )

export {withStoreContext, StoreContext as default}
