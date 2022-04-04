const URL = 'https://osg.snek.at/storage'

export const upload = async (payload: object | Blob | File) => {
  const formData = new FormData()

  // payload to blob
  if (payload instanceof Blob || payload instanceof File) {
    formData.append('file', payload)
  } else {
    formData.append(
      'file',
      new File([JSON.stringify(payload)], 'jaen-index.json', {
        type: 'application/json'
      })
    )
  }

  const resp = await fetch(URL, {
    body: formData,
    method: 'POST'
  })

  const json = await resp.json()

  return `${URL}/${json.file_id}`
}

/**
 * Upload function for NodeJS
 */
/**
 * Upload function for NodeJS
 */
export const nodejsSafeJsonUpload = async (
  payload: string
): Promise<string> => {
  const FormData = require('form-data')
  const form = new FormData({
    maxDataSize: 20971520
  })

  form.append('file', payload, {
    filename: 'jaen-index.json'
  })

  // Here we create and await our promise:
  return new Promise((resolve, reject) => {
    form.submit(
      URL,
      (
        err: any,
        res: {
          setEncoding: (arg0: string) => void
          on: (
            arg0: string,
            arg1: {(chunk: any): void; (err: any): void}
          ) => void
        }
      ) => {
        if (err) {
          reject(err)
        }

        res.setEncoding('utf8')
        res.on('data', chunk => {
          const json = JSON.parse(chunk)

          resolve(`${URL}/${json.file_id}`)
        })

        res.on('error', err => {
          reject(err)
        })
      }
    )
  })
}
