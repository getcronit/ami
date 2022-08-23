import React from 'react'
import {Helmet} from 'react-helmet-async'
import {useSite} from '../../../../../../services/site'
import {IJaenPage} from '../../../../types'
import {withRedux} from '../../../redux'

import SchemaOrg from './SchemaOrg'

interface SEOProps {
  pagePath?: string
  pageMeta?: IJaenPage['jaenPageMetadata']
}

const SEO: React.FC<SEOProps> = withRedux(({pagePath, pageMeta}) => {
  const {siteMetadata} = useSite()

  let title

  if (pagePath === '/') {
    title = siteMetadata.title
  } else {
    title = pageMeta?.title || siteMetadata.title
  }

  const description = pageMeta?.description || siteMetadata.description
  const image = pageMeta?.image || siteMetadata.image
  const url = pagePath
    ? `${siteMetadata.siteUrl}${pagePath}`
    : siteMetadata.siteUrl
  const datePublished = pageMeta?.isBlogPost
    ? pageMeta.datePublished || false
    : false

  const isBlogPost = pageMeta?.isBlogPost || false

  return (
    <>
      <Helmet>
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        <link rel="canonical" href={url} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        {isBlogPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="fb:app_id" content={siteMetadata.social?.fbAppID} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={siteMetadata.social?.twitter} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url!}
        title={title!}
        image={image!}
        description={description!}
        datePublished={datePublished}
        siteUrl={siteMetadata.siteUrl!}
        author={siteMetadata.author}
        organization={siteMetadata.organization}
        defaultTitle={siteMetadata.title!}
      />
    </>
  )
})

export default SEO
