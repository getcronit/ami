import React from 'react'
import {withJaenMock, Field} from '@jaenjs/jaen'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {NewsSectionJSX} from '../NewsSection'
import {jaenData} from './jaen-data'

export default {
  title: 'Components/Organisms/Sections/NewsSection',
  component: NewsSectionJSX,
  decorators: [
    Story => {
      const MockedStory = withJaenMock(Story, {jaenPage: {...jaenData.jaenPage, children: {...jaenData.jaenPage.children}}, jaenPages: {...jaenData.jaenPages}})
      return(
        <MockedStory/>
      )
    }
  ]
} as ComponentMeta<typeof NewsSectionJSX>

const Template: ComponentStory<typeof NewsSectionJSX> = args => (
  <NewsSectionJSX {...args} />
)

export const Default = Template.bind({})
Default.args = {
  anchor: "",
  name: "news",
  displayName: "Neuigkeiten"
}
