import axios from 'axios'
import {ScaleserpReview} from './types'

const request = async (params: {
  api_key: string
  search_type: string
  data_id: string
  hl: string
  next_page_token?: string
}) => {
  const response = await axios
    .get('https://api.scaleserp.com/search', {
      params
    })
    .catch(error => {
      throw new Error(`Error fetching results from ScaleSerp API: ${error}`)
    })

  if (!response || !response.data)
    throw new Error(`Error fetching results from ScaleSerp API:`)
  return response
}

export const fetchReviews = async (creds: {
  apiKey: string
  placeId: string
}) => {
  const {apiKey, placeId} = creds

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error(
      'You must supply a valid API Key from Scale Serp. Visit https://scaleserp.com/ for more information.'
    )
  }

  if (!placeId || typeof placeId !== 'string') {
    throw new Error(
      'You must supply a valid place id from Google. You can find your place id at https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder.'
    )
  }

  let params = {
    api_key: apiKey,
    search_type: 'place_reviews',
    data_id: placeId,
    hl: 'de'
  }

  const {
    pagination: {next_page_token},
    place_reviews_results: reviewsSlice1
  }: {
    pagination: {
      next_page_token: string
    }
    place_reviews_results: ScaleserpReview[]
  } = await (await request(params)).data

  const reviewsSlice2: ScaleserpReview[] = await (
    await request({
      ...params,
      next_page_token
    })
  ).data.place_reviews_results

  return [
    ...reviewsSlice1,
    ...reviewsSlice2.map(review => ({
      ...review,
      position: review.position + reviewsSlice1.length
    }))
  ]
}
