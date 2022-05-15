import {makeFn} from '@snek-at/functions'

interface User {
  id: string
  email: string
  password: string
  fullName: string
  createdAt: string
  isActive: boolean
}

type ReducedUser = Omit<User, 'password'>

type Sheet = Array<User>

const PROJECT_ID = parseInt(process.env.PROJECT_ID || '') || 2
const SHEETS_TOKEN = process.env.SHEETS_TOKEN || 'AAA'
const SHEET_NAME = 'snek-functions-users'

const usersGet = makeFn<void, ReducedUser[]>(
  async (args, snekApi) => {
    console.log('args', args)

    // 1. Check if auth sheet exists, and if not, create it with default values

    try {
      const sheet = await snekApi.getSheet({
        projectId: PROJECT_ID,
        sheetsToken: SHEETS_TOKEN,
        sheetName: SHEET_NAME
      })

      // file to JSON
      const json = await sheet.text()

      // JSON to object
      const obj = JSON.parse(json) as Sheet

      // exclude password
      const users = obj.map(u => ({
        id: u.id,
        email: u.email,
        fullName: u.fullName,
        createdAt: u.createdAt,
        isActive: u.isActive
      }))

      return users
    } catch (e) {
      // just throw the error here again (should be changed to a better error handling)
      throw e
    }
  },
  {
    name: 'usersGet'
  }
)

export default usersGet
