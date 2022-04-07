import {Button} from '@chakra-ui/react'
import {useSite} from '../../services/site'
import {FiHome} from '@react-icons/all-files/fi/FiHome'
import {Link} from 'gatsby'
import {FaEye} from 'react-icons/fa'

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
