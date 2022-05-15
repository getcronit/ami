import {GatsbyNode as GatsbyNodeType} from 'gatsby'

import {sourceViews} from './gatsby-config'

const GatsbyNode: GatsbyNodeType = {}

GatsbyNode.onCreateWebpackConfig = ({plugins, actions}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        ___JAEN_VIEWS___: JSON.stringify(sourceViews)
      })
    ]
  })
}

export default GatsbyNode
