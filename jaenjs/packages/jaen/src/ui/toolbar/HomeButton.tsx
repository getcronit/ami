import {Button} from '@chakra-ui/react'
import {useSite} from '../../services/site'
import {FiHome} from '@react-icons/all-files/fi/FiHome'
import {Link} from 'gatsby'

export const HomeButton = () => {
  const site = useSite()

  return (
    <Link to="/">
      <Button size="xs" variant={'darkghost'} leftIcon={<FiHome />}>
        {site.siteMetadata.title || 'Home'}
      </Button>
    </Link>
  )
}
