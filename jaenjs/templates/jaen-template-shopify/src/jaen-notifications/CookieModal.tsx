import React from 'react'

// Router DOM bindings
// import { Link } from "react-router-dom";

//> Lottie
// import Lottie from "lottie-react-web";
import {
  createLottie,
  Lottie,
  LottieFnFn,
  LottieFnResult
} from '@snek-at/react-lottie'

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  Box,
  Flex,
  Link,
  Button,
  Checkbox,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import {connectNotification, NotifyField, useModalContext} from '@jaenjs/jaen'
import {Link as GatsbyLink} from 'gatsby'
import {CookieModalService, useCookieState} from '../services/cookiemodal'

const CookieModal = () => {
  const {cookie, accept, setValues, updateCookie} = useCookieState()

  const {onClose} = useModalContext()

  const ACookieLottie: LottieFnFn = () => container => {
    let creator: LottieFnResult['creator']
    const containerProps: LottieFnResult['containerProps'] = {
      style: {width: '100%'}
    }

    creator = createLottie({
      container,
      animationData: require(`../assets/lotties/cookie.json`),
      loop: true,
      autoplay: true
    })

    return {creator, containerProps}
  }

  const handleSave = () => {
    accept(true)

    // small hack to timeout the close
    setTimeout(() => {
      onClose()
    }, 100)
  }

  const checkAll = () => {
    setValues({
      essential: true,
      analytics: true,
      marketing: true
    })

    handleSave()
  }

  return (
    <>
      <ModalHeader>Cookie Einstellungen</ModalHeader>
      <ModalCloseButton onClick={handleSave} />
      <ModalBody pb={3}>
        <Box w="9rem" mx="auto">
          {/* <Lottie options={defaultOptions} speed={1} ariaRole="img" /> */}
          <Lottie lottie={ACookieLottie()}>
            {({container}) => <i>{container}</i>}
          </Lottie>
        </Box>
        <Box>
          <NotifyField.Text
            name="text"
            defaultValue="Wir verwenden auf unserer Website Cookies, um die Benutzererfahrung zu
          verbessern. Einige davon sind essenziell für den Betrieb der Website."
          />
        </Box>

        <Link as={GatsbyLink} color="blue" to="/privacy">
          Datenschutz
        </Link>
        <Flex mt="15px" alignItems="center" justifyContent="center">
          <Checkbox isDisabled colorScheme="green" isChecked={cookie.essential}>
            Essenziell
          </Checkbox>
        </Flex>
        <Flex mt="10px" alignItems="center" justifyContent="center">
          <Checkbox
            colorScheme="green"
            isChecked={cookie.marketing}
            onChange={e => updateCookie('marketing', e.target.checked)}>
            Marketing
          </Checkbox>
          <Checkbox
            colorScheme="green"
            ml="20px"
            isChecked={cookie.analytics}
            onChange={e => updateCookie('analytics', e.target.checked)}>
            Analytik
          </Checkbox>
        </Flex>
      </ModalBody>

      <ModalFooter alignItems="center" justifyContent="center">
        <Button colorScheme="green" mr={3} onClick={() => checkAll()}>
          Alle akzeptieren
        </Button>
        <Button onClick={handleSave}>Auswahl speichern</Button>
      </ModalFooter>
    </>
  )
}

export default connectNotification(CookieModal, {
  displayName: 'Cookies',
  description: 'DSGVO-konformes Benachrichtigungsmodal für Cookies',
  modalProps: {
    motionPreset: 'slideInBottom',
    closeOnOverlayClick: false
  },
  conditions: {
    entireSite: true
  },
  triggers: {
    onPageLoad: 3
  },
  customCondition: () => {
    return !CookieModalService.isStored()
  }
})
