import {TreeData, TreeItem} from '@atlaskit/tree'

import type {Items} from './index'

export const TreeConverter = (items: Items): TreeData => {
  const rootName = 'SitePage'
  const tree: TreeData = {
    rootId: rootName,
    items: {
      [rootName]: {
        id: rootName,
        children: []
      }
    }
  }

  function nth<T>(iter: Iterable<T>, n: number) {
    for (const v of iter) if (--n < 0) return v
  }

  function* genItemParent(
    allItems: Items,
    rootItemId: string
  ): Generator<string> {
    let parent = allItems[rootItemId].parent

    while (parent) {
      yield parent

      parent = parent === 'JaenPage /' ? null : allItems[parent].parent
    }
  }

  function* genTreeItems(tree: TreeData, items: Items): Generator<TreeItem> {
    for (const [id, item] of Object.entries(items)) {
      if (item.parent === null || item.parent === 'JaenPage /') {
        tree.items[rootName].children.push(id)
      }

      const parentIter = genItemParent(items, id)
      const isExpanded = !nth(parentIter, 3)

      if (item.parent && items[item.parent]) {
        if (items[item.parent].data.deleted) {
          item.data.deleted = true
        }
      }

      yield {
        ...item,
        id,
        hasChildren: !!item.children.length,
        isExpanded,
        isChildrenLoading: false
      }
    }
  }

  for (const item of genTreeItems(tree, items)) {
    tree.items[item.id] = item
  }

  return tree
}
