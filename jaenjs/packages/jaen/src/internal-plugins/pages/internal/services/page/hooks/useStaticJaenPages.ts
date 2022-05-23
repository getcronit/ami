import {useStaticQuery, graphql} from 'gatsby'
import {IJaenPage} from '../../../../types'

export const useStaticJaenPages = () => {
  type QueryData = {
    allJaenPage: {
      nodes: Array<IJaenPage>
    }
  }

  let staticData: QueryData

  try {
    staticData = useStaticQuery<QueryData>(graphql`
      query {
        allJaenPage {
          nodes {
            ...JaenPageData
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
