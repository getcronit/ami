import React from 'react'
import {Heading} from '@chakra-ui/react'

import {ContainerLayout} from '../../ContainerLayout'
import {BreadcrumbsBanner} from '../../BreadcrumbsBanner'
import {GoogleMaps} from '../../GoogleMaps'

export interface ImprintContactProps {
  heading: React.ReactNode
  contact: React.ReactNode
  // city: React.ReactNode
  // zip_code: React.ReactNode
  // address: React.ReactNode
  // telephone: React.ReactNode
  // telefax: React.ReactNode
  // whatsapp_telephone: React.ReactNode
  // whatsapp_contactline: React.ReactNode
  // email: React.ReactNode
  // copyrightholder: React.ReactNode
}

const ImprintContact = (props: ImprintContactProps) => {
  return (
    <>
      <Heading as="h4" size="md" mt="4">
        {props.heading}
      </Heading>
      {props.contact}
      {/*
      {props.city}
      {props.zip_code}
      {props.address}
      {props.telephone}
      {props.telefax}
      {props.whatsapp_telephone}
      {props.whatsapp_contactline}
      {props.email}
      {props.copyrightholder}
      */}
    </>
  )
}

interface ImprintLegalProps {
  heading: React.ReactNode
  legal: React.ReactNode
  // vat_number: React.ReactNode
  // tax_id: React.ReactNode
  // court_of_registry: React.ReactNode
  // place_of_registry: React.ReactNode
  // trade_register_number: React.ReactNode
  // ownership: React.ReactNode
}

const ImprintLegal = (props: ImprintLegalProps) => {
  return (
    <>
      <Heading as="h4" size="md" mt="4" mb="2">
        {props.heading}
      </Heading>
      {props.legal}
      {/*
      {props.vat_number}
      {props.tax_id}
      {props.court_of_registry}
      {props.place_of_registry}
      {props.trade_register_number}
      {props.ownership}
      */}
    </>
  )
}

interface ImprintTermsProps {
  heading: React.ReactNode
  terms: React.ReactNode
  // about: React.ReactNode
  // privacy: React.ReactNode
  // shipping: React.ReactNode
  // gtc: React.ReactNode
  // cancellation_policy: React.ReactNode
}

const ImprintTerms = (props: ImprintTermsProps) => {
  return (
    <>
      <Heading as="h4" size="md" mt="4" mb="2">
        {props.heading}
      </Heading>
      {props.terms}
      {/*
      {props.about}
      {props.privacy}
      {props.shipping}
      {props.gtc}
      {props.cancellation_policy}
      */}
    </>
  )
}

export interface ImprintPageProps {
  path: string
  content: React.ReactNode
}

export const ImprintPage = ({path, content}: ImprintPageProps) => {
  return (
    <>
      <BreadcrumbsBanner title="Impressum" path={path} />
      <ContainerLayout>
        {content}
        <GoogleMaps
          mt={5}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10977.908361298725!2d14.2921416!3d46.5382484!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf0d0d69eedf5cb7d!2sWaffenhandel%20T%C3%BCrk!5e0!3m2!1sen!2sat!4v1647540212169!5m2!1sen!2sat"
        />
      </ContainerLayout>
    </>
  )
}
