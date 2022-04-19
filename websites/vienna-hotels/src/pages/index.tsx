import {
  Box,
  BoxProps,
  Center,
  chakra,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VisuallyHidden,
  VStack,
  createIcon,
  Icon,
  HStack,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { CSSProperties, ReactNode } from "react";
import { connectPage, connectSection, Field, useField } from "@jaenjs/jaen";
import { StaticImage } from "gatsby-plugin-image";
import { graphql, Link as GatsbyLink } from "gatsby";
import * as React from "react";
import { StarIcon } from "@chakra-ui/icons";

const StarsDivider = () => (
  <HStack pt="4">
    {new Array(5).fill(0).map((_, i) => (
      <StarIcon key={i} boxSize="8" color="#958247" />
    ))}
  </HStack>
);

const IMAGE =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80";

const HotelItem = connectSection(
  (props: BoxProps) => {
    const hiddenUrlField = useField<string>("hiddenUrl", "IMA:TextField");

    const card = (
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${IMAGE})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Field.Image
              name={"image"}
              width={"100%"}
              height={"100%"}
              style={{
                width: "100%",
                objectFit: "cover",
                height: "50%",
                borderRadius: "1em",
              }}
              imgStyle={{
                borderRadius: "1em",
              }}
              defaultValue={
                <StaticImage
                  objectFit="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  imgStyle={{
                    borderRadius: "1em",
                  }}
                  alt=""
                  src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80"
                />
              }
            />
          </Box>

          <VStack pt={10} spacing={6} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              <Field.Text name={"lead"} defaultValue={"Lead"} />
            </Text>
            <Heading fontSize={"3xl"} fontFamily={"heading"} fontWeight={500}>
              <Field.Text name={"title"} defaultValue={"City Pension"} />
            </Heading>
            <Text color={"gray.500"} textAlign="center">
              <Field.Text name={"address"} defaultValue={"Addresse"} />
            </Text>
            <Box mx="auto">
              <Field.Image
                name={"logoimage"}
                height={"100px"}
                objectFit={"contain"}
                style={{
                  height: 100,
                }}
                imgStyle={{
                  height: 100,
                  objectFit: "contain",
                }}
                defaultValue={
                  <StaticImage alt="" src="../images/citypension.png" />
                }
              />
            </Box>
            <Field.Text name="hiddenUrl" defaultValue="Empty" hiddenField />
          </VStack>
        </Box>
      </Center>
    );

    const value = (
      hiddenUrlField.value ||
      hiddenUrlField.staticValue ||
      ""
    ).replace(/<\/?[^>]+(>|$)/g, "");

    if (hiddenUrlField.isEditing || !value) {
      return card;
    }

    return (
      <a href={value} target="_blank">
        {card}
      </a>
    );
  },
  {
    name: "HotelCard",
    displayName: "Hotel Card",
  }
);

const HotelItems = () => {
  return (
    <>
      <Field.Section
        name="hotelfield"
        displayName="Hotels"
        as={VStack}
        props={{
          display: {
            base: "flex",
            md: "none",
          },
        }}
        sections={[HotelItem]}
      />
      <Field.Section
        name="hotelfield"
        displayName="Hotels"
        as={Flex}
        props={{
          mt: -20,
          display: {
            base: "none",
            md: "flex",
          },
        }}
        sectionProps={(props) => ({
          m: 2,
          mt:
            props.count === 1 || props.count === props.totalSections
              ? undefined
              : 16,
          w: `${100 / props.totalSections}%`,
          objectFit: "cover",
        })}
        sections={[HotelItem]}
      />
    </>
  );
};

export default connectPage(
  () => {
    const impressumDisclosure = useDisclosure();

    return (
      <Box
        bg={useColorModeValue("white", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          mb={2}
          spacing={4}
          justify={"center"}
          align={"center"}
        >
          <Heading
            as="h2"
            size="xs"
            textTransform="uppercase"
            fontWeight={"thin"}
            textAlign={"center"}
          >
            <Field.Text name="text1" defaultValue="Hotels" />
          </Heading>
          <Heading
            w="full"
            as="h1"
            fontSize={{
              base: "2xl",
              md: "3xl",
              lg: "6xl",
            }}
            textAlign={"center"}
            mt={10}
            color="#958247"
          >
            <Field.Text name="title" defaultValue="Vienna Hotels" />
          </Heading>
          <Heading
            as="h2"
            size="xs"
            textTransform="uppercase"
            fontWeight={"thin"}
            textAlign={"center"}
          >
            <VStack spacing={0}>
              <Field.Text name="text2" defaultValue="Hotels in Vienna" />

              <StarsDivider />
            </VStack>
          </Heading>

          <Stack direction={"row"} spacing={6}></Stack>
        </Container>
        <HotelItems />

        <StaticImage src="../images/skyline.jpeg" alt="Skyline of Vienna" />
        <Box>
          <Modal
            isOpen={impressumDisclosure.isOpen}
            onClose={impressumDisclosure.onClose}
            size="4xl"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Impressum</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Field.Text name="impressum" defaultValue="Impressum" />
              </ModalBody>
            </ModalContent>
          </Modal>
          <Box
            borderTopWidth={1}
            borderStyle={"solid"}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <Container
              as={Stack}
              maxW={"6xl"}
              py={4}
              direction={{ base: "column", md: "row" }}
              spacing={4}
              justify={{ base: "center", md: "space-between" }}
              align={{ base: "center", md: "center" }}
            >
              <HStack>
                <Text as={Link} onClick={impressumDisclosure.onToggle}>
                  Impressum
                </Text>
              </HStack>
              <Text>© 2022 snek.at. All rights reserved</Text>

              <Stack direction={"row"} spacing={6}></Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    );
  },
  {
    displayName: "HomePage",
  }
);

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
  }
`;
