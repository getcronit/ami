import {graphql, useStaticQuery} from 'gatsby'
import {IJaenPage} from '../../../../types'

export const useStaticJaenPages = () => {
  type QueryData = {
    allJaenPage: {
      nodes: IJaenPage[]
    }
  }

  let staticData: QueryData

  try {
    staticData = useStaticQuery<QueryData>(graphql`
      query {
        allJaenPage {
          nodes {
            ...JaenPageData
            parent {
              id
            }
            children {
              id
            }
            template
            componentName
          }
        }
      }
    `)
  } catch (e) {
    staticData = {
      allJaenPage: {
        nodes: []
      }
    }
  }

  return staticData.allJaenPage.nodes
}
