import {Button} from '@chakra-ui/react'
import {useChanges} from '../services/hooks'

export const ToolbarChangesElement = () => {
  const {totalChanges} = useChanges()

  if (totalChanges === 0) {
    return null
  }

  return (
    <Button
      variant={'ghost'}
      size="sm"
      fontWeight="normal"
      pointerEvents={'none'}>
      {totalChanges} {totalChanges === 1 ? 'change' : 'changes'}
    </Button>
  )
}
