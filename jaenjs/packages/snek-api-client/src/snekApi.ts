;(async () => {
  if (!global.fetch) {
    const myFetch = await import('node-fetch')

    global.fetch = myFetch.default as any
    global.Response = myFetch.Response as any
    global.Headers = myFetch.Headers as any
    global.Request = myFetch.Request as any
    global.File = myFetch.File as any

    const myFormData = await import('form-data')

    global.FormData = myFormData.default as any
  }
})()

import {
  IAuthLoginPayload,
  IAuthLoginResponse,
  IAuthRefreshResponse,
  IUser
} from './types'
import {KeyManager} from './keyManager'

export interface SnekApiOptions {}

export class SnekApi {
  KeyManager = KeyManager
  url: string
  options: SnekApiOptions

  constructor(url: string, options?: SnekApiOptions) {
    this.url = url.replace(/\/$/, '')
    this.options = options || {}
  }

  async baseFetch(
    input: RequestInfo,
    init?: RequestInit,
    options: {
      enablePersistendAuth?: boolean
    } = {enablePersistendAuth: true}
  ): Promise<Response> {
    const response = await fetch(this.url + input, {
      ...init,
      headers: {
        ...init?.headers,
        ...this.KeyManager.prepareAuthHeaders(init?.headers)
      }
    })

    if (!options?.enablePersistendAuth) {
      // @ts-ignore
      return response
    }

    if (response.status === 422) {
      // refresh
      const refreshResponse = await fetch(this.url + '/auth/refresh', {
        method: 'POST',
        headers: this.KeyManager.prepareAuthHeaders({}, true)
      })

      if (refreshResponse.status === 401) {
        throw new Error('refresh failed')
      }

      if (refreshResponse.status === 200) {
        const refreshResponseJson = (await refreshResponse.json()) as IAuthRefreshResponse

        this.KeyManager.setAccessToken(refreshResponseJson.access_token)

        return await this.baseFetch(input, init, options)
      }
    }

    if (response.status !== 200) {
      const error = (await response.json()) as {
        detail: string
      }
      throw new Error(error.detail)
    }
    // @ts-ignore
    return response
  }

  async login({email, password}: IAuthLoginPayload) {
    const body = JSON.stringify({
      email,
      password
    })

    const response = await this.baseFetch('/auth/login', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })

    const data = (await response.json()) as IAuthLoginResponse

    this.KeyManager.setAccessToken(data.access_token)
    this.KeyManager.setRefreshToken(data.refresh_token)
  }

  async logout() {
    await this.baseFetch('/auth/logout', {
      method: 'DELETE'
    })

    this.KeyManager.clearTokens()
  }

  async getMe() {
    const response = await this.baseFetch('/users/me', {
      method: 'GET'
    })

    if (response.status !== 200) {
      const error = (await response.json()) as {
        detail: string
      }

      throw new Error(error.detail)
    }

    return (await response.json()) as IUser
  }

  async publishProject(projectId: number, migrationUrl: string) {
    await this.baseFetch(
      `/projects/${projectId}/publish?migration_url=${migrationUrl}`
    )
  }

  async createSheet(args: {
    projectId: number
    sheetsToken?: string
    sheetName: string
    file: File
  }): Promise<{
    name: string
  }> {
    const {projectId, sheetsToken, sheetName, file} = args

    let url = `/projects/${projectId}/sheets?sheet_name=${sheetName}`

    if (sheetsToken) {
      url += `&sheets_token=${sheetsToken}`
    }

    const formData = new FormData()

    const text = await file.text()

    formData.append('in_file', text, file.name)

    const res = await this.baseFetch(url, {
      method: 'POST',
      body: formData
    })

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    return (await res.json()) as any
  }

  async getSheet(args: {
    projectId: number
    sheetName: string
    sheetsToken?: string
  }): Promise<File> {
    const {projectId, sheetName, sheetsToken} = args
    let url = `/projects/${projectId}/sheets/${sheetName}`

    if (sheetsToken) {
      url += `?sheets_token=${sheetsToken}`
    }

    const res = await this.baseFetch(url)

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    const blob = await res.blob()

    const filename = res.headers.get('content-disposition')
    if (filename) {
      const filenameRegex = /filename="(.*)"/
      const filenameMatch = filenameRegex.exec(filename)
      if (filenameMatch) {
        return new File([blob], filenameMatch[1] as string)
      }
    }
    return new File([blob], `${sheetName}.sheet`)
  }

  async getSheets(args: {
    projectId: number
    sheetsToken?: string
  }): Promise<
    Array<{
      name: string
    }>
  > {
    const {projectId, sheetsToken} = args
    let url = `/projects/${projectId}/sheets`

    if (sheetsToken) {
      url += `?sheets_token=${sheetsToken}`
    }

    const res = await this.baseFetch(url)

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    return (await res.json()) as any
  }

  async updateSheet(args: {
    projectId: number
    sheetsToken?: string
    sheetName: string
    file: File
  }): Promise<void> {
    const {projectId, sheetsToken, sheetName, file} = args
    let url = `/projects/${projectId}/sheets/${sheetName}`

    if (sheetsToken) {
      url += `?sheets_token=${sheetsToken}`
    }

    const text = await file.text()

    const formData = new FormData()
    formData.append('in_file', text, file.name)

    const res = await this.baseFetch(url, {
      method: 'PATCH',
      body: formData
    })

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    return
  }

  async deleteSheet(args: {
    projectId: number
    sheetsToken?: string
    sheetName: string
  }): Promise<void> {
    const {projectId, sheetName, sheetsToken} = args
    let url = `/projects/${projectId}/sheets/${sheetName}`

    if (sheetsToken) {
      url += `?sheets_token=${sheetsToken}`
    }

    const res = await this.baseFetch(url, {
      method: 'DELETE'
    })

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    return
  }
}
