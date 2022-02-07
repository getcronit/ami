import fs from 'fs'
import {GatsbyConfig as GatsbyConfigType} from 'gatsby'
import path from 'path'

const GatsbyConfig: GatsbyConfigType = {}

export const sourceNotifications = path.resolve('./src/notifications')

if (!fs.existsSync(sourceNotifications)) {
  throw new Error(
    'Seems like you havent created a `.src/notifications` directory yet. '
  )
}

GatsbyConfig.plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `notifications`,
      path: sourceNotifications
    }
  }
]

export default GatsbyConfig
