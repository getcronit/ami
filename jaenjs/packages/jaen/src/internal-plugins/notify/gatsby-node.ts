import {GatsbyNode} from 'gatsby'
import {getJaenDataForPlugin} from '../../services/migration/get-jaen-data-for-plugin'
import {sourceNotifications} from './gatsby-config'
import {INotification, INotificationsMigrationBase} from './types'

import 'isomorphic-fetch'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  plugins,
  actions
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        ___JAEN_NOTIFICATIONS___: JSON.stringify(sourceNotifications)
      })
    ]
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions
}) => {
  actions.createTypes(`
    type JaenNotification implements Node {
      id: ID!
      jaenFields: JSON
      active: Boolean
    }
    `)
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createContentDigest
}) => {
  const {createNode} = actions

  let notifications = await getJaenDataForPlugin<INotificationsMigrationBase>(
    'JaenNotify@0.0.1'
  )

  for (const [relativPath, entity] of Object.entries(notifications)) {
    const data = (await ((
      await fetch(entity.context.fileUrl)
    ).json() as unknown)) as INotification

    const node = {
      ...data,
      id: relativPath,
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
