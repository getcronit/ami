import {ChakraProvider, extendTheme, useColorMode} from '@chakra-ui/react'
import addons, {makeDecorator} from '@storybook/addons'
import {UPDATE_GLOBALS} from '@storybook/core-events'
import {useEffect} from 'react'
import {toBoolean} from './utils'

const theme = extendTheme({})

const ChakraColorModeWrapper: React.FC<{isGlobalDarkmode: boolean}> = ({
  isGlobalDarkmode,
  children
}) => {
  const {colorMode, setColorMode} = useColorMode()

  useEffect(() => {
    setColorMode(isGlobalDarkmode ? 'dark' : 'light')
  }, [isGlobalDarkmode])

  useEffect(() => {
    addons.getChannel().emit(UPDATE_GLOBALS, {
      globals: {
        isDarkmode: colorMode === 'dark'
      }
    })
  }, [colorMode])

  return <>{children}</>
}

export const withChakraColorMode = makeDecorator({
  name: 'withChakraColorMode',
  parameterName: 'chakraColorMode',
  wrapper: (storyFn, context, {}) => {
    const isGlobalDarkmode = toBoolean(context.globals.isDarkmode)
    const chakraParameters = context.parameters.chakra

    return (
      <ChakraProvider resetCSS theme={theme} {...chakraParameters}>
        <ChakraColorModeWrapper isGlobalDarkmode={isGlobalDarkmode}>
          {<>{storyFn(context)}</>}
        </ChakraColorModeWrapper>
      </ChakraProvider>
    )
  }
})
