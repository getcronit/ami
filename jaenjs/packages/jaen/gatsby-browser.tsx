import {Box, Flex} from '@chakra-ui/react'
import {GatsbyBrowser} from 'gatsby'
import {IncomingBuildCheckerProvider} from './src/services/IncomingBuildChecker'
// self executing function to avoid polluting the global namespace
import {AnalyticsProvider} from './src/services/tracking/AnalyticsProvider'
import {IJaenConfig} from './src/types'
import AdminToolbarContainer from './src/ui/AdminToolbar'
import {SnekFinder} from './src/withSnekFinder'

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

  return (
    <AnalyticsProvider
      pageProps={props}
      snekAnalyticsId={options.snekAnalyticsId}>
      {inner}
    </AnalyticsProvider>
  )
}
