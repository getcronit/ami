import React from 'react'

interface CookieValues {
  essential: boolean
  analytics: boolean
  marketing: boolean
}

export class CookieModalService {
  static key = 'cookiesettings'

  static isStored(): boolean {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem(CookieModalService.key) !== null
    }

    return false
  }

  static getValues(): CookieValues {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CookieModalService.key)

      if (stored) {
        return JSON.parse(stored)
      }
    }

    return {
      essential: true,
      analytics: false,
      marketing: false
    }
  }

  static setValues(values: CookieValues) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CookieModalService.key, JSON.stringify(values))
    }
  }

  static clearValues() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CookieModalService.key)
    }
  }
}

export const useCookieState = () => {
  const [accepted, setAccepted] = React.useState(CookieModalService.isStored())
  const [cookie, setCookie] = React.useState(CookieModalService.getValues())

  React.useEffect(() => {
    if (accepted) {
      CookieModalService.setValues(cookie)
    } else {
      CookieModalService.clearValues()
    }
  }, [cookie, accepted])

  const updateCookie = React.useCallback(
    (name: keyof typeof cookie, value: boolean) => {
      setCookie({
        ...cookie,
        [name]: value
      })
    },
    [setCookie, cookie]
  )

  const setValues = React.useCallback(
    (values: CookieValues) => {
      setCookie(values)
    },
    [setCookie]
  )

  const clearValues = React.useCallback(() => {
    CookieModalService.clearValues()
    setAccepted(false)
  }, [])

  const accept = React.useCallback(
    (accept: boolean) => {
      setAccepted(accept)
    },
    [setAccepted]
  )

  return {cookie, accepted, accept, setValues, clearValues, updateCookie}
}
