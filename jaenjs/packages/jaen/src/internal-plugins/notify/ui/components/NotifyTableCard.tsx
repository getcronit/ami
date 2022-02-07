// Chakra imports
import {
  As,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Box
} from '@chakra-ui/react'
import React from 'react'
import {NotifyTableRow} from './NotifyTableRow'

export interface NotifyTableProps {
  data: Array<{
    id: string
    name: string
    description: string
    logo: As<any>
    active: boolean
  }>
  onSwitchActive: (id: string, active: boolean) => void
  onEdit: (id: string) => void
}

export default function NotifyTableCard(props: NotifyTableProps) {
  const textColor = useColorModeValue('gray.700', 'white')

  return (
    <Box overflowY={'auto'} maxHeight={'100vh'} minH="85vh">
      <Table variant="simple" color={textColor}>
        <Thead position="sticky" top={0} bgColor={'white'}>
          <Tr my=".8rem" pl="0px">
            <Th pl="0px" color="gray.400">
              Name
            </Th>
            <Th color="gray.400">Description</Th>
            <Th color="gray.400">Status</Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {props.data.map(row => {
            return (
              <NotifyTableRow
                name={row.name}
                logo={row.logo}
                active={row.active}
                description={row.description}
                key={row.id}
                onSwitchActive={active => props.onSwitchActive(row.id, active)}
                onEdit={() => props.onEdit(row.id)}
              />
            )
          })}
        </Tbody>
      </Table>
    </Box>
  )
}
