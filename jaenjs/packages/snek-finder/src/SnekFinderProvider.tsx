import * as React from 'react'
import {Backend} from './backends/backend'
import {FinderData} from './components/organisms/Finder/types'

interface ISnekFinderProviderProps {
  backend: Backend
  initDataLink?: string
  rootFileId?: string
}

interface ISnekFinderContext extends ISnekFinderProviderProps {
  initData: FinderData
  rootFileId: string
}

const SnekFinderContext = React.createContext<ISnekFinderContext | undefined>(
  undefined
)

const defaultInitData: FinderData = {
  'ae4b3bf8-6ed2-4ac6-bf18-722321af298c': {
    name: 'SF',
    createdAt: '',
    modifiedAt: '',
    isFolder: true,
    childUUIDs: []
  }
}

export const SnekFinderProvider: React.FC<
  React.PropsWithChildren<ISnekFinderProviderProps>
> = ({backend, initDataLink, rootFileId, children}) => {
  const [initData, setInitData] = React.useState<FinderData>(defaultInitData)

  React.useEffect(() => {
    const fn = async () => {
      let index = await backend.readIndex()

      if (!index && initDataLink) {
        try {
          await backend.downloadIndex(initDataLink)
        } catch {
          console.log('downloadIndex error')
        }

        index = await backend.readIndex()
      }

      if (index) {
        if (JSON.stringify(index) !== JSON.stringify(initData)) {
          setInitData(index)
        }
      }
    }

    fn()
  })

  rootFileId = rootFileId || 'ae4b3bf8-6ed2-4ac6-bf18-722321af298c'

  return (
    <SnekFinderContext.Provider
      value={{
        backend,
        initData,
        rootFileId
      }}>
      {children}
    </SnekFinderContext.Provider>
  )
}

export const useSnekFinderContext = () => {
  const context = React.useContext(SnekFinderContext)

  if (!context) {
    throw new Error('useSnekFinder must be used within a SnekFinderProvider')
  }

  return context
}
