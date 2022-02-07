module.exports = {
  siteMetadata: {
    siteTitle: `Jaen Docs`,
    defaultTitle: `Jaen Docs`,
    siteTitleShort: `Jaen Docs`,
    siteDescription: `Serverless Content Management System for Gatsby sites.`,
    siteUrl: `https://snek.at/jaenjs/docs`,
    siteAuthor: `@schettn`,
    siteImage: `/favicon.png`,
    siteLanguage: `en`,
    themeColor: `#319795`,
    basePath: `/`
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
        yamlFilesPath: `src/yamlFiles`,
        repositoryUrl: `https://github.com/jaenjs/jaen`,
        baseDir: `docs`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jaen Docs`,
        short_name: `Jaen Docs`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`
      }
    },
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `YOUR_ANALYTICS_ID`,
    //   },
    // },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://rocketdocs.netlify.app`
      }
    },
    `gatsby-plugin-offline`
  ]
}
