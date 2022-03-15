import {
  useAppDispatch,
  useAppSelector,
  withRedux
} from '../../../../notify/redux'
import {internalActions} from '../../../../notify/redux/slices'
import {useNotifications} from '../../../../notify/services/notification/loader'
import React from 'react'
import NotifyTableCard from '../NotifyTableCard'
import {BiNotification} from 'react-icons/bi'

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
    logo: item.Component.options.logo || BiNotification,
    active:
      notifications[item.id]?.active !== undefined
        ? notifications[item.id]?.active
        : item.isActive
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
