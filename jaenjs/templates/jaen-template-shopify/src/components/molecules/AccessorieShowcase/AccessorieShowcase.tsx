import React from 'react'
import {Box, Heading} from '@chakra-ui/layout'
import {navigate} from 'gatsby'

import {Shine} from '../../../common/style/base'

export interface AccessorieShowcaseProps {}

export const AccessorieShowcase = ({}: AccessorieShowcaseProps) => {
  return (
    <Box
      onClick={() => navigate('/zubehör')}
      cursor="pointer"
      h={{base: '300px', lg: '320px'}}
      css={Shine}
      w="full"
      bg="gray.800"
      className="shine"
      textAlign="center"
      borderRadius="5px"
      p="10"
      mb="6"
      backgroundPosition="center"
      backgroundSize="cover"
      alignSelf={{base: 'center', lg: 'auto'}}
      backgroundImage="https://secondamendsports.com/wp-content/uploads/2019/10/4D5EB7A900000578-0-image-a-30_1529321909720-1.jpg">
      <Heading color="white" mt="90px" userSelect="none" style={{WebkitTextStroke: '1px #1f1f1d'}}>
        Acessories
      </Heading>
    </Box>
  )
}
