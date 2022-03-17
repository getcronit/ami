import {Box, ChakraProvider, useBreakpoint} from '@chakra-ui/react'
import {HomeButton, PublishButton} from '../ui/toolbar'
import {useAppSelector, withRedux} from '../redux'
import theme from '../theme/theme'
import {navigate} from 'gatsby'
import {AccountSwitcher} from './AccountSwitcher'
import {AdminToolbar} from './components/AdminToolbar'
import JaenActivationButton from './components/JaenActivationButton'
import {EditButtonGroup} from '../internal-plugins/pages/ui/toolbar'
import isMobile from 'is-mobile'

export interface IAdminToolbarProps {
  sticky?: boolean
}

const AdminToolbarContainer = withRedux<IAdminToolbarProps>(
  ({sticky = false}) => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

    const handleJaenActivation = () => {
      if (isMobile()) {
        if (typeof window !== 'undefined') {
          window.scrollTo({top: 0, behavior: 'smooth'})
        }
      } else {
        navigate('/jaen/admin/')
      }
    }

    let element = <JaenActivationButton onClick={handleJaenActivation} />

    if (isAuthenticated) {
      const logoText = 'Jaen Admin'
      const toolbarItems = {
        left: [<HomeButton />, <EditButtonGroup />, <PublishButton />],
        right: [
          <Box w="48">
            <AccountSwitcher />
          </Box>
        ]
      }

      element = (
        <AdminToolbar
          logoText={logoText}
          toolbarItems={toolbarItems}
          sticky={sticky}
        />
      )
    }

    return (
      <ChakraProvider theme={theme} resetCSS={false}>
        {element}
      </ChakraProvider>
    )
  }
)

export default AdminToolbarContainer
