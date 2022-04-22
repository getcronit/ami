import {IGatsbyImageData} from 'gatsby-plugin-image'
import React from 'react'

export interface WishlistProduct {
  id: string
  handle: string
  title: string
  price: string
  reducedPrice: string
  categoriesString: string
  image: {
    alt: string
    gatsbyImageData: IGatsbyImageData
  }
  quantity: number
}

export class WishlistService {
  static key = 'wishlist'

  constructor() {}

  static setWishlist(list: WishlistProduct[]) {
    if (typeof window === 'undefined') return

    localStorage.setItem(WishlistService.key, JSON.stringify(list))
  }

  static getWishlist(): WishlistProduct[] {
    if (typeof window === 'undefined') return []

    return JSON.parse(window.localStorage.getItem(WishlistService.key) || '[]')
  }

  static addToWishlist(product: WishlistProduct) {
    const wishList = WishlistService.getWishlist()
    wishList.push(product)

    WishlistService.setWishlist(wishList)
  }

  static updateQuantity(productId: string, quantity: number) {
    const wishList = WishlistService.getWishlist()
    const product = wishList.find(p => p.id === productId)

    if (product) {
      product.quantity = quantity
    }

    WishlistService.setWishlist(wishList)
  }

  static removeFromWishlist(productId: string) {
    const wishList = WishlistService.getWishlist()
    const index = wishList.findIndex(p => p.id === productId)

    if (index === -1) return

    wishList.splice(index, 1)

    WishlistService.setWishlist(wishList)
  }
}

export function useWishlist() {
  const [wishlist, setWishlist] = React.useState(WishlistService.getWishlist())

  React.useEffect(() => {
    const wishlist = WishlistService.getWishlist()
    setWishlist(wishlist)
  }, [])

  return {
    wishlist,
    addToWishlist: (product: WishlistProduct) => {
      WishlistService.addToWishlist(product)
      setWishlist(WishlistService.getWishlist())
    },
    updateQuantity: (productId: string, quantity: number) => {
      WishlistService.updateQuantity(productId, quantity)
      setWishlist(WishlistService.getWishlist())
    },
    removeFromWishlist: (productId: string) => {
      WishlistService.removeFromWishlist(productId)
      setWishlist(WishlistService.getWishlist())
    }
  }
}
