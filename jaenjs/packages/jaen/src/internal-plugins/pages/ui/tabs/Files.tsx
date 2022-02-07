import {Box} from '@chakra-ui/react'
import {useSnekFinder} from '@jaenjs/snek-finder'

export const FilesContainer = () => {
  const finder = useSnekFinder({mode: 'browser'})

  return <Box h="75vh">{finder.finderElement}</Box>
}

export default FilesContainer
