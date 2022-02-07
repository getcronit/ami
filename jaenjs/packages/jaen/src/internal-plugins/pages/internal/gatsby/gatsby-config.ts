import fs from 'fs'
import {GatsbyConfig as GatsbyConfigType} from 'gatsby'
import path from 'path'

const GatsbyConfig: GatsbyConfigType = {}

export const sourceTemplates = path.resolve('./src/templates')

if (!fs.existsSync(sourceTemplates)) {
  throw new Error(
    'Seems like you havent created a `.src/templates` directory yet. '
  )
}

GatsbyConfig.plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `templates`,
      path: sourceTemplates
    }
  }
]

export default GatsbyConfig
