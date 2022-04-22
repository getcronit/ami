module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@snek-at/storybook-addon-chakra-ui'
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, {presets}) => {
    const webpack = await presets.apply('webpackInstance')

    config.plugins.push(
      new webpack.DefinePlugin({
        HAS_REACT_18: JSON.stringify(false)
      })
    )

    return config
  }
}
