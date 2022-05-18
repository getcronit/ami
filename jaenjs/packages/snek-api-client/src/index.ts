;(async () => {
  if (!globalThis.fetch) {
    const myFetch = await import('node-fetch')

    globalThis.fetch = myFetch.default as any
    globalThis.Response = myFetch.Response as any
    globalThis.Headers = myFetch.Headers as any
    globalThis.Request = myFetch.Request as any
    globalThis.File = myFetch.File as any

    const myFormData = await import('form-data')

    globalThis.FormData = myFormData.default as any
  }
})()

export * from './index.browser.js'
