import React from 'react'

import {ComponentStory, ComponentMeta} from '@storybook/react'

import {Footer} from '../Footer'

export default {
  title: 'Footer',
  component: Footer
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = args => <Footer {...args} />

export const Simple = Template.bind({})
Simple.args = {
  col1h: 'AGT',
  col1: ['Startseite', 'Shop', 'Unsere Vertretungen', 'Kontakt'],
  col2h: 'Rechtliches',
  col2: [
    'Impressum',
    'Datenschutz',
    'AGB’s',
    'Widerrufsrecht/Formular',
    'Versand',
    'Sitemap'
  ],
  col3h: 'Öffnungszeiten',
  col3: [
    'Mo. – Fr. 8.00 – 12.00 / 14.00 – 18.00',
    'Sonn, Sams- und Feiertags geschlossen'
  ]
}
