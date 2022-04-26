import React from 'react'
import {Image} from '@chakra-ui/react'
import {ComponentStory, ComponentMeta} from '@storybook/react'

import {AboutSection} from '../AboutSection'

export default {
  title: 'Components/Organisms/Sections/AboutSection',
  component: AboutSection,
  decorators: [
    storyFn => (
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}>
        {storyFn()}
      </div>
    )
  ]
} as ComponentMeta<typeof AboutSection>

const Template: ComponentStory<typeof AboutSection> = args => (
  <AboutSection {...args} />
)

export const Default = Template.bind({})
Default.args = {
  heading: <p>This is me</p>,
  teaser: <p>It's so totally me</p>,
  text: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  ),
  backgroundimage: (
    <Image
      className="backgroundimage"
      alt="backgroundimage"
      src="https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg"
    />
  )
}


