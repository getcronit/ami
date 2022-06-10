import getServerlessApp from '@snek-at/functions/dist/getServerlessApp.js'

export async function handler(event, context) {
  return await getServerlessApp({
    functions: '.'
  })(event, context)
}
