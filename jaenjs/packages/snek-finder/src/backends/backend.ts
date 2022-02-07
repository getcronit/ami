import {FinderData} from '../components/organisms/Finder/types'

export abstract class Backend {
  public abstract indexKey: string

  abstract upload(file: File): Promise<any>

  async readIndex() {
    if (typeof window === 'undefined') {
      throw new Error(
        'window not defined, make sure to load this script in the browser'
      )
    }

    const indexData = window.localStorage.getItem(this.indexKey)

    if (indexData) {
      return JSON.parse(indexData) as FinderData
    }
  }

  async writeIndex(index: object) {
    if (window) {
      // make a file from index including date in name
      const indexData = JSON.stringify(index)

      window.localStorage.setItem(this.indexKey, indexData)
    } else {
      throw new Error(
        'window not defined, make sure to load this script in the browser'
      )
    }
  }

  async uploadIndex(): Promise<any> {
    const index = await this.readIndex()

    if (index) {
      const indexFile = new File(
        [JSON.stringify(index || {})],
        `${Date.now()}.json`
      )

      return await this.upload(indexFile)
    }
  }

  async downloadIndex(url: string) {
    const indexFile = await (await fetch(url)).json()

    await this.writeIndex(indexFile)
  }

  resetIndex() {
    if (window) {
      window.localStorage.removeItem(this.indexKey)
    } else {
      throw new Error(
        'window not defined, make sure to load this script in the browser'
      )
    }
  }
}
