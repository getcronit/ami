import {SunIcon} from '@chakra-ui/icons'
import {
  useAppDispatch,
  useAppSelector,
  withRedux
} from '@jaen/internal-plugins/notify/redux'
import {internalActions} from '@jaen/internal-plugins/notify/redux/slices'
import {useNotifications} from '@jaen/internal-plugins/notify/services/notification/loader'
import React from 'react'
import NotifyTableCard from '../NotifyTableCard'

export const NotifyTab: React.FC = withRedux(() => {
  const dispatch = useAppDispatch()
  const notifications = useAppSelector(
    state => state.internal.notifications.nodes
  )

  const [
    previewNotificaitonElement,
    setPreviewNotificaitonElement
  ] = React.useState<JSX.Element | undefined>(undefined)

  const allNotifyComponent = useNotifications()

  const handleNotificationActiveSwitch = (id: string, active: boolean) => {
    if (active) {
      dispatch(internalActions.setActive(id))
    } else {
      dispatch(internalActions.setInactive(id))
    }
  }

  const handleNotificationEdit = (id: string) => {
    dispatch(internalActions.setEditing(true))

    const notify = allNotifyComponent.find(n => n.id === id)

    if (notify) {
      const {Component, notification} = notify

      setPreviewNotificaitonElement(
        <Component
          id={id}
          notification={notification}
          forceOpen
          onClose={() => {
            dispatch(internalActions.setEditing(false))
            setPreviewNotificaitonElement(undefined)
          }}
        />
      )
    }
  }

  const data = allNotifyComponent.map(item => ({
    id: item.id,
    name: item.Component.options.displayName,
    description: item.Component.options.description,
    logo: SunIcon,
    active:
      (notifications[item.id]?.active !== undefined
        ? notifications[item.id]?.active
        : item.notification?.active) || false
  }))

  return (
    <>
      {previewNotificaitonElement}
      <NotifyTableCard
        data={data}
        onSwitchActive={handleNotificationActiveSwitch}
        onEdit={handleNotificationEdit}
      />
    </>
  )
})

export default NotifyTab
