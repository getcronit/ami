import {Button, useDisclosure} from '@chakra-ui/react'
import {useAppDispatch, withRedux} from '../../redux'
import {setPublishing} from '../../redux/slices/status'
import {publishRunner} from '../../services/publish'
import PublishAlert from '../../internal-plugins/pages/ui/components/PublishAlert'
import {FaRocket} from 'react-icons/fa'

export const PublishButton = withRedux(() => {
  const dispatch = useAppDispatch()
  const {onOpen, onClose, isOpen} = useDisclosure()

  const handlePublish = async () => {
    const success = await publishRunner()

    if (success) {
      dispatch(setPublishing(true))
    }

    return success
  }

  return (
    <>
      <PublishAlert
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handlePublish}
      />
      <Button
        onClick={onOpen}
        variant={'outline'}
        size="sm"
        fontWeight="normal"
        leftIcon={<FaRocket color="teal" />}>
        Publish to production
      </Button>
    </>
  )
})
