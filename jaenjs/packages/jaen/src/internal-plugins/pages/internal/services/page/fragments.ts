import {graphql} from 'gatsby'

export const fragments = graphql`
  fragment JaenPageQuery on Query {
    jaenPage(id: {eq: $jaenPageId}) {
      ...JaenPageData
    }
  }

  fragment JaenPageData on JaenPage {
    id
    buildPath
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
      id
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
    sections {
      ...JaenSectionRecursive
    }
  }

  fragment JaenSectionRecursive on JaenSection {
    ...JaenSectionFields
    items {
      ...JaenSectionItemFields
      sections {
        ...JaenSectionFields
        items {
          ...JaenSectionItemFields
          sections {
            ...JaenSectionFields
            items {
              ...JaenSectionItemFields
              sections {
                ...JaenSectionFields
                items {
                  ...JaenSectionItemFields
                  sections {
                    ...JaenSectionFields
                    items {
                      ...JaenSectionItemFields
                      sections {
                        ...JaenSectionFields
                        items {
                          ...JaenSectionItemFields
                          sections {
                            ...JaenSectionFields
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment JaenSectionFields on JaenSection {
    fieldName
    ptrHead
    ptrTail
  }

  fragment JaenSectionItemFields on JaenSectionItem {
    id
    type
    ptrPrev
    ptrNext
    jaenFields
    jaenFiles {
      id
      childImageSharp {
        gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
      }
    }
  }
`
