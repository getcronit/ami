import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {WishlistTemplate} from '../WishlistTemplate'

export default {
  title: 'WishlistTemplate',
  component: WishlistTemplate
} as ComponentMeta<typeof WishlistTemplate>

const Template: ComponentStory<typeof WishlistTemplate> = args => (
  <WishlistTemplate {...args} />
)

export const Simple = Template.bind({})
Simple.args = {
  items: [
    {
      id: '854cb18f-1179-5ad2-90d5-8c0467b0ff47',
      handle: 'cz-457-varmint-thumbhole-525-20-mit-mundungsgewinde-1-2-20-unf',
      title: 'CZ 457 Varmint THUMBHOLE 525 20" mit Mündungsgewinde 1/2×20 UNF',
      price: '799,00 €',
      compareAtPrice: null,
      image: {
        gatsbyImageData: {
          images: {
            sources: [
              {
                srcSet:
                  'https://cdn.shopify.com/s/files/1/0634/2135/0141/products/8uY3XnFoT1DCP4ioiCZ2Z-transformed_225x225_crop_center.png.webp?v=1650454342 225w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/8uY3XnFoT1DCP4ioiCZ2Z-transformed_450x450_crop_center.png.webp?v=1650454342 450w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/8uY3XnFoT1DCP4ioiCZ2Z-transformed_900x900_crop_center.png.webp?v=1650454342 900w',
                sizes: '(min-width: 900px) 900px, 100vw',
                type: 'image/webp'
              }
            ],
            fallback: {
              src:
                'https://cdn.shopify.com/s/files/1/0634/2135/0141/products/8uY3XnFoT1DCP4ioiCZ2Z-transformed_900x900_crop_center.png?v=1650454342',
              srcSet:
                'https://cdn.shopify.com/s/files/1/0634/2135/0141/products/8uY3XnFoT1DCP4ioiCZ2Z-transformed_225x225_crop_center.png?v=1650454342 225w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/8uY3XnFoT1DCP4ioiCZ2Z-transformed_450x450_crop_center.png?v=1650454342 450w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/8uY3XnFoT1DCP4ioiCZ2Z-transformed_900x900_crop_center.png?v=1650454342 900w',
              sizes: '(min-width: 900px) 900px, 100vw'
            }
          },
          layout: 'constrained',
          width: 900,
          height: 900
        },
        altText: ''
      },
      categoriesString: 'Kategorien: Repetiergewehre, Waffen',
      tagsString: 'Kaliber: 22lr',
      quantity: 1
    },
    {
      id: '5474bec1-4a54-5fd9-91c2-85dfb04c7af6',
      handle: 'cz-75-tactical-sports-orange',
      title: 'CZ 75 Tactical Sports Orange',
      price: '0,00 €',
      compareAtPrice: null,
      image: {
        gatsbyImageData: {
          images: {
            sources: [
              {
                srcSet:
                  'https://cdn.shopify.com/s/files/1/0634/2135/0141/products/links_209-900x900-transformed_225x225_crop_center.png.webp?v=1650453837 225w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/links_209-900x900-transformed_450x450_crop_center.png.webp?v=1650453837 450w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/links_209-900x900-transformed_900x900_crop_center.png.webp?v=1650453837 900w',
                sizes: '(min-width: 900px) 900px, 100vw',
                type: 'image/webp'
              }
            ],
            fallback: {
              src:
                'https://cdn.shopify.com/s/files/1/0634/2135/0141/products/links_209-900x900-transformed_900x900_crop_center.png?v=1650453837',
              srcSet:
                'https://cdn.shopify.com/s/files/1/0634/2135/0141/products/links_209-900x900-transformed_225x225_crop_center.png?v=1650453837 225w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/links_209-900x900-transformed_450x450_crop_center.png?v=1650453837 450w,\nhttps://cdn.shopify.com/s/files/1/0634/2135/0141/products/links_209-900x900-transformed_900x900_crop_center.png?v=1650453837 900w',
              sizes: '(min-width: 900px) 900px, 100vw'
            }
          },
          layout: 'constrained',
          width: 900,
          height: 900
        },
        altText: ''
      },
      categoriesString: 'Kategorien: Pistolen, Waffen',
      tagsString: 'Kaliber: 9x19',
      quantity: 5
    }
  ],
  path: '/wishlist'
}
