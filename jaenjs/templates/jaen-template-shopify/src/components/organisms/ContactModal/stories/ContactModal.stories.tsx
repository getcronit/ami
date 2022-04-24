import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {ContactModal} from '../ContactModal'

export default {
  title: 'Components/Organisms/ContactModal',
  component: ContactModal
} as ComponentMeta<typeof ContactModal>

const Template: ComponentStory<typeof ContactModal> = args => (
  <ContactModal {...args} />
)

export const About = Template.bind({})
About.args = {
  isOpen: true,
  heading: <p>Kaufanfrage (unverbindlich)</p>,
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
  wishlist: [],
  onClose: () => null
}
