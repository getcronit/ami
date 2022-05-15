import getServerlessApp from '@snek-at/functions/dist/getServerlessApp'

export async function handler(event: Object, context: Object) {
  return await getServerlessApp({functions: '.'})(event, context)
}
