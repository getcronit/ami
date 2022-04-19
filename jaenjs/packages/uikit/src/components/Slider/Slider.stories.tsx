import React from 'react'
import {Story, Meta} from '@storybook/react'

import {Slider, SliderProps} from './Slider'
import {
  Box,
  Center,
  Image,
  Stack,
  Text,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'

export default {
  title: 'Components/Slider',
  component: Slider
} as Meta

const Template: Story<SliderProps> = args => (
  <Slider {...args}>
    <Box bg="tomato" boxSize="xl"></Box>
    <Box bg="tomato" boxSize="xl"></Box>
    <Box bg="tomato" boxSize="xl"></Box>
    <Box bg="tomato" boxSize="xl"></Box>
    <Box bg="tomato" boxSize="50px" p="2"></Box>
    <Box bg="tomato" boxSize="200px" p="2"></Box>
    <Box bg="tomato" boxSize="50px" p="2"></Box>
    <Box bg="tomato" boxSize="50px" p="2"></Box>
    <Box bg="tomato" boxSize="50px" p="2"></Box>
    <Box bg="tomato" boxSize="50px" p="2"></Box>
  </Slider>
)

export const Primary = Template.bind({})
Primary.args = {}

export const WithoutControls = Template.bind({})
WithoutControls.args = {
  disableControls: true
}

export const CustomWidth = Template.bind({})
CustomWidth.args = {
  ...Primary.args,
  width: '400px'
}

export const CustomElementStyle = Template.bind({})
CustomElementStyle.args = {
  ...Primary.args,
  elementProps: {
    m: '2',
    boxSize: 'xl'
  }
}

export const ManyElements: Story<SliderProps> = args => {
  const elements = new Array(100)
    .fill(0)
    .map((_, i) => <Box bg="tomato" boxSize="xl"></Box>)

  return <Slider {...args}>{elements}</Slider>
}

export const ProductCardExample: Story<SliderProps> = args => {
  const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

  const elements = new Array(100).fill(0).map((_, i) => (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${IMAGE})`,
            filter: 'blur(15px)',
            zIndex: -1
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)'
            }
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={IMAGE}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            Nice Chair, pink ({i})
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              $57
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              $199
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  ))

  return <Slider {...args}>{elements}</Slider>
}
