import {ComponentMeta, Story} from '@storybook/react'
import React from 'react'
import {withSnekFinder} from '../../../../../../withSnekFinder'

import Component from '.'

export default {
  title: 'Dashboard/components/tabs/Pages',
  component: Component,
  decorators: [
    Story => {
      const Component = withSnekFinder(Story)

      return <Component />
    }
  ]
} as ComponentMeta<typeof Component>

type ComponentProps = React.ComponentProps<typeof Component>

// Create a template for the component
const Template: Story<ComponentProps> = args => <Component />

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

export const PagesTab: Story<ComponentProps> = Template.bind({})
PagesTab.args = {
  items: treeExample,
  templates: [],
  creatorFallbackTemplates: [],
  getPage: (id: string) => ({
    id: `JaenPage 1`,
    slug: 'jaen-page-1',
    parent: null,
    children: [],
    jaenPageMetadata: {
      title: 'Jaen Page 1',
      description: 'Jaen Page 1 description',
      image: 'https://via.placeholder.com/300x200',
      canonical: 'https://jaen.com/jaen-page-1',
      datePublished: '2020-01-01',
      isBlogPost: false
    },
    template: 'BlogPage',
    jaenFields: {},
    jaenFiles: [],
    sections: []
  }),
  onItemDoubleClick: () => alert('double clicked')
}
