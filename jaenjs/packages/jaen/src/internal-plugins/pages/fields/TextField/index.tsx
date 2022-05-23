import {
  Box,
  BoxProps,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
  Textarea
} from '@chakra-ui/react'
import Editor from '../../../../shared/Editor'
import {connectField} from '../../index'
import {AdminWidgetProps} from '../../types'

const TextField = connectField<
  string,
  string,
  {rtf?: boolean; hiddenField?: boolean} & BoxProps
>(
  ({jaenField, rtf = false, hiddenField = false, ...boxProps}) => {
    if (hiddenField && !jaenField.isEditing) {
      return null
    }

    return (
      <Box
        style={jaenField.style}
        className={jaenField.className}
        {...boxProps}>
        <Editor
          defaultValue={jaenField.staticValue || jaenField.defaultValue}
          value={jaenField.value}
          onBlurValue={data => jaenField.onUpdateValue(data)}
          editing={jaenField.isEditing}
          disableToolbar={!rtf}
        />
      </Box>
    )
  },
  {
    fieldType: 'IMA:TextField',
    getAdminWidget: ({field}) => {
      console.log('field', field)

      return (
        <Textarea
          placeholder="Enter text"
          value={field.value || field.defaultValue}
          onChange={e => field.onChange(e.target.value)}
        />
      )
    }
  }
)

export default TextField
