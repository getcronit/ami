import {Box, BoxProps} from '@chakra-ui/react'
import Editor from '../../../../shared/Editor'
import {connectField} from '../../index'

const TextField = connectField<string, string, {rtf?: boolean} & BoxProps>(
  ({jaenField, rtf = false, ...boxProps}) => (
    <Box style={jaenField.style} className={jaenField.className} {...boxProps}>
      <Editor
        defaultValue={jaenField.staticValue || jaenField.defaultValue}
        value={jaenField.value}
        onBlurValue={data => jaenField.onUpdateValue(data)}
        editing={jaenField.isEditing}
        disableToolbar={!rtf}
      />
    </Box>
  ),
  {fieldType: 'IMA:TextField'}
)

export default TextField
