import {GatsbyNode as GatsbyNodeType} from 'gatsby'
import fetch from 'node-fetch'
import {getJaenDataForPlugin} from '../../../services/migration/get-jaen-data-for-plugin'
import {INotification, INotificationsMigrationBase} from '../types'
import {sourceNotifications} from './gatsby-config'

const GatsbyNode: GatsbyNodeType = {}

GatsbyNode.onCreateWebpackConfig = ({plugins, actions}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        ___JAEN_NOTIFICATIONS___: JSON.stringify(sourceNotifications)
      })
    ]
  })
}

GatsbyNode.createSchemaCustomization = ({actions}) => {
  actions.createTypes(`
    type JaenNotification implements Node {
      id: ID!
      jaenFields: JSON
    }
    `)
}

GatsbyNode.sourceNodes = async ({actions, createContentDigest}) => {
  const {createNode} = actions

  let notifications = await getJaenDataForPlugin<INotificationsMigrationBase>(
    'JaenNotify@0.0.1'
  )

  for (const entity of Object.values(notifications)) {
    const data = (await ((
      await fetch(entity.context.fileUrl)
    ).json() as unknown)) as INotification

    const node = {
      ...data,
      parent: null,
      children: [],
      internal: {
        type: 'JaenNotification',
        content: JSON.stringify(data),
        contentDigest: createContentDigest(data)
      }
    }

    createNode(node)
  }
}

export default GatsbyNode
