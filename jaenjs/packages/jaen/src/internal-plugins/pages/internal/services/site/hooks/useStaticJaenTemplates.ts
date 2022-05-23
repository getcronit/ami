import {useStaticQuery, graphql} from 'gatsby'

export const useStaticJaenTemplates = () => {
  type QueryData = {
    jaenTemplate: {
      nodes: Array<{
        name: string
        relativePath: string
      }>
    }
  }

  let staticData: QueryData

  try {
    staticData = useStaticQuery<QueryData>(graphql`
      query {
        jaenTemplate: allFile(
          filter: {sourceInstanceName: {eq: "jaen-templates"}}
        ) {
          nodes {
            name
            relativePath
          }
        }
      }
    `)
  } catch (e) {
    staticData = {
      jaenTemplate: {
        nodes: []
      }
    }
  }

  return staticData.jaenTemplate.nodes
}
