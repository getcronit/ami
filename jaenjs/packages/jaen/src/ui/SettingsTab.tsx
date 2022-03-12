import {useAppDispatch, withRedux} from '../redux'
import {updateSiteMetadata} from '../redux/slices/site'
import {useSite} from '../services/site'
import {ISite} from '../types'
import SettingsTab from './components/Settings'

export const SettingsContainer = withRedux(() => {
  const dispatch = useAppDispatch()
  const data = useSite()

  const handleUpdate = (data: ISite) => {
    if (data.siteMetadata) {
      dispatch(updateSiteMetadata(data.siteMetadata))
    }
  }

  return <SettingsTab data={data} onUpdate={handleUpdate} />
})

export default SettingsContainer
