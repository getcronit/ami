import {getJaenDataForPlugin} from '../services/migration/get-jaen-data-for-plugin'
import {IJaenConfig} from '../types'
import {GatsbyNode as GatsbyNodeType} from 'gatsby'
import {IJaenDataInternal} from '../services/jaen-data/internal'

const GatsbyNode: GatsbyNodeType = {}

GatsbyNode.onCreateWebpackConfig = (
  {plugins, actions, loaders, stage, getNodesByType},
  pluginOptions
) => {
  const options = (pluginOptions as unknown) as IJaenConfig

  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        ___JAEN_PROJECT_ID___: JSON.stringify(options.jaenProjectId)
      })
    ],
    resolve: {
      fallback: {
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        crypto: false
      }
    },
    externalsPresets: {
      node: true
    }
  })
}

GatsbyNode.createSchemaCustomization = ({actions, schema}) => {
  actions.createTypes(`
    type Site implements Node {
      siteMetadata: JSON
    }

    type RemoteFileMigration {
      createdAt: Date!
      fileUrl: String!
    }

    type JaenInternal implements Node {
      finderUrl: String
      migrationHistory: [RemoteFileMigration]!
    }
  `)
}

GatsbyNode.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest
}) => {
  const {createNode} = actions

  const internalData = await getJaenDataForPlugin<IJaenDataInternal>('internal')

  const internalNode = {
    ...internalData,
    id: createNodeId(`internal`),
    parent: null,
    children: [],
    internal: {
      type: `JaenInternal`,
      content: JSON.stringify(internalData),
      contentDigest: createContentDigest(internalData)
    }
  }

  createNode(internalNode)
}

GatsbyNode.createPages = async ({actions, graphql, reporter}) => {
  const {createPage} = actions

  createPage({
    path: '/admin',
    // matchPath to ignore trailing slash
    matchPath: '/admin/*',
    component: require.resolve('../ui/LoadedAdminPage.tsx'),
    context: {}
  })

  createPage({
    path: '/admin/login',
    component: require.resolve('../ui/LoginPage.tsx'),
    context: {}
  })
}

export default GatsbyNode