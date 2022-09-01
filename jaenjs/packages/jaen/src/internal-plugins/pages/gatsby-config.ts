import fs from 'fs'
import {GatsbyConfig as GatsbyConfigType} from 'gatsby'
import path from 'path'

const GatsbyConfig: GatsbyConfigType = {}

export const sourcePages = path.resolve('./src/pages')
export const sourceTemplates = path.resolve('./src/jaen-templates')

if (!fs.existsSync(sourceTemplates)) {
  throw new Error(
    'Seems like you havent created a `.src/jaen-templates` directory yet. '
  )
}

GatsbyConfig.plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `jaen-templates`,
      path: sourceTemplates,
      ignore: [`**/.gitkeep`] // ignore .gitkeep files
    }
  }
]

export default GatsbyConfig
