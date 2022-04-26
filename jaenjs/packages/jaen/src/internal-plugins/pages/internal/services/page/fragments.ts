import {graphql} from 'gatsby'

/**
 * @type {Fragment}
 *
 * @example
 * ```
 * export const query = graphql`
 *  query ($jaenPageId: String!) {
 *   ...JaenPageQuery
 *  }
 * `
 * ```
 */
export const JaenPageQuery = graphql`
  fragment JaenPageQuery on Query {
    jaenPage(id: {eq: $jaenPageId}) {
      ...JaenPageData
    }
  }
`

/**
 * @type {Fragment}
 *
 * @example
 * ```
 * export const query = graphql`
 *  query ($jaenPageId: String!) {
 *   jaenPage(id: {eq: $jaenPageId}) {
 *    ...JaenPageData
 *    }
 *  }
 * `
 * ```
 */
export const JaenPageData = graphql`
  fragment JaenPageData on JaenPage {
    id
    slug
    jaenFields
    jaenPageMetadata {
      title
      isBlogPost
      image
      description
      datePublished
      canonical
    }
    jaenFiles {
      file {
        id
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
    chapters
  }
`
