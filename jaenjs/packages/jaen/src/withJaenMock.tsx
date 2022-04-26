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

export const withJaenMock = <P extends object>(
  Component: React.ComponentType<P>,
  jaenPageProps: JaenPageContext
) => {
  const MockedComponent = (props: P) => {
    return (
      <IncomingBuildCheckerProvider>
        <SiteProvider>
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
          <JaenPageProvider {...jaenPageProps}>
            <Component {...props} />
          </JaenPageProvider>
        </SiteProvider>
      </IncomingBuildCheckerProvider>
    )
  }

  return withSnekFinder(MockedComponent)
}
