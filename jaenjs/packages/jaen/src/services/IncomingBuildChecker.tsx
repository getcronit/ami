import {ChakraProvider, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import {default as theme} from '../chakra/theme'
import {persistKey as jaenPersistKey} from '../redux'

import IncomingBuildAlert from '../ui/components/alerts/IncomingBuildAlert/IncomingBuildAlert'
import {useChanges} from './hooks'
import {resetState} from './resetState'

declare global {
  interface Window {
    ___webpackCompilationHash: string | undefined
  }
}

const incomingBuild = () => {
  const key = 'ljch'
  // is undefined when running in development mode
  const latestWebpackCompilationHash =
    typeof window !== 'undefined' ? window.___webpackCompilationHash : undefined

  const isDisabled = latestWebpackCompilationHash === undefined

  const isIncomingBuild = () => {
    if (typeof window === 'undefined') {
      return false
    }

    const latestJaenCompilationHash = localStorage.getItem(key)

    // If the latest webpack compilation hash is not null and different from the latest
    // jaen compilation hash, then we know that there are changes. Otherwise,
    // there are no changes.

    if (
      latestWebpackCompilationHash &&
      latestJaenCompilationHash !== null &&
      latestWebpackCompilationHash !== latestJaenCompilationHash
    ) {
      return true
    }

    // set the latestJaenCompilationHash to the latest webpack compilation hash if
    // the `jaen-state` key is set in localStorage. This is to ensure that there is only
    // a incoming build when the user has logged in to jaen.

    // event listener on localStorage to update the latestJaenCompilationHash
    // when the `jaen-state` key is set.

    if (latestWebpackCompilationHash) {
      const isJaenStateKeySet = localStorage.getItem(jaenPersistKey) !== null

      if (isJaenStateKeySet) {
        localStorage.setItem(key, latestWebpackCompilationHash)
      }
    }

    return false
  }

  const updateToLatest = () => {
    resetState()

    localStorage.removeItem(key)
  }

  return {
    isIncomingBuild: isIncomingBuild(),
    isDisabled,
    updateToLatest
  }
}

const IncomingBuildCheckerContext = React.createContext<
  | {
      isIncomingBuild: boolean
      isDisabled: boolean
      onOpenAlert: () => void
    }
  | undefined
>(undefined)

export const useIncomingBuildChecker = () => {
  const context = React.useContext(IncomingBuildCheckerContext)

  if (context === undefined) {
    throw new Error(
      'useIncomingBuildChecker must be within IncomingBuildCheckerProvider'
    )
  }

  return context
}

export const IncomingBuildCheckerProvider: React.FC<
  React.PropsWithChildren<{}>
> = ({children}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const {isIncomingBuild, isDisabled, updateToLatest} = incomingBuild()

  React.useEffect(() => {
    if (isIncomingBuild) {
      onOpen()
    }
  }, [isIncomingBuild])

  const handleUpdateConfirm = async () => {
    updateToLatest()

    return true
  }

  const {totalChanges} = useChanges()

  return (
    <IncomingBuildCheckerContext.Provider
      value={{
        isIncomingBuild,
        isDisabled,
        onOpenAlert: onOpen
      }}>
      <ChakraProvider resetCSS theme={theme}>
        <IncomingBuildAlert
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleUpdateConfirm}
          totalChanges={totalChanges}
        />
      </ChakraProvider>
      {children}
    </IncomingBuildCheckerContext.Provider>
  )
}
