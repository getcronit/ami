import {graphql} from 'gatsby'

export const fragments = graphql`
  fragment JaenPageQuery on Query {
    jaenPage(id: {eq: $jaenPageId}) {
      ...JaenPageData
    }
  }

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
