import {Box, ButtonGroup, Button} from '@chakra-ui/react'
import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {AccountSwitcher} from '../AccountSwitcher'
import {AdminToolbar as Component} from './AdminToolbar'

export default {
  title: 'NewUI/AdminToolbar',
  component: Component
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Basic: Story<ComponentProps> = Template.bind({})

const Test = () => {
  return (
    <ButtonGroup variant={'outline'} isAttached size={'md'}>
      <Button mr={'-px'} colorScheme="teal">
        Admin
      </Button>
      <Button>Preview</Button>
    </ButtonGroup>
  )
}

Basic.args = {
  logoText: 'Jaen Admin',
  toolbarItems: {
    left: [],
    right: [<Test />]
  }
}
