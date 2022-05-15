import {
  IAuthLoginPayload,
  IAuthLoginResponse,
  IAuthRefreshResponse,
  IUser
} from './types'

const BASE_URL = 'https://api.snek.at'

export class KeyManager {
  static LOCAL_STORAGE_KEY = 'snek-auth'
  static LOCAL_STORAGE_ACCESS = this.LOCAL_STORAGE_KEY + '/access_token'
  static LOCAL_STORAGE_REFRESH = this.LOCAL_STORAGE_KEY + '/refresh_token'

  static getAccessToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_ACCESS)
  }

  static setAccessToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_ACCESS, token)
  }

  static getRefreshToken() {
    return localStorage.getItem(this.LOCAL_STORAGE_REFRESH)
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(this.LOCAL_STORAGE_REFRESH, token)
  }

  static prepareAuthHeaders(headersInit?: HeadersInit, refresh = false) {
    const headers = new Headers(headersInit)

    if (refresh) {
      headers.append('Authorization', 'Bearer ' + this.getRefreshToken())
    } else {
      headers.append('Authorization', 'Bearer ' + this.getAccessToken())
    }

    return headers
  }

  static clearTokens() {
    localStorage.removeItem(this.LOCAL_STORAGE_ACCESS)
    localStorage.removeItem(this.LOCAL_STORAGE_REFRESH)
  }
}

async function baseFetch(
  input: RequestInfo,
  init?: RequestInit,
  options: {
    enablePersistendAuth?: boolean
  } = {enablePersistendAuth: true}
): Promise<Response> {
  const response = await fetch(BASE_URL + input, {
    ...init,
    headers: KeyManager.prepareAuthHeaders(init?.headers)
  })

  if (!options?.enablePersistendAuth) {
    return response
  }

  if (response.status === 422) {
    // refresh
    const refreshResponse = await fetch(BASE_URL + '/auth/refresh', {
      method: 'POST',
      headers: KeyManager.prepareAuthHeaders({}, true)
    })

    if (refreshResponse.status === 401) {
      throw new Error('refresh failed')
    }

    if (refreshResponse.status === 200) {
      const refreshResponseJson = (await refreshResponse.json()) as IAuthRefreshResponse

      KeyManager.setAccessToken(refreshResponseJson.access_token)

      return await baseFetch(input, init, options)
    }
  }

  if (response.status !== 200) {
    const error = await response.json()
    throw new Error(error)
  }

  return response
}

export async function login({email, password}: IAuthLoginPayload) {
  const body = JSON.stringify({
    email,
    password
  })

  const response = await baseFetch('/auth/login', {
    method: 'POST',
    mode: 'cors',
    body,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })

  if (response.status == 401) {
    const error = await response.json()
    throw new Error(error.detail)
  }

  const data = (await response.json()) as IAuthLoginResponse

  KeyManager.setAccessToken(data.access_token)
  KeyManager.setRefreshToken(data.refresh_token)
}

export async function logout() {
  const response = await baseFetch('/auth/logout', {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

  if (response.status !== 200) {
    const error = await response.json()
    throw new Error(error.detail)
  }

  KeyManager.clearTokens()
}

export async function getMe() {
  const response = await baseFetch('/users/me', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })

  if (response.status !== 200) {
    const error = await response.json()
    throw new Error(error.detail)
  }

  return (await response.json()) as IUser
}

export async function publishProject(projectId: number, migrationUrl: string) {
  const response = await baseFetch(
    `/projects/${projectId}/publish?migration_url=${migrationUrl}`
  )

  if (response.status !== 200) {
    const error = await response.json()
    throw new Error(error.detail)
  }
}
