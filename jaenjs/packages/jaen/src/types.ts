import {IUser} from '@snek-at/snek-api-client'

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys]

export interface IJaenConfig {
  jaenProjectId: number
  snekAnalyticsId?: string
}

export interface IJaenStaticData {
  [appname: string]: any
}

export interface IJaenConnection<ReactProps, Options>
  extends React.FC<ReactProps> {
  options: Options
}

export interface IAuth {
  isAuthenticated: boolean
  user: IUser | null
}

export interface ISiteMetadata {
  title: string
  description: string
  siteUrl: string
  image: string
  author: {
    name: string
  }
  organization: {
    name: string
    url: string
    logo: string
  }
  social: {
    twitter: string // twitter username
    fbAppID: string // FB ANALYTICS
  }
}

export interface ISite {
  siteMetadata: Partial<ISiteMetadata>
}

export interface IStatus {
  isPublishing: boolean
}
