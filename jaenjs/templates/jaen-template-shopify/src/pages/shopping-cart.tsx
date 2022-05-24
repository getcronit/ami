import React from 'react'
import {useDisclosure} from '@chakra-ui/hooks'
import {graphql, navigate, PageProps} from 'gatsby'
import {useWishlist} from '../services/wishlist'
import {WishlistTemplate} from '../components/templates'
import {connectPage} from '@jaenjs/jaen'
import {ContactModal} from '../components/organisms/ContactModal'
import {Layout} from '../components/Layout'

const WishlistPage = ({path}: PageProps) => {
  const {wishlist, updateQuantity, removeFromWishlist} = useWishlist()
  const {isOpen, onOpen, onClose} = useDisclosure()

  const handleRequestNow = () => {
    onOpen()
  }

  return (
    <Layout path={path}>
      <WishlistTemplate
        path={path}
        items={wishlist}
        onRemove={removeFromWishlist}
        onQuantityChange={updateQuantity}
        onRequestNow={handleRequestNow}
      />
      <ContactModal
        wishlist={wishlist}
        isOpen={isOpen}
        heading={<p>Kaufanfrage (unverbindlich)</p>}
        text={''}
        onClose={() => onClose()}
      />
    </Layout>
  )
}

export default connectPage(WishlistPage, {
  displayName: 'WishlistPage'
})

export const query = graphql`
  query($jaenPageId: String!) {
    ...JaenPageQuery
  }
`
