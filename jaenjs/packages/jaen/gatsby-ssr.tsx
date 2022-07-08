import {Box, Flex} from '@chakra-ui/react'
import {GatsbySSR} from 'gatsby'
import React from 'react'
import {IncomingBuildCheckerProvider} from './src/services/IncomingBuildChecker'
import {AnalyticsProvider} from './src/services/tracking/AnalyticsProvider'
import {IJaenConfig} from './src/types'
import AdminToolbarContainer from './src/ui/AdminToolbar'

export const wrapRootElement: GatsbySSR['wrapRootElement'] = ({element}) => {
  return <IncomingBuildCheckerProvider>{element}</IncomingBuildCheckerProvider>
}

export const wrapPageElement: GatsbySSR['wrapPageElement'] = (
  {element, props},
  pluginOptions
) => {
  const options = pluginOptions as unknown as IJaenConfig

  const inner = (
    <Flex direction={'column'}>
      <Box pos="sticky" top="0" zIndex={'banner'}>
        <AdminToolbarContainer />
      </Box>

      <Box>{element}</Box>
    </Flex>
  )

  return (
    <AnalyticsProvider
      pageProps={props}
      snekAnalyticsId={options.snekAnalyticsId}>
      {inner}
    </AnalyticsProvider>
  )
}
