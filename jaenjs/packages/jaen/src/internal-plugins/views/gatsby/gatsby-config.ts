import fs from 'fs'
import {GatsbyConfig as GatsbyConfigType} from 'gatsby'
import path from 'path'

const GatsbyConfig: GatsbyConfigType = {}

export const sourceViews = path.resolve('./src/jaen-views')

if (!fs.existsSync(sourceViews)) {
  throw new Error(
    'Seems like you havent created a `.src/jaen-views` directory yet. '
  )
}

GatsbyConfig.plugins = [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `jaen-views`,
      path: sourceViews,
      ignore: [`**/.gitkeep`] // ignore .gitkeep files
    }
  }
]

export default GatsbyConfig
