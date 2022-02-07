import {ChevronLeftIcon, ChevronRightIcon, DeleteIcon} from '@chakra-ui/icons'
import {
  Box,
  ButtonGroup,
  Divider,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  useDisclosure
} from '@chakra-ui/react'
import {ISectionConnection} from '@jaen-pages/connectors'
import * as React from 'react'

export type Props = {
  trigger: React.ReactNode
  header: React.ReactNode
  sections: Array<ISectionConnection['options']>
  disabled?: boolean
  disablePrepandSection?: boolean
  disableAppendSection?: boolean
  id: string
  ptrNext: string | null
  ptrPrev: string | null
  onDelete: (id: string, ptrPrev: string | null, ptrNext: string | null) => void
  onAppend: (sectionName: string, id: string, ptrNext: string | null) => void
  onPrepend: (sectionName: string, id: string, ptrPrev: string | null) => void
}

const SectionManagePopover = React.memo<Props>(
  ({
    trigger,
    header,
    sections,
    disabled,
    disablePrepandSection,
    disableAppendSection,
    id,
    ptrNext,
    ptrPrev,
    onDelete,
    onAppend,
    onPrepend
  }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [sectionName, setSectionName] = React.useState(sections[0].name)

    let closing = false

    const handleMouseEnter = () => {
      // Prevent the popover  from closing when the mouse enters the trigger
      if (closing) {
        closing = false
      }

      onOpen()
    }

    const handleMouseLeave = () => {
      closing = true

      // delay of 300ms to prevent the popover from closing immediately
      // when the mouse is over the popover
      setTimeout(() => {
        if (closing) {
          onClose()
        }
      }, 300)
    }

    if (disabled) {
      return <>{trigger}</>
    }

    return (
      <Popover trigger="hover" isOpen={isOpen}>
        <PopoverTrigger>
          <Box
            transition={'box-shadow 0.3s ease-in-out'}
            boxShadow={isOpen ? '0 0 0 2.5px #4fd1c5' : 'none'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={onOpen}
            onBlur={onClose}>
            {trigger}
          </Box>
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <PopoverArrow />
          <PopoverCloseButton onClick={onClose} />
          <PopoverHeader>Manage Section</PopoverHeader>
          <PopoverBody>
            <Box>
              <HStack>
                <Select
                  defaultValue={sectionName}
                  onChange={e => setSectionName(e.target.value)}>
                  {sections.map(({name, displayName}) => (
                    <option key={name} value={name}>
                      {displayName}
                    </option>
                  ))}
                </Select>

                <ButtonGroup isAttached variant="outline">
                  <IconButton
                    aria-label="Add section before"
                    mr="-px"
                    disabled={disablePrepandSection}
                    icon={<ChevronLeftIcon />}
                    onClick={() => {
                      onPrepend(sectionName, id, ptrPrev)
                      onClose()
                    }}
                  />
                  <IconButton
                    aria-label="Add section after"
                    disabled={disableAppendSection}
                    icon={<ChevronRightIcon />}
                    onClick={() => {
                      onAppend(sectionName, id, ptrNext)
                      onClose()
                    }}
                  />
                </ButtonGroup>
                <Divider orientation="vertical" />
                <IconButton
                  variant="outline"
                  aria-label="Delete section"
                  icon={<DeleteIcon />}
                  onClick={() => {
                    onDelete(id, ptrPrev, ptrNext)
                    onClose()
                  }}
                  size="sm"
                />
              </HStack>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  }
)

export default SectionManagePopover
