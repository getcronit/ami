import {Box, Button} from '@chakra-ui/react'
import {connectWidget, useWidget} from '@jaenjs/jaen'
import {Form} from '@rjsf/chakra-ui'
import validator from '@rjsf/validator-ajv8'

import {FaUser} from 'react-icons/fa'

const schema = {
  type: 'object',
  properties: {
    menu: {
      type: 'array',
      items: {
        type: 'array',
        items: [
          {
            title: 'A string value',
            type: 'string',
            default: 'lorem ipsum'
          },
          {
            title: 'A string value',
            type: 'string',
            default: 'lorem ipsum'
          }
        ]
      }
    }
  }
}

const uiSchema = {
  'ui:options': {
    orderable: true
  }
}

const formData = {
  menu: [
    ['A', 'B'],
    ['C', 'D']
  ]
}

const WidgetName = 'Menu'

const Widget = () => {
  const widget = useWidget(WidgetName)

  return (
    <Box overflowY={'scroll'}>
      <Form
        schema={schema}
        uiSchema={uiSchema}
        formData={widget.data || formData}
        onChange={data => {
          widget.writeData(data.formData)
          // alert(JSON.stringify(data.formData, null, 2))
        }}
        validator={validator}
      />
      <Button
        onClick={() => {
          widget.writeData({
            ...widget.data,
            items: [
              ...(widget.data?.items || []),
              {
                name: 'New Item',
                url: '#'
              }
            ]
          })
        }}>
        Addd Menu
      </Button>
      <Button
        onClick={() => {
          widget.writeData({})
        }}>
        Clear
      </Button>
      <pre>{JSON.stringify(widget.data, null, 2)}</pre>
    </Box>
  )
}

export default connectWidget(Widget, {
  name: WidgetName,
  Icon: FaUser
})
