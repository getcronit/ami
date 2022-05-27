import {fn} from './factory'

interface User {
  id: string
  email: string
  password: string
  fullName: string
  createdAt: string
  isActive: boolean
}

type Sheet = Array<User>

const PROJECT_ID = parseInt(process.env.PROJECT_ID || '') || 2
const SHEET_NAME = 'snek-functions-users'
const SHEET_FILE_NAME = 'snek-functions-users.json'

const usersAdd = fn<
  {
    email: string
    password: string
    fullName: string
  },
  User
>(
  async (args, snekApi) => {
    console.log('args', args)

    const {createHash, randomUUID} = await import('crypto')
    const {File} = await import('node-fetch')

    let mySheet: Sheet = []

    // Check if  sheet exists, and if not, create it with default values
    try {
      const sheet = await snekApi.getSheet({
        projectId: PROJECT_ID,
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
        file: sheetDefaultData
      })

      console.log(`sheet created: ${sheet.name}`)
    } finally {
      // Check if user already exists
      const userExists = mySheet.find(row => row.email === args.email)

      if (userExists) {
        throw new Error(`User "${args.email}" already exists`)
      }

      const user = {
        id: randomUUID(),
        email: args.email,
        password: createHash('sha256').update(args.password).digest('hex'),
        fullName: args.fullName,
        createdAt: new Date().toISOString(),
        isActive: true
      }

      // Add user
      mySheet.push(user)

      // JSON to file
      const file = new File([JSON.stringify(mySheet, null, 2)], SHEET_FILE_NAME)

      // Update sheet
      await snekApi.updateSheet({
        projectId: PROJECT_ID,
        sheetName: SHEET_NAME,
        file
      })

      return user
    }
  },
  {
    name: 'usersAdd'
  }
)

export default usersAdd
