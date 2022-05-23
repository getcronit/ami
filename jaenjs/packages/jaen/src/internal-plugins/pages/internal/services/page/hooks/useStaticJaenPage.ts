import {useStaticJaenPages} from './useStaticJaenPages'

export const useStaticJaenPage = (jaenPageId: string) => {
  const pages = useStaticJaenPages()

  return pages.find(page => page.id === jaenPageId)
}
