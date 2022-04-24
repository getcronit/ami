import React from 'react'
import {
  Container,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Center
} from '@chakra-ui/react'
import {GoogleMaps} from '../../molecules/GoogleMaps'
import {FaAddressBook, FaEnvelopeSquare, FaPhoneSquare} from 'react-icons/fa'
import {BreadcrumbsBanner} from '../../molecules/BreadcrumbsBanner'
import {ContactForm} from '../../molecules/ContactForm'

export interface ContactPageProps {
  path: string
  phone: React.ReactNode
  email: React.ReactNode
  address: React.ReactNode
}

export const ContactPage = (props: ContactPageProps) => {
  return (
    <>
      <BreadcrumbsBanner path={props.path} title="Kontakt" />
      <Container
        as="section"
        maxW="8xl"
        pt="6"
        id="featuredproducts"
        bg={useColorModeValue('white', 'gray.700')}
        borderWidth="1px"
        my={{base: 4, md: 8}}
        px={4}
        py={4}
        borderRadius="lg">
        <ContactForm mb="5" />
        <GoogleMaps src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10977.908361298725!2d14.2921416!3d46.5382484!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0d0d69eedf5cb7d!2sWaffenhandel%20T%C3%BCrk!5e0!3m2!1sen!2sat!4v1647540212169!5m2!1sen!2sat" />
        <SimpleGrid
          spacing="40px"
          py={8}
          columns={[1, 1, 1, 3]}
          bg="agt.gray"
          color="white">
          <Center>
            <VStack spacing={6}>
              <Icon as={FaPhoneSquare} boxSize="16" />
              <Text fontSize="xl" fontWeight="semibold">
                {props.phone}
              </Text>
            </VStack>
          </Center>
          <Center>
            <VStack spacing={6}>
              <Icon as={FaAddressBook} boxSize="16" />
              <Text fontSize="xl" fontWeight="semibold">
                {props.address}
              </Text>
            </VStack>
          </Center>
          <Center>
            <VStack spacing={6}>
              <Icon as={FaEnvelopeSquare} boxSize="16" />
              <Text fontSize="xl" fontWeight="semibold">
                {props.email}
              </Text>
            </VStack>
          </Center>
        </SimpleGrid>
      </Container>
    </>
  )
}
