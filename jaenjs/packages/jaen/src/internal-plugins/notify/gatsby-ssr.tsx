import type {GatsbySSR} from 'gatsby'
import {NotificationsLoader} from './services/notification'

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props
}) => {
  return (
    <NotificationsLoader pageProps={props}>
      <>{element}</>
    </NotificationsLoader>
  )
}
