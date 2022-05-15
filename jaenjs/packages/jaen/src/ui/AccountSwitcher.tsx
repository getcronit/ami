import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  Circle,
  useColorModeValue,
  HStack,
  Box
} from '@chakra-ui/react'
import {store, useAppDispatch, useAppSelector} from '../redux'
import {demoLogout, logout} from '../redux/slices/auth'
import {Link} from 'gatsby'
import * as React from 'react'
import {AccountSwitcherButton} from './components/AccountSwitcherButton'
import {useIncomingBuildChecker} from '../services/IncomingBuildChecker'
import {useNavigate} from '../utils/hooks/useNavigate'

export const AccountSwitcher = () => {
  const dispatch = useAppDispatch()

  const incomingBuild = useIncomingBuildChecker()

  const navigate = useNavigate()

  const handleSignOut = () => {
    const isDemo = store.getState().auth.user?.isDemo

    if (isDemo) {
      dispatch(demoLogout({}))
    } else {
      dispatch(logout())
    }
  }
  const handleHelpClick = React.useCallback(() => {
    if (typeof window !== 'undefined') {
      window.open('https://snek.at/docs/jaen/jaen-admin', '_blank')
    }
  }, [])

  const user = useAppSelector(state => state.auth.user)

  const email = user?.email || 'No email'
  const fullName = user?.full_name || 'No name'
  const imageSrc =
    user?.image_url || 'https://avatars.githubusercontent.com/u/52858351?v=4'

  const notificationIcon = <Circle size="2" bg="orange.300" />

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
        <MenuItem rounded="md" onClick={() => navigate('/admin')}>
          Admin
        </MenuItem>
        <MenuItem rounded="md" onClick={() => navigate('/admin#/settings')}>
          Settings
        </MenuItem>

        {(incomingBuild.isIncomingBuild || incomingBuild.isDisabled) && (
          <MenuItem rounded="md" onClick={incomingBuild.onOpenAlert}>
            <HStack>
              {notificationIcon}
              <Box>Update to latest version</Box>
            </HStack>
          </MenuItem>
        )}
        <MenuDivider />
        <MenuItem rounded="md" onClick={handleHelpClick}>
          Help
        </MenuItem>
        <MenuItem rounded="md" onClick={handleSignOut}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
