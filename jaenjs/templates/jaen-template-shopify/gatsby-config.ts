import dotenv from 'dotenv'
import type {GatsbyConfig} from 'gatsby'
import path from 'path'
import {site} from './jaen-data/internal.json'

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
        jaenProjectId: 3
      }
    },
    '@chakra-ui/gatsby-plugin',
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
