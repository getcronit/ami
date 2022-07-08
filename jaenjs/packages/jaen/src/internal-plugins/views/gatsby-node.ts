import {GatsbyNode} from 'gatsby'

import {sourceViews} from './gatsby-config'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        ___JAEN_VIEWS___: JSON.stringify(sourceViews)
      })
    ]
  })
}
