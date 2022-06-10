import {readFile} from '../services/jaen-data/internal'
import {GatsbyConfig as GatsbyConfigType} from 'gatsby'

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

GatsbyConfig.plugins = [
  ...internalPlugins,
  `gatsby-plugin-loadable-components-ssr`,
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
  {
    resolve: '@chakra-ui/gatsby-plugin',
    options: {
      resetCSS: true,
      isUsingColorMode: true
    }
  },
  'gatsby-plugin-react-helmet',
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

export default GatsbyConfig
