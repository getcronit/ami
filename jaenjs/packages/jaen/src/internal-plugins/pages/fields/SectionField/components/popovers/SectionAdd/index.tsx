import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
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

const SectionAddPopover: React.FC<Props> = ({
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
    <Popover trigger="hover" placement="top-start">
      <PopoverTrigger>
        <Box
          transition={'box-shadow 0.3s ease-in-out'}
          _hover={{boxShadow: '0 0 0 2.5px #4fd1c5'}}>
          {children}
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        {header && <PopoverHeader>{header}</PopoverHeader>}
        <PopoverBody>
          {sections.map(({name, displayName}) => (
            <Button key={name} onClick={() => onSelect(name)}>
              {displayName}
            </Button>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default SectionAddPopover
