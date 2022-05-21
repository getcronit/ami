import {
  Box,
  Circle,
  Flex,
  Spacer,
  Stack,
  useColorModeValue as mode,
  Text,
  Button
} from '@chakra-ui/react'
import * as React from 'react'
import {
  BiBuoy,
  BiCog,
  BiCommentAdd,
  BiCreditCard,
  BiEnvelope,
  BiHome,
  BiNews,
  BiPurchaseTagAlt,
  BiRecycle,
  BiRedo,
  BiUserCircle,
  BiWallet
} from 'react-icons/bi'
import {JaenLogo} from './icons'
import {NavGroup} from './NavGroup'
import {NavItem} from './NavItem'

export type SidebarItem = {
  path: string
  icon: JSX.Element
  label: string
}

export interface UIProps {
  toolbar: JSX.Element
  sidebarItems: {
    activePath: string
    ungrouped: Array<SidebarItem>
    grouped: {
      [group: string]: {
        label: string
        items: Array<SidebarItem>
      }
    }
  }
  onSidebarItemClick: (path: string) => void
  onSettingsClick: () => void
  onHelpClick: () => void
}

export const AdminPageShell: React.FC<UIProps> = ({
  toolbar,
  children,
  sidebarItems,
  onSidebarItemClick,
  onSettingsClick,
  onHelpClick
}) => {
  return (
    <Box height="100vh" overflow="hidden" position="relative">
      {toolbar}
      <Flex h="calc(100vh - 54px)" id="app-container">
        <Box w="64" bg="gray.900" color="white" fontSize="sm">
          <Flex h="100%" direction="column" px="4" py="4">
            <Stack spacing="8" flex="1">
              <Stack spacing="1">
                {sidebarItems.ungrouped.map(item => (
                  <NavItem
                    active={item.path === sidebarItems.activePath}
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    onClick={() => onSidebarItemClick(item.path)}
                  />
                ))}
              </Stack>
              {Object.entries(sidebarItems.grouped).map(([key, group]) => (
                <NavGroup key={key} label={group.label}>
                  {group.items.map(item => (
                    <NavItem
                      active={item.path === sidebarItems.activePath}
                      key={item.path}
                      icon={item.icon}
                      label={item.label}
                      onClick={() => onSidebarItemClick(item.path)}
                    />
                  ))}
                </NavGroup>
              ))}
            </Stack>
            <Spacer />
            <Stack>
              <NavItem
                subtle
                icon={<BiCog />}
                label="Settings"
                onClick={onSettingsClick}
              />
              <NavItem
                subtle
                icon={<BiBuoy />}
                label="Help & Support"
                endElement={<Circle size="2" bg="blue.400" />}
                onClick={onHelpClick}
              />
            </Stack>
          </Flex>
        </Box>
        <Box
          bg={mode('gray.50', 'gray.700')}
          w="100%"
          h="100%"
          overflowY="hidden">
          <Box rounded="lg" bg="white" m="4" p="6">
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default AdminPageShell
