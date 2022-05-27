import {fn} from './factory'

interface User {
  id: string
  email: string
  password: string
  fullName: string
  createdAt: Date
  isActive: boolean
}

type Sheet = Array<User>

const PROJECT_ID = parseInt(process.env.PROJECT_ID || '') || 2
const SHEET_NAME = 'snek-functions-users'
const SHEET_FILE_NAME = 'snek-functions-users.json'

const usersDelete = fn<
  {
    id: string
  },
  boolean
>(
  async (args, snekApi) => {
    console.log('args', args)

    const {File} = await import('node-fetch')

    // 1. Check if auth sheet exists, and if not, create it with default values

    try {
      const sheet = await snekApi.getSheet({
        projectId: PROJECT_ID,
        sheetName: SHEET_NAME
      })

      // file to JSON
      const json = await sheet.text()

      // JSON to object
      let mySheet = JSON.parse(json) as Sheet

      // remove user
      const user = mySheet.find(u => u.id === args.id)

      if (user) {
        mySheet = mySheet.filter(u => u.id !== args.id)
      } else {
        throw new Error(`User ${args.id} does not exist`)
      }

      // JSON to file
      const file = new File([JSON.stringify(mySheet, null, 2)], SHEET_FILE_NAME)

      // Update sheet
      await snekApi.updateSheet({
        projectId: PROJECT_ID,
        sheetName: SHEET_NAME,
        file
      })

      return true
    } catch (ex) {
      throw ex
      throw new Error(`Sheet ${SHEET_NAME} does not exist`)
    }
  },
  {
    name: 'usersDelete'
  }
)

export default usersDelete
