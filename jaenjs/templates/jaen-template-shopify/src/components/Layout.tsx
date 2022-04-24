import React from 'react'
import {Link} from '@chakra-ui/react'
import {Link as GatsbyLink} from 'gatsby'
import {Footer} from './Footer'
import {Header} from './Header'

interface LayoutProps {
  path: string
  children: React.ReactNode
}

export const Layout = ({path, children}: LayoutProps) => {
  return (
    <>
      <Header path={path} />

      {children}

      <Footer
        col1h={'AGT'}
        col1={[
          <Link as={GatsbyLink} to={'/'}>
            Startseite
          </Link>,
          <Link as={GatsbyLink} to={'/products'}>
            Produkte
          </Link>,
          <Link as={GatsbyLink} to={'/contact'}>
            Kontakt
          </Link>
        ]}
        col2h="Rechtliches"
        col2={[
          <Link as={GatsbyLink} to={'/imprint'}>
            Impressum
          </Link>,
          <Link as={GatsbyLink} to={'/privacy'}>
            Datenschutz
          </Link>,
          <Link as={GatsbyLink} to={'/sitemap/sitemap-index.xml'}>
            Sitemap
          </Link>
        ]}
        col3h="Öffnungszeiten"
        col3={[
          'Mo. – Fr. 8.00 – 12.00 / 14.00 – 18.00',
          'Sonn, Sams- und Feiertags geschlossen'
        ]}
      />
    </>
  )
}
