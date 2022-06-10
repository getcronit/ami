import {fn} from './factory'

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
const SHEET_NAME = 'snek-functions-users'

const usersGet = fn<void, ReducedUser[]>(
  async (args, snekApi) => {
    console.log('args', args)

    // 1. Check if auth sheet exists, and if not, create it with default values

    console.log('SHEETS TOKEN', process.env.SHEETS_TOKEN)

    try {
      const sheet = await snekApi.getSheet({
        projectId: PROJECT_ID,
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

      console.log('users', users)

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
