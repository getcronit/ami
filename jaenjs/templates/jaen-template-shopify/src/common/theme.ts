import {extendTheme} from '@chakra-ui/react'
import {mode, StyleFunctionProps} from '@chakra-ui/theme-tools'
import { Dict } from '@chakra-ui/utils'

const theme = {
  config: {
    initialColorMode: false
  },
  colors: {
    agt: {
      lightbackground: '#f6f8fa',
      darkbackground: '#1d1f21',
      lightstroke: '#d0d7de',
      darkstroke: '#d0d7de',
      lightprimary: '#ffffff',
      darkprimary: '#2D3748',
      orange: '#ff6000',
      red: '#ef3340',
      blue: '#2151a1',
      blueAccent: '#1d4890',
      gray: '#1f1f1d',
      lightgray: '#E6E6E9',
      grayScheme: {
        300: '#424240',
        600: '#424240',
        500: '#1f1f1d',
        200: '#1f1f1d'
      },
      blueScheme: {
        300: '#1d4890',
        600: '#2151a1',
        500: '#1d4890',
        200: '#1d4890'
      },
      redScheme: {
        300: '#f25c66',
        600: '#d72e3a',
        500: '#ef3340',
        200: '#f47079'
      }
    }
  },
  semanticTokens: {
    colors: {
      error: 'red.500',
      background: {
        default: 'agt.lightbackground',
        _dark: 'agt.darkbackground',
      },
      stroke: {
        default: 'agt.lightstroke',
        _dark: 'agt.darkstroke',
      },
      primary: {
        default: 'agt.lightprimary',
        _dark: 'agt.darkprimary',
      }
    },
  },
  styles: {
    global: (props: Dict<any> | StyleFunctionProps) => ({
      body: {
        bg: "background"
      },
      ':host,:root': {
        '--chakra-ui-focus-ring-color': '#424240'
      },
      '::-webkit-scrollbar': {
        width: '0.5em',
        height: '0.5em'
      },

      '::-webkit-scrollbar-thumb': {
        background: 'agt.gray'
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: 'agt.gray.200'
      },
      '::-webkit-scrollbar-track': {
        background: 'agt.lightgray',
        boxShadow: 'inset 0px 0px 0px 0px #F0F0F0'
      }
    })
  },
  shadows: {
    outline: '0 0 0 3px #424240'
  }
}

export default extendTheme(theme)
