import {addons, types} from '@storybook/addons'

import {ADDON_ID, PARAM_KEY} from './constants'
import {CMSelector} from './manager'

export {withChakraColorMode} from './withChakra'

addons.register(ADDON_ID, api => {
  addons.add(ADDON_ID, {
    title: 'Colormode',
    type: types.TOOLEXTRA,
    match: ({viewMode}) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: () => <CMSelector />,
    paramKey: PARAM_KEY
  })
})
