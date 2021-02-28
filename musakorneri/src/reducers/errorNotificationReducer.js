let timer = 0

export const setErrorNotification = (errorNotification, timeOut) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_ERROR_NOTIFICATION',
      data: errorNotification
    })
    if (timer) {
      clearTimeout(timer)
      timer = 0
    }
    timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_ERROR_NOTIFICATION',
        data: ''
      })
    }, timeOut * 1000)
  }
}

const errorNotificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_ERROR_NOTIFICATION':
      return action.data
    case 'CLEAR_ERROR_NOTIFICATION':
      return action.data
      default: return state
  }
}

export default errorNotificationReducer