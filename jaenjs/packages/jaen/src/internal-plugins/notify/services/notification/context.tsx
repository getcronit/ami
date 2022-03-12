import {
  Modal,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
  useDisclosure
} from '@chakra-ui/react'
import {IJaenConnection, RequireAtLeastOne} from '../../../../types'
import {PageProps} from 'gatsby'
import * as React from 'react'
import {useAppDispatch, useAppSelector, withRedux} from '../../redux'
import {internalActions} from '../../redux/slices'
import {INotification} from '../../types'

export type NotificationOptions = {
  displayName: string
  description: string
  modalProps?: Omit<ModalProps, 'isOpen' | 'onClose' | 'children'>
  modalContentProps?: ModalContentProps
  conditions: RequireAtLeastOne<{
    entireSite: boolean
    templates: string[]
    urlPatterns: string[]
  }>
  triggers: RequireAtLeastOne<{
    onPageLoad: number
    onPageScroll: {
      percentage: number
      direction: 'up' | 'down'
    }
  }>
  advanced?: Partial<{
    showAfterXPageViews: number
    showUntilXPageViews: number
  }>
  customCondition?: (props: PageProps) => boolean
  customTrigger?: () => Promise<boolean>
}

export const NotificationContext = React.createContext<
  {id: string; notification?: INotification} | undefined
>(undefined)

export const useNotificationContext = () => {
  const context = React.useContext(NotificationContext)
  if (context === undefined) {
    throw new Error(
      `useNotificationContext must be used within a NotificationProvider`
    )
  }
  return context
}

export interface NotificationProviderProps extends NotificationOptions {
  id: string
  notification?: INotification
  forceOpen?: boolean
  onClose?: () => void
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  id,
  notification,
  children,
  modalProps,
  modalContentProps,
  triggers,
  customTrigger,
  advanced,
  forceOpen,
  onClose: onCloseProp
}) => {
  const dispatch = useAppDispatch()
  const {isOpen, onClose, onOpen} = useDisclosure({
    defaultIsOpen: false,
    isOpen: forceOpen
  })

  const handleClose = React.useCallback(() => {
    onCloseProp?.()
    onClose()
  }, [onCloseProp, onClose])

  React.useEffect(() => {
    customTrigger &&
      customTrigger().then(shouldOpen => {
        if (shouldOpen) {
          onOpen()
        }
      })
  }, [isOpen])

  React.useEffect(() => {
    if (triggers) {
      if (triggers.onPageLoad) {
        // wait onPageLoad seconds before opening
        setTimeout(() => {
          onOpen()
        }, triggers.onPageLoad * 1000)
      }

      if (triggers.onPageScroll) {
        const {percentage, direction} = triggers.onPageScroll
        const handleScroll = () => {
          const scrollPercentage =
            window.pageYOffset /
            (document.body.offsetHeight - window.innerHeight)

          if (
            (direction === 'up' && scrollPercentage < percentage) ||
            (direction === 'down' && scrollPercentage > percentage)
          ) {
            onOpen()
            window.removeEventListener('scroll', handleScroll)
          }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  React.useEffect(() => {
    if (advanced) {
      if (advanced.showAfterXPageViews || advanced.showUntilXPageViews) {
        const {showAfterXPageViews, showUntilXPageViews} = advanced

        if (showAfterXPageViews || showUntilXPageViews) {
          dispatch(internalActions.increaseAdvancedPageViews(id))
        }
      }
    }
  }, [advanced])

  return (
    <NotificationContext.Provider value={{id, notification}}>
      <Modal isOpen={isOpen} onClose={handleClose} {...modalProps}>
        <ModalOverlay />
        <ModalContent {...modalContentProps}>{children}</ModalContent>
      </Modal>
    </NotificationContext.Provider>
  )
}

export const connectNotification = <
  P extends {
    id: string
    notification?: INotification
    forceOpen?: boolean
    onClose?: () => void
  }
>(
  Component: React.ComponentType<P>,
  options: NotificationOptions
) => {
  const MyComp: IJaenConnection<P, typeof options> = props => {
    return (
      <NotificationProvider
        id={props.id}
        notification={props.notification}
        forceOpen={props.forceOpen}
        onClose={props.onClose}
        {...options}>
        <Component {...props} />
      </NotificationProvider>
    )
  }

  MyComp.options = options

  return MyComp
}

export type INotificationConnection = ReturnType<typeof connectNotification>

// is notification a banner or a modal?
// enable duration => set duration in interface
// default enabled / disabled
// extended usage => get access to the page props
