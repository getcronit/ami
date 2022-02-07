const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@snek-at/storybook-addon-chakra-ui',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-gatsby'
  ],
  framework: '@storybook/react',
  core: {builder: 'webpack5'},
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    config.module.rules[0].exclude = [/core-js/]

    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook

    config.resolve.mainFields = ['browser', 'module', 'main']

    config.resolve.alias = {
      ...config.resolve.alias,
      '@jaen': path.resolve(__dirname, '../src'),
      '@jaen-admin': path.resolve(__dirname, '../src/internal-plugins/admin'),
      '@jaen-pages': path.resolve(__dirname, '../src/internal-plugins/pages'),
      '@jaen-notify': path.resolve(__dirname, '../src/internal-plugins/notify')
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false
    }

    return config
  }
}
