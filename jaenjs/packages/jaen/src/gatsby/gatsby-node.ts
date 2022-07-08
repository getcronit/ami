import {GatsbyNode} from 'gatsby'
import {IJaenDataInternal} from '../services/jaen-data/internal'
import {getJaenDataForPlugin} from '../services/migration/get-jaen-data-for-plugin'
import {IJaenConfig} from '../types'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = (
  {plugins, actions, loaders, stage, getNodesByType},
  pluginOptions
) => {
  const options = pluginOptions as unknown as IJaenConfig

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

export const createSchemaCustomization: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  schema
}) => {
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

export const sourceNodes: GatsbyNode['onCreateWebpackConfig'] = async ({
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

export const createPages: GatsbyNode['onCreateWebpackConfig'] = async ({
  actions,
  graphql,
  reporter
}) => {
  const {createPage} = actions

  createPage({
    path: '/admin',
    // matchPath to ignore trailing slash
    matchPath: '/admin/*',
    component: require.resolve('../../src/ui/LoadedAdminPage.tsx'),
    context: {}
  })

  createPage({
    path: '/admin/login',
    component: require.resolve('../../src/ui/LoginPage.tsx'),
    context: {}
  })
}
