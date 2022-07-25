import {Button} from '@chakra-ui/react'
import {FaEye} from '@react-icons/all-files/fa/FaEye'
import {Link} from 'gatsby'
import {useSite} from '../../services/site'

export const HomeButton = () => {
  const site = useSite()

  return (
    <Link to="/">
      <Button
        variant={'outline'}
        size="sm"
        fontWeight="normal"
        leftIcon={<FaEye />}>
        Preview {site.siteMetadata.title || 'Home'}
      </Button>
    </Link>
  )
}
