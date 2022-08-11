import getServerlessApp from '@snek-at/functions/dist/server/getServerlessApp.js'

export async function handler(event, context) {
  const res = await getServerlessApp({
    functions: '.'
  })(event, context)

  console.log('serverless app response', res)

  return res
}
