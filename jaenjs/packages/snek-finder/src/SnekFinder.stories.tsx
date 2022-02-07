import {Box, Button, ButtonGroup, Flex, Input} from '@chakra-ui/react'
import {Meta} from '@storybook/react'
import React from 'react'
import OSGBackend from './backends/OSGBackend'
import {FinderData} from './components/organisms/Finder/types'
import {SnekFinderProvider, useSnekFinderContext} from './SnekFinderProvider'
import {useSnekFinder} from './useSnekFinder'

//> Story without component

const IndexController = () => {
  const {backend} = useSnekFinderContext()

  return (
    <Box>
      <Box>
        <Button
          onClick={async () => {
            alert(JSON.stringify(await backend.uploadIndex()))
          }}>
          Upload Index
        </Button>
      </Box>
    </Box>
  )
}

export default {
  title: 'SnekFinder',
  component: Button,
  decorators: [
    Story => (
      <SnekFinderProvider
        backend={OSGBackend}
        initDataLink="https://osg.snek.at/storage/BQACAgQAAxkDAAIG7GIcqzzA1WVE78junWZTd0_QdCcDAALGCwACme_pUEsN3jeKXS9cIwQ"
        rootFileId="ae4b3bf8-6ed2-4ac6-bf18-722321af298c">
        <>
          <IndexController />
          <Story />
        </>
      </SnekFinderProvider>
    )
  ]
} as Meta

export const ToggleSelector = () => {
  const {finderElement, toggleSelector} = useSnekFinder({
    onAction: action => {
      console.log('action', action)
      if (action.type === 'SELECTOR_SELECT') {
        toggleSelector()
      }
    },
    mode: 'selector'
  })

  return (
    <>
      {finderElement}
      <Button onClick={() => toggleSelector()}>Open</Button>
    </>
  )
}

export const Element = () => {
  const {finderElement} = useSnekFinder({
    onAction: action => console.log('action', action),
    mode: 'browser'
  })

  return <Box h="90vh">{finderElement}</Box>
}

export const SmallElement = () => {
  const {finderElement} = useSnekFinder({
    onAction: action => console.log('action', action),
    mode: 'browser'
  })

  return <Box h="500px">{finderElement}</Box>
}
