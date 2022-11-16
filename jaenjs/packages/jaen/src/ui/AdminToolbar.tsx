import {DiscardButton, EditButton} from '../internal-plugins/pages/ui/toolbar'
import {useAppSelector, withRedux} from '../redux'
import {useIncomingBuildChecker} from '../services/IncomingBuildChecker'
import {PublishButton} from '../ui/toolbar'
import {useNavigate} from '../utils/hooks/useNavigate'
import {AccountSwitcher} from './AccountSwitcher'
import {AdminToolbar} from './components/AdminToolbar'
import {IncomingBuildBanner} from './components/IncomingBuildBanner'
import JaenActivationButton from './components/JaenActivationButton'
import {ToolbarChangesElement} from './ToolbarChangesElement'

const logoText = 'Jaen Admin'
const toolbarItems = {
  left: [
    <EditButton />,
    <DiscardButton />,
    <PublishButton />,
    <ToolbarChangesElement />
  ],
  right: [<AccountSwitcher />]
}

const AdminToolbarContainer = withRedux(() => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
  const {isIncomingBuild, onOpenAlert} = useIncomingBuildChecker()

  const navigate = useNavigate()

  const handleJaenActivation = () => {
    if (isAuthenticated) {
      navigate('/admin/')
    } else {
      navigate('/admin/login')
    }
  }

  return (
    <>
      {isIncomingBuild && <IncomingBuildBanner onUpdateClick={onOpenAlert} />}
      {isAuthenticated ? (
        <AdminToolbar logoText={logoText} toolbarItems={toolbarItems} />
      ) : (
        <JaenActivationButton onClick={handleJaenActivation} />
      )}
    </>
  )
})

export default AdminToolbarContainer
