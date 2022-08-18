import {fn} from './factory'

const exampleLogin = fn<{username: string; password: string}, boolean>(
  async (args, _, {req, res}) => {
    const isAuthenticated =
      args.username === 'admin' && args.password === 'admin'

    if (isAuthenticated) {
      res.cookie(
        'SnekExampleToken',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
        }
      )
    }

    return isAuthenticated
  },
  {
    name: 'exampleLogin',
    decorators: []
  }
)

export default exampleLogin
