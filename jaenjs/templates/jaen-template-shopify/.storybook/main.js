module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@snek-at/storybook-addon-chakra-ui'
  ],
  core: {
    builder: 'webpack5'
  },
  framework: '@storybook/react',
  webpackFinal: async (config, {presets}) => {
    const webpack = await presets.apply('webpackInstance')

    config.plugins.push(
      new webpack.DefinePlugin({
        HAS_REACT_18: JSON.stringify(false)
      })
    )

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push(
      require.resolve('babel-plugin-remove-graphql-queries')
    )

    return config
  }
}
