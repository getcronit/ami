import type {GatsbyConfig} from 'gatsby'
import {getShopifyEnv} from './utils/env'

const shopifyEnv = getShopifyEnv()

const config: GatsbyConfig = {
  plugins: [
    {
      resolve: 'gatsby-source-shopify',
      options: {
        password: shopifyEnv.password,
        storeUrl: shopifyEnv.storeUrl,
        shopifyConnections: shopifyEnv.shopifyConnections,
        salesChannel: 'gatsby'
      }
    },
    'gatsby-plugin-image'
  ]
}

export default config
