import {Box, Flex, Icon, SimpleGrid, useColorModeValue} from '@chakra-ui/react'
import {graphql, useStaticQuery} from 'gatsby'
import {Stat} from './components/Dashboard/Stats/Stat'
import {StatLabel} from './components/Dashboard/Stats/StatLabel'
import {StatNumber} from './components/Dashboard/Stats/StatNumber'
import {List} from './components/Dashboard/List/List'
import {ListItem} from './components/Dashboard/List/ListItem'

import UndrawThoughts from './components/Dashboard/assets/undraw_thoughts_re_3ysu.svg'
import {FaRocket} from 'react-icons/fa'
import {useChanges} from '../services/hooks'
import {IRemoteFileMigration} from '..'
import {useAppSelector} from '../redux'

const useStats = () => {
  try {
    return useStaticQuery<{
      allJaenNotification: {
        totalCount: number
      }
      allJaenPage: {
        totalCount: number
      }
      jaenInternal: {
        migrationHistory: Array<IRemoteFileMigration>
      }
    }>(graphql`
      query DashboardTab {
        allJaenNotification {
          totalCount
        }
        allJaenPage {
          totalCount
        }
        jaenInternal {
          migrationHistory {
            fileUrl
            createdAt
          }
        }
      }
    `)
  } catch (e) {
    return {
      allJaenNotification: {totalCount: Infinity},
      allJaenPage: {totalCount: Infinity},
      jaenInternal: {migrationHistory: []}
    }
  }
}

export const DashboardTab = () => {
  const {
    allJaenNotification,
    allJaenPage,
    jaenInternal: {migrationHistory}
  } = useStats()

  const {totalChanges} = useChanges()

  const data = [
    {label: 'Total pages', value: allJaenPage.totalCount},
    {label: 'Total notifications', value: allJaenNotification.totalCount},
    {label: 'Unpublished changes', value: totalChanges}
  ]

  const isPublishing = useAppSelector(state => state.status.isPublishing)

  return (
    <>
      <Box as="section" bg={useColorModeValue('gray.50', 'gray.800')} p="10">
        <Box maxW="7xl" mx="auto" px={{base: '6', md: '8'}}>
          <SimpleGrid columns={{base: 1, md: 3}} spacing="6">
            {data.map(({label, value}) => (
              <Stat key={label}>
                <StatLabel>{label}</StatLabel>
                <StatNumber>{value}</StatNumber>
              </Stat>
            ))}
            <Box>
              <List spacing="12" overflowY="scroll" h={'xs'}>
                {isPublishing && (
                  <ListItem
                    title="In progress"
                    subTitle={`Your website will be live in a few minutes.`}
                    circleColor={useColorModeValue('orange.500', 'orange.300')}
                    icon={<Icon as={FaRocket} boxSize="6" />}
                  />
                )}

                {migrationHistory
                  .sort((a, b) =>
                    new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1
                  )
                  .map((m, i) => (
                    <ListItem
                      key={i}
                      title="Published site"
                      subTitle={`Published on ${new Date(
                        m.createdAt
                      ).toLocaleString()}`}
                      circleColor={useColorModeValue('teal.500', 'teal.300')}
                      icon={<Icon as={FaRocket} boxSize="6" />}
                      isLastItem={i === migrationHistory.length - 1}
                    />
                  ))}
              </List>
            </Box>
            <UndrawThoughts />
          </SimpleGrid>
        </Box>
      </Box>
    </>
  )
}

export default DashboardTab
