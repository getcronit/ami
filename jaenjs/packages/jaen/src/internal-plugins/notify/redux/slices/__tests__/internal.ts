import {actions, reducers} from '../internal'

describe('status', () => {
  const reducer = reducers.status

  it('enables editing if disabled', () => {
    expect(reducer(undefined, actions.setEditing(true))).toEqual({
      isEditing: true
    })
  })

  it('disables editing if enabled', () => {
    expect(reducer({isEditing: true}, actions.setEditing(false))).toEqual({
      isEditing: false
    })
  })
})

describe('notifications', () => {
  const reducer = reducers.notifications

  it('sets the status of a notification to true', () => {
    expect(reducer(undefined, actions.setActive('test')).nodes).toEqual({
      test: {
        active: true
      }
    })
  })

  it('sets the status of a notification to false', () => {
    expect(reducer(undefined, actions.setInactive('test')).nodes).toEqual({
      test: {
        active: false
      }
    })
  })

  it('creates a notification when a field is written', () => {
    expect(
      reducer(
        undefined,
        actions.field_write({
          notificationId: 'notification-id',
          fieldType: 'field-type',
          fieldName: 'field-name',
          value: 'value'
        })
      ).nodes
    ).toEqual({
      'notification-id': {
        id: 'notification-id',
        jaenFields: {
          'field-type': {
            'field-name': 'value'
          }
        }
      }
    })
  })

  it('creates a new fieldname when a field with new name is written on a existing notification', () => {
    const previousState = {
      nodes: {
        'notification-id': {
          id: 'notification-id',
          active: true,
          jaenFields: {
            'field-type': {
              'field-name': 'value'
            }
          }
        }
      },
      advanced: {}
    }

    expect(
      reducer(
        previousState,
        actions.field_write({
          notificationId: 'notification-id',
          fieldType: 'field-type',
          fieldName: 'field-name-2',
          value: 'value'
        })
      ).nodes
    ).toEqual({
      'notification-id': {
        id: 'notification-id',
        active: true,
        jaenFields: {
          'field-type': {
            'field-name': 'value',
            'field-name-2': 'value'
          }
        }
      }
    })
  })

  it('creates a new fieldtype when a field with new type is written on a existing notificaiton', () => {
    const previousState = {
      nodes: {
        'notification-id': {
          id: 'notification-id',
          active: true,
          jaenFields: {
            'field-type': {
              'field-name': 'value'
            }
          }
        }
      },
      advanced: {}
    }

    expect(
      reducer(
        previousState,
        actions.field_write({
          notificationId: 'notification-id',
          fieldType: 'field-type-2',
          fieldName: 'field-name',
          value: 'value'
        })
      ).nodes
    ).toEqual({
      'notification-id': {
        id: 'notification-id',
        active: true,
        jaenFields: {
          'field-type': {
            'field-name': 'value'
          },
          'field-type-2': {
            'field-name': 'value'
          }
        }
      }
    })
  })

  it('sets advanced values for a notification', () => {
    expect(
      reducer(undefined, actions.increaseAdvancedPageViews('notification-id'))
        .advanced
    ).toEqual({
      'notification-id': {
        pageViews: 1
      }
    })
  })
})
