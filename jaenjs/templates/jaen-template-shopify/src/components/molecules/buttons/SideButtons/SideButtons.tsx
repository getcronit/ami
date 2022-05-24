import React from 'react'
import {IconButton, ButtonGroup} from '@chakra-ui/react'
import {FiMail} from '@react-icons/all-files/fi/FiMail'
import {FiMapPin} from '@react-icons/all-files/fi/FiMapPin'
import {FiPhoneCall} from '@react-icons/all-files/fi/FiPhoneCall'

export interface SideButtonsProps {
  onMailButtonClick: () => void
  onLocationButtonClick: () => void
  onPhoneButtonClick: () => void
}

export const SideButtons: React.FC<SideButtonsProps> = props => {
  return (
    <ButtonGroup
      as="aside"
      color="white"
      colorScheme="agt.redScheme"
      position="fixed"
      bottom={{base: '0', md: '50%'}}
      right="0"
      display="flex"
      flexDirection={{base: 'row', md: 'column'}}
      w={{base: '100%', md: 'unset'}}
      spacing="0"
      zIndex="999">
      <IconButton
        w={{base: '100%', md: 'unset'}}
        aria-label="Email"
        icon={<FiMail fontSize="20px" />}
        onClick={() => {
          props.onMailButtonClick()
        }}/>
      <IconButton
        w={{base: '100%', md: 'unset'}}
        aria-label="Location"
        icon={<FiMapPin fontSize="20px" />}
        onClick={() => {
          props.onLocationButtonClick()
        }}/>
      <IconButton
        w={{base: '100%', md: 'unset'}}
        aria-label="Phone"
        icon={<FiPhoneCall fontSize="20px" />}
        onClick={() => {
          props.onPhoneButtonClick()
        }}/>
    </ButtonGroup>
  )
}
