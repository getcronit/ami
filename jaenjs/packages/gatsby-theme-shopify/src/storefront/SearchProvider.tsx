import {createClient, Provider} from 'urql'

const GATSBY_MYSHOPIFY_URL = process.env.GATSBY_MYSHOPIFY_URL
const GATSBY_STOREFRONT_API_KEY = process.env.GATSBY_STOREFRONT_API_KEY

console.log(`GATSBY_MYSHOPIFY_URL: ${GATSBY_MYSHOPIFY_URL}`)
console.log(`GATSBY_STOREFRONT_API_KEY: ${GATSBY_STOREFRONT_API_KEY}`)

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
