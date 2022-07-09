import type {GatsbyBrowser} from 'gatsby'
import {NotificationsLoader} from './services/notification'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props
}) => {
  return (
    <NotificationsLoader pageProps={props}>
      <>{element}</>
    </NotificationsLoader>
  )
}
