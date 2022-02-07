const path = require('path')

const {site} = require('./jaen-data/internal.json')

module.exports = {
  siteMetadata: site.siteMetadata,
  plugins: [
    {
      resolve: '@jaenjs/jaen',
      options: {
        jaenProjectId: 2
      }
    },
    '@chakra-ui/gatsby-plugin'
  ]
}
