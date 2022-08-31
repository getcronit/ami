import {withRedux} from '../../internal/redux'
import {PageManagerProvider} from '../components/providers/PageManagerProvider'
import PagesTab from '../components/tabs/Pages'

export const PagesContainer = withRedux(() => {
  return (
    <PageManagerProvider>
      <PagesTab />
    </PageManagerProvider>
  )
})

export default PagesContainer
