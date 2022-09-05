import {Center, CircularProgress} from '@chakra-ui/react'
import {RouteComponentProps} from '@reach/router'
import {navigate, PageProps} from 'gatsby'
import * as React from 'react'
import {usePromiseEffect} from '../../../../../../utils/hooks/usePromiseEffect'
import {useAppSelector, withRedux} from '../../../redux'
import {useJaenTemplates, useSiteContext} from '../../../services/site'

const Dynamic = (props: RouteComponentProps & Partial<PageProps>) => {
  const dynamicPaths = useAppSelector(
    state => state.internal.routing.dynamicPaths
  )

  if (typeof window === 'undefined') {
    return <>dynamic</>
  }

  const path = props.location?.hash?.substring(1)

  React.useEffect(() => {
    if (!path || !dynamicPaths[path]) {
      navigate('/')
    }
  }, [path])

  const loadingComponent = (
    <Center my="24">
      <CircularProgress isIndeterminate color="teal.300" />
    </Center>
  )

  const TemplateLoader = ({path}: {path: string}) => {
    const {pageId, templateName} = dynamicPaths[path]

    const {templateLoader} = useSiteContext()

    React.useEffect(() => {
      if (!(path in dynamicPaths)) {
        const newPath = Object.keys(dynamicPaths).find(
          path => dynamicPaths[path]?.pageId === pageId
        )

        if (newPath) {
          // Page has been moved, update to the new path
          navigate(`/~#${newPath}`)
        } else {
          // Page has been deleted, redirect to the parent page
          navigate('/')
        }
      }
    }, [dynamicPaths])

    const {templates} = useJaenTemplates()

    // We need to wait for the template to be loaded before we can render the page,
    // so template null means the template is not loaded yet
    const template = templates
      ? templates.find(t => t.name === templateName)
      : null

    const {value: Component} = usePromiseEffect(async () => {
      if (template) {
        // TODO: Remove this hack to ignore incorrect template names
        return await templateLoader(templateName)
      }
    }, [template])

    if (!Component) {
      return loadingComponent
    }

    return (
      <Component
        {...(props as any)}
        pageContext={{...props.pageContext, jaenPageId: pageId}}
        data={{...props.data, jaenPage: null}}
      />
    )
  }

  if (!path || !dynamicPaths[path]) {
    return loadingComponent
  }

  return <TemplateLoader path={path} />
}

export default withRedux(Dynamic)
