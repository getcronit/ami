import {JaenPageProvider} from '@jaen-pages/internal/services/page'
import {withSnekFinder} from '@jaen/withSnekFinder'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {AdminPageShell as Component} from './components/AdminPageShell'

import {BsHouse} from '@react-icons/all-files/bs/BsHouse'
import {FaPager} from '@react-icons/all-files/fa/FaPager'
import {BsFiles} from '@react-icons/all-files/bs/BsFiles'
import {BiNotification} from '@react-icons/all-files/bi/BiNotification'

import {AdminToolbar} from './components/AdminToolbar'

import {
  EditButtonGroup,
  PublishButton,
  HomeButton
} from '@jaen/ui/toolbar'
import {FilesContainer} from '@jaen/internal-plugins/pages/ui/tabs/Files'
import {Box} from '@chakra-ui/react'
import {AccountSwitcher} from './AccountSwitcher'
import AdminToolbarContainer from './AdminToolbar'

export default {
  title: 'NewUI',
  component: Component,
  decorators: [
    Story => {
      const Component = withSnekFinder(Story)

      return <Component />
    }
  ]
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

Basic.args = {
  toolbar: <AdminToolbarContainer />,
  content: <FilesContainer />,
  sidebarItems: {
    activePath: '/',
    ungrouped: [
      {
        path: '/',
        icon: <BsHouse />,
        label: 'Dashboard'
      },
      {
        path: '/',
        icon: <BsHouse />,
        label: 'Dashboard2'
      }
    ],
    grouped: {
      site: {
        label: 'Your Site',
        items: [
          {
            path: '/pages',
            icon: <FaPager />,
            label: 'Pages'
          },
          {
            path: '/files',
            icon: <BsFiles />,
            label: 'Files'
          },
          {
            path: '/notifications',
            icon: <BiNotification />,
            label: 'Notifications'
          }
        ]
      }
    }
  }
}
