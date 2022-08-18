import {fn} from './factory'

const restrictedData = fn<any, string>(
  async (args, _, {req, res}) => {
    return 'My restricted data'
  },
  {
    name: 'restrictedData',
    decorators: [
      async (args, _, {req, res}) => {
        const cookieValue = req.cookies?.['SnekExampleToken']

        if (
          cookieValue ===
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        ) {
          return
        }

        throw new Error('Unauthorized')
      }
    ]
  }
)

export default restrictedData
