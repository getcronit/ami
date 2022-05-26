import AdminToolbarContainer from './src/ui/AdminToolbar'
import {GatsbyBrowser} from 'gatsby'
import {SnekFinder} from './src/withSnekFinder'
import {Flex, Box} from '@chakra-ui/react'
import {IncomingBuildCheckerProvider} from './src/services/IncomingBuildChecker'

// self executing function to avoid polluting the global namespace
import {TrackingProvider} from './src/services/tracking/TrackingProvider'
import {IJaenConfig} from './src/types'

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({
  element
}) => {
  return <IncomingBuildCheckerProvider>{element}</IncomingBuildCheckerProvider>
}

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = (
  {element, props},
  pluginOptions
) => {
  const pathname = window.location.pathname

  const options = (pluginOptions as unknown) as IJaenConfig

  let inner = (
    <Flex direction={'column'}>
      <Box pos="sticky" top="0" zIndex={'banner'}>
        <AdminToolbarContainer />
      </Box>
      <Box>{element}</Box>
    </Flex>
  )

  if (pathname.startsWith('/admin')) {
    inner = <SnekFinder>{element}</SnekFinder>
  }

  if (options.snekAnalyticsId) {
    return (
      <TrackingProvider
        pageProps={props}
        snekAnalyticsId={options.snekAnalyticsId}>
        {inner}
      </TrackingProvider>
    )
  }

  return inner
}
