import type {GatsbyConfig} from 'gatsby'
import dotenv from 'dotenv'

dotenv.config()

console.log(
  'FUCK FUCK',
  process.env.GATSBY_MYSHOPIFY_URL,
  process.env.SHOPIFY_APP_PASSWORD
)

const config: GatsbyConfig = {
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
        shopifyConnections: ['collections']
      }
    },
    'gatsby-plugin-image'
  ]
}

export default config
