import {Box, Tooltip} from '@chakra-ui/react'
import {JaenLogo} from './icons'

export interface JaenActivationButtonProps {
  onClick: () => void
}

export const JaenActivationButton = (props: JaenActivationButtonProps) => {
  return (
    <Tooltip hasArrow label="Login to Jaen" bg="gray.300" color="black">
      <JaenLogo
        zIndex={9999}
        cursor={'pointer'}
        boxSize={'16'}
        position={'fixed'}
        right="15"
        bottom="15"
        onClick={props.onClick}
      />
    </Tooltip>
  )
}

export default JaenActivationButton
