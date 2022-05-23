import {useStaticQuery, graphql} from 'gatsby'
import {IJaenPage} from '../../../../types'

export const useStaticJaenPagesFieldsOrder = () => {
  type QueryData = {
    allJaenPage: {
      nodes: Array<{
        id: string
        jaenFieldsOrder: IJaenPage['jaenFieldsOrder'] | null
      }>
    }
  }

  let staticData: QueryData

  try {
    staticData = useStaticQuery<QueryData>(graphql`
      query {
        allJaenPage {
          nodes {
            id
            jaenFieldsOrder
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
