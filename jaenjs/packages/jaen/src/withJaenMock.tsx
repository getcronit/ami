import {Flex, Box} from '@chakra-ui/react'
import {
  NotificationProvider,
  NotificationProviderProps
} from './internal-plugins/notify/services/notification/context'
import {withRedux as withNotifyRedux} from './internal-plugins/notify/redux'
import {
  JaenPageContext,
  JaenPageProvider
} from './internal-plugins/pages/internal/services/page'
import {SiteProvider} from './internal-plugins/pages/internal/services/site'
import {DiscardButton, EditButton} from './internal-plugins/pages/ui/toolbar'
import {IncomingBuildCheckerProvider} from './services/IncomingBuildChecker'
import {AdminToolbar} from './ui/components/AdminToolbar'
import {ToolbarChangesElement} from './ui/ToolbarChangesElement'
import {withSnekFinder} from './withSnekFinder'

type NotifyMockProps = {
  notify: NotificationProviderProps
}

export type JaenMockProps = NotifyMockProps | JaenPageContext

export const withJaenMock = <P extends object>(
  Component: React.ComponentType<P>,
  mockProps: JaenMockProps
) => {
  const InnerElement = ({children}: {children: React.ReactNode}) => {
    if ((mockProps as any).notify) {
      const props = mockProps as NotifyMockProps

      const NotifyRedux = withNotifyRedux(NotificationProvider)

      return (
        <NotifyRedux {...props.notify} editable>
          {children}
        </NotifyRedux>
      )
    }

    if ((mockProps as any).jaenPage) {
      const props = mockProps as JaenPageContext

      return (
        <SiteProvider>
          <JaenPageProvider {...props}>{children}</JaenPageProvider>
        </SiteProvider>
      )
    }

    return <>{children}</>
  }

  const MockedComponent = (props: P) => {
    return (
      <IncomingBuildCheckerProvider>
        <Flex direction={'column'}>
          <Box pos="sticky" top="0" zIndex={'banner'}>
            <AdminToolbar
              logoText={'Jaen Mock'}
              toolbarItems={{
                left: [
                  <EditButton />,
                  <ToolbarChangesElement />,
                  <DiscardButton />
                ],
                right: []
              }}
            />
          </Box>
          <Box>
            <InnerElement>
              <Component {...props} />
            </InnerElement>
          </Box>
        </Flex>
      </IncomingBuildCheckerProvider>
    )
  }

  return withSnekFinder(MockedComponent)
}
