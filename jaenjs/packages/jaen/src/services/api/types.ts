export interface IUser {
  email: string
  full_name: string
  image_url: string
}

export interface IAuthLoginResponse {
  access_token: string
  refresh_token: string
}

export interface IAuthRefreshResponse {
  access_token: string
}

export interface IAuthLoginPayload {
  email: string
  password: string
}
