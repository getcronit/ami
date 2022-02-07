import type {GatsbyBrowser} from 'gatsby'
import {PersistorWrapper} from './redux'
import {NotificationsLoader} from './services/notification'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props
}) => {
  return (
    <PersistorWrapper>
      <NotificationsLoader pageProps={props}>
        <>{element}</>
      </NotificationsLoader>
    </PersistorWrapper>
  )
}
