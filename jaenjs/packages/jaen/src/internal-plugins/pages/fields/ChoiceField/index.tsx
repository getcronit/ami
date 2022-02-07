import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/react'
import {connectField} from '../..'

type Options = string[]
type Option = Options[number] | null

type ChoiceRenderFn = (
  selection: Option,
  options: Options,
  select: (option: Option) => void,
  isEditing: boolean
) => JSX.Element

const ChoiceField = connectField<
  Option,
  Option,
  {
    displayName?: React.ReactNode
    options: Options
    render: ChoiceRenderFn
    renderPopover: ChoiceRenderFn | null
  }
>(
  ({jaenField, displayName, options, render, renderPopover}) => {
    const selection =
      jaenField.value || jaenField.staticValue || jaenField.defaultValue

    if (!jaenField.isEditing || !renderPopover) {
      return render(
        selection,
        options,
        jaenField.onUpdateValue,
        jaenField.isEditing
      )
    }

    return (
      <Popover trigger="hover">
        <PopoverTrigger>
          {render(
            selection,
            options,
            jaenField.onUpdateValue,
            jaenField.isEditing
          )}
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          {displayName && <PopoverHeader>{displayName}</PopoverHeader>}
          <PopoverBody>
            {renderPopover(
              selection,
              options,
              jaenField.onUpdateValue,
              jaenField.isEditing
            )}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    )
  },
  {fieldType: 'IMA:ChoiceField'}
)

export default ChoiceField
