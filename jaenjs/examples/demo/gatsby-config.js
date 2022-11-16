const path = require('path')

const {site} = require('./jaen-data/internal.json')

module.exports = {
  siteMetadata: site.siteMetadata,
  plugins: [
    {
      resolve: '@jaenjs/jaen',
      options: {
        jaenProjectId: 2,
        snekAnalyticsId: 'SA-1234-5'
      }
    }
    // '@chakra-ui/gatsby-plugin'
  ]
}
