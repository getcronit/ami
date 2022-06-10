import {connectNotification} from '@jaenjs/jaen'
import {FiInfo} from '@react-icons/all-files/fi/FiInfo'
import {NotificationBanner} from '../components/organisms/notifications'

export default connectNotification(NotificationBanner, {
  displayName: 'Benachrichtigungs-Banner',
  description:
    'Dies ist ein Banner, das angezeigt wird, wenn ein Benutzer eine Seite für die erste Mal besucht.',
  conditions: {
    entireSite: true
  },
  triggers: {
    onPageLoad: 1
  },
  advanced: {
    showUntilXPageViews: 10
  },
  modalProps: {},
  modalContentProps: {
    maxH: 'fit-content',
    maxW: '70%',
    borderRadius: '0.5rem',
    boxShadow: 'sm',
    p: '1rem'
  },
  logo: FiInfo
})
