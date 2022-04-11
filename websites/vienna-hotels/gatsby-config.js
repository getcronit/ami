const { site } = require("./jaen-data/internal.json");

console.log(site.siteMetadata);

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: site.siteMetadata,
  plugins: [
    "gatsby-plugin-emotion",
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
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages.map((page) => {
            return { ...page };
          });
        },
        serialize: ({ path, modifiedGmt }) => {
          console.log("PATH PATH", path, modifiedGmt);
          return {
            url: path,
            lastmod: modifiedGmt,
          };
        },
      },
    },
    {
      resolve: "@jaenjs/jaen",
      options: {
        jaenProjectId: 4,
      },
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        resetCSS: true,
        isUsingColorMode: true,
      },
    },
  ],
};
