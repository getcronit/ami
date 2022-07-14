import {Meta, Story} from '@storybook/react'

import ImageViewer, {ImageViewerProps} from '.'

export default {
  title: 'Organisms/ImageViewer',
  component: ImageViewer
} as Meta

const Template: Story<ImageViewerProps> = args => <ImageViewer {...args} />

export const Primary: Story<ImageViewerProps> = Template.bind({})

Primary.args = {
  src:
    'https://topsexymodels.net/wp-content/uploads/2020/04/_92444178_518742988810667_5403639706982625195_n-820x1024.jpg',
  onClose: () => null
}

export const Huge: Story<ImageViewerProps> = Template.bind({})

Huge.args = {
  src:
    'https://upload.wikimedia.org/wikipedia/commons/d/d4/Wikidata_Map_April_2016_Huge.png',
  onClose: () => null
}

export const Mario: Story<ImageViewerProps> = Template.bind({})

Mario.args = {
  src:
    'https://osg.snek.at/storage/BQACAgQAAxkDAAIG62Icqx5FOrs4Ebfb_wqb3UXflqdqAALFCwACme_pUGv0zVvz-wo7IwQ',
  onClose: () => null
}
