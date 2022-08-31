import {
  Box,
  Circle,
  HStack,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import {navigate} from 'gatsby'
import {useInRouterContext} from 'react-router-dom'
import {store as storePages} from '../internal-plugins/pages/internal/redux'
import {internalActions} from '../internal-plugins/pages/internal/redux/slices'
import {store, useAppDispatch, useAppSelector} from '../redux'
import {demoLogout, logout} from '../redux/slices/auth'
import {useIncomingBuildChecker} from '../services/IncomingBuildChecker'
import {AccountSwitcherButton} from './components/AccountSwitcherButton'

export const AccountSwitcher = () => {
  const dispatch = useAppDispatch()

  const incomingBuild = useIncomingBuildChecker()

  const handleSignOut = () => {
    const isDemo = store.getState().auth.user?.isDemo

    if (isDemo) {
      dispatch(demoLogout({}))
    } else {
      dispatch(logout())
    }

    storePages.dispatch(internalActions.setIsEditing(false))
    storePages.dispatch(internalActions.discardAllChanges())
  }

  const user = useAppSelector(state => state.auth.user)

  const email = user?.email || 'No email'
  const fullName = user?.full_name || 'No name'
  const imageSrc =
    user?.image_url || 'https://avatars.githubusercontent.com/u/52858351?v=4'

  const notificationIcon = <Circle size="2" bg="orange.300" />

  let inRouter = false
  if (typeof window !== 'undefined') {
    inRouter = useInRouterContext()
  }

  return (
    <Menu>
      <AccountSwitcherButton
        name={fullName}
        imageSrc={imageSrc}
        iconRight={incomingBuild.isIncomingBuild && notificationIcon}
      />

      <MenuList
        fontSize={'sm'}
        shadow="md"
        py="4"
        color={useColorModeValue('gray.600', 'gray.200')}
        px="3">
        <Text fontWeight="medium" mb="2">
          {email}
        </Text>
        <MenuDivider />
        {!inRouter ? (
          <MenuItem rounded="md" onClick={() => navigate('/admin')}>
            Admin
          </MenuItem>
        ) : (
          <MenuItem rounded="md" onClick={() => navigate('/')}>
            Landing Page
          </MenuItem>
        )}

        {(incomingBuild.isIncomingBuild || incomingBuild.isDisabled) && (
          <MenuItem rounded="md" onClick={incomingBuild.onOpenAlert}>
            <HStack>
              {notificationIcon}
              <Box>Update to latest version</Box>
            </HStack>
          </MenuItem>
        )}
        <MenuDivider />

        <MenuItem rounded="md" onClick={handleSignOut}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
