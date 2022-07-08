import type {GatsbyNode} from 'gatsby'
import {PLUGIN_NAME} from './constants'
import {fetchReviews} from './fetchReviews'
import {ScaleserpReview} from './types'

const GOOGLE_REVIEW_NODE_TYPE = 'GoogleReview'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({actions}) => {
    const {createTypes} = actions
    const typeDefs = `
    type GoogleReview implements Node @dontInfer {
      rating: Int
      position: Int
      body: String
      date: String
      sourceLink: String
      sourceImage: String
      source: String
    }
  `

    createTypes(typeDefs)
  }

export const sourceNodes: GatsbyNode['sourceNodes'] = async (
  {actions, cache, reporter, createNodeId, createContentDigest},
  pluginOptions
) => {
  const {createNode} = actions

  const performFetch = async () => {
    return await fetchReviews({
      apiKey: pluginOptions.apiKey as string,
      placeId: pluginOptions.placeId as string
    })
  }

  const cacheKey = 'scaleSerpReviews'
  const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000 // 86400000
  let obj = await cache.get(cacheKey)
  if (!obj) {
    reporter.info(`Cold cache hit for ${cacheKey}`)
    reporter.info(`Fetching reviews from ScaleSerp API`)
    obj = {created: Date.now()}
    try {
      obj.data = await performFetch()
    } catch (e) {
      reporter.error(
        `Failed to fetch reviews from ScaleSerp API`,
        e as Error,
        PLUGIN_NAME
      )
    }
  } else if (Date.now() > obj.lastChecked + twentyFourHoursInMilliseconds) {
    reporter.info(
      `Warm cache hit for ${cacheKey}, but stale data. Fetching reviews from ScaleSerp API`
    )

    /* Reload after a day */
    try {
      obj.data = await performFetch()
    } catch (e) {
      reporter.info(`Failed to fetch reviews from ScaleSerp API`)
    }
  } else {
    reporter.info(
      `Warm cache hit for ${cacheKey}, not fetching reviews from ScaleSerp API`
    )
  }

  obj.lastChecked = Date.now()
  await cache.set(cacheKey, obj)

  const reviews: ScaleserpReview[] = obj.data || []

  reviews.forEach(review => {
    if (review.rating >= 3) {
      createNode({
        rating: review.rating,
        position: review.position,
        body: review.body,
        date: review.date,
        sourceImage: review.source_image,
        sourceLink: review.source_link,
        source: review.source,
        id: createNodeId(`${GOOGLE_REVIEW_NODE_TYPE}-${review.position}`),
        test: true,
        parent: null,
        children: [],
        internal: {
          type: GOOGLE_REVIEW_NODE_TYPE,
          content: JSON.stringify(review),
          contentDigest: createContentDigest(review)
        }
      })
    }
  })
}
