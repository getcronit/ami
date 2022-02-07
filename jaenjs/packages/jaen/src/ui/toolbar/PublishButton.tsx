import {Button, useDisclosure} from '@chakra-ui/react'
import {useAppDispatch, withRedux} from '@jaen/redux'
import {setPublishing} from '@jaen/redux/slices/status'
import {publishRunner} from '@jaen/services/publish'
import PublishAlert from '../../internal-plugins/pages/ui/components/PublishAlert'

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
      <Button onClick={onOpen} size="xs" variant={'darkghost'}>
        Publish
      </Button>
    </>
  )
})
