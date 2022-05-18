import React from 'react'
import {graphql, PageProps} from 'gatsby'
import {connectPage, Field} from '@jaenjs/jaen'
import {ContactTemplate} from '../components/templates'
import {Layout} from '../components/Layout'

const ContactPage = connectPage(
  (props: PageProps) => {
    return (
      <Layout path={props.path}>
        <ContactTemplate
          path={props.path}
          email={
            <Field.Text name="email" defaultValue={'info@agt-guntrade.at'} />
          }
          phone={<Field.Text name="phone" defaultValue={'+43 676 3232 12'} />}
          address={
            <Field.Text
              name="address"
              defaultValue={'Reßnig 20, 9170 Ferlach'}
            />
          }
        />
      </Layout>
    )
  },
  {
    displayName: 'ContactPage'
  }
)

export const query = graphql`
  query($jaenPageId: String!) {
    ...JaenPageQuery
  }
`

export default ContactPage
