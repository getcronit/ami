import fs from 'fs'
import {GatsbyConfig as GatsbyConfigType} from 'gatsby'
import path from 'path'

import {readFile} from '../services/jaen-data/internal'

const internalJaenData = readFile()

const GatsbyConfig: GatsbyConfigType = {
  jsxRuntime: 'automatic',
  jsxImportSource: '@emotion/react',
  siteMetadata: internalJaenData.site.siteMetadata
}

const internalPlugins = [
  require.resolve('../internal-plugins/pages'),
  require.resolve('../internal-plugins/notify'),
  require.resolve('../internal-plugins/views')
]

export const sourceWidgets = path.resolve('./src/jaen-widgets')

GatsbyConfig.plugins = [
  ...internalPlugins,
  {
    resolve: `gatsby-plugin-compile-es6-packages`,
    options: {
      modules: [
        `@jaenjs/jaen`,
        `@chakra-ui/gatsby-plugin`,
        'gatsby-plugin-image'
      ]
    }
  },
  'gatsby-plugin-react-helmet-async',
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      defaults: {
        formats: [`auto`, `webp`],
        placeholder: `dominantColor`,
        quality: 50,
        breakpoints: [750, 1080, 1366, 1920],
        backgroundColor: `transparent`,
        tracedSVGOptions: {},
        blurredOptions: {},
        jpgOptions: {},
        pngOptions: {},
        webpOptions: {},
        avifOptions: {}
      }
    }
  },
  `gatsby-transformer-sharp`,
  `gatsby-plugin-image`,
  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /assets/
      }
    }
  }
]

// check if sourceWidgets path exists
if (fs.existsSync(sourceWidgets)) {
  GatsbyConfig.plugins.push({
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `jaen-widgets`,
      path: sourceWidgets,
      ignore: [`**/.gitkeep`] // ignore .gitkeep files
    }
  })
}

export default GatsbyConfig
