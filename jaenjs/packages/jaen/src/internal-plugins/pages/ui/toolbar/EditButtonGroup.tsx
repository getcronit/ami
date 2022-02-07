import {
  Button,
  ButtonGroup,
  Circle,
  IconButton,
  useDisclosure
} from '@chakra-ui/react'
import {
  useAppDispatch,
  useAppSelector,
  withRedux
} from '@jaen-pages/internal/redux'
import {internalActions} from '@jaen-pages/internal/redux/slices'
import {FiTrash} from '@react-icons/all-files/fi/FiTrash'
import DiscardAlert from '../components/DiscardAlert'

export const EditButtonGroup = withRedux(() => {
  const {onOpen, onClose, isOpen} = useDisclosure()

  const dispatch = useAppDispatch()

  const isEdting = useAppSelector(state => state.internal.status.isEditing)

  const toggleEditing = () => {
    dispatch(internalActions.setIsEditing(!isEdting))
  }

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
      <ButtonGroup
        isAttached
        variant="outline"
        size="xs"
        bg="gray.700"
        p="0"
        m="0">
        <Button
          mr="-px"
          variant={'darkghost'}
          leftIcon={
            <Circle
              size="4"
              bg={isEdting ? 'teal.300' : 'gray.300'}
              color="white"
            />
          }
          onClick={toggleEditing}>
          Edit
        </Button>
        <IconButton
          variant={'darkghost'}
          aria-label="Add to friends"
          icon={<FiTrash color="teal" />}
          onClick={onOpen}
        />
      </ButtonGroup>
    </>
  )
})
