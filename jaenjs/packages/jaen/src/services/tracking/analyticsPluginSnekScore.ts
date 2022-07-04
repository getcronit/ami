import {AnalyticsPlugin} from 'analytics'
import writeData from '../../snekscore-functions/writeData'

export interface Payload {
  type: string
  options: {}
  meta: {
    rid: string
    ts: number
    hasCallback: boolean
  }
  userId?: string
  anonymousId: string
}

export interface TrackPayload extends Payload {
  type: 'track'
  event: string
  properties: {
    [key: string]: any
  }
}

export interface IdentifyPayload extends Payload {
  type: 'identify'
  traits: {
    [key: string]: any
  }
}

export interface PagePayload extends Payload {
  type: 'page'
  properties: {
    title: string
    url: string
    path: string
    hash: string
    search: string
    width: number
    height: number
    [key: string]: any
  }
}

export default function analyticsPluginSnekScore(userConfig: {
  snekAnalyticsId: string
  fingerprint?: string
}): AnalyticsPlugin {
  const getIp = (async () => {
    return await (await fetch('https://ip-api.io/json/')).json()
  })()

  // return object for analytics to use
  return {
    /* All plugins require a name */
    name: 'analytics-plugin-snek-score',
    /* Everything else below this is optional depending on your plugin requirements */
    config: {},
    initialize: () => {},
    page: async ({payload}: {payload: PagePayload}) => {
      return
    },
    track: async ({payload}: {payload: TrackPayload}) => {
      // call provider specific event tracking
      console.log('track', payload)

      const ip = await getIp

      writeData({
        snekAnalyticsId: userConfig.snekAnalyticsId,
        payload,
        ip,
        fingerprint: userConfig.fingerprint
      })
    },
    identify: async ({payload}: {payload: IdentifyPayload}) => {
      // call provider specific user identify method

      const ip = await getIp

      writeData({
        snekAnalyticsId: userConfig.snekAnalyticsId,
        payload,
        ip,
        fingerprint: userConfig.fingerprint
      })
    },
    loaded: () => {
      // return boolean so analytics knows when it can send data to third party
      return true
    }
  }
}
