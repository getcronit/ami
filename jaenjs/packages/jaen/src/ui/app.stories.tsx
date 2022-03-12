import {withSnekFinder} from '../withSnekFinder'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {AdminPageShell as Component} from './components/AdminPageShell'

import {BsHouse} from '@react-icons/all-files/bs/BsHouse'
import {FaPager} from '@react-icons/all-files/fa/FaPager'
import {BsFiles} from '@react-icons/all-files/bs/BsFiles'
import {BiNotification} from '@react-icons/all-files/bi/BiNotification'

import {FilesContainer} from '../internal-plugins/pages/ui/tabs/Files'
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
