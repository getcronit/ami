import {graphql} from 'gatsby'

export const googleReviewData = graphql`
  fragment googleReviewData on GoogleReview {
    id
    rating
    position
    body
    sourceLink
    sourceImage
    source
`
