import React from 'react'
import {IJaenTemplate} from '../../../../types'
import {useSiteContext} from '../context'
import {useStaticJaenTemplates} from './useStaticJaenTemplates'

/**
 * Access the JaenTemplates
 */
export const useJaenTemplates = () => {
  const site = useSiteContext()
  const jaenTemplates = useStaticJaenTemplates()

  const [isLoading, setIsLoading] = React.useState(true)

  const [templates, setTemplates] =
    React.useState<{
      [name: string]: IJaenTemplate
    } | null>(null)

  React.useEffect(() => {
    const load = async () => {
      setIsLoading(true)
      const tmpls: {[name: string]: IJaenTemplate} = {}

      for (const templateNode of jaenTemplates) {
        const {name: loadTemplate} = templateNode

        if (loadTemplate && !(loadTemplate in (templates || {}))) {
          const Component = await site.templateLoader(loadTemplate)
          const children = []

          for (const child of Component.options.children) {
            const ad = await site.templateLoader(child)
            children.push({
              name: child,
              displayName: ad.options.displayName
            })
          }

          tmpls[loadTemplate] = {
            name: loadTemplate,
            displayName: Component.options.displayName,
            children,
            isRootTemplate: Component.options.isRootTemplate
          }
        }
      }

      setTemplates(tmpls)
      setIsLoading(false)
    }

    load()
  }, [])

  const templatesArray = React.useMemo(
    () => Object.values(templates || {}),
    [templates]
  )

  return {templates: templatesArray, isLoading}
}
