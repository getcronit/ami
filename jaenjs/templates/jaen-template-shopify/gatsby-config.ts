import type {GatsbyConfig} from 'gatsby'

import {site} from './jaen-data/internal.json'

import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const config: GatsbyConfig = {
  siteMetadata: site.siteMetadata,
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [`/jaen/admin`, `/_`],
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }`,
        resolveSiteUrl: () => site.siteMetadata.siteUrl,
        resolvePages: ({allSitePage: {nodes: allPages}}) => {
          return allPages.map(page => {
            return {...page}
          })
        },
        serialize: ({path, modifiedGmt}) => {
          return {
            url: path,
            lastmod: modifiedGmt
          }
        }
      }
    },
    {
      resolve: '@jaenjs/jaen',
      options: {
        jaenProjectId: 1337
      }
    },
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        resetCSS: true,
        isUsingColorMode: true
      }
    },
    {
      resolve: '@snek-at/gatsby-plugin-scaleserp',
      options: {
        apiKey: process.env.SCALE_SERP_APIKEY,
        placeId: process.env.SCALE_SERP_GOOGLE_PLACE_ID
      }
    },
    {
      resolve: '@snek-at/gatsby-theme-shopify',
      options: {
        productPageTemplate: path.resolve(
          'src/templates/ProductPageTemplate.tsx'
        ),
        collectionPageTemplate: path.resolve(
          'src/templates/CollectionPageTemplate.tsx'
        ),
        productsPageTemplate: path.resolve(
          'src/templates/ProductsPageTemplate.tsx'
        )
      }
    }
  ]
}

export default config
