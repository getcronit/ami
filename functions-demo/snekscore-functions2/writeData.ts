import {makeFn} from '@snek-at/functions'

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
  event: string
  properties: {
    [key: string]: any
  }
}

export interface IdentifyPayload extends Payload {
  traits: {
    [key: string]: any
  }
}

export interface PagePayload extends Payload {
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

interface WriteTrackData {
  type: 'track'
  payload: TrackPayload
}

interface WriteIdentifyData {
  type: 'identify'
  payload: IdentifyPayload
}

interface WritePageData {
  type: 'page'
  payload: PagePayload
}

export type WriteData = WriteTrackData | WriteIdentifyData | WritePageData

const writeData = makeFn<WriteData, void>(
  async args => {
    console.log(`writeData: ${JSON.stringify(args)}`)
  },
  {
    name: 'writeData'
  }
)

export default writeData
