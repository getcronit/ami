export interface ScaleserpReview {
  source: string
  body: string
  body_html: string
  id: string
  rating: number
  source_link: string
  source_image: string
  source_id: string
  source_review_count: number
  date: string
  date_utc: Date
  images: string[]
  position: number
}

export interface GoogleReview {
  rating: number
  position: number
  body: string
  date: string
  sourceLink: string
  sourceImage: string
  source: string
}
