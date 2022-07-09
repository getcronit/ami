import fs from 'fs'
import {GatsbyNode} from 'gatsby'
import 'isomorphic-fetch'
import path from 'path'
import {getJaenDataForPlugin} from '../../services/migration/get-jaen-data-for-plugin'
import {convertToSlug} from '../../utils/helper'
import {sourceTemplates} from './gatsby-config'
import {processPage} from './internal/services/imaProcess'
import {generateOriginPath} from './internal/services/path'
import {IJaenPage, IPagesMigrationBase} from './types'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  plugins,
  actions,
  loaders,
  stage,
  getNodesByType
}) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        ___JAEN_TEMPLATES___: JSON.stringify(sourceTemplates)
      })
    ],
    resolve: {
      fallback: {
        fs: false
      }
    }
  })

  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null()
          },
          {
            test: /filerobot-image-editor/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({
  actions
}) => {
  actions.createTypes(`
    type JaenPage implements Node {
      id: ID!
      slug: String!
      jaenPageMetadata: JaenPageMetadata!
      jaenFields: JSON
      chapters: JSON
      template: String
      jaenFiles: [JaenFile!]!
      excludedFromIndex: Boolean
      jaenFieldsOrder: JSON
    }

    type JaenFile {
      file: File! @link(from: "file___NODE")
    }

    type JaenPageMetadata {
      title: String!
      description: String
      image: String
      canonical: String
      datePublished: String
      isBlogPost: Boolean
    }
    `)
}

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({
  actions,
  createNodeId,
  createContentDigest,
  getNodesByType,
  cache,
  store,
  reporter
}) => {
  const {createNode} = actions
  reporter.info('Starting create pages')

  let pages = await getJaenDataForPlugin<IPagesMigrationBase>('JaenPages@0.0.1')

  const hashes = []

  for (const [id, page] of Object.entries(pages)) {
    const jaenPage = ((await (
      await fetch(page.context.fileUrl)
    ).json()) as unknown) as IJaenPage

    await processPage({
      page: jaenPage,
      createNodeId,
      createNode,
      cache,
      store,
      reporter
    })

    const path = id.split('JaenPage ')[1]

    const node = {
      ...jaenPage,
      jaenPageMetadata: jaenPage.jaenPageMetadata || {
        title: path
      },
      slug: jaenPage.slug || convertToSlug(path),
      id,
      template: jaenPage.template || null,
      parent: jaenPage.parent ? jaenPage.parent.id : null,
      children: jaenPage.children?.map(child => child.id) || [],
      internal: {
        type: 'JaenPage',
        content: JSON.stringify(jaenPage),
        contentDigest: createContentDigest(jaenPage)
      }
    }

    createNode(node)

    console.log(id)
  }

  //> Fetch template files and proccess them
}

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
  reporter
}) => {
  const {createPage} = actions

  interface QueryData {
    allTemplate: {
      nodes: Array<{
        name: string
        absolutePath: string
      }>
    }
    allJaenPage: {
      nodes: Array<IJaenPage>
    }
  }

  const result = await graphql<QueryData>(`
    query {
      allTemplate: allFile(
        filter: {sourceInstanceName: {eq: "jaen-templates"}}
      ) {
        nodes {
          name
          absolutePath
        }
      }
      allJaenPage {
        nodes {
          id
          parent {
            id
          }
          slug
          jaenPageMetadata {
            title
            description
            image
            canonical
            datePublished
            isBlogPost
          }
          jaenFields
          chapters
          template
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const {allTemplate, allJaenPage} = result.data

  allJaenPage.nodes.forEach(node => {
    const {template} = node
    const pagePath = generateOriginPath(allJaenPage.nodes, node)

    if (template) {
      if (!pagePath) {
        reporter.panicOnBuild(`Error while generating path for page ${node.id}`)
        return
      }

      const component = allTemplate.nodes.find(e => e.name === template)
        ?.absolutePath

      if (!component) {
        reporter.panicOnBuild(
          `Could not find template for page ${node.id} (${template})`
        )
        return
      }

      createPage({
        path: pagePath,
        component,
        context: {
          jaenPageId: node.id
        }
      })
    }

    // Create a json file for the page in the public folder

    const fileName = pagePath === '/' ? 'index' : pagePath

    const outputPath = path.join('./public', `${fileName}.json`)
    const outputDir = path.dirname(outputPath)

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir)
    }

    fs.writeFileSync(outputPath, JSON.stringify(node))
  })

  // Dynamic routing pages

  // stepPage.matchPath is a special key that's used for matching pages
  // only on the client.
  createPage({
    path: '/_',
    matchPath: '/_/*',
    component: require.resolve(
      '../../../src/internal-plugins/pages/internal/services/routing/pages/_.tsx'
    ),
    context: {}
  })
}

export const onCreatePage: GatsbyNode['onCreatePage'] = ({
  actions,
  page,
  createNodeId,
  createContentDigest,
  getNode
}) => {
  const {createPage, deletePage, createNode} = actions
  const {path, context} = page

  let stepPage = page

  const blacklist = ['/admin']

  // skip if the page is in the blacklist
  if (blacklist.includes(path)) {
    return
  }

  // Check if the page has a `jaenPageId` in its context.
  // If not it means it's not a JaenPage and we must create one.
  if (!context.jaenPageId) {
    if (!context.skipJaenPage) {
      const jaenPageId = `JaenPage ${path}`

      const slugifiedPath = convertToSlug(path)

      if (!getNode(jaenPageId)) {
        const jaenPage: IJaenPage = {
          id: jaenPageId,
          slug: slugifiedPath,
          parent: null,
          children: [],
          jaenPageMetadata: {
            title: path,
            description: '',
            image: '',
            canonical: '',
            datePublished: '',
            isBlogPost: false
          },
          jaenFields: null,
          jaenFiles: [],
          chapters: {},
          template: null
        }

        createNode({
          ...jaenPage,
          parent: null,
          children: [],
          jaenFiles: [],
          internal: {
            type: 'JaenPage',
            content: JSON.stringify(jaenPage),
            contentDigest: createContentDigest(jaenPage)
          }
        })
      }

      stepPage = {...stepPage, context: {...context, jaenPageId}}
    }
  }

  deletePage(page)
  createPage(stepPage)
}
