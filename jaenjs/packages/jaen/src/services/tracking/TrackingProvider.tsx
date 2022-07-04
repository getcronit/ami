import FingerprintJS from '@fingerprintjs/fingerprintjs'
import {Analytics, AnalyticsInstance} from 'analytics'
import {PageProps} from 'gatsby'
import React from 'react'
import 'vanilla-cookieconsent/src/cookieconsent.css'
import 'vanilla-cookieconsent/src/cookieconsent.js'
import analyticsPluginSnekScore from './analyticsPluginSnekScore'

const TrackingContext = React.createContext<
  | {
      analytics: AnalyticsInstance
      consentLevel: string[]
      cookieconsent: any
    }
  | undefined
>(undefined)

export const TrackingProvider: React.FC<{
  pageProps: PageProps
  snekAnalyticsId: string
}> = ({children, pageProps, snekAnalyticsId}) => {
  const [analytics, setAnalytics] = React.useState<AnalyticsInstance>(
    Analytics({
      app: 'jaen',
      debug: true,
      plugins: [
        analyticsPluginSnekScore({
          snekAnalyticsId
        })
      ]
    })
  )

  const [consentLevel, setConsentLevel] = React.useState<string[]>([])

  const [cc, setCC] = React.useState<any>(undefined)

  React.useEffect(() => {
    const load = async () => {
      if (consentLevel.includes('targeting')) {
        // Initialize an agent at application startup.
        const fpPromise = FingerprintJS.load({
          monitoring: false
        })

        const fp = await fpPromise
        const result = await fp.get()

        setAnalytics(
          Analytics({
            app: 'jaen',
            debug: true,
            plugins: [
              analyticsPluginSnekScore({
                snekAnalyticsId,
                fingerprint: result.visitorId
              })
            ]
          })
        )
      }
    }

    load()
  }, [consentLevel])

  React.useEffect(() => {
    const cookieconsent = (window as any).initCookieConsent()

    setCC(cookieconsent)

    cookieconsent.run({
      current_lang: 'en',
      autoclear_cookies: true, // default: false
      cookie_name: 'cc_jaen_cookie', // default: 'cc_cookie'
      cookie_expiration: 365, // default: 182
      page_scripts: true, // default: false

      // auto_language: null,                     // default: null; could also be 'browser' or 'document'
      // autorun: true,                           // default: true
      delay: 100, // default: 0
      // force_consent: false,
      // hide_from_bots: false,                   // default: false
      // remove_cookie_tables: false              // default: false
      // cookie_domain: location.hostname,        // default: current domain
      // cookie_path: "/",                        // default: root
      // cookie_same_site: "Lax",
      // use_rfc_cookie: false,                   // default: false
      // revision: 0,                             // default: 0

      gui_options: {
        consent_modal: {
          layout: 'box', // box,cloud,bar
          position: 'bottom right', // bottom,middle,top + left,right,center
          transition: 'slide' // zoom,slide
        },
        settings_modal: {
          layout: 'box', // box,bar
          // position: 'left',                // right,left (available only if bar layout selected)
          transition: 'slide' // zoom,slide
        }
      },

      onFirstAction: function () {
        console.log('onFirstAction fired')
      },

      onAccept: function (cookie: {categories: string[]}) {
        console.log('onAccept fired ...', cookie)

        setConsentLevel(cookie.categories)
      },

      onChange: function (cookie: any, changed_preferences: any) {
        console.log('onChange fired ...')

        setConsentLevel(cookie.categories)
      },

      languages: {
        en: {
          consent_modal: {
            title: '🍪 We use cookies! ',
            description:
              'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
            primary_btn: {
              text: 'Accept all',
              role: 'accept_all' // 'accept_selected' or 'accept_all'
            },
            secondary_btn: {
              text: 'Reject all',
              role: 'accept_necessary' // 'settings' or 'accept_necessary'
            }
          },
          settings_modal: {
            title: 'Jaen Cookie Consent',
            save_settings_btn: 'Save settings',
            accept_all_btn: 'Accept all',
            reject_all_btn: 'Reject all',
            close_btn_label: 'Close',
            cookie_table_headers: [
              {col1: 'Name'},
              {col2: 'Domain'},
              {col3: 'Expiration'},
              {col4: 'Description'}
            ],
            blocks: [
              {
                title: 'Cookie usage 📢',
                description:
                  'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.'
              },
              {
                title: 'Strictly necessary cookies',
                description:
                  'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                toggle: {
                  value: 'necessary',
                  enabled: true,
                  readonly: true // cookie categories with readonly=true are all treated as "necessary cookies"
                }
              },
              {
                title: 'Performance and Analytics cookies',
                description:
                  'These cookies allow the website to remember the choices you have made in the past',
                toggle: {
                  value: 'analytics', // there are no default categories => you specify them
                  enabled: false,
                  readonly: false
                },
                cookie_table: [
                  {
                    col1: '^_ga',
                    col2: 'google.com',
                    col3: '2 years',
                    col4: 'description ...',
                    is_regex: true
                  },
                  {
                    col1: '_gid',
                    col2: 'google.com',
                    col3: '1 day',
                    col4: 'description ...'
                  }
                ]
              },
              {
                title: 'Advertisement and Targeting cookies',
                description:
                  'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                toggle: {
                  value: 'targeting',
                  enabled: false,
                  readonly: false
                }
              },
              {
                title: 'More information',
                description:
                  'For any queries in relation to my policy on cookies and your choices, please <a class="cc-link" href="https://snek.at/contact">contact us</a>.'
              }
            ]
          }
        },
        de: {
          consent_modal: {
            title: '🍪 Wir verwenden Cookies! ',
            description:
              'Hallo, diese Website verwendet essentielle Cookies, um ihren ordnungsgemäßen Betrieb zu gewährleisten, und Tracking-Cookies, um zu verstehen, wie Sie damit interagieren. Letztere werden erst nach Zustimmung gesetzt. <button type="button" data-cc="c-settings" class="cc-link">Lass mich wählen</button>',
            primary_btn: {
              text: 'Alle akzeptieren',
              role: 'accept_all' // 'accept_selected' or 'accept_all'
            },
            secondary_btn: {
              text: 'Alle ablehnen',
              role: 'accept_necessary' // 'settings' or 'accept_necessary'
            }
          },
          settings_modal: {
            title: 'Jaen Cookie-Zustimmung',
            save_settings_btn: 'Einstellungen speichern',
            accept_all_btn: 'Alle akzeptieren',
            reject_all_btn: 'Alle ablehnen',
            close_btn_label: 'Schließen',
            cookie_table_headers: [
              {col1: 'Name'},
              {col2: 'Domain'},
              {col3: 'Ablaufzeit'},
              {col4: 'Beschreibung'}
            ],
            blocks: [
              {
                title: 'Cookie-Nutzung 📢',
                description:
                  'Ich verwende Cookies, um die grundlegenden Funktionen der Website sicherzustellen und Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie wählen, ob Sie sich jederzeit an- oder abmelden möchten. Weitere Einzelheiten zu Cookies und anderen sensiblen Daten finden Sie in der vollständigen <a href="#" class="cc-link">Datenschutzerklärung</a>.'
              },
              {
                title: 'Unbedingt erforderliche Cookies',
                description:
                  'Diese Cookies sind für das reibungslose Funktionieren meiner Website unerlässlich. Ohne diese Cookies würde die Website nicht richtig funktionieren',
                toggle: {
                  value: 'necessary',
                  enabled: true,
                  readonly: true // cookie categories with readonly=true are all treated as "necessary cookies"
                }
              },
              {
                title: 'Performance- and Analyse-Cookies',
                description:
                  'Diese Cookies ermöglichen es der Website, sich an die Entscheidungen zu erinnern, die Sie in der Vergangenheit getroffen haben',
                toggle: {
                  value: 'analytics', // there are no default categories => you specify them
                  enabled: false,
                  readonly: false
                },
                cookie_table: [
                  {
                    col1: '^_ga',
                    col2: 'google.com',
                    col3: '2 years',
                    col4: 'description ...',
                    is_regex: true
                  },
                  {
                    col1: '_gid',
                    col2: 'google.com',
                    col3: '1 day',
                    col4: 'description ...'
                  }
                ]
              },
              {
                title: 'Werbe- und Targeting-Cookies',
                description:
                  'Diese Cookies sammeln Informationen darüber, wie Sie die Website nutzen, welche Seiten Sie besucht und auf welche Links Sie geklickt haben. Alle Daten sind anonymisiert und können nicht dazu verwendet werden, Sie zu identifizieren',
                toggle: {
                  value: 'targeting',
                  enabled: false,
                  readonly: false
                }
              },
              {
                title: 'Mehr Informationen',
                description:
                  'Bei Fragen zu meiner Richtlinie zu Cookies und Ihren Auswahlmöglichkeiten kontaktieren Sie uns bitte <a class="cc-link" href="https://snek.at/contact"></a>.'
              }
            ]
          }
        }
      }
    })
  }, [])

  React.useEffect(() => {
    let timeout = setTimeout(() => analytics.page(), 2000)

    return () => {
      clearTimeout(timeout)
    }
  }, [pageProps.location, analytics])

  return (
    <TrackingContext.Provider
      value={{
        analytics,
        consentLevel,
        cookieconsent: cc
      }}>
      {children}
    </TrackingContext.Provider>
  )
}

export const useAnalytics = () => {
  const context = React.useContext(TrackingContext)

  if (context === undefined) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider')
  }

  return context.analytics
}

export const useCookieConsent = () => {
  const context = React.useContext(TrackingContext)

  if (context === undefined) {
    throw new Error('useConsentLevel must be used within a AnalyticsProvider')
  }

  return {
    consentLevel: context.consentLevel,
    cookieconsent: context.cookieconsent
  }
}
