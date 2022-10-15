import {createClient, Provider} from 'urql'

import {GATSBY_MYSHOPIFY_URL, GATSBY_STOREFRONT_API_KEY} from './env'

const headers: {
  [key: string]: string
} = {}

if (GATSBY_STOREFRONT_API_KEY) {
  headers['X-Shopify-Storefront-Access-Token'] = GATSBY_STOREFRONT_API_KEY
}

console.log(`headers: ${JSON.stringify(headers)}`)

const urqlClient = createClient({
  url: `https://${GATSBY_MYSHOPIFY_URL}/api/2022-04/graphql.json`,
  fetchOptions: {
    headers
  }
})

export const SearchProvider = ({children}: any) => {
  return <Provider value={urqlClient}>{children}</Provider>
}
