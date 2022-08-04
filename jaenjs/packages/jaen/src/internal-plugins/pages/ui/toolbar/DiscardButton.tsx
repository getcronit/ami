import {DeleteIcon} from '@chakra-ui/icons'
import {Button, useDisclosure} from '@chakra-ui/react'
import {useAppDispatch, withRedux} from '../../internal/redux'
import {internalActions} from '../../internal/redux/slices'
import DiscardAlert from '../components/DiscardAlert'

export const DiscardButton = withRedux(() => {
  const {onOpen, onClose, isOpen} = useDisclosure()

  const dispatch = useAppDispatch()

  const handleDiscard = async () => {
    dispatch(internalActions.discardAllChanges())
    dispatch(internalActions.setIsEditing(false))

    return Promise.resolve(true)
  }

  return (
    <>
      <DiscardAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDiscard}
      />
      <Button
        onClick={onOpen}
        variant={'outline'}
        size="sm"
        fontWeight="normal"
        leftIcon={<DeleteIcon color={'teal'} />}>
        Discard
      </Button>
    </>
  )
})
