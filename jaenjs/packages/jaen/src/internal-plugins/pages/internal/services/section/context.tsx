import * as React from 'react'

export type JaenSectionType = {
  chapterName: string
  sectionId: string
}

export const SectionOptionsContext = React.createContext<
  {name: string; displayName: string} | undefined
>(undefined)

export const JaenSectionContext = React.createContext<
  JaenSectionType | undefined
>(undefined)

export const JaenSectionProvider: React.FC<JaenSectionType> = ({
  children,
  chapterName,
  sectionId
}) => {
  return (
    <JaenSectionContext.Provider
      value={{
        chapterName: chapterName,
        sectionId: sectionId
      }}>
      {children}
    </JaenSectionContext.Provider>
  )
}

/**
 * Access the JaenSectionContext.
 *
 * @example
 * ```
 * const { name } = useJaenSectionContext()
 * ```
 */
export const useJaenSectionContext = () => {
  const context = React.useContext(JaenSectionContext)

  return context
}
