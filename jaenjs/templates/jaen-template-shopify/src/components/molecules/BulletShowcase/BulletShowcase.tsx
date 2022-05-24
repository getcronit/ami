import React from 'react'
import {Center, Button, Box, Flex, Text, Heading} from '@chakra-ui/react'
import {useBreakpointValue} from '@chakra-ui/media-query'

import {Shine} from '../../../common/style/base'
import {BulletStyle} from './style'
import {navigate} from 'gatsby'

export interface BulletShowcaseProps {}

const Desktop = (
  <Box
    css={BulletStyle}
    position="relative"
    borderRadius="5px"
    border="1px"
    borderColor="border"
    bg="primary"
    mr={{base: '0', lg: '6'}}
    mb="6">
    <Flex
      direction={{base: 'column', md: 'row'}}
      px={{base: '1', md: '2', lg: '3'}}
      py="5">
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M33.0964 179.6679H31.9953v-38.466h-.5142v-.621h.4345v-2.2245h-.4345v-.8087h.4345v-2.2244h-.4345v-.8088h.4345V132.29h-.4345v-4.4775a11.6778 11.6778 0 0 0-2.6931-6.0107c-1.7863-2.2858-3.3846-2.0318-3.3846-2.0318H22.5965s-1.5983-.254-3.3845 2.0318a11.6772 11.6772 0 0 0-2.6932 6.0107V132.29h-.5942v2.2243h.594v.8088h-.5942v2.2244h.5942v.8087h-.5942v2.2245h.5942v.621h-.5144v38.466H14.9033c-.7977.4973-1.1659 1.2867-.9819 1.5473.1139.161 1.2274 1.5472 1.2274 1.5472h7.996L24 182.3237l.8556.4387h7.9955s1.1137-1.3862 1.2273-1.5472C34.2623 180.9546 33.8941 180.165 33.0964 179.6679Z"></path>
        </svg>
        <Text mt="5">.22 LR</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M36.5458 174.8663V139.0125h-.8325c0-8.8088-1.9687-13.5675-3.2175-15.6825l.1125-1.4063H15.3958l.1125 1.4063c-1.2375 2.115-3.2175 6.8737-3.2175 15.6825h-.8325v35.8538l1.305 1.0237.8325 3.4425a3.2963 3.2963 0 0 0-2.1375 3.2513c0 1.4062 4.7025 1.8787 9 2.0362h7.0538c4.32-.1575 9-.63 9-2.0362a3.2626 3.2626 0 0 0-2.1263-3.2513l.8325-3.4425Z"></path>
        </svg>
        <Text mt="5">.380 ACP</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M35.0138 179.8388V178.23l1.3612-2.8463V134.0625h-.7425c0-14.625-4.95-24.75-8.1788-26.5613v-.0674c-.2362-.1013-.4725-.18-.7087-.2588a7.4581 7.4581 0 0 0-2.7562-.45 7.4246 7.4246 0 0 0-2.7563.45 6.5606 6.5606 0 0 0-.7087.2588v.1012c-3.2176 1.7775-8.1788 11.8013-8.1788 26.5275h-.72v41.3663l1.3612 2.8462v1.6087H11.1187v2.7338s.27 1.44 9.4163 1.935v.135h6.93v-.1687c9.1575-.495 9.4163-1.935 9.4163-1.935V179.85Z"></path>
        </svg>
        <Text mt="5">9mm</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M39.5925 182.4938v-2.9813H37.1737v-2.7788l2.4188-5.0175V123.4087h-1.485c.1012-16.56-5.2988-22.2862-10.215-24.075A9.2706 9.2706 0 0 0 24 98.6025a9.1013 9.1013 0 0 0-3.9038.7313c-4.9275 1.7887-10.3162 7.515-10.215 24.075H8.4075v48.3075l2.4187 5.0175v2.7787H8.4075v2.9813s-.5175 1.4287 10.4062 1.9912c0 0 3.6225.2138 5.1975.18s5.1975-.18 5.1975-.18C40.11 183.9225 39.5925 182.4938 39.5925 182.4938Z"></path>
        </svg>
        <Text mt="5">.45 ACP</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M35.0138 178.815V177.24l.675-1.125V88.6462L32.73 81.1875v-13.59H31.4812c0-19.3275-4.5-30.465-5.445-31.9613-.7537-1.125-1.6312-2.3512-2.025-2.0025-.3937-.3487-1.2825.8888-2.025 2.0025-1.0012 1.4963-5.445 12.6338-5.445 31.9613H15.3037v13.59l-2.9812 7.425v87.4688l.6863 1.125v1.5749l-1.395.5626v3.0937s.4275 1.2038 6.975 1.8787c0 0 3.8249.405 5.4224.3488s5.4113-.3488 5.4113-.3488c6.5475-.6749 6.9637-1.8787 6.9637-1.8787v-3.06Z"></path>
        </svg>
        <Text mt="5">5.56</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M37.6269 181.0762V178.995h-1.125l-.3937-.9 1.4625-2.5875-.9563-63.5625-1.2937-3.5438v-29.25h-1.125c0-22.275-7.2563-40.7812-8.55-42.075a2.0815 2.0815 0 0 0-1.6875-.5625 2.0815 2.0815 0 0 0-1.6875.5625c-1.2938 1.2938-8.55 19.8-8.55 42.1313h-1.125v29.25l-1.2938 3.5437-.9562 63.5625 1.4625 2.5876-.2813.8437h-1.125v2.025s-1.1812 3.6675 11.9813 3.6675h3.2625C38.8082 184.6875 37.6269 181.0762 37.6269 181.0762Z"></path>
        </svg>
        <Text mt="5">7.62x39</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186">
          <path d="M37.6269 181.0762V178.995h-1.125l-.3937-.9 1.4625-2.5875-.9563-63.5625-1.2937-3.5438v-29.25h-1.125c0-22.275-7.2563-40.7812-8.55-42.075a2.0815 2.0815 0 0 0-1.6875-.5625 2.0815 2.0815 0 0 0-1.6875.5625c-1.2938 1.2938-8.55 19.8-8.55 42.1313h-1.125v29.25l-1.2938 3.5437-.9562 63.5625 1.4625 2.5876-.2813.8437h-1.125v2.025s-1.1812 3.6675 11.9813 3.6675h3.2625C38.8082 184.6875 37.6269 181.0762 37.6269 181.0762Z"></path>
        </svg>
        <Text mt="5">7.62x51</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M39.255 181.11l-4.095-3.375 2.25-4.8262V80.7938L34.035 69.645c0-43.875-7.2337-64.6537-8.9325-66.1387l-.1575-.1125a1.3387 1.3387 0 0 0-1.8913-.0873l-.0212.02-.0675.0675-.09.1687c-1.6875 1.485-8.91 22.2975-8.91 66.1388L10.59 80.85v92.1488l2.25 4.8262L8.745 181.2s0 3.375 15.2663 3.375S39.255 181.11 39.255 181.11Z"></path>
        </svg>
        <Text mt="5">.308</Text>
      </Box>
      <Box textAlign="center" className="bullet">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 186"
          focusable="false"
          width="48"
          height="186"
          onClick={() => navigate('/munition')}>
          <path d="M43.9035 178.0682V157.0739a1.03 1.03 0 0 0-.5684-.279c.0212-31.3492.0473-81.5285-.017-84.7433C43.2915 70.7245 33.6546 68.04 24 68.1042c-9.6546-.0646-19.2915 2.62-19.3181 3.9474-.0643 3.2148-.0382 53.3941-.017 84.7433a1.03 1.03 0 0 0-.5684.279v20.9943A2.8749 2.8749 0 0 0 2.5 180.5961c0 1.352 9.6259 4.5456 21.5 4.5456s21.5-3.1936 21.5-4.5456A2.8749 2.8749 0 0 0 43.9035 178.0682Z"></path>
        </svg>
        <Text mt="5">12 GAUGE</Text>
      </Box>
    </Flex>
    <Center position="relative" w="full" left="0" bottom="-6">
      <Button
        color="white"
        borderRadius="5px"
        colorScheme="agt.grayScheme"
        variant="solid"
        size="lg"
        onClick={() => navigate('/munition')}>
        Mehr davon
      </Button>
    </Center>
  </Box>
)

const Mobile = (
  <Box
    h="300px"
    css={Shine}
    w="full"
    borderRadius="5px"
    textAlign="center"
    backgroundImage="https://www.militarytrader.com/.image/t_share/MTY3Mzc5MTQyMzA5MTkzMzI4/image-placeholder-title.jpg"
    backgroundPosition="center"
    backgroundSize="cover"
    mt="5"
    onClick={() => navigate('/munition')}>
    <Heading color="white" mt="140px" userSelect="none" style={{WebkitTextStroke: '1px #1f1f1d'}}>
      Munition
    </Heading>
  </Box>
)

export const BulletShowcase = ({}: BulletShowcaseProps) => {
  const rgw = useBreakpointValue({base: Mobile, lg: Desktop})
  return <Flex w="full">{rgw}</Flex>
}
