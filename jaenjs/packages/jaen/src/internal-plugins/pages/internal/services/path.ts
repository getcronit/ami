import {ITreeJaenPage} from '../../types'

type PageNode = {
  id: string
  slug: string
  parent: {
    id: string
  } | null
}

export const generateOriginPath = (
  allNodes: Array<PageNode>,
  node: PageNode,
  path = `/${node.slug}`
): string | undefined => {
  const parentId = node.parent?.id
  const parent = allNodes.find(n => n.id === parentId)

  if (parent) {
    return generateOriginPath(allNodes, parent, `/${parent.slug}${path}`)
  }

  return path
}

export const generatePagePaths = (
  allNodes: ITreeJaenPage[],
  pageId: string
) => {
  const originNode = allNodes.find(node => node.id === pageId)

  if (originNode) {
    const paths: {[path: string]: string} = {}

    const originPath = generateOriginPath(allNodes, originNode!)

    const lookupPath = (node: ITreeJaenPage, pathPrefix = '/') => {
      paths[pathPrefix] = node.id

      if (node.children.length) {
        for (const {id} of node.children) {
          const child = allNodes.find(n => n.id === id)

          if (child) {
            lookupPath(
              child,
              pathPrefix !== '/'
                ? `${pathPrefix}/${child.slug}`
                : `/${child.slug}`
            )
          }
        }
      }
    }

    lookupPath(originNode, originPath)

    return paths
  } else {
    throw new Error('Could not generate paths for page with id: ' + pageId)
  }
}
