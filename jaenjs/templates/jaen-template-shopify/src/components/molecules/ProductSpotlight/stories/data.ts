import {
  ProductsPageContext,
  ProductsPageData,
  ShopifyProduct
} from '@snek-at/gatsby-theme-shopify'

export interface ProductsTemplateProps extends ProductsPageData {
  path: string
  products: ShopifyProduct[]
  implicitTags: ProductsPageContext['implicitTags']
  tags: ProductsPageContext['tags']
  minPrice: ProductsPageContext['minPrice']
  maxPrice: ProductsPageContext['maxPrice']
  isFetching: boolean
  fetchNextPage: () => void
  updateFilter: (filter: {
    tags?: string[]
    minPrice?: number
    maxPrice?: number
  }) => void
  sortOptions: string[]
  onSortChange: (sort: string) => void
}

export default {
  products: [
    {
      "variants": [
        {
          "id": "870c86d3-261d-50fa-97f9-922d1a0e64d5",
          "sku": "",
          "compareAtPrice": 500,
          "price": 1000000
        }
      ],
      "hasOnlyDefaultVariant": true,
      "id": "c86b01a5-17f1-51cd-bf6c-ff4657a3b0b5",
      "handle": "arex-zero-alpha",
      "descriptionHtml": "<p data-mce-fragment=\"1\"><span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Ident.Nr. KW-PC: 02021002556456580-0542455006600486861-023610564566456900</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Waffenart: Selbstladepistole</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Fabrikat/Modell: Arex Zero Alpha LL: 5″</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Kaliber: 9x19mm</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Magazinkapazität: 20 Schuss</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Gültiger Beschuss: Ja</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Zubehör: * Siehe Foto </span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">*Lauflänge: 127 mm</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Gewicht: ca. 1205 g (Waffe leer)</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* “Ganzstahlwaffe” mit hervorragender Performance” – “Competition Ready out of the Box”</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Griffstück Ganzstahl mit Beavertail</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Werksüberarbeiteter Single/Double Action Abzug mit einstellbaren Trigger-Stop</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Short Reset Trigger</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Abzugsgewicht SA ca. 1400 g (Medium Schlagfeder)</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Abzugsgewicht durch Tausch der Schlagfeder veränderbar</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Schlagfedernset (Light, Medium, Strong)</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Skeletierter Hammer</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Verlängerte Bedienelement, beidseitig bedienbar</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Verstellbare LPA Visierung, Kimme mit Rotpunkt</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* im orig. im Kunststoffkoffer mit drei Magazinen</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Putzzeug</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Werkzeug</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">* Schlagfedernset</span></p>\n<p data-mce-fragment=\"1\"><span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Zustand: Fabrikneu</span><br data-mce-fragment=\"1\"> <span style=\"color: #000000;\" data-mce-fragment=\"1\" data-mce-style=\"color: #000000;\">Versandkosten/Abholung: Auf Anfrage / Abholung nur nach vorheriger Terminabsprache</span></p>",
      "title": "Arex Zero Alpha",
      "tags": [
        "Kategorie:Waffen"
      ],
      "status": "ACTIVE",
      "totalInventory": 0,
      "createdAt": "2022-04-24T19:32:33Z",
      "media": [
        {
          "id": "ea42e8fb-fe17-5c30-82a1-aad32dbecd29",
          "image": {
            "gatsbyImageData": {
              "images": {
                "sources": [
                  {
                    "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_225x225_crop_center.png.webp?v=1650828753 225w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_450x450_crop_center.png.webp?v=1650828753 450w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_900x900_crop_center.png.webp?v=1650828753 900w",
                    "sizes": "(min-width: 900px) 900px, 100vw",
                    "type": "image/webp"
                  }
                ],
                "fallback": {
                  "src": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_900x900_crop_center.png?v=1650828753",
                  "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_225x225_crop_center.png?v=1650828753 225w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_450x450_crop_center.png?v=1650828753 450w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_900x900_crop_center.png?v=1650828753 900w",
                  "sizes": "(min-width: 900px) 900px, 100vw"
                }
              },
              "layout": "constrained",
              "width": 900,
              "height": 900
            },
            "altText": ""
          }
        },
        {
          "id": "0e29ed53-62aa-5145-a2f0-cc4a5829658f",
          "image": {
            "gatsbyImageData": {
              "images": {
                "sources": [
                  {
                    "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/rechts-53-transformed_375x375_crop_center.png.webp?v=1650828753 375w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/rechts-53-transformed_750x750_crop_center.png.webp?v=1650828753 750w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/rechts-53-transformed_1500x1500_crop_center.png.webp?v=1650828753 1500w",
                    "sizes": "(min-width: 1500px) 1500px, 100vw",
                    "type": "image/webp"
                  }
                ],
                "fallback": {
                  "src": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/rechts-53-transformed_1500x1500_crop_center.png?v=1650828753",
                  "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/rechts-53-transformed_375x375_crop_center.png?v=1650828753 375w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/rechts-53-transformed_750x750_crop_center.png?v=1650828753 750w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/rechts-53-transformed_1500x1500_crop_center.png?v=1650828753 1500w",
                  "sizes": "(min-width: 1500px) 1500px, 100vw"
                }
              },
              "layout": "constrained",
              "width": 1500,
              "height": 1500
            },
            "altText": ""
          }
        },
        {
          "id": "b93f9857-7515-513e-ba8b-a2d2540d9091",
          "image": {
            "gatsbyImageData": {
              "images": {
                "sources": [
                  {
                    "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/Beschreibung-links-1-transformed_375x375_crop_center.png.webp?v=1650828753 375w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/Beschreibung-links-1-transformed_750x750_crop_center.png.webp?v=1650828753 750w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/Beschreibung-links-1-transformed_1500x1500_crop_center.png.webp?v=1650828753 1500w",
                    "sizes": "(min-width: 1500px) 1500px, 100vw",
                    "type": "image/webp"
                  }
                ],
                "fallback": {
                  "src": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/Beschreibung-links-1-transformed_1500x1500_crop_center.png?v=1650828753",
                  "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/Beschreibung-links-1-transformed_375x375_crop_center.png?v=1650828753 375w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/Beschreibung-links-1-transformed_750x750_crop_center.png?v=1650828753 750w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/Beschreibung-links-1-transformed_1500x1500_crop_center.png?v=1650828753 1500w",
                  "sizes": "(min-width: 1500px) 1500px, 100vw"
                }
              },
              "layout": "constrained",
              "width": 1500,
              "height": 1500
            },
            "altText": ""
          }
        }
      ],
      "featuredMedia": {
        "id": "ea42e8fb-fe17-5c30-82a1-aad32dbecd29",
        "image": {
          "gatsbyImageData": {
            "images": {
              "sources": [
                {
                  "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_225x225_crop_center.png.webp?v=1650828753 225w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_450x450_crop_center.png.webp?v=1650828753 450w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_900x900_crop_center.png.webp?v=1650828753 900w",
                  "sizes": "(min-width: 900px) 900px, 100vw",
                  "type": "image/webp"
                }
              ],
              "fallback": {
                "src": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_900x900_crop_center.png?v=1650828753",
                "srcSet": "https://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_225x225_crop_center.png?v=1650828753 225w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_450x450_crop_center.png?v=1650828753 450w,\nhttps://cdn.shopify.com/s/files/1/0640/9584/6645/products/links-48-900x900-transformed_900x900_crop_center.png?v=1650828753 900w",
                "sizes": "(min-width: 900px) 900px, 100vw"
              }
            },
            "layout": "constrained",
            "width": 900,
            "height": 900
          },
          "altText": ""
        }
      },
      "metafields": [
        {
          "key": "show",
          "value": "true",
          "namespace": "spotlight"
        }
      ]
    }
  ],
  implicitTags: ['Kategorie:Repetiergewehre'],
  tags: ['Kaliber:308Win', 'Kaliber:22lr', 'Kategorie:Kurz'],
  maxPrice: 10000,
  minPrice: 500,
  sortOptions: ['Alphabetisch', 'Preis aufsteigend', 'Preis absteigend']
} as ProductsTemplateProps
