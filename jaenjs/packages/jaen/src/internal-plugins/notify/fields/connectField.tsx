import {useAppDispatch, useAppSelector, withRedux} from '../redux'
import {internalActions} from '../redux/slices'
import {useNotificationContext} from '../services/notification/context'
import {INotification} from '../types'

export interface JaenFieldProps<IDefaultValue> {
  name: string
  defaultValue: IDefaultValue
  style?: React.CSSProperties
  className?: string
}

export const connectField = <IValue, IDefaultValue = IValue, IProps = {}>(
  Component: React.ComponentType<
    IProps & {
      jaenField: JaenFieldProps<IDefaultValue> & {
        staticValue?: IValue
        value?: IValue
        isEditing: boolean
        onUpdateValue: (value: IValue) => void
      }
    }
  >,
  options: {
    fieldType: string
  }
): React.FC<IProps & JaenFieldProps<IDefaultValue>> =>
  withRedux(props => {
    const dispatch = useAppDispatch()

    const {id, notification} = useNotificationContext()

    if (!id) {
      throw new Error(
        'Notification id is undefined! connectField must be used within a JaenNotification'
      )
    }

    function getPageField<T>(
      notification: INotification | Partial<INotification> | undefined
    ): T | undefined {
      if (notification) {
        return notification.jaenFields?.[options.fieldType]?.[props.name]
      }
    }

    const value = useAppSelector<IValue | undefined>(state => {
      const notificaiton = state.internal.notifications.nodes[id]

      if (notificaiton) {
        return getPageField(notificaiton)
      }
    })

    const staticValue = getPageField<IValue>(notification)

    const isEditing = useAppSelector(state => state.internal.status.isEditing)

    const handleUpdateValue = (value: IValue) => {
      dispatch(
        internalActions.field_write({
          notificationId: id,
          fieldType: options.fieldType,
          fieldName: props.name,
          value
        })
      )
    }

    return (
      <Component
        jaenField={{
          name: props.name,
          defaultValue: props.defaultValue,
          staticValue: staticValue,
          value: value,
          isEditing: isEditing,
          onUpdateValue: handleUpdateValue,
          style: props.style,
          className: props.className
        }}
        {...props}
      />
    )
  })

export type IFieldConnection = ReturnType<typeof connectField>
