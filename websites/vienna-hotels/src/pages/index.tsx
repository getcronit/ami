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

const CircleIcon = (props: any) => (
  <Icon viewBox="0 0 1280.000000 640.000000" {...props}>
    <g
      transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
      fill="#958247"
      stroke="none"
    >
      <path
        d="M758 3889 c-271 -33 -507 -150 -631 -310 -175 -228 -166 -576 20
-766 91 -93 232 -142 374 -128 196 18 324 101 398 255 35 73 36 78 36 195 0
114 -2 123 -32 187 -61 130 -166 209 -277 210 -136 1 -187 -117 -65 -154 35
-10 52 -9 111 6 l70 18 24 -23 c13 -13 37 -48 52 -78 25 -51 27 -66 27 -171 0
-105 -2 -119 -27 -165 -69 -133 -215 -204 -393 -192 -59 3 -99 12 -138 30
-135 61 -217 215 -217 402 0 155 46 263 161 377 61 61 95 86 170 122 144 69
268 97 474 103 276 9 497 -35 827 -163 48 -19 91 -34 96 -34 4 0 23 13 42 28
l34 29 -130 50 c-320 126 -516 171 -764 178 -91 2 -199 0 -242 -6z"
      />
      <path
        d="M11663 3890 c-168 -18 -383 -77 -627 -173 l-130 -50 34 -29 c19 -15
38 -28 42 -28 4 0 31 10 60 21 197 79 412 140 580 165 166 24 415 15 558 -21
160 -39 275 -100 369 -193 115 -114 161 -222 161 -377 0 -93 -24 -191 -64
-259 -65 -111 -155 -165 -291 -173 -178 -12 -324 59 -393 192 -25 46 -27 60
-27 165 0 105 2 120 27 171 15 30 39 65 52 78 l24 23 70 -18 c59 -15 76 -16
111 -6 122 37 71 155 -65 154 -111 -1 -216 -80 -277 -210 -30 -64 -32 -73 -32
-187 0 -117 1 -122 36 -195 57 -119 157 -203 283 -236 248 -66 473 24 574 229
101 205 75 459 -67 647 -176 234 -573 356 -1008 310z"
      />
      <path
        d="M4548 3861 c-75 -24 -118 -52 -172 -112 -61 -68 -81 -130 -80 -249 1
-105 31 -213 80 -291 14 -23 24 -42 22 -44 -2 -2 -71 35 -153 82 -389 223
-742 394 -975 473 -374 128 -778 142 -1100 38 -245 -78 -444 -243 -547 -453
-46 -93 -58 -149 -57 -265 1 -89 5 -116 27 -174 86 -220 281 -356 512 -356 96
0 166 18 260 64 132 66 230 164 235 236 5 62 -1 83 -34 116 -26 26 -42 34 -69
34 -74 0 -111 -68 -97 -179 7 -57 5 -60 -70 -103 -77 -44 -152 -61 -254 -56
-77 3 -101 9 -159 37 -187 90 -285 302 -232 504 59 227 295 440 543 492 93 19
310 20 417 1 327 -58 655 -191 1450 -588 504 -253 676 -323 938 -387 268 -66
545 -83 732 -47 308 60 514 239 581 505 25 100 16 249 -19 323 -88 182 -337
263 -579 188 -115 -35 -188 -106 -188 -182 0 -89 124 -106 196 -26 12 12 32
43 44 68 13 25 28 48 34 52 20 14 171 8 224 -7 73 -22 132 -70 165 -135 27
-52 28 -61 25 -165 -3 -103 -5 -115 -41 -189 -72 -151 -221 -264 -422 -318
-118 -31 -376 -32 -527 0 -422 88 -770 337 -856 612 -26 84 -23 233 5 286 29
54 93 109 151 128 47 17 207 22 228 8 6 -4 24 -35 39 -70 31 -69 55 -92 97
-92 58 0 82 60 50 125 -54 112 -260 168 -424 116z"
      />
      <path
        d="M8015 3874 c-152 -38 -250 -168 -179 -238 19 -20 63 -21 90 -2 11 8
33 43 49 78 15 35 33 66 39 70 21 14 181 9 228 -8 58 -19 122 -74 151 -128 28
-53 31 -202 5 -286 -86 -275 -434 -524 -856 -612 -151 -32 -409 -31 -527 0
-201 54 -350 167 -422 318 -36 74 -38 86 -41 189 -3 104 -2 113 25 165 33 65
92 113 165 135 53 15 205 21 224 7 5 -4 20 -27 33 -52 42 -82 91 -120 156
-120 47 0 85 36 85 82 0 72 -76 144 -188 178 -242 75 -491 -6 -579 -188 -35
-74 -44 -223 -19 -323 53 -212 201 -375 415 -458 226 -87 541 -87 898 0 262
64 434 134 938 387 795 397 1123 530 1450 588 120 21 332 18 432 -6 249 -59
470 -264 528 -487 53 -202 -45 -414 -232 -504 -131 -63 -314 -49 -437 33 l-49
33 2 88 c2 85 1 88 -28 117 -77 78 -197 -10 -171 -125 13 -56 55 -111 123
-162 121 -90 241 -133 372 -133 389 0 648 388 501 751 -157 388 -615 608
-1169 560 -270 -22 -476 -79 -773 -211 -171 -76 -458 -226 -699 -363 -82 -47
-151 -84 -153 -82 -2 2 8 21 22 44 49 78 79 186 80 291 1 132 -19 186 -98 266
-81 80 -145 106 -276 110 -52 1 -104 1 -115 -2z"
      />
      <path
        d="M2058 3560 c-20 -11 -39 -24 -42 -29 -9 -13 498 -237 804 -354 80
-30 249 -91 375 -135 127 -44 237 -83 245 -86 8 -4 23 -19 32 -36 33 -59 148
-60 156 -2 7 50 -54 87 -260 157 -310 106 -798 295 -1026 396 -135 60 -245
109 -246 109 -1 -1 -18 -10 -38 -20z"
      />
      <path
        d="M10454 3470 c-224 -100 -707 -287 -1022 -395 -206 -70 -267 -107
-260 -157 8 -58 123 -57 156 2 9 17 24 32 32 36 8 3 119 42 245 86 127 44 295
105 375 135 307 118 813 341 804 354 -5 9 -80 50 -86 48 -2 0 -112 -49 -244
-109z"
      />
      <path
        d="M3080 3240 c0 -3 37 -19 83 -35 81 -30 85 -30 340 -35 141 -3 257 -2
257 1 0 4 -28 19 -62 35 l-63 29 -278 5 c-152 3 -277 3 -277 0z"
      />
      <path
        d="M9435 3240 l-270 -5 -62 -29 c-35 -16 -63 -31 -63 -35 0 -3 116 -4
257 -1 255 5 259 5 341 35 45 16 82 33 82 37 0 5 -3 7 -7 6 -5 -1 -129 -5
-278 -8z"
      />
      <path
        d="M140 3205 l0 -35 341 0 c307 0 341 2 335 16 -3 9 -6 24 -6 35 0 18
-11 19 -335 19 l-335 0 0 -35z"
      />
      <path d="M1012 3208 l3 -33 251 -3 251 -2 10 35 11 35 -265 0 -264 0 3 -32z" />
      <path
        d="M1766 3231 c-3 -4 -10 -20 -15 -34 l-10 -27 469 -2 c259 -2 470 -1
470 2 0 3 -37 20 -83 38 l-83 32 -371 0 c-205 0 -374 -4 -377 -9z"
      />
      <path d="M4546 3205 l26 -35 799 0 799 0 0 35 0 35 -826 0 -825 0 27 -35z" />
      <path d="M6630 3205 l0 -35 799 0 799 0 26 35 27 35 -825 0 -826 0 0 -35z" />
      <path
        d="M10198 3207 c-43 -18 -78 -34 -78 -37 0 -3 211 -4 470 -2 l470 2 -13
33 -13 32 -380 2 -379 1 -77 -31z"
      />
      <path
        d="M11273 3205 l10 -35 248 0 c265 0 259 -1 259 51 0 18 -10 19 -264 19
l-264 0 11 -35z"
      />
      <path
        d="M11990 3221 c0 -11 -3 -26 -6 -35 -6 -14 28 -16 335 -16 l341 0 0 35
0 35 -335 0 c-324 0 -335 -1 -335 -19z"
      />
    </g>
  </Icon>
);

const GoldDivider = createIcon({
  viewBox: "0 0 16 16",
  path: (
    <g
      transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)"
      fill="#000000"
      stroke="none"
    ></g>
  ),
});

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

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

          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              <Field.Text name={"lead"} defaultValue={"Lead"} />
            </Text>
            <Heading fontSize={"2xl"} fontFamily={"heading"} fontWeight={500}>
              <Field.Text name={"title"} defaultValue={"City Pension"} />
            </Heading>
            <Text color={"gray.500"}>
              <Field.Text name={"address"} defaultValue={"Addresse"} />
            </Text>
            <Box mx="auto">
              <Field.Image
                name={"logoimage"}
                height={100}
                defaultValue={
                  <StaticImage alt="" src="../images/citypension.png" />
                }
              />
            </Box>
            <Field.Text name="hiddenUrl" defaultValue="Empty" hiddenField />
          </Stack>
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
          >
            <Field.Text name="text1" defaultValue="Hotels" />
          </Heading>
          <Heading
            w="full"
            as="h1"
            size="4xl"
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
          >
            <VStack spacing={0}>
              <Field.Text name="text2" defaultValue="Hotels in Vienna" />

              <CircleIcon width={"40%"} height={"auto"} color="#958247" />
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
