import {fn} from './factory'

export interface Payload {
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

interface BaseData {
  snekAnalyticsId: string
  ip: {
    callingCode: string
    city: string
    countryCapital: string
    country_code: string
    country_name: string
    currency: string
    currencySymbol: string
    emojiFlag: string
    flagUrl: string
    ip: string
    is_in_european_union: boolean
    latitude: number
    longitude: number
    metro_code: number
    organisation: string
    region_code: string
    region_name: string
    suspiciousFactors: {
      isProxy: boolean
      isSpam: boolean
      isSuspicious: boolean
      isTorNode: boolean
    }
    time_zone: string
    zip_code: string
  }
  fingerprint?: string
}

type Data<T> = BaseData & {payload: T}

export type WriteData =
  | Data<TrackPayload>
  | Data<IdentifyPayload>
  | Data<PagePayload>

type Sheet = Array<WriteData>

const PROJECT_ID = parseInt(process.env.PROJECT_ID || '') || 2
const SHEET_NAME = 'snek-functions-score'
const SHEET_FILE_NAME = 'snek-functions-score.json'
const SHEETS_TOKEN = process.env.SHEETS_TOKEN

const writeData = fn<WriteData, void>(
  async (args, snekApi, request) => {
    // @ts-ignore
    const {File} = await import('node-fetch')

    let mySheet: Sheet = []

    console.log(`fingerprint: ${args.fingerprint}`)

    console.log(args.payload)
    // Check if  sheet exists, and if not, create it with default values
    try {
      const sheet = await snekApi.getSheet({
        projectId: PROJECT_ID,
        sheetsToken: SHEETS_TOKEN,
        sheetName: SHEET_NAME
      })

      console.log(`Sheet ${sheet.name} exists`)

      // file to JSON
      const json = await sheet.text()

      // JSON to object
      const obj = JSON.parse(json) as Sheet

      mySheet = obj
    } catch {
      const sheetDefaultDataJSON: Sheet = []

      mySheet = sheetDefaultDataJSON

      const sheetDefaultData = new File(
        [JSON.stringify(sheetDefaultDataJSON, null, 2)],
        SHEET_FILE_NAME
      )

      const sheet = await snekApi.createSheet({
        projectId: PROJECT_ID,
        sheetName: SHEET_NAME,
        sheetsToken: SHEETS_TOKEN,
        file: sheetDefaultData
      })

      console.log(`sheet created: ${sheet.name}`)
    } finally {
      mySheet.push(args)

      // JSON to file
      const file = new File([JSON.stringify(mySheet, null, 2)], SHEET_FILE_NAME)

      // Update sheet
      await snekApi.updateSheet({
        projectId: PROJECT_ID,
        sheetName: SHEET_NAME,
        sheetsToken: SHEETS_TOKEN,
        file
      })
    }
  },
  {
    name: 'writeData'
  }
)

export default writeData
