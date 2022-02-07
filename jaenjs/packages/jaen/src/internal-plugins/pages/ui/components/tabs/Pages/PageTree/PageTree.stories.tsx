import {Box} from '@chakra-ui/react'
import {ComponentMeta, Story} from '@storybook/react'

import Component from '.'

export default {
  title: 'Dashboard/components/tabs/pages/PageTree',
  component: Component,
  decorators: [
    Story => (
      <Box w="500px" h="100vh" bg="gray.50">
        <Story />
      </Box>
    )
  ]
} as ComponentMeta<typeof Component>

const treeExample = {
  'SitePage /test': {
    id: 'test',
    children: [],
    data: {
      title: 'root',
      slug: 'root',
      template: null
    },
    parent: null
  },
  '1-1': {
    id: '1-1',
    children: ['1-1-1', '1-1-2'],
    data: {
      title: 'First parent',
      slug: 'root1',
      hasChanges: true,
      template: null
    },
    parent: null
  },
  '1-2': {
    id: '1-2',
    children: [],
    data: {
      title: 'Second parent',
      slug: 'root2',
      template: null
    },
    parent: null
  },
  '1-1-1': {
    id: '1-1-1',
    children: [],
    data: {
      title: 'Child one',
      slug: 'root3',
      template: {
        name: 'BlogPage',
        displayName: 'Blog',
        children: [{name: 'BlogPage', displayName: 'Blog'}]
      }
    },
    parent: '1-1'
  },
  '1-1-2': {
    id: '1-1-2',
    children: [],
    data: {
      title: 'Child two',
      slug: 'root4',
      hasChanges: true,
      template: null
    },
    parent: '1-1'
  },
  '1-2-1': {
    id: '1-2-1',
    children: [],
    data: {
      title: 'Child three',
      slug: 'root4',
      template: null
    },
    parent: '1-2'
  },
  '1-2-2': {
    id: '1-2-2',
    children: [],
    data: {
      title: 'Child four',
      slug: 'root4',
      template: null
    },
    parent: '1-2'
  }
}

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component {...args} />

export const Primary = Template.bind({})

Primary.args = {
  items: treeExample,
  defaultSelection: '1-1',
  templates: [
    {
      name: 'page',
      displayName: 'Page',
      children: [{name: 'blog', displayName: 'Blog'}]
    },
    {
      name: 'blog',
      displayName: 'Blog',
      children: [{name: 'blog', displayName: 'Blog'}]
    }
  ],
  creatorFallbackTemplates: [
    {
      name: 'page',
      displayName: 'Page'
    }
  ],
  onItemSelect: () => {},
  onItemDoubleClick: () => alert('double clicked'),
  onItemCreate: () => {},
  onItemDelete: () => {},
  onItemMove: () => {}
}

export const Empty = Template.bind({})

Empty.args = {
  ...Primary.args,
  items: {}
}
