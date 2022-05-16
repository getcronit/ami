const isBrowser = typeof window !== 'undefined'

export class KeyManager {
  static LOCAL_STORAGE_KEY = 'snek-auth'
  static LOCAL_STORAGE_ACCESS = this.LOCAL_STORAGE_KEY + '/access_token'
  static LOCAL_STORAGE_REFRESH = this.LOCAL_STORAGE_KEY + '/refresh_token'

  static X_SNEK_API_TOKEN = 'X-SNEK-API-TOKEN'.toLocaleLowerCase()
  static X_SNEK_API_REFRESH_TOKEN = 'X-SNEK-API-REFRESH-TOKEN'.toLocaleLowerCase()

  static access_token: string | null = null
  static refresh_token: string | null = null

  static getAccessToken() {
    return isBrowser
      ? localStorage.getItem(this.LOCAL_STORAGE_ACCESS)
      : this.access_token
  }

  static setAccessToken(token: string) {
    if (isBrowser) {
      localStorage.setItem(this.LOCAL_STORAGE_ACCESS, token)
    } else {
      this.access_token = token
    }
  }

  static getRefreshToken() {
    return isBrowser
      ? localStorage.getItem(this.LOCAL_STORAGE_REFRESH)
      : this.refresh_token
  }

  static setRefreshToken(token: string) {
    if (isBrowser) {
      localStorage.setItem(this.LOCAL_STORAGE_REFRESH, token)
    } else {
      this.refresh_token = token
    }
  }

  static prepareAuthHeaders(headersInit?: {}, refresh = false) {
    // @ts-ignore
    const headers: {[key: string]: string} = headersInit || {}

    console.log('access token', this.getAccessToken())

    const accessToken = this.getAccessToken()
    const refreshToken = this.getRefreshToken()

    if (refresh && refreshToken) {
      headers['Authorization'] = `Bearer ${refreshToken}`
    } else if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`
    }

    return headers
  }

  static getHeaders() {
    const headers: {[key: string]: string} = {}

    const accessToken = this.getAccessToken()
    const refreshToken = this.getRefreshToken()

    if (accessToken) {
      headers[this.X_SNEK_API_TOKEN] = accessToken
    }

    if (refreshToken) {
      headers[this.X_SNEK_API_REFRESH_TOKEN] = refreshToken
    }

    return headers
  }

  static clearTokens() {
    if (isBrowser) {
      localStorage.removeItem(this.LOCAL_STORAGE_ACCESS)
      localStorage.removeItem(this.LOCAL_STORAGE_REFRESH)
    } else {
      this.access_token = null
      this.refresh_token = null
    }
  }
}
