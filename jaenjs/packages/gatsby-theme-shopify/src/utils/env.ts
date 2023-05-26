import dotenv from 'dotenv'

dotenv.config()

export interface ShopifyEnv {
  password: string | undefined
  storeUrl: string | undefined
  shopifyConnections: string[]
  storefrontAccessToken: string | undefined
  downloadImages: boolean | undefined
}

export const getShopifyEnv = (): ShopifyEnv => {
  return {
    password: process.env.SHOPIFY_APP_PASSWORD,
    storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
    shopifyConnections: process.env.SHOPIFY_CONNECTIONS
      ? JSON.parse(process.env.SHOPIFY_CONNECTIONS)
      : undefined,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_API_KEY,
    downloadImages: process.env.SHOPIFY_DOWNLOAD_IMAGES === 'true'
  }
}
