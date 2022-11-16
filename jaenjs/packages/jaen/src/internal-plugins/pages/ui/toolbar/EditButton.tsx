import {EditIcon} from '@chakra-ui/icons'
import {Badge, Button} from '@chakra-ui/react'
import {useAppDispatch, useAppSelector, withRedux} from '../../internal/redux'
import {internalActions} from '../../internal/redux/slices'

export const EditButton = withRedux(() => {
  const dispatch = useAppDispatch()

  const isEdting = useAppSelector(state => state.internal.status.isEditing)

  const toggleEditing = () => {
    dispatch(internalActions.setIsEditing(!isEdting))
  }

  return (
    <Button
      onClick={toggleEditing}
      variant={'outline'}
      size="sm"
      fontWeight="normal"
      leftIcon={<EditIcon color={'teal'} />}
      rightIcon={
        isEdting ? (
          <Badge colorScheme={'green'} rounded="lg">
            On
          </Badge>
        ) : (
          <Badge colorScheme={'red'} rounded="lg">
            Off
          </Badge>
        )
      }>
      Edit
    </Button>
  )
})
