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

const usersUpdate = fn<
  {
    id: string
    password?: string
    fullName?: string
    isActive?: boolean
  },
  void
>(
  async (args, snekApi) => {
    console.log('args', args)

    const {createHash} = await import('crypto')
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

      // update user
      const user = mySheet.find(u => u.id === args.id)

      if (user) {
        if (args.password !== undefined) {
          user.password = createHash('sha256')
            .update(args.password)
            .digest('hex')
        }
        if (args.fullName !== undefined) {
          user.fullName = args.fullName
        }
        if (args.isActive !== undefined) {
          user.isActive = args.isActive
        }

        console.log('user', user)
      } else {
        throw new Error(`User ${args.id} does not exist`)
      }

      console.log('mySheet', mySheet)

      // JSON to file
      const file = new File([JSON.stringify(mySheet, null, 2)], SHEET_FILE_NAME)

      // Update sheet
      await snekApi.updateSheet({
        projectId: PROJECT_ID,
        sheetName: SHEET_NAME,
        file
      })
    } catch (ex) {
      throw new Error(`Sheet ${SHEET_NAME} does not exist`)
    }
  },
  {
    name: 'usersUpdate'
  }
)

export default usersUpdate
