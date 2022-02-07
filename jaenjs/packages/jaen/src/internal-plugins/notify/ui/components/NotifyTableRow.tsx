import {EditIcon} from '@chakra-ui/icons'
import {
  As,
  Button,
  Flex,
  Icon,
  Switch,
  Td,
  Text,
  Tr,
  useColorModeValue
} from '@chakra-ui/react'
import React from 'react'

export interface NotifyTableRowProps {
  name: string
  description: string
  logo: As<any>
  active: boolean
  onSwitchActive: (active: boolean) => void
  onEdit: () => void
}

export function NotifyTableRow(props: NotifyTableRowProps) {
  const {logo, name, description, active} = props
  const textColor = useColorModeValue('gray.700', 'white')

  const [isActive, setIsActive] = React.useState(active)

  React.useEffect(() => {
    setIsActive(active)
  }, [active])

  const handleSwitchActive = () => {
    setIsActive(!isActive)
    props.onSwitchActive(!isActive)
  }

  return (
    <Tr>
      <Td minWidth={{sm: '250px'}} pl="0px">
        <Flex alignItems="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={logo} h={'24px'} w={'24px'} me="18px" />
          <Text
            fontSize="md"
            color={textColor}
            fontWeight="bold"
            minWidth="100%">
            {name}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text fontSize="sm" color={textColor}>
          {description}
        </Text>
      </Td>
      <Td>
        <Switch isChecked={isActive} onChange={handleSwitchActive} />
      </Td>
      <Td>
        <Button p="0px" bg="transparent" onClick={props.onEdit}>
          <Icon as={EditIcon} color="gray.400" cursor="pointer" />
        </Button>
      </Td>
    </Tr>
  )
}

export default NotifyTableRow
