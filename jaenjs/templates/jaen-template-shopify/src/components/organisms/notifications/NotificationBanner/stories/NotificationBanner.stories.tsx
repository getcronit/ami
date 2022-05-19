import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {NotificationBanner} from '../NotificationBanner'
import {withJaenMock} from '@jaenjs/jaen'

export default {
  title: 'Components/Organisms/notifications/NotificationBanner',
  component: NotificationBanner,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {
        notify: {
          id: 'test',
          displayName: 'Test',
          description: 'Test',
          forceOpen: true,
          conditions: {
            entireSite: true
          },
          triggers: {
            onPageLoad: 1
          },
          modalProps: {},
          modalContentProps: {
            maxH: 'fit-content',
            maxW: '70%',
            borderRadius: '0.5rem',
            boxShadow: 'sm',
            p: '1rem'
          },
          notification: {
            id: 'test',
            jaenFields: {},
            active: true
          }
        }
      })
      return <MockedStory />
    }
  ]
} as ComponentMeta<typeof NotificationBanner>

const Template: ComponentStory<typeof NotificationBanner> = args => (
  <NotificationBanner {...args} />
)

export const Default = Template.bind({})
