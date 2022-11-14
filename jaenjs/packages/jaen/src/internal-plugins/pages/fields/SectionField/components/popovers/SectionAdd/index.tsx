import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal
} from '@chakra-ui/react'
import * as React from 'react'

export type Props = {
  header: React.ReactNode
  disabled?: boolean
  sections: {
    name: string
    displayName: string
  }[]
  onSelect: (name: string) => void
}

const SectionAddPopover: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  header,
  disabled,
  sections,
  onSelect
}) => {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <Popover trigger="hover" placement="top" isLazy closeOnBlur={false}>
      {({onClose}) => (
        <>
          <PopoverTrigger>
            <Box
              w="100%"
              transition={'box-shadow 0.3s ease-in-out'}
              _hover={{boxShadow: '0 0 0 2.5px #4fd1c5'}}>
              {children}
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              {header && <PopoverHeader>{header}</PopoverHeader>}
              <PopoverBody>
                {sections.map(({name, displayName}) => (
                  <Button
                    key={name}
                    onClick={() => {
                      onSelect(name)
                      onClose()
                    }}>
                    {displayName}
                  </Button>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </>
      )}
    </Popover>
  )
}

export default SectionAddPopover
